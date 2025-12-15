import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DB_HOST || 'localhost',
				port: parseInt(process.env.DB_PORT || '5432'),
				username: process.env.DB_USERNAME || 'postgres',
				password: process.env.DB_PASSWORD || 'postgres',
				database: process.env.DB_NAME || 'azizbekshop',
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: process.env.NODE_ENV !== 'production',
				logging: process.env.NODE_ENV === 'development',
			}),
		}),
	],
	exports: [TypeOrmModule],
})
export class DatabaseModule {
	constructor(private dataSource: DataSource) {
		setTimeout(() => {
			if (this.dataSource.isInitialized) {
				console.log(
					`✅ PostgreSQL connected to ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} database`,
				);
			} else {
				console.error('\n❌ PostgreSQL connection failed');
				console.log('\n📋 Setup Instructions:');
				console.log('1. Start PostgreSQL: brew services start postgresql@15');
				console.log('2. Create database: createdb azizbekshop');
				console.log('3. Copy .env.example to .env and set DB_PASSWORD');
				console.log('4. Default username is "postgres", password is usually empty or what you set during install');
				console.log('   See SETUP_DATABASE.md for detailed instructions\n');
			}
		}, 1000);
	}
}
