const request = require("request");
const Star = require("../models/Star");

exports.home = (req, res) => {
  res.render("home");
};

exports.userinfo = (req, res) => {
  res.render("userinfo");
};

exports.getSearch = (req, res) => {
  res.render("search");
};

exports.postSearch = (req, res) => {
  const country = encodeURI(req.body.c_name);
  const url = `http://apis.data.go.kr/1262000/CountryAccidentService2/CountryAccidentService2?serviceKey=YNiaZx3zc2QqK2aF8HmLA1YsUtXtsGehE%2FbPs9yIGZZjRq6jkO1jSZpy7nrwT4T7UWkA7Qt7Np5eB7y8F77YsQ%3D%3D&returnType=JSON&numOfRows=10&cond[country_nm::EQ]=${country}&pageN=1`;

  request(
    {
      url: url,
      method: "GET",
    },
    (error, response, body) => {
      if (error) {
        res.send(error);
      }
      if (body) {
        body = JSON.parse(body);
        // res.send(body);
        res.render("search", { data: body });
      }
    }
  );
};

exports.getStar = async (req, res) => {
  console.log(Star);
  const starList = await Star.find({});

  res.render("star", { starList: starList });
};

exports.postStar = async (req, res) => {
  await Star.create({
    country_nm: req.body.country_nm,
    continent_nm: req.body.continent_nm,
    country_eng_nm: req.body.country_eng_nm,
    dang_map_download_url: req.body.dang_map_download_url,
    flag_download_url: req.body.flag_download_url,
    news: req.body.news,
    wrt_dt: req.body.wrt_dt,
  });
  res.redirect("http://localhost:3002/search");
};

exports.getDanger = (req, res) => {
  const url = `http://apis.data.go.kr/1262000/TravelBanService/getTravelBanList?serviceKey=YNiaZx3zc2QqK2aF8HmLA1YsUtXtsGehE%2FbPs9yIGZZjRq6jkO1jSZpy7nrwT4T7UWkA7Qt7Np5eB7y8F77YsQ%3D%3D&numOfRows=10&pageNo=1`;

  request(
    {
      url: url,
      method: "GET",
    },
    (error, response, body) => {
      if (error) {
        res.send(error);
      }
      if (body) {
        var data = [];
        var continent = "";
        // var continent = [];
        // var imgUrl = [];
        // var countryName = [];
        // var countryEnName = [];
        var cont = body.split("<continent>");
        var img = body.split("<imgUrl>");
        var countryname = body.split("<countryName>");
        var countryenname = body.split("<countryEnName>");
        for (var i = 1; i < cont.length; i++) {
          data[i - 1] = {
            continent: "",
            imgUrl: "",
            countryName: "",
            countryEnName: "",
          };
          data[i - 1].continent = cont[i].split("</continent>")[0];
          data[i - 1].imgUrl = img[i].split("</imgUrl>")[0].replace('amp;', '');
          data[i - 1].countryName = countryname[i].split("</countryName>")[0];
          data[i - 1].countryEnName =
            countryenname[i].split("</countryEnName>")[0];
        }
        console.log(data);
        res.render("danger", { data: data });
      }
    }
  );
  // res.render("danger");
};
