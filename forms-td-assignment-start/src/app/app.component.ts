import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  subscriptions: string[] = ['basic', 'advanced', 'pro'];
  defaultSubscription = 'advanced';
  data = {
    email: '',
    subscription: '',
    password: ''
  };
  submitted = false;

  ngOnInit(): void {
    console.log('Component Init');
  }

  onSubmit() {
    console.log(this.signupForm);
    this.data.email = this.signupForm.value.email;
    this.data.subscription = this.signupForm.value.subscription;
    this.data.password = this.signupForm.value.password;
    this.submitted = true;
    this.signupForm.reset();
  }
}
