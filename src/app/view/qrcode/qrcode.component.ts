import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  ngxQrcode2: string;
  techiediaries: string;
  letsboot: string;
  constructor() {
    this.ngxQrcode2 = 'Test Selva';
  this.techiediaries = 'https://www.npmjs.com/~techiediaries';
  this.letsboot = 'https://www.letsboot.com/';
   }

  ngOnInit() {
  //   this.ngxQrcode2 = '10BF100GSM45Inch';
  // this.techiediaries = 'HITECHPACKAGINGSPVTLTD';
  // this.letsboot = 'SPAKPAPERBOOKS';
  
  }

}
