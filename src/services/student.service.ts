import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Student } from 'src/models/student';
import { CreateStudent } from 'src/models/create-student';
import { baseUrl } from 'settings';
import { StudentWithTransactions } from 'src/models/student-transactions';
import { UpdateStudentTeacher } from 'src/models/update-student';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.tokenService.getToken()}`
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getStudentsByTeacherWithBookCount(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl + 'students/studentswithbooks',
      {
        params: { 'teacherId': teacherId },
        headers: this.httpOptions.headers
      });
  }

  getStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl + 'students/getstudentsbyname',
      { 
        params: { 'name': name },
        headers: this.httpOptions.headers
      });
  }

  createStudent(createStudent: CreateStudent) {
    return this.http.post<CreateStudent>(baseUrl + 'students', createStudent, this.httpOptions);
  }

  getStudentWithTransactionsById(studentId: number): Observable<StudentWithTransactions> {
    return this.http.get<StudentWithTransactions>(baseUrl + 'students/GetStudentWithTransactionsById',
      {
        params: { 'studentId': studentId },
        headers: this.httpOptions.headers
      });
  }

  updateStudentTeacher(updateStudentTeacher: UpdateStudentTeacher) {
    return this.http.patch<UpdateStudentTeacher>(baseUrl + 'students/updatestudentteacher', updateStudentTeacher, this.httpOptions);
  }
}
