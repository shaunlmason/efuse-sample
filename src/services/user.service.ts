import { v4 as uuidv4 } from 'uuid';

import { HttpException } from '../exceptions/http-exception';
import { IUser } from '../interfaces/user';
import { UserEntity } from '../entities/user.entity';
import UserModel from '../models/user.model';

/* eslint-disable class-methods-use-this */
export class UserService {
    private users = UserModel;

    public async all(): Promise<IUser[]> {
        return this.users.find();
    }

    public async create(user: UserEntity): Promise<IUser> {
        const document = new UserModel(user);

        document._id = uuidv4();
        document.createdAt = new Date();

        return document.save();
    }

    public async delete(id: string): Promise<IUser[]> {
        const user: IUser | null = await this.users.findByIdAndRemove(id);

        if (!user) {
            throw new HttpException(404, 'Unable to delete requested user');
        }

        return [user];
    }

    public async get(id: string): Promise<IUser> {
        const user: IUser | null = await this.users.findById(id);

        if (!user) {
            throw new HttpException(404, 'Unable to find requested user');
        }

        return user;
    }

    public async update(id: string, data: UserEntity): Promise<IUser[]> {
        const user: IUser | null = await this.users.findByIdAndUpdate(id, data);
        const mutation: IUser | null = await this.users.findById(id);

        if (!mutation || !user) {
            throw new HttpException(404, 'Unable to update requested user');
        }

        return [mutation];
    }
}
