import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedInUser: User = JSON.parse(
    localStorage.getItem('loggedInUser') || '{}'
  ) as User;

  get loggedInUser(): User {
    return this._loggedInUser;
  }
  private baseUrl = 'https://dummyjson.com';

  set loggedInUser(user: User) {
    this._loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  constructor(private Http: HttpClient) { }



  data: Observable<Usata> = new Observable((subscriber) => {
    this.Http.get<Usata>('https://dummyjson.com/users').subscribe(
      (data: Usata) => {
        subscriber.next(data);
      }
    );
  });



  users: Observable<User> = new Observable((subscriber) => {
    this.data.subscribe((data: Usata) => {
      data.users.map((user: User) => {
        subscriber.next(user);
      });
    });
  });
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
  showDetails?: boolean;
}
export interface Usata {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface Igendereize {
  count: number;
  gender: string;
  name: string;
  probability: number;
}

export interface IZippo {
post_code: number, country: string, country_abbreviation: string, places: {place_name: string, longitude: number, state: string, state_abbreviation: string, latitude: number }}