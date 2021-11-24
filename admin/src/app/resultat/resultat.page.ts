import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Logis } from '../model/model';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  annonces: any[] = [];
  Reference: any;

  constructor(
    private location: Location,
    private toat: ToastController,
    private load: LoadingController,
    private alert: AlertController,
    private db: AngularFirestore,
    private router: Router,
    private activateroute: ActivatedRoute) {
      this.activateroute.queryParams.subscribe((action) => {
        this.Reference = JSON.parse(action.Reference);
        console.log('navigated',this.Reference);
        this.recup();
      });
    }

  retour() {
    // this.location.back();
    this.router.navigate(['annoces']);
  }

  chercher() {
    this.presentLoading();
    if(this.Reference) {
      this.db.collection('logis', ref => ref.where('numeroRef', '==', this.Reference)).valueChanges().subscribe((actions) => {
        this.annonces = actions;
        this.load.dismiss();
        console.log('where',this.annonces);
      });
    }
  }

  recup() {
    this.db.collection('logis', ref => ref.where('numeroRef', '==', this.Reference)).snapshotChanges(['added', 'modified', 'removed']).pipe(
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

  supprimer(data) {
    this.presentLoading();

    if (!data.retiree) {
      this.db.collection('logis').doc(data.id).update({retiree: true}).then(() =>{
        this.load.dismiss();
        this.Toast(); });
    } else {
      this.db.collection('logis').doc(data.id).update({retiree: false}).then(() =>{
        this.load.dismiss();
        this.presentToast(); });
    }

    console.log('ceci',data);
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
      message: 'l\'annonce a été rétirée!',
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

}
