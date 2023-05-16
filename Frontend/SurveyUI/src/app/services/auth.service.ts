import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserForLogin, UserForRegister } from '../models/user';
//import {u} from '../user-dashboard/user-dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/user/login', user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/useradmin/adduser', user);
  }
  getUser() {
    return this.http.get(this.baseUrl + '/useradmin/getusers');
  }
  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + '/useradmin/deleteUser/' + id);
  }

  updateUser(id: number, data: any) {
    return this.http.put<any>(
      this.baseUrl + '/useradmin/updateuser/' + id,
      data
    );
  }

  getuserid(name: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/useradmin/matchuser/' + name);
  }
}
