import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({ origin: true, credentials: true });
	app.use(graphqlUploadExpress({ maxFile: 15000000, maxFiles: 10 }));
	app.use('/uploads', express.static('./uploads'));

	const PORT = process.env.PORT || 5000;
	
	try {
		await app.listen(PORT);
		console.log(`AzizbekShop API Server running on http://localhost:${PORT}`);
		console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
	} catch (error) {
		if (error.code === 'EADDRINUSE') {
			console.error(`\n❌ Port ${PORT} is already in use.`);
			console.log(`\nTo fix this, run:`);
			console.log(`  lsof -ti:${PORT} | xargs kill -9`);
			console.log(`\nOr use a different port by setting PORT in .env file\n`);
			process.exit(1);
		}
		throw error;
	}
}
bootstrap();
