import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, CreateProductDTO } from './../models/user.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products/users';

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateProductDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll(dato: CreateProductDTO) {
    return this.http.get<User[]>(this.apiUrl);
  }

}
