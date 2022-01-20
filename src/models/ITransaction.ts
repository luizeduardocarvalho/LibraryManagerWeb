export interface ITransaction {
    transactionId: number;
    studentName: string;
    creationDate: Date;
    bookTitle: string;
    bookId: number;
    returnedAt: Date;
    returnDate: Date;
    isLate: boolean;
}