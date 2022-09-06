/**
* @swagger
*
* /carts:
*  post:
*    security:
*      - Authorization: []
*    summary: "장바구니 생성"
*    description: "장바구니 생성하기"
*    tags: [Carts]
*    requestBody:
*      description: 장바구니 생성 시 필요한 데이터
*      required: true
*      content:
*        application/x-www-form-urlencoded:
*          schema:
*            type: object
*            properties:
*              productId:
*                type: number
*                description: "상품 ID"
*              sizeId:
*                type: number
*                description: "사이즈 ID - 1)single 2)double 3)queen 4)king"
*              quantity:
*                type: number
*                description: "수량"
*    responses:
*      400:
*        description: body에 해당 데이터가 없을 때 or 없는 상품 입력시 or 
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
*                    example: "KEY_ERROR or PRODUCT_DOES_NOT_EXIST"
*      201:
*        description: 장바구니 담기 성공
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                  status:
*                    type: number
*                    example: 200
*                  message:
*                    type: string
*                    example: "CART_CREATED_SUCCESSFULLY or /업데이트 성공"
*/