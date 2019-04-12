import { Component, OnInit } from '@angular/core';
import { AdalService } from '../services/adal.service';
import { MsGraphClientService } from '../services/ms-graph-client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public UserInfo = "";
  constructor(private adalService: AdalService, private MsGraphClient: MsGraphClientService) { }
  public result = "";

  ngOnInit() {
    console.log("About Works!");
    this.UserInfo = this.adalService.userInfo.userName;
    console.log("Stuff!");
  }

  Click_ApiCall() {
    console.log("Clicked ApiCall from About page");
    
    this.result = "Pending..."

    this.MsGraphClient.GetMe().subscribe(res => {
      this.result = res; 
    }, error => {
      this.result = error;
    });

    

    console.log("GetMe() Response: "+this.result);


    console.log("LOGGING Click_ApiCall FINISHED");
  }

}
