import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {

  notificationForm:FormGroup;
  selectedFile: File=null;
  constructor(private router:Router,private authService:AuthServiceService,private fb:FormBuilder) { 
    this.notificationForm = this.fb.group({
      title:[''],
      description:[''],
      details:[''],
      link:[''],
      image:[''],
      tags:['']
    })
  }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.selectedFile =<File> event.target.files[0];
  }
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  Back(){
    this.router.navigateByUrl('/admin');
  }

  PreviousNotifications(){
    this.router.navigateByUrl('/admin');
  }
  getTags(){
    this.authService.getTags().subscribe( result =>{
        console.log(result)
    },(error:any)=>alert("Invalid Username Or Password"))

  }
  postAnnouncement(){
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    fd.append('title',this.notificationForm.get('title').value);
    fd.append('description',this.notificationForm.get('description').value);
    fd.append('details',this.notificationForm.get('details').value);
    fd.append('link',this.notificationForm.get('link').value);
    fd.append('tags',this.notificationForm.get('tags').value);
    console.log(fd);
    if(this. notificationForm.valid){
      console.log('Post Announcement Called');
      console.log(this.notificationForm.value);
      this.authService.postAnnouncement(fd).subscribe( result =>{
        console.log(result);
      },(error:any)=>alert("Error in sending Annnouncement"))
    }
  }
}
