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
  buttonDisabled:boolean = false;
  
  ngOnInit(): void {
     this.authService.getAnnouncement().subscribe(result =>{
       console.log(result);
       this.postList = result;
     },(error:any)=>alert("Announcements Cannot be Displayed"));
    console.log(this.postList);
    let admin= localStorage.getItem('isAdmin');

    console.log(admin);
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
