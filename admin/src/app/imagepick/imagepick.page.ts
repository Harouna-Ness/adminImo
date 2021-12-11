import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-imagepick',
  templateUrl: './imagepick.page.html',
  styleUrls: ['./imagepick.page.scss'],
})
export class ImagepickPage implements OnInit {

  imgRes: any;
  options: any;
  images: any[];
  iMage: any[] = [];
  imageBOLB: any;
  imageBOLB1: any[]=[];
  imagePath:any[]=[];

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  constructor(
    private picker: ImagePicker,
    private router: Router,
    private afsg: AngularFireStorage,
    private db: AngularFirestore
  ) {
    console.log(this.images);

    this.picker.hasReadPermission().then((val) => {
      if (val == false) {
        this.picker.requestReadPermission();
      } else {
        this.picker.requestReadPermission();
      }
    });
  }

  onClick() {
    console.log(this.form);
  }

  Click() {
    this.router.navigate(['publication']);
  }

  getImage() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 5,
      outputType: 1
    }

    this.picker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.images.push('data:image/jpeg;base64,' + results[i]);
      }
    }).catch((err)=>{alert(err)});
  }

  imagePicker() {
    this.options = {
      width: 200,
      quality: 30,
      outputType: 1
    };

    this.imgRes = [];

    this.picker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgRes.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (error) => {
      alert(error);
    });
  }
  ngOnInit() {
  }

  getFile(event) {
    let imBlob = event.target.files[0];
    this.imageBOLB1.push(imBlob);
    console.log(event);
    var reader = new FileReader;
    reader.readAsDataURL(imBlob);
    reader.onload = (_event) => {
      this.iMage.push(reader.result);
    }
    console.log(this.iMage);
  }

  dataURLtoBlob(dataURL) {
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (var index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  voirLblob() {
    this.imageBOLB = this.dataURLtoBlob(this.iMage);
    console.log("blob: ", this.imageBOLB);
  }

  publier() {
    for (let i = 0; i < this.imageBOLB1.length; i++) {
      let name = 'image/'+ new Date().getTime();
      this.afsg.ref(name).putString(this.imageBOLB1[i]).then(()=> {
        this.afsg.ref(name).getDownloadURL().subscribe((pathImg) => {
          this.imagePath.push({
            path: pathImg
          });
          // console.log(this.imagePath);
      })
    })
    }

    this.db.collection('tester').add({
      text: 'publication',
      images: this.imagePath
    }).then(()=>{console.log('succes');
    });
  }

  saver(data) {
    this.db.collection('test').add({
      text: 'publication',
      images: data
    }).then(()=>{console.log('succes', data);
    })
  }
}
