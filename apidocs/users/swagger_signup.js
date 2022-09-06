/**
* @swagger
*
* /users/signup:
*  post:
*    summary: "회원가입"
*    description: "회원가입 기능"
*    tags: [Users]
*    requestBody:
*      description: 회원가입 시 필요한 데이터
*      required: true
*      content:
*        application/x-www-form-urlencoded:
*          schema:
*            type: object
*            properties:
*              korean_name:
*                type: string
*                description: "유저 한글 이름"
*              email:
*                type: string
*                description: "유저 이메일"
*              password:
*                type: string
*                description: "유저 비밀번호"
*              address:
*                type: string
*                description: "유저 주소"
*              phone_number:
*                type: string
*                description: "유저 핸드폰 번호"
*    responses:
*      400:
*        description: body에 해당 데이터가 없을 때 or 비밀번호 형식 오류 
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                status:
*                    type: number
*                    example: 400
*                message:
*                    type: string
*                    example: "KEY_ERROR or PASSWORD_IS_NOT_VALID"
*      201:
*        description: 회원가입 성공
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                  status:
*                    type: number
*                    example: 201
*                  message:
*                    type: string
*                    example: "SIGN_UP_SUCCESS"
*/
