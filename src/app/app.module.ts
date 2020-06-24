import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user/header/header.component';
import { GiftsComponent } from './user/gifts/gifts.component';
import { EventsComponent } from './user/events/events.component';
import { FooterComponent } from './user/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventComponent } from './user/event/event.component';
import { GiftComponent } from './user/gift/gift.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { LoginComponent } from './sign/login/login.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GiftsComponent,
    EventsComponent,
    FooterComponent,
    NotFoundComponent,
    EventComponent,
    GiftComponent,
    ProfileUserComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(/*options*/),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
