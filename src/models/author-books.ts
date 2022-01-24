import { Book } from 'src/models/book';

export interface AuthorWithBooks {
    authorId: number;
    name: string;
    books: Book[];
}