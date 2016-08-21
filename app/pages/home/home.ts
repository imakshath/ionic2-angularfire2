import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    photos: FirebaseListObservable<any[]>;
    constructor(private navCtrl: NavController, private af: AngularFire) {
        
    }

    ngOnInit(){
        this.getPhotos();
    }

    getPhotos(){
        this.photos = this.af.database.list('/photos');
    }

    takePhoto(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetHeight: 500,
            targetWidth: 500
        }).then((imageData) => {
            this.photos.push({src: "data:image/jpeg;base64," + imageData, likes:0});
            },(err) => {
                console.log(err);
            }
        );
    }

    deletePhoto(photoKey: string){
        this.photos.remove(photoKey);
    }

    likePhoto(photoKey: string, likes: number){
        this.photos.update(photoKey, {likes: likes + 1})
    }
}
