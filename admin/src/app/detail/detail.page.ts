import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
// import { SMS } from '@ionic-native/sms/ngx';
import { ActionSheetController, AlertController, IonContent, LoadingController, ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  annonces: any;
  move='boutton';
  opacity='opacity1';
  foot="footer1";
  valeur:any;
  see1: boolean = false;
  see2: boolean = false;

  slideOpts = {
    // initialSlide: 0,
    direction: 'horizontal',
    // speed: 300,
    spaceBetween: 8,
    slidesPerView: 1.1,
    autoplay: true,
    // freeMode: true,
    loop: true
  }

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
    private location: Location,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private db: AngularFirestore,
    // private sms: SMS,
    // private appeler: CallNumber
    ) {
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.annonces = JSON.parse(queryParams.annonce);
        console.log('annonce', this.annonces);
      });
  }

  retour() {
    this.location.back();
  }

  Reselectionner() {
    this.see1=true
  }
  Reselectionner1() {
    this.see2=true
  }
  valider(data) {
    this.showLoad();
    console.log('des: ',data);
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({description: data}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }
  validerC(data) {
    this.showLoad();
    console.log('des: ',data);
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({condition: data}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }
  validerP(data1, data2) {
    console.log(data1+'\n'+data2);
    this.showLoad();
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({prix: data1, formeOffre: data2}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }

  chaSal(data1, data2) {
    console.log(data1+'\n'+data2);
    this.showLoad();
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({nombreChambre: data1, nombreSallon: data2}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }

  dimension(data1, data2) {
    console.log(data1+'\n'+data2);
    this.showLoad();
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({longueur: data1, largeur: data2}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    }).catch((err)=>{alert(err); this.loadCtrl.dismiss()})
  }

  choisirCommode() {
    let commode ='';

    for (let i = 0; i < this.commodites.length; i++) {

      if (this.commodites[i].isChecked) {
        commode=commode+this.commodites[i].val+' ';
      }
    }
    this.annonces.commodites=commode;
    console.log(this.annonces.commodites);
    this.annonces.commoditesTab=this.commodites;
    console.log(this.annonces);
    this.see1=false;
    this.showLoad();
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({commoditesTab: this.commodites, commodites: commode}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }
  choisirService() {
    let servi ='';

    for (let i = 0; i < this.service.length; i++) {

      if (this.service[i].isChecked) {
        servi=servi+this.service[i].val+' ';
      }
    }
    this.annonces.service=servi;
    this.annonces.serviceTab=this.service;
    console.log(this.annonces.service);
    console.log(this.annonces);
    this.see2=false;
    this.showLoad();
    console.log(this.annonces.id);
    this.db.collection('logis').doc(this.annonces.id).update({serviceTab: this.service, service: servi}).then(()=>{
      this.loadCtrl.dismiss().then(()=>{this.showToast();})
    })
  }

  annulerSEr(){
    this.see2=false;
  }
  annulerCommode(){
    this.see1=false;
  }

  async showAction() {
    const action = await this.actionSheet.create({
      header: 'Reservation',
      backdropDismiss: true,
      animated: true,
      buttons: [
        {
          text: 'Appeler',
          icon: 'call',
          handler: () => {
            console.log('Appel lancee!');
          }
        },

        {
          text: 'SMS',
          icon: 'chatbubble-ellipses',
          handler: () => {
            console.log('Texto SMS!');
          }
        },

        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('Texto Whatsapp!');
          }
        },
      ]
    });
    action.present();
  }

  async showAlert1() {
    const alert = await this.alertCtrl.create({
      header: "Votre inscription a été prise en compte.",
      buttons: [
        {
          text: 'Ok !',
          role: "cancel",
        },
      ]
    });
    alert.present();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "Veillez renseigner votre numero afin de pouvoir faire cette reservation.",
      inputs: [
        {
          name:'Numero de telephone',
          type: 'tel',
          placeholder: "Entrez votre numero de telephone"
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: "cancel",
        },
        {
          text: "Continuer",
          handler: (data) => {
            this.showLoad().then(()=>{
              setTimeout(()=>{
                this.showToast();
              },5000);
            });
            console.log('Inscrit !', data);
          }
        }
      ]
    });
    alert.present();
  }

  async showLoad() {
    const load = await this.loadCtrl.create({
      message:"Chargement...",
      spinner:'lines',
    });
    load.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message:"La modication a été prise en compte.",
      duration: 4000,
      color:'secondary',
      position:'bottom',
      buttons:[
        {
          text: 'Fermer',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  top() {
    this.content.scrollToTop(500);
  }

  scroll(ev) {
    this.valeur=ev.detail.scrollTop-1;
    if (ev.detail.scrollTop > 44) {
      this.opacity="opacity";
      this.foot="footer";
    } else if (ev.detail.scrollTop > this.valeur) {
      this.opacity="opacity1";
      this.foot="footer1";
    }
    // console.log(ev.detail);
    // console.log(this.valeur);
  }

  async presentAlert(data) {
    const alert = await this.alertCtrl.create({
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
            this.db.collection('logis').doc(data.id).delete().then(() =>{
              this.location.back();
              this.loadCtrl.dismiss();
              this.Toast(); });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Chargement...',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'l\'annonce a été républiée!',
      duration: 3000,
      color: 'primary'
    });
    toast.present();
  }
  async Toast() {
    const toast = await this.toastCtrl.create({
      message: 'l\'annonce a été supprimée!',
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
