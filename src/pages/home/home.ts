import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToDoProvider } from '../../providers/to-do/to-do';
import { ToastController } from 'ionic-angular';
import { AdMobProProvider } from '../../providers/admob-pro/admob-pro';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  todos:Array<any> = [];
  todo:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ToDo: ToDoProvider,
              private toastCtrl: ToastController,
              private adMobPro: AdMobProProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadToDos();
  }

  loadToDos() {
     this.ToDo.all().then(data => {
       this.todos = data;
       this.adMobPro.showBanner();

     });
  }

  addToDo(todo) {
    todo.status = 'active';
    this.ToDo.add(Object.assign({}, todo)).then(data => this.todos = data );
    this.todo.description = "";
  }

  markAsDone(todo) {
    this.ToDo.markAsDone(todo).then(data => {
      this.todos = data;
      this.presentToast("Task finished");
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
