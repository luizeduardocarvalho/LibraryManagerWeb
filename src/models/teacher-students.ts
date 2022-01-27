import { StudentWithTransactions } from "./student-transactions";

export interface TeacherWithStudents {
    teacherId: number;
    teacherName: string;
    students: StudentWithTransactions[];
}