const cors    = require("cors");
const express = require("express");
const routes  = require("./routes")
const app     = express();

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(routes);

// 주소 라우팅
app.get("/", (req, res) => {
    res.send('노드 테스트')
})

// 서버 키기
const port = 4000;
app.listen(port, ()=> {
    console.log('4000포트 서버 켜졌습니다')
}) 