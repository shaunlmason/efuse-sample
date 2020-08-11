import { IsEmail, IsString } from 'class-validator';

export class UserEntity {
    @IsEmail()
    public email: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public username: string;

    constructor(first: string, last: string, email: string, username: string) {
        this.email = email;
        this.firstName = first;
        this.lastName = last;
        this.username = username;
    }
}
