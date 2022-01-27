import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from 'src/models/teacher';
import { HttpHeaders } from '@angular/common/http';
import { ErrorHandlerHelper } from './error-handler';
import { baseUrl } from 'settings';
import { TeacherWithStudents } from 'src/models/teacher-students';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(baseUrl + 'teachers');
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(baseUrl + 'teachers', teacher, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }
  
  getTeacherReport(): Observable<TeacherWithStudents[]> {
    return this.http.get<TeacherWithStudents[]>(baseUrl + 'teachers/teacherreport');
  }
}
