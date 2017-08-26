import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArchivePage } from '../pages/archive/archive';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToDoProvider } from '../providers/to-do/to-do';
import { AdMobProProvider } from '../providers/admob-pro/admob-pro';

const pages = [
  MyApp,
  HomePage,
  ArchivePage,
  SettingsPage,
]

@NgModule({
  declarations: [
    pages
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToDoProvider,
    AdMobProProvider
  ]
})
export class AppModule {}
