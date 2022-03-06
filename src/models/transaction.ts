import { ITransaction } from "./ITransaction";

export class Transaction implements ITransaction {
    transactionId: number;
    studentName: string;
    creationDate: Date;
    bookTitle: string;
    bookId: number;
    bookReference: number;
    returnedAt: Date;
    returnDate: Date;
    isLate: boolean

  constructor(
    transactionId: number, 
    studentName: string, 
    creationDate: Date, 
    returnedAt: Date,
    bookReference: number,
    returnDate: Date,
    bookId: number = 0,
    bookTitle: string = '',
    isLate: boolean) {
    this.transactionId = transactionId
    this.studentName = studentName
    this.creationDate = creationDate
    this.bookReference = bookReference;
    this.returnedAt = returnedAt
    this.returnDate = returnDate
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.isLate = isLate;
  }
}