import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('');
  }
  admin(){
    this.router.navigateByUrl('/createnotification');
  }

}
