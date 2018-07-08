import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private adMobFree: AdMobFree) {
      this.showBannerAd();
      this.showInterstitialAd();
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

}