import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';

// Завантажуємо змінні з .env для міграцій
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Category, Product, User],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});