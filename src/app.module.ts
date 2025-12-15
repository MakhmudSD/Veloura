import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './components/member/member.module';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';
import { ViewModule } from './components/view/view.module';
import { AuthModule } from './components/auth/auth.module';
import { NoticeModule } from './components/notice/notice.module';
import { ChatbotModule } from './components/chatbot/chatbot.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			playground: true,
			uploads: false,
			autoSchemaFile: true,
			formatError: (error: any) => {
				const graphqlFormattedError = {
					code: error?.extensions?.code,
					message:
						error?.extensions?.exception?.response?.message ||
						error?.extensions?.response?.message ||
						error?.message,
				};
				console.log('GRAPHQL Global Error', graphqlFormattedError);
				return graphqlFormattedError;
			},
		}),
		DatabaseModule,
		AuthModule,
		MemberModule,
		ProductModule,
		OrderModule,
		ViewModule,
		NoticeModule,
		ChatbotModule,
	],
	controllers: [AppController],
})
export class AppModule {}
