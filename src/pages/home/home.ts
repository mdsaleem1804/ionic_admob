import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { RestProvider } from '../../providers/rest/rest';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  countries: any;
  quotes :any;
  errorMessage: string;
  descending: boolean = false;
  order: number;
  column: string = 'name';
  xWhatsAppUrl :string;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  public alertShown:boolean = false;
  constructor(public navCtrl: NavController,
    private adMobFree: AdMobFree,
    private platform :Platform,
    private iab: InAppBrowser,
    public rest: RestProvider,
    private alertCtrl: AlertController,) {
     this.showBannerAd();
     this.getCountries();
      
      platform.ready().then(() => {
            // this.toast.show(`I'm a toast`, '5000', 'bottom').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
        //splashScreen.hide();
        platform.registerBackButtonAction(() => {
          if (this.alertShown==false) {
            this.presentConfirm();  
          }
        }, 0)
      });
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Thanks For Using..',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
            this.showInterstitialAd();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.showInterstitialAd();
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }
  async showBannerAd() {
    try {
      const bannerConfig: AdMobFreeBannerConfig = {
        //id: 'your-banner-id-here',
        id :'ca-app-pub-3940386510395156/5473297111',
        isTesting: false,
        autoShow: true
      }

      this.adMobFree.banner.config(bannerConfig);

      const result = await this.adMobFree.banner.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
}
async showInterstitialAd() {
  try {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-3940386510395156/9245021163',
      isTesting: false,
      autoShow: true
    }

    this.adMobFree.interstitial.config(interstitialConfig);

    const result = await this.adMobFree.interstitial.prepare();
    console.log(result);
  }
  catch (e) {
    console.error(e)
  }
}
getCountries() {
  this.rest.getCountries()
     .subscribe(
       countries => this.countries = countries,
       error =>  this.errorMessage = <any>error);
} 
loadUrl(xUrl){
  const options :InAppBrowserOptions={
    zoom:'yes'
  }
   this.iab.create(xUrl,'_self',options);
  }



}