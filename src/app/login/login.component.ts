import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usata, UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  firstName: string = '';
  lastName: string = '';
  loginTime: Date | undefined;

  constructor(private router: Router, private userservice: UserService) { }
  

  LoginUser() {
    const loginTime = new Date();
    // Check if firstName and lastName match the corresponding properties in data
    this.userservice.data.subscribe((data: Usata) => {
      const foundUser = data.users.find(user => user.firstName === this.firstName && user.lastName === this.lastName);
      if (foundUser) {
        this.loginTime = new Date();
        localStorage.setItem('loginTime', loginTime.toISOString());
        // Navigate to homepage if user is found
        this.userservice.loggedInUser = foundUser;
        this.router.navigate(['/hlavnastranka',loginTime]);
        
      } else {
        // Display error message if user is not found
        alert('User not found!');
      }
    });
  }

  fetchData(): void {
    const url = 'https://dummyjson.com/users';
    const observable = new Observable(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });

    observable.pipe(
      map((data: any) => {
        return data;
      })
    ).subscribe();
  }

  ngOnInit() {
    this.fetchData();
    this.userservice.data.subscribe((data: Usata) => console.log(data))
  }
}
