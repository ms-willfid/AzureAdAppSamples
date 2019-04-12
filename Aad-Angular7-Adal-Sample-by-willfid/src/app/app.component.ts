import { AdalService } from './services/adal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private adalService: AdalService){

  }

  public title = 'Aad-Adal-Angular2-MySampleApp';
  public userDisplayName;

  ngOnInit() {
    this.userDisplayName = this.adalService.userInfo.profile.name;
  }
}
