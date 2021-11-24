import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalpagePage } from '../modalpage/modalpage.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Logis } from '../model/model';

@Component({
  selector: 'app-annoces',
  templateUrl: './annoces.page.html',
  styleUrls: ['./annoces.page.scss'],
})
export class AnnocesPage implements OnInit {

  vrai: boolean = false;
  mesFavories:any[] = [];
  tablocal: any[];
  annonces: any[];
  added: boolean = false;
  testTab: any[];
  dons: any;


  constructor(private router: Router,
    private toat: ToastController,
    private load: LoadingController,
    private alert: AlertController,
    private modal: ModalController,
    private db: AngularFirestore) {
    // this.initialisation();
    this.recup();
    this.tablocal = JSON.parse(localStorage.getItem('donnes'));
    console.log('tablocal ',this.tablocal);
  }

  recup() {
    this.db.collection('logis').snapshotChanges(['added', 'modified', 'removed']).pipe(
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

  // supprimer(index) {
  //   this.annonces.splice(index, 1);
  //   console.log(this.annonces);
  // }

  rendreVrai() {
    if(this.vrai==false) {
      this.vrai=true;
    }
    else{
      this.vrai=false;
    }
    console.log(this.vrai);
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

  aimer() {
    console.log('this.tablocal ',this.tablocal);
  }

  save(data) {
    if (!this.tablocal) {
      // premierement
      if (this.mesFavories.length === 0) {
        console.log('cas ou mesFavories est vide ');
        this.mesFavories.push(data);
        localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
        this.presentToast();
        console.log('mesFavories ',this.mesFavories);
      } else {
        for (let i = 0; i < this.mesFavories.length; i++) {
          console.log('cas ou mesFavories n\'est pas vide ');
          const element = this.mesFavories[i].id;
          if (element === data.id) {
            console.log('data existe deja');
            this.Toast();
            this.added=true;
            console.log(this.added);
          }
        }

        if (this.added==false) {
          console.log('data n\'existe deja');
          this.mesFavories.push(data);
          localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
          this.presentToast();
          console.log('data ajouté');
          console.log('mesFavories ',this.mesFavories);
        }
        this.added=false;
        console.log('la valeur de added a la fin ', this.added);
      }


      // this.mesFavories.push(data);
      // localStorage.setItem('donnes', JSON.stringify(this.mesFavories));
    } else {
      // deuxiement
      for (let i = 0; i < this.tablocal.length; i++) {
        console.log('cas ou tablocal n\'est pas vide ');
        const element = this.tablocal[i].id;
        if (element === data.id) {
          console.log('data existe deja');
          this.Toast();
          this.added=true;
          console.log(this.added);
        }
      }

      if (this.added==false) {
        this.tablocal.push(data);
        localStorage.setItem('donnes', JSON.stringify(this.tablocal));
        this.presentToast();
        console.log('tablocal ',this.tablocal);
      }

      this.added=false;
      console.log('la valeur de added a la fin ', this.added);

      // this.tablocal.push(data);
      // localStorage.setItem('donnes', JSON.stringify(this.tablocal));
    }
    // this.presentToast();
  }

  voirFavories() {
    let navigation : NavigationExtras = {
      queryParams: {
        mesFavories: JSON.stringify(this.mesFavories),
      }
    };
    this.router.navigate(['aimes'],navigation);
  }

  filtre(ev: any) {
    // this.initialisation();
    const val = ev.target.value;
    if(val && val.trim() != "") {
      this.annonces = this.annonces.filter((annonce) => {
        return (annonce.type.toLowerCase().indexOf(val.toLowerCase())>-1 || annonce.prix.toString().toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }

  async presentLoading() {
    const loading = await this.load.create({
      message: 'Chargement...',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
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
      message: 'l\'annonce a été retirée!',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modal.create({
    component: ModalpagePage,
    });

    await modal.present();

  }

  ngOnInit() {
  }

}
