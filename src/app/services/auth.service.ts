import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.url}`, credentials);
  }
}
