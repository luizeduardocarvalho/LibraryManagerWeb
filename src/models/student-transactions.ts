import { ITransaction } from "./ITransaction";

export interface StudentWithTransactions {
    studentId: number;
    studentName: string;
    transactions: ITransaction[];
}