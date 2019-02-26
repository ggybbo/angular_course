import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  formstatus = ['Stable', 'Critical', 'Finished'];
  forbiddenNames = 'Test';

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      projectData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          this.forbiddenName.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        )
      }),
      status: new FormControl('Stable')
    });
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (control.value === this.forbiddenNames) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          reject(null);
        }
      }, 2000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
