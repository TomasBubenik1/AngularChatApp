import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HlavnastrankaComponent } from './hlavnastranka/hlavnastranka.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MatNativeDateModule } from '@angular/material/core';
import { InfoComponent } from './info/info/info.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HlavnastrankaComponent,
    InfoComponent,
    InfoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
