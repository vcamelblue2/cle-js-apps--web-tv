import { ComponentsRegistry } from "cle.js/lib";

export const DEVICE = {
  MOBILE_M: 600,
  MOBILE_L: 768,
  TABLET_M: 992,
  DESKTOP_M: 1200,
  DESKTOP_L: 1201,
}

ComponentsRegistry.define({ ScreenService: {

  id: "screen",
    
  width: window.innerWidth,
  height: window.innerHeight,

  DEVICE: DEVICE,

  isInLandscape: $ => $.this.width > $.this.height,
  deviceType: $ => {
    let w = $.this.width
    if (w < DEVICE.MOBILE_M) {
      return DEVICE.MOBILE_M
    }
    else if (w >= DEVICE.MOBILE_M && w < DEVICE.MOBILE_L) {
      return DEVICE.MOBILE_L
    }
    else if (w >= DEVICE.MOBILE_L && w < DEVICE.TABLET_M) {
      return DEVICE.TABLET_M
    }
    else if (w >= DEVICE.TABLET_M && w < DEVICE.DESKTOP_M) {
      return DEVICE.DESKTOP_M
    }
    else if (w >= DEVICE.DESKTOP_M) {
      return DEVICE.DESKTOP_L
    }
  },

  isMobile_M: $ => {
    // return $.this.isInLandscape ? $.this.deviceType === $.this.DEVICE.MOBILE_M : $.this.deviceType === $.this.DEVICE.MOBILE_L
    return $.this.deviceType === $.this.DEVICE.MOBILE_M
  },

  onInit: $ => {
    window.onresize = () => {
      $.this.width = window.innerWidth;
      $.this.height = window.innerHeight;
    }
  },

  onDestroy: $ => {
    window.onresize = null
  }

}}, 'Service')