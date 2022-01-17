import { Transaction } from "./transaction";

export class BookDetails {
    bookId: number;
    title: string;
    description: string;
    transactions: Transaction[];

    constructor(bookId: number, title: string, description: string, transactions: Transaction[]) {
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.transactions = transactions;
    }
    
    public setTransaction(transaction: Transaction): void {
        this.transactions[0] = transaction;
    }
};
