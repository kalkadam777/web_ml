// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   private apiUrl = 'http://127.0.0.1:8000/api';
//   private currentUserSubject: BehaviorSubject<any>;

//   constructor(private http: HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
//   }

//   public get currentUserValue() {
//     return this.currentUserSubject.asObservable();
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post<any>(${this.apiUrl}/login/, { username, password }).pipe(
//       map(response => {
//         const user = {
//           token: response.token,
//           username: username
//         };
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         this.currentUserSubject.next(user);
//         return user;
//       })
//     );
//   }

//   logout() {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }
// }
