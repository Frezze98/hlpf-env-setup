## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2он

## Практичне заняття №7 — Redis кешування + Query параметри + Pagination

### Структура репозиторію (нові файли)
```text
.
├── src/
│   ├── products/
│   │   ├── dto/
│   │   │   └── product-query.dto.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── seeds/
│   │   └── seed.ts
│   └── ...
├── package.json
└── README.md
```
### Запуск проекту та наповнення БД
```bash
cp .env.example .env
docker compose up --build -d
docker compose run --rm app npm run seed
```

### API: GET /api/products
```
|  Параметр  |    Тип     |  Default  |              Опис               |
|------------|------------|-----------|---------------------------------|
| page       | number     | 1         | Номер сторінки                  |
| pageSize   | number     | 10        | Елементів на сторінку (max 100) |
| sort       | string     | createdAt | Поле сортування                 |
| order      | asc/desc   | desc      | Напрямок                        |
| categoryId | number     | -         | Фільтр за категорією            |
| minPrice   | number     | -         | Мінімальна ціна                 |
| maxPrice   | number     | -         | Максимальна ціна                |
| search     | string     | -         | Пошук за назвою (ILIKE)         |
```

### Формат успішної відповіді з пагінацією (Тест GET /api/products?page=1&pageSize=5)
```
{
  "data": {
    "items": [
      {
        "id": 32,
        "name": "Hoodie NestJS v3",
        "description": null,
        "price": "75.00",
        "stock": 75,
        "isActive": true,
        "category": {
          "id": 3,
          "name": "Clothing",
          "description": null,
          "createdAt": "2026-05-14T07:44:38.399Z"
        },
        "createdAt": "2026-05-14T07:48:24.849Z",
        "updatedAt": "2026-05-14T07:48:24.849Z"
      }
      // ... ще 4 продукти ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 5,
      "total": 31,
      "totalPages": 7
    }
  },
  "statusCode": 200,
  "timestamp": "2026-05-14T07:56:20.043Z"
}
```

### Тест фільтрації (GET /api/products?categoryId=1&minPrice=500)
```
{
  "data": {
    "items": [
      {
        "id": 26,
        "name": "iPad Air v3",
        "price": "619.00",
        "stock": 30,
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      },
      {
        "id": 25,
        "name": "MacBook Pro v3",
        "price": "2519.00",
        "stock": 15,
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      }
      // ... та інші ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "total": 12,
      "totalPages": 2
    }
  },
  "statusCode": 200,
  "timestamp": "2026-05-14T07:56:28.323Z"
}
```

### Тест пошуку (GET /api/products?search=mac)
```
{
  "data": {
    "items": [
      {
        "id": 25,
        "name": "MacBook Pro v3",
        "price": "2519.00"
      },
      {
        "id": 15,
        "name": "MacBook Pro v2",
        "price": "2509.00"
      },
      {
        "id": 5,
        "name": "MacBook Pro",
        "price": "2499.00"
      },
      {
        "id": 2,
        "name": "MacBook Air M4",
        "price": "1299.99"
      }
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "total": 4,
      "totalPages": 1
    }
  },
  "statusCode": 200,
  "timestamp": "2026-05-14T07:56:32.613Z"
}
```

### Тест кешування (Redis)
```
docker compose exec redis redis-cli KEYS "products:*"

1) "products:{\"page\":1,\"pageSize\":5}"
2) "products:{\"categoryId\":\"1\",\"minPrice\":\"500\"}"
3) "products:{\"search\":\"mac\"}"
```
