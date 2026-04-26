## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2on

## Практичне заняття №4 — DTO + class-validator + Pipes

### Структура репозиторію
```text
.
├── src/
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```

### Тест валідації — порожнє ім'я категорії
```text
Invoke-RestMethod : {"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
At line:1 char:1
+ Invoke-RestMethod -Uri "[http://127.0.0.1:3000/api/categories](http://127.0.0.1:3000/api/categories)" -Method ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

### Тест валідації — від'ємна ціна продукту
```text
Invoke-RestMethod : {"message":["price must not be less than 0.01"],"error":"Bad Request","statusCode":400}
At line:1 char:1
+ Invoke-RestMethod -Uri "[http://127.0.0.1:3000/api/products](http://127.0.0.1:3000/api/products)" -Method ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

### Тест валідації — зайве поле
```text
Invoke-RestMethod : {"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
At line:1 char:1
+ Invoke-RestMethod -Uri "[http://127.0.0.1:3000/api/categories](http://127.0.0.1:3000/api/categories)" -Method ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebException
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

### Тест TrimPipe
```text
id name        description createdAt
-- ----        ----------- ---------
 2 Accessories             2026-04-26T11:40:18.036Z
```

### Тест валідне створення продукту
```text
id          : 1
name        : iPhone 16
description : 
price       : 999.99
stock       : 50
isActive    : True
category    : @{id=1}
createdAt   : 2026-04-26T12:00:00.000Z
updatedAt   : 2026-04-26T12:00:00.000Z
```