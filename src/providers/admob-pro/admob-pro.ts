import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';

import 'rxjs/add/operator/map';

@Injectable()
export class AdMobProProvider {

  private options;
  private platformAdMobIDs:{banner: string, interstitial: string};
  adMobPro = new AdMobPro();


  /*
  * Get these values from your google AdMob's account.
  */
  admobID = {
    android: {
      banner: 'ca-app-pub-9392880126548726/6630491695',
      interstitial: 'ca-app-pub-9392880126548726/2560218899',
    },
    ios: {
      banner: 'ca-app-pub-9392880126548726/6630491695',
      interstitial: 'ca-app-pub-9392880126548726/2560218899',
    }
  };

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      this.checkPlatform(platform);
      this.init();
    });
  }

  checkPlatform(platform) {
    if(platform.is('android')) {
      this.platformAdMobIDs = this.admobID.android;
    }
    if(platform.is('ios')) {
      this.platformAdMobIDs = this.admobID.ios;
    }
  }

  init() {
    if( !AdMobPro ) return;

    this.options = {
      // bannerId: admobid.banner,
      // interstitialId: admobid.interstitial,
      // adSize: 'SMART_BANNER',
      // width: integer, // valid when set adSize 'CUSTOM'
      // height: integer, // valid when set adSize 'CUSTOM'
      position: this.adMobPro.AD_POSITION.BOTTOM_CENTER,
      // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
      bgColor: 'black', // color name, or '#RRGGBB'
      // x: integer,     // valid when set position to 0 / POS_XY
      // y: integer,     // valid when set position to 0 / POS_XY
      isTesting: false, // set to true, to receiving test ad for testing purpose
      autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
    };

    this.adMobPro.setOptions(this.options);
  }

  showInterstitial() {
    if( !AdMobPro ) return;
    this.adMobPro.prepareInterstitial({
      adId: this.platformAdMobIDs.interstitial,
      autoShow: true
    });
    return true;
  }

  showBanner() {
    if( !AdMobPro ) return;
    this.adMobPro.createBanner({
      adId: this.platformAdMobIDs.banner,
      position: this.adMobPro.AD_POSITION.BOTTOM_CENTER,
      autoShow: true
    });
  }

  removeAds() {
    if( AdMobPro ) this.adMobPro.removeBanner();
  }

}
