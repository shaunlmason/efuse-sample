import { v4 as uuidv4 } from 'uuid';

import { HttpException } from '../exceptions/http-exception';
import { IPost } from '../interfaces/post';
import { PostEntity } from '../entities/post.entity';
import PostModel from '../models/post.model';

export class PostService {
    private posts = PostModel;

    public async all(): Promise<IPost[]> {
        return PostModel.find();
    }

    public async create(post: PostEntity): Promise<IPost> {
        const document = new PostModel(post);

        document._id = uuidv4();
        document.createdAt = new Date();

        return document.save();
    }

    public async delete(id: string): Promise<IPost[]> {
        const post: IPost | null = await this.posts.findByIdAndRemove(id);

        if (!post) {
            throw new HttpException(404, 'Unable to delete requested post');
        }

        return [post];
    }

    public async findByUserId(userId: string): Promise<IPost[]> {
        const posts: IPost[] = await this.posts.find({ user: userId });

        console.log(posts);

        return posts;
    }

    public async get(id: string): Promise<IPost> {
        const post: IPost | null = await this.posts.findById(id);

        if (!post) {
            throw new HttpException(404, 'Unable to find requested post');
        }

        return post;
    }

    public async update(id: string, data: PostEntity): Promise<IPost[]> {
        const post: IPost | null = await this.posts.findByIdAndUpdate(id, data);
        const mutation: IPost | null = await this.posts.findById(id);

        if (!mutation || !post) {
            throw new HttpException(404, 'Unable to update requested post');
        }

        return [mutation];
    }
}
