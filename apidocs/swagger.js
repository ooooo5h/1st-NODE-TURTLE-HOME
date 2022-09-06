const swaggerUi    = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi : "3.0.0",       // 사용하고 있는 open api 버전
        info : {                // api에 필요한 정보들을 다루는 선택 필드
            version : "1.0.0", // api버전
            title : "자라홈",   // api 제목
            description :    // api 상세 정보
            "위코드 1차 팀 프로젝트 '터틀홈' node.js로 진행한 API",
        },
        servers : [
            {
                url : "http://localhost:4000",  // api에 대한 기본 url을 정의하며배열로 여러 ur 정의 가능
            },
        ],
        components : {
            securitySchemes: {   // 인증 관련  => bearer : jwt or oauth를 나타내는 인증타입
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "bearer <JWT token here>"
                }
            },
        },
    },
    apis : ["./apidocs/*/*.js"],  // swagger 파일 연동
}

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
}
