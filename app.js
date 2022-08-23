const cors    = require("cors");
const express = require("express");

const routes  = require("./routes");

const app     = express();

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(routes);

// 서버 키기
const port = 4000;
app.listen(port, ()=> {
    console.log('4000포트 서버 켜졌습니다')
}) 