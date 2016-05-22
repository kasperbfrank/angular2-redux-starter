import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { provide, enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store/ng2';

import { AppComponent } from './app/app.component';
import { AppStoreService, appStore } from './app/app.store';
import { UtilsService } from './services/utils.service';

enableProdMode();

bootstrap(AppComponent, [
  AppStoreService,
  UtilsService,

  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,

  provideStore(appStore),

  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  })
]);
