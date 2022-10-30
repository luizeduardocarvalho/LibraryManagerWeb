import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LateBook } from 'src/models/late-book';
import { Transaction } from 'src/models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getLateBooks(teacherId: number): Observable<LateBook[]> {
    return this.http.get<LateBook[]>(
      environment.baseUrl + 'transactions/getlatebooks',
      {
        params: { teacherId },
      }
    );
  }

  getTransactionsWithDetailsByStudent(
    studentId: number
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      environment.baseUrl + 'transactions/gettransactionswithdetailsbystudent',
      {
        params: { studentId },
      }
    );
  }
}
