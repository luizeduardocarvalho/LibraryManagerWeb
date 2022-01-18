import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from 'src/models/teacher';
import { HttpHeaders } from '@angular/common/http';
import { ErrorHandlerHelper } from './error-handler';

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

	baseUrl = 'https://librarymanager-api.herokuapp.com/';

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl + 'teachers');
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.baseUrl + 'teachers', teacher, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }
  
}
