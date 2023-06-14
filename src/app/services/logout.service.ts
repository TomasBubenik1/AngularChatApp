import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {
  private logoutTime: Date | null = null;

  setLogoutTime(time: Date): void {
    this.logoutTime = time;
  }

  getLogoutTime(): Date | null {
    return this.logoutTime;
  }
}
