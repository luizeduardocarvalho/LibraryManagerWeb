import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateStudent } from 'src/models/create-student';
import { Student } from 'src/models/student';
import { StudentWithTransactions } from 'src/models/student-transactions';
import { UpdateStudentTeacher } from 'src/models/update-student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentsByTeacherWithBookCount(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(
      environment.baseUrl + 'students/studentswithbooks',
      {
        params: { teacherId: teacherId },
      }
    );
  }

  getStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      environment.baseUrl + 'students/getstudentsbyname',
      {
        params: { name: name },
      }
    );
  }

  createStudent(createStudent: CreateStudent) {
    return this.http.post<CreateStudent>(
      environment.baseUrl + 'students',
      createStudent
    );
  }

  getStudentWithTransactionsById(
    studentId: number
  ): Observable<StudentWithTransactions> {
    return this.http.get<StudentWithTransactions>(
      environment.baseUrl + 'students/GetStudentWithTransactionsById',
      {
        params: { studentId: studentId },
      }
    );
  }

  updateStudentTeacher(updateStudentTeacher: UpdateStudentTeacher) {
    return this.http.patch<UpdateStudentTeacher>(
      environment.baseUrl + 'students/updatestudentteacher',
      updateStudentTeacher
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.baseUrl + 'students', {
      params: { id },
    });
  }
}
