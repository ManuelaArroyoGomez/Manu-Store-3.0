import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './../services/token.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password:string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap(response => this.tokenService.saveToken(response.acess_token))
    );
  }

  getProfiel() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profiel`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type:' 'aplication/json'
      // }
    });
  }

  loginAndGet (email: string, password:string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfiel()),
    )
  }
}
