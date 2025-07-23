const Prompt = require('../models/promptModel');

// Input validation middleware
const validatePromptInput = (req, res, next) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ 
            message: 'Title and content are required' 
        });
    }
    
    if (title.length > 100) {
        return res.status(400).json({ 
            message: 'Title must be less than 100 characters' 
        });
    }
    
    next();
};

// Check if prompt exists
const checkPromptExists = async (req, res, next) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) {
            return res.status(404).json({ message: 'Prompt not found' });
        }
        req.prompt = prompt; // Attach prompt to request for later use
        next();
    } catch (err) {
        next(err);
    }
};

// Verify prompt ownership
const verifyPromptOwnership = async (req, res, next) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        
        if (!prompt) {
            return res.status(404).json({ message: 'Prompt not found' });
        }
        
        // Assuming you have user authentication and prompt has an 'author' field
        if (prompt.author.toString() !== req.user.id) {
            return res.status(403).json({ 
                message: 'You are not authorized to modify this prompt' 
            });
        }
        
        next();
    } catch (err) {
        next(err);
    }
};

// Process tags middleware
const processTags = (req, res, next) => {
    if (req.body.tags) {
        // Convert string tags to array if needed and remove duplicates
        if (typeof req.body.tags === 'string') {
            req.body.tags = [...new Set(req.body.tags.split(',').map(tag => tag.trim()))];
        } else if (Array.isArray(req.body.tags)) {
            req.body.tags = [...new Set(req.body.tags.map(tag => tag.trim()))];
        }
    }
    next();
};

// Pagination middleware
const paginateResults = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    req.pagination = {
        page,
        limit,
        skip
    };

    next();
};

module.exports = {
    validatePromptInput,
    checkPromptExists,
    verifyPromptOwnership,
    processTags,
    paginateResults
};