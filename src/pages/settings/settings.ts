import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToDoProvider } from '../../providers/to-do/to-do';
import { AlertController } from 'ionic-angular';
import { AdMobProProvider } from '../../providers/admob-pro/admob-pro';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ToDo: ToDoProvider,
    private alertCtrl: AlertController,
    private adMobPro: AdMobProProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  clearToDo() {
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete all To-Dos',
      message: 'Are you sure you want to delete all to-dos?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.ToDo.clear().then(data => console.log(data));
            this.showInterstitial();
          }
        }
      ]
    });
    alert.present();
  }

  showInterstitial(){
  	this.adMobPro.showInterstitial();
  }

}
