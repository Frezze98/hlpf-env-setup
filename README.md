## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2on

## Практичне заняття №5 — JWT Authentication + Guards + RBAC

### Структура репозиторію
```text
.
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   ├── categories/
│   ├── products/
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

### Тест реєстрації користувача
```text
id : 1
email : admin@test.com
name : Admin
role : user
createdAt : 2026-04-26T12:22:34.125Z
```

### Тест логіну та отримання JWT токена
```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20i
LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzcyMDcyMDQsImV4cCI6MTc3NzIxMDgwNH0.rirI2vYz
6iiy_7sZA8npPnCuw0UYq0nNEIke4-vS9to
```

### Тест захисту — спроба створення без токена (401 Unauthorized)
```text
Invoke-RestMethod : {&quot;message&quot;:&quot;Токен відсутній&quot;,&quot;error&quot;:&quot;Unauthorized&quot;,&quot;statusCode&quot;:401}
At line:1 char:1
+ Invoke-RestMethod -Uri
&quot;[http://127.0.0.1:3000/api/categories](http://127.0.0.1:3000/api/categories)&quot; -Method ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest)
[Invoke-RestMethod], WebException
+ FullyQualifiedErrorId :
WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCom
mand
```

### Тест захисту — роль user (403 Forbidden)
```text
Invoke-RestMethod : {&quot;message&quot;:&quot;Недостатньо прав
доступу&quot;,&quot;error&quot;:&quot;Forbidden&quot;,&quot;statusCode&quot;:403}
At line:1 char:1
+ Invoke-RestMethod -Uri
&quot;[http://127.0.0.1:3000/api/products](http://127.0.0.1:3000/api/products)&quot; -Method ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest)
[Invoke-RestMethod], WebException
```

### Тест успішне створення категорії (Admin)
```text
id name description createdAt
-- ---- ----------- ---------
7 Admin Category 2026-04-26T12:40:08.389Z
```

### Тест успішне створення продукту (Admin)
```text
id : 3
name : Real iPhone
description :
price : 999.99
stock : 10
isActive : True
createdAt : 2026-04-26T12:32:13.999Z
updatedAt : 2026-04-26T12:32:13.999Z
```