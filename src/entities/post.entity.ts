import { IsString } from 'class-validator';

export class PostEntity {
    @IsString()
    public user: string;

    @IsString()
    public title: string;

    @IsString()
    public content: string;

    constructor(user: string, title: string, content: string) {
        this.user = user;
        this.content = content;
        this.title = title;
    }
}
