# Multilingual FAQ API

### Project Link :- https://bharatfd.azurewebsites.net/
---
### Postman Documentation Link :- https://documenter.getpostman.com/view/23888366/2sAYX5LNmK(onl)
---
## Overview
This project is a **Node.js-based REST API** for managing **FAQs with multilingual support**. It includes a **WYSIWYG editor**, **caching with Redis**, **automated translations**, and follows best practices for code quality, testing, and version control.

---

## Features
- **MongoDB Models**: Stores FAQs with multilingual support.
- **WYSIWYG Editor**: Integrated using `react-quill.js`.
- **Multilingual Support**: Automatic translation using `microsoft-translate-api`.
- **REST API**: Fetch FAQs in different languages using `?lang=` query parameter.
- **Caching**: Uses Redis (deployed on Azure) for performance optimization.
- **Admin Panel**: User-friendly interface for managing FAQs.
- **Unit Testing**: Ensures API correctness and stability.
- **Docker Support**: Ready-to-deploy with Docker and Docker Compose.
- **Deployment**: Hosted on Azure.

---

## Installation

### Prerequisites
- Node.js 16+
- MongoDB
- Redis (deployed on Azure)
- Docker (optional)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Nishantsingh9412/bharat_fd
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```sh
    NODE_ENV=development
    PORT=8081
    CLIENT_URL=http://localhost:5173
    DATABASE_URL=mongodb://localhost:27017/bharatfd
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_PASSWORD=
    JWT_SECRET=YOUR_JWT_SECRET
    MAIL_HOST=smtp.gmail.com
    MAIL_USERNAME=YOUR_MAIL_USERNAME
    OAUTH_CLIENTID=YOUR_OAUTH_CLIENTID
    OAUTH_CLIENT_SECRET=YOUR_OAUTH_CLIENT_SECRET
    OAUTH_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
    AZURE_TRANSLATOR_KEY=YOUR_AZURE_TRANSLATOR_KEY
    AZURE_REGION=YOUR_AZURE_REGION
    AZURE_ENDPOINT=YOUR_AZURE_ENDPOINT
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. Access the API at: `http://localhost:8081/api/faqs/`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/faqs/get-faqs` | Fetch all FAQs (default language: English) |
| GET | `/faqs/get-faqs?lang=hi` | Fetch FAQs in Hindi |
| GET | `/faqs/get-faqs?lang=hi` | Fetch FAQs in Bengali |
| GET | `/faqs/get-faq-single/{faqid}` | Get Single FAQ |
| POST | `/faqs/create-faqs` | Create a new FAQ |
| PUT | `/faqs/update-faqs/{faqid}` | Update an FAQ |
| DELETE | `/faqs/delete-faqs/{faqid}` | Delete an FAQ |

Example usage:
```sh
curl http://localhost:8081/api/faqs/?lang=hi
```





### Deployment to Azure
1. Install Azure CLI and log in:
   ```sh
   az login
   ```
2. Create a resource group:
   ```sh
   az group create --name FAQResourceGroup --location eastus
   ```
3. Deploy the app:
   ```sh
   az webapp create --resource-group FAQResourceGroup --plan FAQAppPlan --name multilingual-faq-api --runtime "NODE|16-lts"
   ```
4. Set environment variables on Azure:
   ```sh
   az webapp config appsettings set --name multilingual-faq-api --resource-group FAQResourceGroup --settings MONGO_URI=your_mongodb_uri REDIS_URL=your_azure_redis_url
   ```

---

## Code Quality
- **ESLint Compliance**: Enforced using `eslint`.

## Author
- **Nishant Singh**  
- GitHub: [Nishantsingh9412](https://github.com/Nishantsingh9412/)

---

