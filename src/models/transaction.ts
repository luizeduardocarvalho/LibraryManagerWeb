export class Transaction {
    transactionId: number;
    studentName: string;
    creationDate: Date;
    bookTitle: string;
    bookId: number;
    returnedAt: Date;
    returnDate: Date;

  constructor(
    transactionId: number, 
    studentName: string, 
    creationDate: Date, 
    returnedAt: Date,
    returnDate: Date,
    bookId: number = 0,
    bookTitle: string = '') {
    this.transactionId = transactionId
    this.studentName = studentName
    this.creationDate = creationDate
    this.returnedAt = returnedAt
    this.returnDate = returnDate
    this.bookId = bookId;
    this.bookTitle = bookTitle;
  }
}