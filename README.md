## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2on

## Практичне заняття №6 — Interceptors + Exception Filters + Swagger

### Структура репозиторію
```text
.
├── src/
│   ├── auth/ ...
│   ├── users/ ...
│   ├── categories/ ...
│   ├── products/ ...
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── migrations/
│   ├── main.ts
│   └── app.module.ts
├── swagger-screenshot.png
├── Dockerfile
├── docker-compose.yml
└── README.md
```
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```

### Swagger UI
```
http://localhost:3000/api/docs
```
![Swagger](swagger-screenshot.png)

### Формат успішної відповіді (Тест TransformInterceptor)
```
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc3ODA5NjMwMCwiZXhwIjoxNzc4MDk5OTAwfQ.7Nxav6f9oyw_8rIV-AiB-tixCX9nfNq2nyiOz46UFbk"
  },
  "statusCode": 200,
  "timestamp": "2026-05-06T19:38:20.459Z"
}
```

### Формат помилки (Тест HttpExceptionFilter)
```
{
  "error": {
    "code": 403,
    "message": "Недостатньо прав доступу",
    "traceId": "ff54a299-f66d-46e8-8c51-0c21b3b6fb8f"
  },
  "timestamp": "2026-05-06T19:47:51.062Z"
}
```

### Приклад логів (Тест LoggingInterceptor)
```
app-1  | [HTTP] POST /auth/login — 200 — 45ms
app-1  | [HTTP] POST /api/products — 403 — 12ms
app-1  | [HTTP] POST /api/products — 500 — 21ms
app-1  | [HTTP] POST /api/products — 201 — 38ms
```

### Тест помилки валідації з traceId
```
curl -X 'POST' \
  'http://localhost:3000/api/products' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{ "name": "", "price": -5 }'

{
  "error": {
    "code": 400,
    "message": "Validation failed",
    "details": [
      "name must be longer than or equal to 2 characters",
      "price must not be less than 0.01"
    ],
    "traceId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "timestamp": "2026-05-06T19:50:00.000Z"
}
```
