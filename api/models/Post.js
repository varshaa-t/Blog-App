import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
})

export const PostModel = new mongoose.model('Post', postSchema);