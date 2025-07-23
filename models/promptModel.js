// models/promptModel.js
const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
promptSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;