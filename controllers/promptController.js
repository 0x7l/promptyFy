const Prompt = require('../models/promptModel');
const logger = require('../utils/logger');

const createPrompt = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const prompt = await Prompt.create({ title, content, category, tags });
        res.status(201).json(prompt);
    } catch (err) {
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
        res.json(prompts);
    } catch (err) {
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
        res.json({ message: 'Prompt deleted' });
    } catch (err) {
        next(err);
    }
};

const deletePrompt = async (req, res, next) => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        res.json({ message: 'Prompmt deleted' });
    } catch (err) {
        next(err);
    }
};

const getPromptById = async (req, res, next) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        res.json(prompt);
    } catch (err) {
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