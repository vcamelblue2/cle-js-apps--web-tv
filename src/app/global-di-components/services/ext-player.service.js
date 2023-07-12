import { ComponentsRegistry, Use } from "cle.js/lib";

import { Timer } from 'cle.js/components'

ComponentsRegistry.define({ ExtPlayerService: { 

  id: "extplayer",

  let: {

    playngChannel: undefined,
    playngPopup: undefined,

    playng: $ => $.this.playngChannel !== undefined

  },

  def: {

    play($, channel){

      $.playngPopup && $.playngPopup.close()
      $.playngPopup = window.open(channel.url, "new window", 'height=450,width=650,toolbar=0,menubar=0,location=0,top=200,left=425') //'_blank')
      
      $.playngChannel = channel

      return channel
    },

    stop($){
      $.playngPopup && $.playngPopup.close()
      $.playngPopup = undefined
      $.playngChannel = undefined
    },

    isPlayng($, channel){
      return $.this.playngChannel.url === channel.url
    }
  }, 

  "=>": [

    Use(Timer, {
      
      id: "tick",

      interval: 1000,
      running: false,
      repeat: true,

      on_trigger: $ => {
        // console.log("Tick!", $.playngPopup, $.playngPopup !== undefined, $.playngPopup.closed, $.playngPopup !== undefined && $.playngPopup.closed)
        if ($.playngPopup !== undefined && $.playngPopup.closed){
          // console.log("STOOOP")
          $.le.extplayer.stop()
        }
      },

      on_le_extplayer_playngChanged: ($, playng) => {
        // console.log("PLAYNG??", playng)
        $.running = playng
      }

    }),

  ]


}}, 'Service')