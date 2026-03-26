## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2on

## Практичне заняття №3 — CRUD REST API для MiniShop

### Структура репозиторію
```text
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── 1774521331353-AddIsActiveToProducts.ts
│   ├── data-source.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```
### Запуск проекту
```
cp .env.example .env
docker compose up --build
```
### API Endpoints

| Method | URL | Опис |
| :--- | :--- | :--- |
| **GET** | `/api/categories` | Список категорій |
| **GET** | `/api/categories/:id` | Одна категорія |
| **POST** | `/api/categories` | Створити категорію |
| **PATCH** | `/api/categories/:id` | Оновити категорію |
| **DELETE** | `/api/categories/:id` | Видалити категорію |
| **GET** | `/api/products` | Список продуктів |
| **GET** | `/api/products/:id` | Один продукт |
| **POST** | `/api/products` | Створити продукт |
| **PATCH** | `/api/products/:id` | Оновити продукт |
| **DELETE** | `/api/products/:id` | Видалити продукт |

### Перевірка міграцій
````
List of relations
Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
public | categories | table | nestuser
public | migrations | table | nestuser
public | products   | table | nestuser
````
### Тест створення продукту
````
id          : 1
name        : iPhone 15
description : 
price       : 999,99
stock       : 50
isActive    : True
category    : @{id=1}
createdAt   : 2026-03-26T10:48:12.479Z
updatedAt   : 2026-03-26T10:48:12.479Z
````

### Тест отримання продуктів
````
id          : 1
name        : iPhone 15
description : 
price       : 999.99
stock       : 50
isActive    : True
category    : @{id=1; name=Electronics; description=Gadgets and devices; createdAt=2026-03-26T10:48:03.968Z}
createdAt   : 2026-03-26T10:48:12.479Z
updatedAt   : 2026-03-26T10:48:12.479Z
````

### Тест 404
````
Invoke-RestMethod : {"message":"Product #999 not found","error":"Not Found","statusCode":404}
At line:1 char:1
+ Invoke-RestMethod -Method GET -Uri http://localhost:3000/api/products ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand