import { Injectable, NgZone } from '@angular/core';
import { auth } from  'firebase/app';
import { User } from "../../user";
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  userData: any;
  userApi: any = {};
  userDat: any = {};
  public confirm = 'no';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) { 
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        localStorage.removeItem('userData');
        // this.router.navigate(['unsign/home'])
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }



  async login(email, password) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        this.ngZone.run( () => {
          window.location.reload();
        });
            const userData: User = {
              uid: result.user.uid,
              email: result.user.email,
              emailVerified: result.user.emailVerified
            }
      
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Sign up with email/password
  async signup(data) {
      return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail(data);
        const userData: User = {
          uid: result.user.uid,
          email: result.user.email,
          emailVerified: result.user.emailVerified
        }
      }).catch((error) => {
        window.alert(error.message)
      })
    
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail(data) {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(async () => {
      if (data !==''){
        this.confirm = 'true';
      }
    })
    .catch(() => {
      this.confirm = 'false';
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      return true;
    }).catch((error) => {
      return false;
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      this.router.navigate(['/events']);
    })
  }

  async updateUserPassword(password) {
     return (await this.afAuth.currentUser).updatePassword(password).then(function() {
      return 'good'
    }).catch(function(error) {
      return 'bad'
    });
  }



  // async login(email: string, password: string) {
  //   var result = await this.afAuth.signInWithEmailAndPassword(email, password)
  //   this.router.navigate(['list']);
  // }

  // async signup(email: string, password: string) {
  //   var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  //   this.sendEmailVerification();
  // }

  // async sendEmailVerification() {
  //   await (await this.afAuth.currentUser).sendEmailVerification().then(function() {
  //       window.alert('thats good')
  //   }).catch(function(error) {
  //     window.alert('not good')
  //   });
  //   this.router.navigate(['verify-email']);
  // }

  // async sendPasswordResetEmail(passwordResetEmail: string) {
  //   return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  // }

  // async logout(){
  //   await this.afAuth.signOut();
  //   localStorage.removeItem('user');
  //   this.router.navigate(['login']);
  // }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

}
