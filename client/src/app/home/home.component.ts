import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	currentUser: any;
	currentUserSubscription: Subscription;
	users: any;
	// showConfetti = false;

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	ngOnInit() {
		this.loadAllUsers();
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.currentUserSubscription.unsubscribe();
	}

	deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.users = this.users.filter(user => user._id !== id);
    });
}

	private loadAllUsers() {
		this.userService.getAll().pipe(first()).subscribe(users => {
			this.users = users;
		});
	}
}