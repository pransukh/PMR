import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app-component/app.component';
import { initKeycloak } from './app/app-config/keycloak-init';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-config/app.routes';

initKeycloak().then(() => {

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });

});