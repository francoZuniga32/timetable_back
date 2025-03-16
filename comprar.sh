#!/bin/bash

curl -X POST \
      'https://api.mercadopago.com/checkout/preferences' \
      -H 'Authorization: Bearer TEST-2255961064013319-091709-6f8eea97795e134a9eec1ea9149e680e-1033432264'\
      -H 'Content-Type: application/json' \ 
      -d '{
  "items": [
    {
      "title": "Dummy Title",
      "description": "Dummy description",
      "picture_url": "http://www.myapp.com/myimage.jpg",
      "category_id": "car_electronics",
      "quantity": 1,
      "unit_price": 10
    }
  ],
 }'
