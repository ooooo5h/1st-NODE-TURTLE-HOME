# 1st-NODE-TURTLE-HOME

## Introduction
- 기간 : 2022.08.22 - 2022.09.01
- Python Django로 개발한 TURTLEHOME 프로젝트를 Node.js, Express로 구현

## ERD
<img width="1381" alt="스크린샷 2022-07-28 오전 10 46 01" src="https://user-images.githubusercontent.com/78359232/181875825-64d7c1f4-58ce-4ed9-9e48-11e9322e484e.png">

# Technologies
- Node.js
- Express
- MySQL

# Directory Tree
```
├── apidocs
│   ├── carts
│   ├── products
│   └── users
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
└── utils
```

# Features
- User API
  - 회원가입
  - 이메일 중복 체크
  - 로그인
  - 장바구니 CRUD
- Product API
  - 상품 상세 / 목록 리스트
  - 정렬 : 낮은 가격순, 높은 가격순, 최신순
  - 필터 : 가격, 사이즈

# API 명세서
- [API 명세서](http://13.124.227.212:4000/api-docs/#/)
<img width="1586" alt="스크린샷 2022-10-18 오후 3 39 09" src="https://user-images.githubusercontent.com/78359232/196354431-8bed332d-309b-4430-b5c2-e8944f938df9.png">

