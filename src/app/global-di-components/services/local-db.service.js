import { ComponentsRegistry } from "cle.js/lib";

ComponentsRegistry.define({ LocalDbService: { 

  id: "localdb",

  let: {

    channels: [

      { group: "GUIDA TV", channels: [
        { preview: true, num: 0, label: "SuperGuida Tv", url: "https://www.superguidatv.it/ora-in-onda", oversize: true },
        // { num: -2, label: "TvTime", url: "https://www.tvtime.com/it" },
        // { num: -3, label: "JustWatch", url: "https://www.justwatch.com/it" },
      ]},

      { group: "RAI", channels: [
        { preview: true, num: 1, label: "Rai 1", url: "https://www.raiplay.it/dirette/rai1" },
        { preview: true, num: 2, label: "Rai 2", url: "https://www.raiplay.it/dirette/rai2" },
        { preview: true, num: 3, label: "Rai 3", url: "https://www.raiplay.it/dirette/rai3" },
        { preview: true, num: 21, label: "Rai 4", url: "https://www.raiplay.it/dirette/rai4" },
        { preview: true, num: 23, label: "Rai 5", url: "https://www.raiplay.it/dirette/rai5" },
        { preview: true, num: 24, label: "Rai Movie", url: "https://www.raiplay.it/dirette/raimovie" },
        { preview: true, num: 25, label: "Rai Premium", url: "https://www.raiplay.it/dirette/raipremium" },
        { preview: true, num: 49, label: "Rai News 24", url: "https://www.raiplay.it/dirette/rainews24" },
        { preview: true, num: 54, label: "Rai Storia", url: "https://www.raiplay.it/dirette/raistoria" },
        { preview: true, num: 57, label: "Rai Scuola", url: "https://www.raiplay.it/dirette/raiscuola" },
        { preview: true, num: 58, label: "Rai Sport", url: "https://www.raiplay.it/dirette/raisport" },
      ]},

      { group: "MEDIASET", channels: [
        { preview: false, num: 4, label: "Rete 4", url: "https://www.mediasetplay.mediaset.it/diretta/rete4_cR4" },
        { preview: false, num: 5, label: "Canale 5", url: "https://www.mediasetplay.mediaset.it/diretta/canale5_cC5" },
        { preview: false, num: 6, label: "Italia 1", url: "https://www.mediasetplay.mediaset.it/diretta/italia1_cI1" },
        { preview: false, num: 35, label: "Focus", url: "https://www.mediasetplay.mediaset.it/diretta/focus_cFU" },
        { preview: false, num: 66, label: "Italia 2", url: "https://www.mediasetplay.mediaset.it/diretta/italia2_cI2" },
        { preview: false, num: 22, label: "Iris", url: "https://www.mediasetplay.mediaset.it/diretta/iris_cKI" },
        { preview: false, num: 55, label: "Extra", url: "https://www.mediasetplay.mediaset.it/diretta/mediasetextra_cKQ" },
        { preview: false, num: 20, label: "20", url: "https://www.mediasetplay.mediaset.it/diretta/20mediaset_cLB" },
        { preview: false, num: 34, label: "34", url: "https://www.mediasetplay.mediaset.it/diretta/cine34_cB6" },
        { preview: false, num: 51, label: "Tgcom24", url: "https://www.mediasetplay.mediaset.it/diretta/video_cKF" },
      ]},

      { group: "SKY", channels: [
        { preview: false, num: 8, label: "Tv 8", url: "https://tv8.it/streaming.html" },
        { preview: true,  num: 26, label: "Cielo", url: "https://www.cielotv.it/streaming.html" },
        { preview: false, num: 50, label: "Sky Tg24", url: "https://video.sky.it/diretta/tg24" },
      ]},

      { group: "DISCOVERY", channels: [
        // { num: 0, label: "", url: "" },
        { preview: false, num: 9, label:  "Nove", url: "https://www.discoveryplus.com/it/channel/nove" },
        { preview: false, num: 52, label: "Dmax", url: "https://www.discoveryplus.com/it/channel/dmax" },
        { preview: false, num: 33, label: "Food Network", url: "https://www.discoveryplus.com/it/channel/food-network" },
        { preview: false, num: 31, label: "Real Time", url: "https://www.discoveryplus.com/it/channel/real-time" },
        { preview: false, num: 37, label: "Warner Tv", url: "https://www.discoveryplus.com/it/channel/wbtv-italy" },
        { preview: false, num: 56, label: "Hgtv", url: "https://www.discoveryplus.com/it/channel/hgtv" },
      ]},

      { group: "OTHER", channels: [
        { preview: false, num: 7, label: "La7", url: "https://www.la7.it/dirette-tv" },
        { preview: false, num: 49, label: "Spike Tv", url: "https://www.paramountnetwork.it/diretta-tv/duizzp/spike" },
        { preview: false, num: 67, label: "Vh1 Tv", url: "https://www.paramountnetwork.it/diretta-tv/1iwm9n/vh1" },
      ]},

      { group: "RADIO", channels: [
        { preview: false, num: 157, label: "Radio 105", url: "https://www.mediasetplay.mediaset.it/diretta/105.net_cEC" },
        { preview: false, num: 167, label: "R 101", url: "https://www.mediasetplay.mediaset.it/diretta/r101_b7871969_cER" },
        { preview: false, num: 257, label: "Virgin Radio", url: "https://www.mediasetplay.mediaset.it/diretta/virginradio.it_cEW" },
      ]},

      { group: "On Demand", channels: [
        { preview: false, num: -1, label: "Netfix", url: "https://www.netflix.com" },
        { preview: false, num: -2, label: "Prime", url: "https://www.primevideo.com" },
        { preview: false, num: -3, label: "Dinsey Plus", url: "https://www.disneyplus.com" },
        { preview: false, num: -4, label: "Discovery Plus", url: "https://www.discoveryplus.com" },
        { preview: false, num: -5, label: "Youtube", url: "https://www.youtube.it" },
      ]},

    ]

  },

  def: {
    getChannels($, group){
      return $.this.channels.find(g=>g.group === group).channels
    },

    getChannelByNum($, num){
      const channelCond = (c=>c.num===num)
      return $.this.channels.find(g=>g.channels.find(channelCond) !== undefined)?.channels.find(channelCond)
    }
  }


}}, 'Service')