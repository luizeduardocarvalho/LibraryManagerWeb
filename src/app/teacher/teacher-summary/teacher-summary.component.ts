import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LateBook } from 'src/models/late-book';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student.service';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  templateUrl: './teacher-summary.component.html',
  styleUrls: ['./teacher-summary.component.scss'],
})
export class TeachersummaryComponent implements OnInit {
  students: Student[] = [];
  lateBooks: LateBook[] = [];
  teacherId: number = 0;
  searchText: string = '';
  isLoadingLateBookList = false;
  isLoadingStudentList = false;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.isLoadingLateBookList = true;
    this.isLoadingStudentList = true;

    this.route.params.subscribe((params) => {
      this.teacherId = params['id'];
    });

    if (this.teacherId == undefined) {
      this.teacherId = JSON.parse(localStorage.getItem('user') as string).id;
    }


    this.studentService
      .getStudentsByTeacherWithBookCount(this.teacherId)
      .subscribe((students: Student[]) => {
        this.students = students;
        this.isLoadingStudentList = false;
      });

    this.transactionService
      .getLateBooks(this.teacherId)
      .subscribe((lateBooks: LateBook[]) => {
        this.lateBooks = lateBooks;
        this.isLoadingLateBookList = false;
      });
  }
}
