import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import confetti from 'canvas-confetti';


import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
	private intervalId: any = null;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();

	}

	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string) {
		return this.http.post<any>(`http://localhost:3000/users/loginMe`, { username, password })
			.pipe(map(user => {

				// login successful if there's a jwt token in the response
				if (user && user.token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
					// Trigger the confetti effect every 500ms
					this.intervalId = setInterval(() => {
						confetti({
							spread: 360,
						});
					}, 500);
				}

				return user;
			}));
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);

		// Clear the interval that triggers the confetti effect
		clearInterval(this.intervalId);
		this.intervalId = null;

	}
}