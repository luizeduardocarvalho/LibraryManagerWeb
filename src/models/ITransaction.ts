export interface ITransaction {
    transactionId: number;
    studentName: string;
    creationDate: Date;
    bookTitle: string;
    bookId: number;
    bookReference: number;
    returnedAt: Date;
    returnDate: Date;
    isLate: boolean;
}