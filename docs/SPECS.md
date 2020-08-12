# Specification

**Goal:** Create a dockerized web server to manage eFuse users/posts.

**Approximate duration:** ~2 hours

**Language Preference:** nodejs/express

## Requirements

-   Create a new web service that will handle API requests for eFuse.
-   The first API endpoint at `/api/user` will handle the requests for users and store them in a mongodb collection called `users`.
    -   **GET** `/api/user/:userId` - retrieves a user record for the given userId.
    -   **PATCH** `/api/user/:userId` - updates a subset of fields for a given user
    -   **POST** `/api/user` - adds a new user record to the database
-   The second API endpoint at `/api/post` will handle the requests for posts and store them in a mongodb collection called `posts`.

    -   **GET** `/api/post/:postId` - retrieve a user record for the given userId
    -   **GET** `/api/user/:userId/posts` - return posts for a user
    -   **PATCH** `/api/post/:postId` - update a subset of fields for a given post
    -   **POST** `/api/post` - adds a new post record to the database

    NOTE: All `GET` requests should be served from `redis`

-   Create a new dockerized environment using `docker-compose` that starts `redis`, `mongodb`, and runs the `express` web server.
-   The webserver should start and listen on port `5000`

## Entities

### The user object looks like:

```json
{
    "createdAt": Date,
    "email": string,
    "firstName": string,
    "lastName": string,
    "username": string
}
```

### The post object looks like:

```json
{
    "content": string,
    "createdAt": Date,
    "title": string,
    "user": string
}
```
