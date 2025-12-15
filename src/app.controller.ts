import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getHello(): string {
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<title>AzizbekShop API</title>
				<style>
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100vh;
						margin: 0;
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
					}
					.container {
						text-align: center;
						padding: 40px;
						background: rgba(255, 255, 255, 0.1);
						border-radius: 20px;
						backdrop-filter: blur(10px);
						box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
					}
					h1 {
						margin: 0 0 20px 0;
						font-size: 2.5em;
					}
					p {
						font-size: 1.2em;
						margin: 10px 0;
					}
					a {
						color: #fff;
						text-decoration: none;
						border-bottom: 2px solid white;
						transition: all 0.3s;
					}
					a:hover {
						opacity: 0.8;
					}
					.status {
						display: inline-block;
						padding: 8px 16px;
						background: rgba(76, 175, 80, 0.8);
						border-radius: 20px;
						margin-top: 20px;
						font-weight: bold;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>🌿 AzizbekShop API</h1>
					<p>Backend is running successfully!</p>
					<p>GraphQL Playground: <a href="/graphql">/graphql</a></p>
					<div class="status">✅ Server Status: Online</div>
				</div>
			</body>
			</html>
		`;
	}
}

