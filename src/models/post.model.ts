import mongoose from 'mongoose';

import { IPost } from '../interfaces/post';

const schema = new mongoose.Schema({
    _id: String,
    content: String,
    createdAt: Date,
    title: String,
    user: String
});

const PostModel = mongoose.model<IPost & mongoose.Document>('Post', schema);

export default PostModel;
