const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("연결 성공");
const handleError = (
  error
) => console.log(`연결 실패 : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
