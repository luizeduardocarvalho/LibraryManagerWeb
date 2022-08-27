import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentWithTransactions } from 'src/models/student-transactions';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {
  student?: StudentWithTransactions;
  studentId: number = 0;
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
    });

    this.studentService
      .getStudentWithTransactionsById(this.studentId)
      .subscribe((student: StudentWithTransactions) => {
        this.student = student;
        this.isLoading = false;
      });
  }

  onBack() {
    this.location.back();
  }
}
