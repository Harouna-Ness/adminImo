import { Component, OnInit } from '@angular/core';
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

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  constructor(
    private picker: ImagePicker,
    private router: Router
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

}
