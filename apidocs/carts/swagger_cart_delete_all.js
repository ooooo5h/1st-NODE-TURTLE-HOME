/**
* @swagger
*
* /carts:
*  delete:
*    security:
*      - Authorization: []
*    summary: "장바구니 전체 삭제"
*    description: "장바구니 전체 삭제"
*    tags: [Carts]
*    responses:
*      200:
*        description: 장바구니 전체 삭제 성공
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
*                    example: "DELETED_SUCCESSFULLY"
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
*/