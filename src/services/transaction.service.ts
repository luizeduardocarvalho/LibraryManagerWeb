import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LateBook } from 'src/models/late-book';
import { Transaction } from 'src/models/transaction';
import { baseUrl } from 'settings';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `${this.tokenService.getToken()}`
    })
  };
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getLateBooks(): Observable<LateBook[]> {
    return this.http.get<LateBook[]>(baseUrl + 'transactions/getlatebooks', this.httpOptions);
  }

  getTransactionsWithDetailsByStudent(studentId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(baseUrl + 'transactions/gettransactionswithdetailsbystudent', 
    {
      params: { 'studentId': studentId },
      headers: this.httpOptions.headers
    })
  }
}
