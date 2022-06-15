require("./db");
const app = require("./app");
const http = require("http");
const dotenv = require("dotenv"); // 환경 변수 사용을 위해서 (.env 파일)
dotenv.config();
require("./models/Star");

const PORT = process.env.PORT || "3002";
app.set("port", PORT);
//

const server = http.createServer(app);

const handleListening = function () {
  console.log(`포트 개방 ${PORT}`);
};

server.listen(PORT, handleListening);
