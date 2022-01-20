import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Student } from 'src/models/student';
import { CreateStudent } from 'src/models/create-student';
import { baseUrl } from 'settings';
import { StudentWithTransactions } from 'src/models/student-transactions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentsByTeacherWithBookCount(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl + 'students/studentswithbooks',
      {
        params: {
          'teacherId': teacherId
        }
      });
  }

  getStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl + 'students/getstudentsbyname',
      {
        params: {
          'name': name
        }
      });
  }

  createStudent(createStudent: CreateStudent) {
    return this.http.post<CreateStudent>(baseUrl + 'students', createStudent);
  }

  getStudentWithTransactionsById(studentId: number): Observable<StudentWithTransactions> {
    return this.http.get<StudentWithTransactions>(baseUrl + 'students/GetStudentWithTransactionsById',
      {
        params: {
          'studentId': studentId
        }
      });
  }
}
