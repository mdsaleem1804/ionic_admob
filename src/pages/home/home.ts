import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { RestProvider } from '../../providers/rest/rest';

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
  constructor(public navCtrl: NavController,
    private adMobFree: AdMobFree,
    private iab: InAppBrowser,
    public rest: RestProvider) {
     this.showBannerAd();
     this.getCountries();
      //this.showInterstitialAd();
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