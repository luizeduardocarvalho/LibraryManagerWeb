import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from 'src/models/book-details';
import { Transaction } from 'src/models/transaction';
import { BookService } from 'src/services/book.service';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

  transactions: Transaction[] = [];
  studentId: number = 0;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id']
    });

    this.transactionService
      .getTransactionsWithDetailsByStudent(this.studentId)
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
    });
  }

}
