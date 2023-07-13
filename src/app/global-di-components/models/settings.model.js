import { ComponentsRegistry } from "cle.js/lib";

ComponentsRegistry.define({ SettingsModel: { 

  id: "settings",

  let: {

    theme: "light",
    maxOneGroupOpen: true,
    useIframes: false,

    localSyncronized: ['useIframes'],
    localSyncronized$: $=>[$.useIframes]
  },

  onInit: $ => {
    // READ FROM STORAGE
    $.localSyncronized.forEach(prop=>{
      let key = "web-tv.sync.settings."+prop
      
      try{
        let val = localStorage.getItem(key)
        if (val !== null){
          $.this[prop] = JSON.parse(val).value
        }
      }
      catch(e){console.log("ERR: ", e)}

      // STORE IN STORAGE INITAL VALUE
      localStorage.setItem(key, JSON.stringify({value: $.this[prop]}))

    })
  },

  on_this_localSyncronized$Changed: $ => {

    // READ FROM STORAGE
    $.localSyncronized.forEach(prop=>{
      let key = "web-tv.sync.settings."+prop

      // STORE IN STORAGE INITAL VALUE
      localStorage.setItem(key, JSON.stringify({value: $.this[prop]}))
    })
  }


}}, 'Model')