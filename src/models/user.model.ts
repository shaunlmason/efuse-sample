import mongoose from 'mongoose';

import { IUser } from '../interfaces/user';

const schema = new mongoose.Schema({
    _id: String,
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String,
    username: String
});

const UserModel = mongoose.model<IUser & mongoose.Document>('User', schema);

export default UserModel;
