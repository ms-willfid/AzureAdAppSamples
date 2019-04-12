import { Injectable } from '@angular/core';
import { AdalService } from './adal.service';
import { Observable } from  "rxjs/Observable";
import { HttpClient, HttpHeaders } from  "@angular/common/http";
import { Subscriber } from 'rxjs';
import { tokenKey } from '@angular/core/src/view';

interface MeObject {
  userPrincipalName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MsGraphClientService {

  private MsGraphResourceId = "https://graph.microsoft.com";
  private MsGraphBaseUrl = "https://graph.microsoft.com/v1.0";

  constructor(private adalService: AdalService, private httpClient: HttpClient) { }

  public GetMe():Observable<string> {   
    console.log("LOGGING GetMe() called!");
    var strError = "/me call failed!";

    return new Observable<string>((subscriber: Subscriber<string>) => {

    //var response:string = null;
    //var AccessToken = this.GetAccessToken();
      var obs$ : Observable<MeObject>

      var response = this.GetAccessToken().subscribe( (token) => {
          const  headers = new  HttpHeaders().set("Authorization", "Bearer "+token);
          
          obs$ = this.httpClient.get<MeObject>(this.MsGraphBaseUrl+"/me/", {headers});
          
          obs$.subscribe(res => {
            if (res != null)
            {
              var upn = res["userPrincipalName"];
              console.log("RESPONSE: "+res["userPrincipalName"]);
              subscriber.next(upn);
            }
            
          });
      }, error => {
        subscriber.error(error);
      });
    });
  
  }


  public GetAccessToken():Observable<string> {
    var retries = 1;

    return new Observable<string>((subscriber: Subscriber<string>) => {

        return this.adalService.acquireToken(this.MsGraphResourceId, (message: string, token: string) => {
          console.log("LOGGING acquireToken() called!");
          if (token != null) 
          {
            console.log("MS GRAPH Token acquired: "+token);
            subscriber.next(token);
          }

          if (message != null) 
          {
            console.log("ERROR: "+message);
            subscriber.error("You will need to sign-out and sign-in again! Error Deatils:" + message);
          }
        });
      
    });
  }
}
