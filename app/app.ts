import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';

import {
    FIREBASE_PROVIDERS,
    defaultFirebase, 
    AngularFire, 
    AuthMethods,
    AuthProviders,
    firebaseAuthConfig} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    private rootPage: any;

    constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS, defaultFirebase({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
}), firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password
})]);
