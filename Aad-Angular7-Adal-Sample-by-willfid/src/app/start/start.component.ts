import { Component, OnInit } from '@angular/core';
import { AdalService } from '../services/adal.service';
import { AppComponent } from '../app.component';
import { MsGraphClientService } from '../services/ms-graph-client.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  public result = "";
  title = "Start Page";

  constructor(private adalService: AdalService, private MsGraphClient: MsGraphClientService) { }

  ngOnInit() {
  }

  Click_ApiCall() {
    console.log("Clicked ApiCall from Start page");
    this.result = "Pending...";
    this.MsGraphClient.GetMe().subscribe( 
      res => {
        this.result = res;
      }, 
      
      error => {
        this.result = error;
      });

    console.log("LOGGING Click_ApiCall FINISHED");
  }

}
