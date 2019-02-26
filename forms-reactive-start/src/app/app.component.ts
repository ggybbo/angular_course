import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ) // 초기값, Angular Validator, Async Validator(another Validator)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe(value => {
      console.log(value);
    });
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'ggybbo',
    //     email: 'ggybbo@naver.com'
    //   },
    //   gender: 'male',
    //   hobbies: ['programming']
    // });
    this.signupForm.patchValue({
      userData: {
        username: 'ggybbo'
      }
    });
  }

  onAddHobby() {
    const control = new FormControl(null);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    // return { nameIsForbidden: false };
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log(control.value);
        if (control.value === 'ggybbo@naver.com') {
          resolve({ emailIsForbidden: true });
        } else {
          reject(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      gender: 'male'
    });
  }
}
