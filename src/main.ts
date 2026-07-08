import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app-component/app.component';
import { initKeycloak } from './app/app-config/keycloak-init';
import { appConfig } from './app/app-config/app.config';

initKeycloak().then(() => {

  bootstrapApplication(AppComponent, appConfig);

});