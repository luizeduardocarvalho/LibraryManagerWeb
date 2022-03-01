import { ITransaction } from "./ITransaction";

export interface StudentWithTransactions {
    studentId: number;
    studentName: string;
    teacherName: string;
    transactions: ITransaction[];
}