const Prompt = require('../models/promptModel');
const logger = require('../utils/logger');

const createPrompt = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const prompt = await Prompt.create({ title, content, category, tags });
        logger.info(`Prompt created: ${prompt._id}`);
        res.status(201).json(prompt);
    } catch (err) {
        logger.error(`Error creating prompt: ${err.message}`);
        next(err);
    }
};

const getPrompts = async (req, res) => {
    try {
        const { category, tags } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (tags) filter.tags = { $all: tags.split(',')};
        const prompts = await Prompt.find(filter).sort({ createdAt: -1 });
        logger.info(`Fetched ${prompts.length} prompts`);
        res.json(prompts);
    } catch (err) {
        logger.error(`Error fetching prompts: ${err.message}`);
        next(err);
    }
};

const updatePrompt = async (req, res, next) => {
    try {
        const { title, content, category, tags } = req.body;
        const prompt = await Prompt.findByIdAndUpdate(
            req.params.id,
            { title, content, category, tags },
            { new: true, runValidators: true }
        );
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        logger.info(`Prompt updated: ${prompt._id}`);
        res.json({ message: 'Prompt deleted' });
    } catch (err) {
        logger.error(`Error updating prompt: ${err.message}`);
        next(err);
    }
};

const deletePrompt = async (req, res, next) => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        logger.info(`Prompt deleted: ${prompt._id}`);
        res.json({ message: 'Prompmt deleted' });
    } catch (err) {
        logger.error(`Error deleting prompt: ${err.message}`);
        next(err);
    }
};

const getPromptById = async (req, res, next) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        logger.info(`Fetched prompt: ${prompt._id}`);
        res.json(prompt);
    } catch (err) {
        logger.error(`Error fetching prompt: ${err.message}`);
        next(err);
    }
}

module.exports = {
    createPrompt,
    getPrompts,
    updatePrompt,
    deletePrompt,
    getPromptById
}