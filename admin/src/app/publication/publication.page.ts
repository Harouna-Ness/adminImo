import { Component, OnInit } from '@angular/core';
import { Logis } from '../model/model';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker/ngx";
import {Base64} from "@ionic-native/base64/ngx";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {

  ref: Date = new Date;
  data: any;
  imageBLOB: any[] = [];
  imageBLOBpath: any[] = [];
  // logis: Logis = new Logis;
  logis: any;
  local: any[];
  quartiers: any[];
  commodites: any;
  service: any;
  imageArray: any[] = [];

  constructor(
    private db: AngularFirestore,
    private load: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private afsg: AngularFireStorage
    ) {
      this.initialisation();
      this.getCategorie();
      this.getCommo();
      this.getServi();
      this.getQuart();
    }

    initialisation() {
      this.logis = {
        type: null,
        titre: null,
        nombreChambre: null,
        nombreSallon: null,
        quartier: null,
        prix: null,
        formeOffre: null,
        commodites: null,
        commoditesTab: null,
        service: null,
        serviceTab: null,
        description: null,
        condition: null,
        images: null,
        numeroAgentImmobilier: null,
        numeroAgentLogis: null,
        longueur: null,
        largeur: null,
        numeroRef: null,
        retiree: false
      }
    }

    getCategorie() {
      this.db.collection('categorie').valueChanges(['added', 'modified', 'removed']).subscribe((res) => {
        this.local = res;
      });
    }

    getQuart() {
      this.db.collection('quartier').valueChanges(['added', 'modified', 'removed']).subscribe((res) => {
        this.quartiers = res;
      });
    }

    getServi() {
      this.db.collection('service').valueChanges(['added', 'modified', 'removed']).subscribe((res) => {
        this.service = res;
      });
    }

    getCommo() {
      this.db.collection('commodites').valueChanges(['added', 'modified', 'removed']).subscribe((res) => {
        this.commodites = res;
      });
    }

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

  makeFileName(i): string {
    return  'image/' + i + new Date().getTime() + '.jpg';
  }
  publier() {
    console.log("logis", this.logis);
    // let counter: number = 0;

    // this.presentLoading();
    // this.liaison();


    // if (this.imageBLOB.length > 0) {
    //   for (let i = 0; i < this.imageBLOB.length; i++) {
    //     let fileName = this.makeFileName(i);
    //     this.afsg.ref(fileName).put(this.imageBLOB[i]).then(()=> {
    //       counter++;
    //       console.log("iteration",fileName);
    //       this.afsg.ref(fileName).getDownloadURL().subscribe((pathImg) => {
    //         this.imageBLOBpath.push({
    //           path: pathImg
    //         });
    //         console.log("upload done i", fileName);

    //         if (counter == this.imageBLOBpath.length) {
    //           console.log("save done", this.imageBLOBpath);
    //           this.saveLogis(this.imageBLOBpath, this.logis);
    //         } else
    //           console.log("not save yet", this.imageBLOBpath);
    //     });
    //   });
    //   }

    //   console.log('plus 1', this.imageBLOB);

    // } else {
    //   console.log('ne peut pas continuer');

    // }
    //
    //
    // console.log('logis',this.data);
  }

  saveLogis(imageBLOBpath, data: Logis) {

    data.images = imageBLOBpath;
    this.db.collection('logis').add(
      {
      type: this.logis.type,
      titre: this.logis.titre,
      nombreChambre: this.logis.nombreChambre,
      nombreSallon: this.logis.nombreSallon,
      quartier: this.logis.quartier,
      prix: this.logis.prix,
      formeOffre: this.logis.formeOffre,
      commodites: this.logis.commodites,
      commoditesTab: this.logis.commoditesTab,
      service: this.logis.service,
      serviceTab: this.logis.serviceTab,
      description: this.logis.description,
      condition: this.logis.condition,
      images: imageBLOBpath,
      numeroAgentImmobilier: this.logis.numeroAgentImmobilier,
      numeroAgentLogis: this.logis.numeroAgentLogis,
      longueur: this.logis.longueur,
      largeur: this.logis.largeur,
      numeroRef: this.logis.numeroRef,
      retiree:  false
    }
    ).then(()=>{
      this.load.dismiss();
      console.log('added');
      this.presentAlert();
    }, (error) => {
      this.close();
      alert(error);
    });
  }
  // publier() {
  //   let name = 'image/'+ new Date().getTime() + '.jpg';
  //   this.presentLoading();

  //   this.data=JSON.parse(localStorage.getItem('stok'));

  //   ---------------------------
  //   storage
  //   if (this.imageBLOB.length > 0) {
  //     for (let i = 0; i < this.imageBLOB.length; i++) {
  //       this.afsg.ref(name).put(this.imageBLOB[i]).then(()=> {
  //         this.afsg.ref(name).getDownloadURL().subscribe((pathImg) => {
  //           this.imageBLOBpath.push({
  //             path: pathImg
  //           });
  //       })
  //     })
  //     }

  //     this.logis.images = this.imageBLOBpath;
  //     console.log('plus 1', this.imageBLOB);

  //   } else {
  //     console.log('ne peut pas continuer');

  //   }
  //   -----------------------------------
  //   this.db.collection('logis').add(this.data).then(()=>{
  //     this.load.dismiss();
  //     console.log('added');
  //     this.presentAlert();
  //     }, (error) => {
  //       this.close();
  //       alert(error);
  //   });
  //   console.log('logis',this.data);
  // }


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

          this.imageBLOB.push(blob);

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
