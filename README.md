# Gemini Express TypeScript API

A RESTful API built with Express.js and TypeScript that integrates with Google Gemini 1.5 Flash for text generation. Includes request validation, rate limiting, and robust error handling.

## Features

- Express.js with TypeScript
- Google Gemini 1.5 Flash text generation
- Zod schema validation for requests
- Rate limiting (3 requests per minute per IP)
- CORS and security headers (Helmet)
- Centralized error handling

## Requirements

- Node.js v18 or higher
- npm
- Google Gemini API Key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/raflytch/gemini-express
cd gemini-express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

#### 1. Check API Status

- **GET** `/`
- **Response:**
  ```json
  { "message": "API is running" }
  ```

#### 2. Generate Content

- **POST** `/generate/content`
- **Request Body:**
  ```json
  { "prompt": "Write a short story about a robot learning to paint" }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "data": "In the year 2085, a maintenance robot designated RT-47..."
  }
  ```
- **Validation Error (400):**
  ```json
  {
    "success": false,
    "message": "Validation error",
    "errors": [{ "field": "prompt", "message": "Prompt cannot be empty" }]
  }
  ```
- **Rate Limit Error (429):**
  ```json
  {
    "status": 429,
    "success": false,
    "message": "Too many requests, please try again after a minute"
  }
  ```
- **Internal Error (500):**
  ```json
  {
    "success": false,
    "message": "Failed to generate content: ..."
  }
  ```

### Rate Limiting

- Maximum 3 requests per minute per IP for `/generate/content`.

## Example Usage

### cURL

```bash
curl -X POST http://localhost:3000/api/v1/generate/content \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a short poem about technology"}'
```

## Project Structure

```
├── src/
│   ├── common/types/generate.type.ts
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── validator/
├── .env
├── package.json
├── tsconfig.json
├── README.md
```
