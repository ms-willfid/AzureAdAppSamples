import { ConfigService } from './config.service';
import { AdalService } from './adal.service';
import { MsGraphClientService } from './ms-graph-client.service';
import { AuthenticationGuard } from './authentication.guard';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [AdalService, ConfigService, AuthenticationGuard, MsGraphClientService]
})
export class SharedServicesModule { }
