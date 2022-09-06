/**
* @swagger
*
* /products/{productId}:
*  get:
*    summary: "특정 상품 조회"
*    description: "특정 상품 조회하기"
*    tags: [Products]
*    parameters:
*      - in: path
*        name: productId
*        schema :
*          type : integer
*        required: true
*    responses:
*      200:
*        description: 특정 상품 조회 성공
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                result:
*                  type: object
*                  items:
*                    type: string
*                  properties:
*                      id:
*                        type: number
*                        example: 1
*                      name:
*                        type: string
*                        example: "워시드 린넨 이불커버"
*                      number:
*                        type: string
*                        example: "3501"
*                      description:
*                        type: string
*                        example: "가장자리에 더블 스티치 디테일이 매치된 160GSM 워싱 마감 린넨 단색 이불커버. JOIN LIFE Care for fiber: 100% 유럽 재배 린넨."
*                      image_url:
*                        type: string
*                        example: "https://images.unsplash.com/photo-1606855637183-ea2a00b6f15f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
*                      options:
*                        type: array                
*                        example:
*                          - size: "single"
*                            price: 169000
*                          - size: "double"
*                            price: 175000
*                          - size: "queen"
*                            price: 182000
*                          - size: "king"
*                            price: 190000
*      404:
*        description: 해당 상품 존재하지 않음
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
*                    example: "PRODUCT_DOES_NOT_EXIST"
*/