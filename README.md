# AzizbekShop Backend

AzizbekShop — An e-commerce platform for healthy products.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- PostgreSQL (v12.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MakhmudSD/Veloura.git
cd veloura
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=azizbekshop
SECRET_TOKEN=your-secret-token-here
OPENAI_API_KEY=your-openai-api-key-here
AUTH_TIMER=24h
NODE_ENV=development
```

4. Start PostgreSQL database

5. Run the application:
```bash
npm run start:dev
```

The GraphQL playground will be available at: `http://localhost:5000/graphql`

## 📦 Features

- **GraphQL API** - Modern API with GraphQL
- **PostgreSQL** - Relational database with TypeORM
- **Authentication** - JWT-based authentication
- **Products** - Healthy products e-commerce management
- **Orders** - Order management system
- **Notices** - Notice/announcement system
- **Chatbot** - OpenAI-powered chatbot integration
- **Views** - Product view tracking

## 🏗️ Project Structure

```
src/
├── components/        # Feature modules
│   ├── auth/         # Authentication
│   ├── member/       # Member management
│   ├── product/      # Product management
│   ├── order/        # Order management
│   ├── view/         # View tracking
│   ├── notice/       # Notice system
│   └── chatbot/      # Chatbot integration
├── entities/         # TypeORM entities
├── database/         # Database configuration
└── libs/             # Shared utilities and enums
```

## 🔧 Development

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server

## 📄 License

This project is licensed under the MIT License.

## 📫 Contact

Questions or suggestions? Reach out via [makhwork15@gmail.com] or open an issue.
