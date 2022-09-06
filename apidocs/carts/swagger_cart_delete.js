/**
* @swagger
*
* /carts/{cartId}:
*  delete:
*    security:
*      - Authorization: []
*    summary: "특정 카트 지우기"
*    description: "장바구니 삭제"
*    tags: [Carts]
*    parameters:
*      - in: path
*        name: cartId
*        schema :
*          type : integer
*        required: true
*    responses:
*      404:
*        description: 해당 유저의 카트 존재하지 않음
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
*        description: 장바구니 삭제 성공
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
*                    example: "CART_DELETED_SUCCESSFULLY"
*/