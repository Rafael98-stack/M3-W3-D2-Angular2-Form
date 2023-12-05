import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  generi = ['uomo', 'donna'];
  userProibiti = ['Pippo', 'Pluto'];

  constructor(private fb: FormBuilder) {}

  validUsername = (formC: FormControl) => {
    if (this.userProibiti.includes(formC.value)) {
      return { usernameProibito: true };
    } else {
      return null;
    }
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      userInfo: this.fb.group({
        username: this.fb.control(null, {
          validators: [Validators.required, this.validUsername],
        }),
        name: this.fb.control(null, {
          validators: [Validators.required, this.validUsername],
        }),
        surname: this.fb.control(null, {
          validators: [Validators.required, this.validUsername],
        }),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      }),
      genere: this.fb.control('donna'),
    });
  }

  getErrorsC(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }

  getFormC(name: string) {
    return this.form.get(name);
  }

  submit() {
    console.log(this.form);
    console.log('Form correttamente inviato');
    this.form.reset();
  }
}
