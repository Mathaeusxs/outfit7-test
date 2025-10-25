import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/* import * as dbTablesIndex from '@libs/admin-db-models/index';

// Get DynamicList Of Entities for import
const entities = (Object.keys(dbTablesIndex) as Array<keyof typeof dbTablesIndex>).map(
  (entity: keyof typeof dbTablesIndex) => dbTablesIndex[entity],
); */

export const DbDetails = {
  type: 'mariadb',
  host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : '127.0.0.1',
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'root',
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'root',
  database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'events7',
  synchronize: true,
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
