const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// POST /api/prompts - Create a new prompt
router.post('/', promptController.createPrompt);

// GET /api/prompts - Get all prompts with optional filters
router.get('/', promptController.getPrompts);

// GET /api/prompts/:id - Get a specific prompt by ID
router.get('/:id', promptController.getPromptById);

// PUT /api/prompts/:id - Update a specific prompt by ID
router.put('/:id', promptController.updatePrompt);

// DELETE /api/prompts/:id - Delete a specific prompt by ID
router.delete('/:id', promptController.deletePrompt);

module.exports = router;