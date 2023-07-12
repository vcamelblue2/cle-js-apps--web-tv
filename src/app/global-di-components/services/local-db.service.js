import { ComponentsRegistry } from "cle.js/lib";

ComponentsRegistry.define({ LocalDbService: { 

  id: "localdb",

  let: {

    channels: [

      { group: "GUIDA TV", channels: [
        { num: 0, label: "SuperGuida Tv", url: "https://www.superguidatv.it/ora-in-onda", oversize: true },
        // { num: -2, label: "TvTime", url: "https://www.tvtime.com/it" },
        // { num: -3, label: "JustWatch", url: "https://www.justwatch.com/it" },
      ]},

      { group: "RAI", channels: [
        { num: 1, label: "Rai 1", url: "https://www.raiplay.it/dirette/rai1" },
        { num: 2, label: "Rai 2", url: "https://www.raiplay.it/dirette/rai2" },
        { num: 3, label: "Rai 3", url: "https://www.raiplay.it/dirette/rai3" },
        { num: 24, label: "Rai Movie", url: "https://www.raiplay.it/dirette/raimovie" },
        { num: 49, label: "Rai News 24", url: "https://www.raiplay.it/dirette/rainews24" },
      ]},

      { group: "MEDIASET", channels: [
        { num: 4, label: "Rete 4", url: "https://www.mediasetplay.mediaset.it/diretta/rete4_cR4" },
        { num: 5, label: "Canale 5", url: "https://www.mediasetplay.mediaset.it/diretta/canale5_cC5" },
        { num: 6, label: "Italia 1", url: "https://www.mediasetplay.mediaset.it/diretta/italia1_cI1" },
        { num: 35, label: "Focus", url: "https://www.mediasetplay.mediaset.it/diretta/focus_cFU" },
        { num: 66, label: "Italia 2", url: "https://www.mediasetplay.mediaset.it/diretta/italia2_cI2" },
        { num: 22, label: "Iris", url: "https://www.mediasetplay.mediaset.it/diretta/iris_cKI" },
        { num: 55, label: "Extra", url: "https://www.mediasetplay.mediaset.it/diretta/mediasetextra_cKQ" },
        { num: 20, label: "20", url: "https://www.mediasetplay.mediaset.it/diretta/20mediaset_cLB" },
        { num: 34, label: "34", url: "https://www.mediasetplay.mediaset.it/diretta/cine34_cB6" },
        { num: 51, label: "Tgcom24", url: "https://www.mediasetplay.mediaset.it/diretta/video_cKF" },
      ]},

      { group: "SKY", channels: [
        { num: 8, label: "Tv 8", url: "https://tv8.it/streaming.html" },
        { num: 26, label: "Cielo", url: "https://www.cielotv.it/streaming.html" },
        { num: 50, label: "Sky Tg24", url: "https://video.sky.it/diretta/tg24" },
      ]},

      { group: "DISCOVERY", channels: [
        // { num: 0, label: "", url: "" },
        { num: 9, label:  "Nove", url: "https://www.discoveryplus.com/it/channel/nove" },
        { num: 52, label: "Dmax", url: "https://www.discoveryplus.com/it/channel/dmax" },
        { num: 33, label: "Food Network", url: "https://www.discoveryplus.com/it/channel/food-network" },
        { num: 31, label: "Real Time", url: "https://www.discoveryplus.com/it/channel/real-time" },
        { num: 37, label: "Warner Tv", url: "https://www.discoveryplus.com/it/channel/wbtv-italy" },
        { num: 56, label: "Hgtv", url: "https://www.discoveryplus.com/it/channel/hgtv" },
      ]},

      { group: "OTHER", channels: [
        { num: 7, label: "La7", url: "https://www.la7.it/dirette-tv" },
        { num: 49, label: "Spike Tv", url: "https://www.paramountnetwork.it/diretta-tv/duizzp/spike" },
        { num: 67, label: "Vh1 Tv", url: "https://www.paramountnetwork.it/diretta-tv/1iwm9n/vh1" },
      ]},

      { group: "RADIO", channels: [
        { num: 157, label: "", url: "https://www.mediasetplay.mediaset.it/diretta/105.net_cEC" },
        { num: 167, label: "", url: "https://www.mediasetplay.mediaset.it/diretta/r101_b7871969_cER" },
        { num: 257, label: "", url: "https://www.mediasetplay.mediaset.it/diretta/virginradio.it_cEW" },
      ]},

      { group: "On Demand", channels: [
        { num: -1, label: "Netfix", url: "https://www.netflix.com" },
        { num: -2, label: "Prime", url: "https://www.primevideo.com" },
        { num: -3, label: "Dinsey Plus", url: "https://www.disneyplus.com" },
        { num: -4, label: "Discovery Plus", url: "https://www.discoveryplus.com" },
        { num: -5, label: "Youtube", url: "https://www.youtube.it" },
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