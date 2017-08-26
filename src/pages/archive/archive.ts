import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToDoProvider } from '../../providers/to-do/to-do';
import { ToastController } from 'ionic-angular';
import { AdMobProProvider } from '../../providers/admob-pro/admob-pro';

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {
  todos:Array<any> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ToDo: ToDoProvider,
    private toastCtrl: ToastController,
    private adMobPro: AdMobProProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
    this.loadToDos();
  }

  loadToDos() {
     this.ToDo.all('archived').then(data => {
       this.todos = data;
       this.adMobPro.showBanner();
     });
  }

  markAsUndone(todo) {
    this.ToDo.markAsUndone(todo).then(data => {
      this.todos = data;
      this.presentToast("Task marked as active");
    });
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
