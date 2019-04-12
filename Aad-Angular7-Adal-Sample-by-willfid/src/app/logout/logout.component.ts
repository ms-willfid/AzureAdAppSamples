import { Component, OnInit } from '@angular/core';
import { AdalService } from '../services/adal.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private adalService: AdalService) { }

  ngOnInit() {
    this.adalService.logout();
  }

}
