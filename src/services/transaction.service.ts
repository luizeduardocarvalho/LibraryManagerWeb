import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LateBook } from 'src/models/late-book';
import { Transaction } from 'src/models/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

	baseUrl = 'https://localhost:5001/';

  getLateBooks(): Observable<LateBook[]> {
    return this.http.get<LateBook[]>(
        this.baseUrl + 'transactions/getlatebooks');
  }

  getTransactionsWithDetailsByStudent(studentId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/gettransactionswithdetailsbystudent', 
    {
      params: {
        'studentId': studentId
      }
    })
  }
}
