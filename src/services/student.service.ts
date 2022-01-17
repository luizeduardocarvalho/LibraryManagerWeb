import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Student } from 'src/models/student';
import { CreateStudent } from 'src/models/create-student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

	baseUrl = 'https://localhost:5001/';

  getStudentsByTeacherWithBookCount(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(
        this.baseUrl + 'students/studentswithbooks', 
        {
            params: {
                'teacherId': teacherId
            }
        });
  }

  getStudentsByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      this.baseUrl + 'students/getstudentsbyname', 
      {
          params: {
              'name': name
          }
      });
  }

  createStudent(createStudent: CreateStudent) {
    return this.http.post<CreateStudent>(this.baseUrl + 'students', createStudent);
  }
}
