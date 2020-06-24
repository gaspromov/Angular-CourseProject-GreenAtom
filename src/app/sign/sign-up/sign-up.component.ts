import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/shared/services/auth/fire-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreAuthService } from 'src/app/shared/services/auth/firestore-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;
  step = 0;

  constructor(
    public auth: FireAuthService,
    public firestoreAuth: FirestoreAuthService
  ) {
   }

  ngOnInit(): void {
    let disabled = false;
    this.formSignUp = new FormGroup({
      name: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      surname: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      phone: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      profession: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      about: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      email: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      password: new FormControl({ value: '', disabled: disabled }, [Validators.required]),
      bonuses: new FormControl({ value: 200, disabled: disabled })
    })
  }

  async signup(){
    await this.auth.signup(this.formSignUp.value);
    this.formSignUp.value.password = '';
    await this.firestoreAuth.createUser(this.formSignUp.value)
  }

  stepN(num: number){
    this.step += num;
  }

}
