import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {

  notification:any;
  constructor(private route:ActivatedRoute,private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.authService.getAnnouncementById(id).subscribe(result =>{
      this.notification = result;
      console.log(result);
     
    }, (error:any)=>alert("Announcements Cannot be Displayed"));
  }

  
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
