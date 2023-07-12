import { ComponentsRegistry, f, Bind, Use } from "cle.js/lib";
import { BootstrapIcon } from "cle.js/components";


ComponentsRegistry.define({ ChannelSearchInput: {

    let:{
      filter: Bind('$.le.chsearch.filter'),
      iptFocused: false,
    },

    class: css(`align-self: center; position: relative`),

    '=>': [

      { input: {
        a:{
          value: Bind(f`@filter`),
          placeholder: "Filter Channels.."
        },
        style: "margin: 0; font-size: 1.5rem; padding-left: 35px; padding-right: 35px;",
        when_focusin: { handler: $ => { $.iptFocused = true}},
        when_focusout: { handler: $ => { $.iptFocused = false}},
      }},

      Use(BootstrapIcon, { 
        style: "position: absolute; font-size: 2.1rem; left: 8px;", 
        "ha_style.color": $ => $.iptFocused ? '#9b4dca' : '#cdcdcd',
        let_icon: 'bi bi-search',
      }),

      Use(BootstrapIcon, { meta: { if: $ => $.filter !== '' },
        let_icon: 'bi bi-x',

        style: "position: absolute; font-size: 2.1rem; right: 8px; cursor: pointer", 
        "ha_style.color": $ => $.iptFocused ? '#9b4dca' : '#cdcdcd',

        handle_onclick($){
          $.filter = ""
        }
      })
      
    ]

  }
}, 'span')