import { Location, LocationStrategy } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LendBook } from 'src/models/lend-book';
import { Student } from 'src/models/student';
import { BookService } from 'src/services/book.service';
import { StudentService } from 'src/services/student.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss']
})
export class LendBookComponent implements OnInit {

  searchText: string = '';
  students: Student[] = [];
  bookId: number = 0;
  error: boolean = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: LocationStrategy,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id']
    });
  }

  onSearch(searchText: string) {
    this.studentService.getStudentsByName(searchText).subscribe((students: Student[]) => {
      this.students = students;
    });
  }


  onLend(studentId: number) {
    let lendBook = new LendBook(studentId, this.bookId);
    this.bookService.lendBook(lendBook).subscribe(
      err => console.log(err),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        }
        else {
          this.redirect('Success!', 'The book has been lent', this.error);
        }
      });
    this.router.navigate(['books', this.bookId]);
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/books']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
