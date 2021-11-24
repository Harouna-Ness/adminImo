import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {

  type: any;
  Reference: any;
  annonces: any[];

  constructor(
    private modal: ModalController,
    private router: Router,
    private db: AngularFirestore,
    private load: LoadingController,
    ) { }

  close() {
    this.modal.dismiss()
  }

  chercher(){
    let navigation: NavigationExtras = {
      queryParams: {
        Reference: JSON.stringify(this.Reference),
      }
    }
    this.router.navigate(['resultat'], navigation).then(()=>{this.close()});
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
}
