import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatbotService {
	private openai: OpenAI | null = null;

	constructor() {
		if (process.env.OPENAI_API_KEY) {
			this.openai = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY,
			});
		}
	}

	async chat(message: string, context?: string): Promise<string> {
		if (!this.openai) {
			return 'Chatbot service is not configured. Please add OPENAI_API_KEY to your environment variables.';
		}

		try {
			const systemPrompt = `You are a helpful assistant for AzizbekShop, an e-commerce platform for healthy products. 
			Help customers with questions about supplements, vitamins, organic foods, fitness equipment, and wellness products.
			${context ? `Context: ${context}` : ''}`;

			const completion = await this.openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: message },
				],
				max_tokens: 500,
				temperature: 0.7,
			});

			return completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
		} catch (error) {
			console.error('OpenAI API Error:', error);
			throw new Error('Failed to get response from chatbot');
		}
	}
}

