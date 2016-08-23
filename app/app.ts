import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import { HomePage } from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import { provideForms } from '@angular/forms';
import {
    FIREBASE_PROVIDERS,
    defaultFirebase, 
    AngularFire, 
    AuthMethods,
    AuthProviders,
    firebaseAuthConfig,
    FirebaseAuth} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    private rootPage: any;

    constructor(private platform: Platform, private auth: FirebaseAuth) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    ngOnInit(){
        this.auth.subscribe((data) => {
            if(data){
                this.rootPage = HomePage;
            }else{
                this.rootPage = LoginPage;
            }
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
}), provideForms()]);
