import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from 'src/models/teacher';
import { TeacherWithStudents } from 'src/models/teacher-students';
import { UpdateTeacher } from 'src/models/teachers/update-teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(environment.baseUrl + 'teachers');
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(environment.baseUrl + 'teachers', teacher);
  }

  getTeacherReport(): Observable<TeacherWithStudents[]> {
    return this.http.get<TeacherWithStudents[]>(
      environment.baseUrl + 'teachers/teacherreport'
    );
  }

  delete(id: number) {
    return this.http.delete(environment.baseUrl + 'teachers/delete', {
      params: { id },
    });
  }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(environment.baseUrl + 'teachers/getbyid', {
      params: { id },
    });
  }

  updateTeacher(updateTeacher: UpdateTeacher) {
    return this.http.patch<UpdateTeacher>(
      environment.baseUrl + 'teachers/update',
      updateTeacher
    );
  }
}
