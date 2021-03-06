import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  public postList: any = [];
  
  constructor(private authService: AuthServiceService, private router: Router) { }
  buttonDisabled:boolean = true;
  name:String ='';
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    var  admin=localStorage.getItem('isAdmin');
    console.log(admin);
    if(admin === 'true'){
      this.buttonDisabled=false;
      this.authService.getAnnouncement().subscribe(result =>{
        console.log(result);
        this.postList = result;
      },(error:any)=>alert("Announcements Cannot be Displayed"));
     console.log(this.postList);

    }else{
      var userid = localStorage.getItem('id');
      var tags;
      this.authService.getTagsByUserId(userid).subscribe(result=>{
        console.log(result);
         tags = JSON.stringify(result);
       
      })
      setTimeout(()=>{
        this.authService.getAnnouncementByTags(tags).subscribe(announcements=>{
          this.postList = announcements;
          console.log(announcements)
        })
      },1000)
      

    }

  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }
  admin(){
    this.router.navigateByUrl('/createnotification');
  }
  goToNotificationView(notificationId:String) {
    this.router.navigate(['/admin',notificationId]);
  }

}
