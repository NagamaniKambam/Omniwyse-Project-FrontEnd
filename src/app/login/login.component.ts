import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  constructor(private authService:AuthServiceService, private router:Router) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe( result =>{
        
        if(result){
          localStorage.setItem('token',result.token);
          localStorage.setItem('name',result.name);
          localStorage.setItem('isAdmin',result.isAdmin);
          localStorage.setItem('id',result.id);
          this.router.navigate(['/admin']);
         // alert("welcome Admin "+result.name);
        }
      },(error:any)=>alert("Invalid Username Or Password"))
    }
  }
}
