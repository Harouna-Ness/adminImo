import { Component, OnInit } from '@angular/core';
import { Logis } from '../model/model';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker/ngx";
import {Base64} from "@ionic-native/base64/ngx";

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
  ];
  imageArray: any[] = [];

  constructor(
    private db: AngularFirestore,
    private load: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private imagePicker: ImagePicker,
    private base64: Base64
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

  dataURLtoBlob(dataURL) {
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (var index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    console.log("blllll", b);

    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
  }


  checkImages() {
    const imageArray: any[] = [];
    this.imageArray = [];
    const options: ImagePickerOptions = {
      maximumImagesCount: 4,
      quality: 50,
      outputType: 0
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < 4; i++) {
        const imageName = '' + String(i)
          + new Date().getDate()
          + new Date().getMonth()
          + new Date().getFullYear()
          + new Date().getHours()
          + new Date().getMinutes()
          + new Date().getSeconds();

        this.base64.encodeFile(results[i]).then((base64: any) => {
          var x = base64.substr(13, base64.length);
          x = "data:image/jpeg;base64" + x;
          const blob = this.dataURLtoBlob(x);

          // const imageFile = this.blobToFile(blob, "imProduit");
          const imageFile = this.blobToFile(blob, "imProduit" + imageName);

          console.log('imageFile', imageFile);

          const reader = new FileReader();
          reader.onload = () => {
            imageArray.push({
              img:  reader.result as string,
            });
          }
          reader.readAsDataURL(imageFile)
        })


      }

      this.imageArray = imageArray;
      // console.log('Image URI: ' imageFile);
    }, (err) => { console.log((err));
    });
  }




  // importImages() {
  //   this.imageArray.requestReadPermission()
  // }
}
