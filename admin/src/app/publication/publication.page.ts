import { Component, OnInit } from '@angular/core';
import { Logis } from '../model/model';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {

  ref: Date = new Date;
  data: any;
  logis: Logis = new Logis;
  local: any[] = [
    {
      type: 'Appartement Meublé'
    },
    {
      type: 'Appartement Non Meublé'
    },
    {
      type: 'Villa'
    },
    {
      type: 'Magasin'
    }
  ];
  quartiers: any[] = [
    {
      name: 'Kalaban coro'
    },
    {
      name: 'Kalaban coura'
    },
    {
      name: 'Golf'
    },
    {
      name: 'Faladie'
    },
    {
      name: 'Niamanan'
    },
  ];
  commodites = [
    { val: 'Climatisation', isChecked: false },
    { val: 'Televiseur', isChecked: false },
    { val: 'Refrigirateur', isChecked: false }
  ];
  service = [
    { val: 'Securite', isChecked: false },
    { val: 'Netoyage', isChecked: false },
    { val: 'Parking', isChecked: false }
  ]

  constructor(
    private db: AngularFirestore,
    private load: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  choisirCommode() {
    let commode ='';

    for (let i = 0; i < this.commodites.length; i++) {

      if (this.commodites[i].isChecked) {
        commode=commode+this.commodites[i].val+' ';
      }
    }
    this.logis.commoditesTab=this.commodites;
    this.logis.commodites=commode;
  }
  choisirService() {
    let servi ='';

    for (let i = 0; i < this.service.length; i++) {

      if (this.service[i].isChecked) {
        servi=servi+this.service[i].val+' ';
      }
    }
    this.logis.serviceTab=this.service;
    this.logis.service=servi;
    this.logis.numeroRef=this.ref.getTime();
  }

  liaison() {
    this.choisirService();
    this.choisirCommode();
    localStorage.setItem('stok', JSON.stringify(this.logis));
  }

  publier() {
    this.presentLoading();
    this.liaison();
    this.data=JSON.parse(localStorage.getItem('stok'));
    this.db.collection('logis').add(this.data).then(()=>{
      this.load.dismiss();
      console.log('added');
      this.presentAlert();
      }, (error) => {
        this.close();
        alert(error);
    });
    console.log('logis',this.data);
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.load.create({
      message: 'Chargement',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Succès !',
      message: 'Faire une autre annonce ?',
      buttons: [
        {
          text: 'Non, merci',
          handler: () => {
            this.router.navigate(['annoces']);
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.logis=new Logis;
            for (let i = 0; i < this.commodites.length; i++) {
              this.commodites[i].isChecked=false;
            }
            for (let i = 0; i < this.service.length; i++) {
              this.service[i].isChecked=false;
            }
          }
        },
      ]
    });

    await alert.present();
  }

  close() {
    this.load.dismiss();
  }
}
