import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICard } from 'src/models/shared/card';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student.service';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  studentCards: ICard[] = [];
  searchText: string = '';
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['name'];
    });

    this.search(this.searchText);
  }

  search(searchText: any) {
    this.isLoading = true;
    this.studentService
      .getStudentsByName(searchText)
      .subscribe((students: Student[]) => {
        this.studentCards = students.map((student) => ({
          id: student.studentId.toString(),
          name: student.name,
          bodyContent: [],
          buttons: [
            {
              actionUrl: `${student.studentId}`,
              icon: 'user',
              label: 'Info',
            },
            {
              actionUrl: `${student.studentId}/update`,
              icon: 'edit',
              label: 'Edit',
            },
          ],
        }));

        this.isLoading = false;
      });
  }
}
