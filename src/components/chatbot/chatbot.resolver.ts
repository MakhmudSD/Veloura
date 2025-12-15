import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChatbotService } from './chatbot.service';

@Resolver()
export class ChatbotResolver {
	constructor(private readonly chatbotService: ChatbotService) {}

	@Query(() => String)
	async chat(@Args('message') message: string, @Args('context', { nullable: true }) context?: string): Promise<string> {
		return this.chatbotService.chat(message, context);
	}
}

