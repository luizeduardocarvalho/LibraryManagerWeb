import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LendBook } from 'src/models/lend-book';
import { Student } from 'src/models/student';
import { BookService } from 'src/services/book.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss'],
})
export class LendBookComponent implements OnInit {
  searchText: string = '';
  students: Student[] = [];
  bookId: number = 0;
  error: boolean = false;
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: Location,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
  }

  onSearch(searchText: string) {
    this.studentService
      .getStudentsByName(searchText)
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  onLend(studentId: number) {
    this.isLoading = true;
    let lendBook = new LendBook(studentId, this.bookId);
    this.bookService.lendBook(lendBook).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.router.navigate(['books', this.bookId]).then(() => {
          this.toastrService.success('The book has been lent.', 'Success!');
        });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }
}
