import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-creater',
  templateUrl: './creater.page.html',
  styleUrls: ['./creater.page.scss'],
})
export class CreaterPage implements OnInit {

  categorie: boolean = false;
  catInput: boolean = false;
  quartier: boolean = false;
  quartInput: boolean = false;
  service: boolean = false;
  servInput: boolean = false;
  commodite: boolean = false;
  commoInput: boolean = false;
  catName: any;
  quartName: any;
  servName: any;
  commoName: any;

  constructor(
    private db: AngularFirestore,
    private load: LoadingController,
    private alert: AlertController,
  ) { }

  seeCat() {
    this.categorie = !this.categorie;
  }

  inputCat() {
    this.catInput = !this.catInput;
  }
  inputQuart() {
    this.quartInput = !this.quartInput
  }
  inputCommo() {
    this.commoInput = !this.commoInput
  }
  inputServi() {
    this.servInput = !this.servInput
  }

  addCat() {
    this.presentLoading();
    this.db.collection('categorie').add({type: this.catName}).then(() => {
      this.load.dismiss().then(()=>{this.presentAlert(this.catName);});
    });
    console.log(this.catName);
    this.catInput = false;
    this.catName = '';
  }

  seeQuart() {
    this.quartier = !this.quartier;
  }

  addQuart() {
    this.presentLoading();
    this.db.collection('quartier').add({name: this.quartName}).then(() => {
      this.load.dismiss().then(()=>{this.presentAlert(this.quartName);});
    });
    console.log(this.quartName);
    this.quartInput = false;
    this.quartName = '';
  }

  seeServi() {
    this.service = !this.service;
  }

  addServi() {
    this.presentLoading();
    this.db.collection('service').add({ val: this.servName, isChecked: false }).then(() => {
      this.load.dismiss().then(()=>{this.presentAlert(this.servName);});
    });
    console.log(this.servName);
    this.servInput = false;
    this.servName = '';
  }

  seeCommo() {
    this.commodite = !this.commodite;
  }

  addCommo() {
    this.presentLoading();
    this.db.collection('commodites').add({ val: this.commoName, isChecked: false }).then(() => {
      this.load.dismiss().then(()=>{this.presentAlert(this.commoName);});
    });
    console.log(this.commoName);
    this.commoInput = false;
    this.commoName = '';
  }

  ngOnInit() {
  }

  async presentAlert(data) {
    const alert = await this.alert.create({
      header: 'Succès !',
      message: data + 'a été ajouté.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.load.create({
      message: 'Chargement',
      spinner: 'bubbles'
    });
    await loading.present();
  }
}
