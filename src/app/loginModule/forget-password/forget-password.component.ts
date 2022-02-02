import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModuleService } from '../login-module.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup;
  displayStyle = "none";

  constructor(fb: FormBuilder,private loginModuleService:LoginModuleService,private router : Router) {
    this.forgetpassForm = fb.group({
      email : new FormControl('',[Validators.required]),
    });
  }

  get getformControl(){
    return this.forgetpassForm.controls
  }

  ngOnInit(): void {
  }

  openModal() {
    this.displayStyle = "block";
  }

  submitForm(){

    const data={
      email : this.forgetpassForm.get('email')?.value
    } 

    this.loginModuleService.forgetPassword(data).subscribe((response) => {
      console.log(response)
    },
    (error: any) => {
      console.log(error)
    }
  );
  }

  cancelForm(){
    this.forgetpassForm.reset()
  }
}
