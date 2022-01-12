import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Student } from 'src/models/student';

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
}
