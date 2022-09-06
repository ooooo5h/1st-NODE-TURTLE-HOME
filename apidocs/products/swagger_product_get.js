/**
* @swagger
*
* /products:
*  get:
*    summary: "상품 전체 조회"
*    description: "상품 전체 조회하기"
*    tags: [Products]
*    responses:
*      200:
*        description: 상품 전체 조회 성공
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                result:
*                  type: array
*                  items:
*                    type: object
*                    properties: 
*                      id:
*                        type: number
*                      name:
*                        type: string
*                      image_url:
*                        type: string
*                      min_price:
*                        type: string
*                      max_price:
*                        type: string
*                  example:
*                    - id: 1
*                      name: "워시드 린넨 이불커버"
*                      image_url: "https://images.unsplash.com/photo-1606855637183-ea2a00b6f15f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
*                      min_price: "169000.00"
*                      max_price: "190000.00"
*                    - id: 2
*                      name: "퍼케일 코튼 이불커버"
*                      image_url: "https://images.unsplash.com/photo-1602260513914-a28f4fbdfd20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
*                      min_price: "150000.00"
*                      max_price: "180000.00"
*/