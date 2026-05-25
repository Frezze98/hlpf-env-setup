## Student
- Name: Юрчик Владислав Сергійович
- Group: 232/2он

## Практичне заняття №8 — фінальний проєкт MiniShop

### Структура репозиторію
```text
.
├── src/
│   ├── auth/              # JWT автентифікація, Guards, Strategies
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt.strategy.ts
│   ├── categories/        # Модуль категорій товарів
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── categories.controller.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── category.entity.ts
│   ├── common/            # Спільні DTO, Enums, Filters, Interceptors
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── enums/
│   │   │   ├── order-status.enum.ts
│   │   │   └── role.enum.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   ├── migrations/        # TypeORM міграції бази даних
│   │   ├── 1700000001-CreateTables.ts
│   │   ├── 1774521331353-AddIsActiveToProducts.ts
│   │   ├── 1777205033703-CreateUsers.ts
│   │   └── 1779656797603-CreateOrders.ts
│   ├── orders/            # Модуль замовлень (Транзакції, Ownership check)
│   │   ├── dto/
│   │   │   ├── create-order-item.dto.ts
│   │   │   ├── create-order.dto.ts
│   │   │   └── update-order-status.dto.ts
│   │   ├── entities/
│   │   │   ├── order-item.entity.ts
│   │   │   └── order.entity.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   └── orders.service.ts
│   ├── products/          # Модуль продуктів (Пагінація, Кешування)
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── product-query.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── seeds/             # Скрипти для наповнення БД
│   │   └── seed.ts
│   ├── users/             # Модуль управління користувачами
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── data-source.ts
│   └── main.ts
├── test/                  # E2E Тести
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example           # Приклад змінних оточення
├── .gitignore             # Виключення для Git
├── .prettierrc            # Налаштування форматування коду
├── Dockerfile             # Інструкції для збірки Docker образу застосунку
├── README.md              # Документація проєкту
├── docker-compose.yml     # Налаштування контейнерів (App, PostgreSQL, Redis)
├── eslint.config.mjs      # Налаштування лінтера
├── nest-cli.json          # Конфігурація Nest CLI
├── package-lock.json      # Фіксація версій залежностей
├── package.json           # Залежності та npm скрипти
├── swagger-screenshot.png # Скріншот Swagger документації
├── tsconfig.build.json    # Конфігурація TypeScript для продакшен збірки
└── tsconfig.json          # Основна конфігурація TypeScript
```

### Технології
```
○ NestJS + TypeScript

○ PostgreSQL + TypeORM (міграції, QueryBuilder)

○ Redis (кешування з інвалідацією)

○ JWT автентифікація + RBAC авторизація

○ class-validator + class-transformer

○ Swagger / OpenAPI
```

### Запуск проекту та наповнення БД
```bash
cp .env.example .env
docker compose up --build -d
docker compose run --rm app npm run seed
```

### Swagger UI
```
http://localhost:3000/api/docs
```
### Order Entity (таблиця `orders`)
| Поле       | Тип                   | Обмеження                  | Коментар                     |
|------------|-----------------------|----------------------------|------------------------------|
| id         | number                | PrimaryGeneratedColumn     | Auto-increment               |
| status     | enum                  | default: 'pending'         | OrderStatus enum             |
| totalPrice | decimal(10,2)         | default: 0                 | Підраховується при створенні |
| user       | ManyToOne → User      | eager: false               | Хто замовив                  |
| items      | OneToMany → OrderItem | eager: true, cascade: true | Позиції замовлення           |
| createdAt  | Date                  | CreateDateColumn           | Дата створення               |

### OrderItem Entity (таблиця `order_items`)
| Поле     | Тип                   | Обмеження              | Коментар                             |
|----------|-----------------------|------------------------|--------------------------------------|
| id       | number                | PrimaryGeneratedColumn | Auto-increment                       |
| quantity | int                   | не менше 1             | Кількість одиниць                    |
| price    | decimal(10,2)         |                        | Ціна на момент замовлення (snapshot) |
| order    | ManyToOne → Order     | onDelete: CASCADE      | До якого замовлення належить         |
| product  | ManyToOne → Product   | eager: true            | Який продукт замовлено               |

### API Ендпоінти (OrdersModule)
| Method | URL                    | Auth | Role        | Опис                              |
|--------|------------------------|------|-------------|-----------------------------------|
| POST   | /api/orders            | JWT  | user, admin | Створити замовлення               |
| GET    | /api/orders            | JWT  | user, admin | Мої замовлення (user) / Всі (admin)|
| GET    | /api/orders/:id        | JWT  | user, admin | Одне замовлення (ownership check) |
| PATCH  | /api/orders/:id/status | JWT  | admin       | Змінити статус                    |
| DELETE | /api/orders/:id        | JWT  | admin       | Видалити замовлення               |

### Дозволені переходи статусів замовлення
| Поточний статус | Дозволені переходи             |
|-----------------|--------------------------------|
| pending         | confirmed, cancelled           |
| confirmed       | shipped, cancelled             |
| shipped         | delivered                      |
| delivered       | (фінальний — зміна заборонена) |
| cancelled       | (фінальний — зміна заборонена) |

### Декоратори для вкладеної валідації (DTO)
| Декоратор                       | Що робить                                              |
|---------------------------------|--------------------------------------------------------|
| @ValidateNested({ each: true }) | Валідує кожен елемент масиву як окремий DTO-об'єкт     |
| @Type(() => Клас)               | Каже class-transformer перетворити plain object у DTO  |
| @ArrayMinSize(1)                | Замовлення не може бути порожнім — мінімум 1 позиція   |

### Кроки TypeORM транзакції (QueryRunner)
| Крок                  | Що відбувається                                        |
|-----------------------|--------------------------------------------------------|
| createQueryRunner()   | Створює окреме з'єднання з БД для транзакції           |
| startTransaction()    | Починає транзакцію — всі зміни тимчасові               |
| qr.manager.save()     | Зберігає через транзакційний менеджер (не через Repo!) |
| commitTransaction()   | Фіксує всі зміни — тепер вони збережені у базі         |
| rollbackTransaction() | Відкочує все — ніби нічого не було                     |
| release()             | Звільняє з'єднання — обов'язково, навіть при помилці   |

### Фільтрація продуктів (GET /api/products)
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
