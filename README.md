# 🧠 PromptiFy - Prompt Management API

A simple RESTful API to manage creative writing prompts using **Node.js**, **Express**, and **MongoDB** via **Mongoose**.

---

## 📦 Features

- ✅ Create new prompt entries
- 📥 Read all prompts (with filters)
- 🔍 Get prompt by ID
- 🔁 Update existing prompts
- ❌ Delete prompt
- 🏷️ Optional filtering via `category` and `tags`

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv (for environment config)

---

## 🚀 Setup Instructions

### 1. Clone the Repo

`
git clone https://github.com/0x7l/promptiFy.git

cd promptiFy
`

2. Install Dependencies

`
npm install mongoose dotenv winston express
`

3. Run the Server


`
npm start
`

Server will start on http://localhost:5000

**API Endpoints**

Method	Endpoint	Description

GET	/api/v1/prompts	Get all prompts

POST	/api/v1/prompts	Create new prompt
`
// Sample API Request
{
  "title": "Blog Outline Generator",
  "content": "Generate a detailed blog outline about TOPIC with...",
  "category": "writing",
  "tags": ["blogging", "content-creation"]
}
`
GET	/api/v1/prompts/:id	Get single prompt

PUT	/api/v1/prompts/:id	Update prompt

DELETE	/api/v1/prompts/:id	Delete prompt


📄 License

MIT License — use freely for learning and inspiration.