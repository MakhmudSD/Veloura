import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotResolver } from './chatbot.resolver';

@Module({
	providers: [ChatbotService, ChatbotResolver],
	exports: [ChatbotService],
})
export class ChatbotModule {}

