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

```
git clone https://github.com/0x7l/promptiFy.git
cd promptiFy
```

2. Install Dependencies

npm install

3. Create .env File

MONGO_URI=mongodb://localhost:27017/promptify
PORT=5000

4. Run the Server
```
npm start
```

Server will start on http://localhost:5000
📚 API Endpoints
🔸 Create a New Prompt

POST /api/prompts

Body (JSON):

{
  "title": "Write about your first memory.",
  "content": "Describe the first memory you remember as a child.",
  "category": "Childhood",
  "tags": ["memory", "early-life"]
}

🔹 Get All Prompts (with optional filters)

GET /api/prompts

Query Params (optional):

    category=Childhood

    tags=memory,early-life

🔎 Get a Prompt by ID

GET /api/prompts/:id

🔁 Update a Prompt

PUT /api/prompts/:id

Body (JSON):

{
  "title": "Updated title",
  "content": "Updated content...",
  "category": "Updated",
  "tags": ["edited", "prompt"]
}

❌ Delete a Prompt

DELETE /api/prompts/:id

🗂️ Folder Structure

.
├── models
│   └── prompt.js         # Mongoose schema
├── controllers
│   └── promptController.js # All CRUD logic
├── routes
│   └── promptRoutes.js     # Express route definitions
├── app.js / server.js   # Entry point
└── .env                 # Mongo URI & other config

🛡️ Error Handling

All routes use try-catch and next(err) to pass errors to Express's default error handler or your custom middleware.
🧪 Future Ideas

    🧠 AI Prompt Recommendations

    📊 Prompt usage analytics

    🔐 JWT Auth for private prompts

    💾 Export prompt sets (JSON, CSV)

📄 License

MIT License — use freely for learning and inspiration.