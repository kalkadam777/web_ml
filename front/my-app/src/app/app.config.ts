import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from './authinterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    [AuthInterceptorProvider]
  ]
};
