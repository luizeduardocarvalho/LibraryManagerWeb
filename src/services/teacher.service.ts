import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from 'src/models/teacher';
import { HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'settings';
import { TeacherWithStudents } from 'src/models/teacher-students';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `${this.tokenService.getToken()}`
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(baseUrl + 'teachers', this.httpOptions);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(baseUrl + 'teachers', teacher, this.httpOptions);
  }
  
  getTeacherReport(): Observable<TeacherWithStudents[]> {
    return this.http.get<TeacherWithStudents[]>(baseUrl + 'teachers/teacherreport', this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(baseUrl + 'teachers/delete', 
    {
      params: { 'id': id },
      headers: this.httpOptions.headers
    });
  }
}
