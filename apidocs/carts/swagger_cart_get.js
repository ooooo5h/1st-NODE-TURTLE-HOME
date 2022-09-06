/**
* @swagger
*
* /carts/user/{userId}:
*  get:
*    security:
*      - Authorization: []
*    summary: "사용자ID로 장바구니 조회하기"
*    description: "장바구니 조회하기"
*    tags: [Carts]
*    parameters:
*      - in: path
*        name: userId
*        schema :
*          type : integer
*        required: true
*    responses:
*      401:
*        description: 토큰의 유저정보와 path로 들어온 userId 일치하지 않음
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                status:
*                    type: number
*                    example: 401
*                message:
*                    type: string
*                    example: "USER_DOES_NOT_MATCH"
*      404:
*        description: 해당 유저의 장바구니 존재하지 않음
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                status:
*                    type: number
*                    example: 404
*                message:
*                    type: string
*                    example: "CART_DOES_NOT_EXIST"
*      200:
*        description: 장바구니 조회 성공
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      product_id:
*                        type: number
*                        example: 15
*                      product_name:
*                        type: string
*                        example: "블루 스트라이프 이불 커버"
*                      option_id:
*                        type: number
*                        example: 2
*                      option_name:
*                        type: string
*                        example: "double"
*                      quantity:
*                        type: number
*                        example: 1
*                      price:
*                        type: string
*                        example: "75000.00"
*/