import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Logis } from '../model/model';

@Component({
  selector: 'app-retirees',
  templateUrl: './retirees.page.html',
  styleUrls: ['./retirees.page.scss'],
})
export class RetireesPage implements OnInit {

  annonces: any[];

  constructor(
    private toat: ToastController,
    private load: LoadingController,
    private alert: AlertController,
    private db: AngularFirestore,
    private router: Router,
  ) {
    this.recup();
  }

  recup() {
    this.db.collection('retires').snapshotChanges(['added', 'modified', 'removed']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Logis;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe((res) => {
      this.annonces = res;
      console.log(this.annonces);
    });
  }

  repub(data) {
    this.presentLoading();
    this.db.collection('logis').doc(data.id).set(data).then(() => {
      this.db.collection('retires').doc(data.id).delete().then(() =>{
      this.load.dismiss();
      this.presentToast(); });
    });

    console.log('ceci',data);
  }

  supprimer(data) {
    this.presentAlert(data)
  }
  goToDetail(data) {
    let navigation : NavigationExtras = {
      queryParams: {
        annonce: JSON.stringify(data),
      }
    }
    this.router.navigate(['detail'], navigation);
    console.log('data',data);
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.load.create({
      message: 'Chargement...',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentAlert(data) {
    const alert = await this.alert.create({
      header: 'Atention !',
      message: 'Cette annonce sera définitivement supprimée.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cansel'
        },
        {
          text: 'Suprimer',
          handler: () => {
            this.presentLoading();
            this.db.collection('retires').doc(data.id).delete().then(() =>{
              this.load.dismiss();
              this.Toast(); });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toat.create({
      message: 'l\'annonce a été républiée!',
      duration: 3000,
      color: 'primary'
    });
    toast.present();
  }
  async Toast() {
    const toast = await this.toat.create({
      message: 'l\'annonce a été supprimée!',
      duration: 3000,
      color: 'dark'
    });
    toast.present();
  }

}
