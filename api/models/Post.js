import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {type:Schema.Types.ObjectId, ref:'User'}
}, {
    timestamps: true,
})

export const PostModel = new mongoose.model('Post', postSchema);