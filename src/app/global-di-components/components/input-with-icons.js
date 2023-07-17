import { ComponentsRegistry, f, Bind, Use } from "cle.js/lib";
import { BootstrapIcon } from "cle.js/components";


ComponentsRegistry.define({ InputWithIcons: {

    let:{
      value: "",
      placeholder: "",
      type: "text",
      
      leftIcon: undefined,
      rightIcon: undefined,

      onLeftIconClicked: undefined,
      onRightIconClicked: undefined,

      inputStyle: "margin: 0; font-size: 1.5rem;",
      leftIconStyle: "position: absolute; font-size: 2.1rem; left: 8px;",
      rightIconStyle: "position: absolute; font-size: 2.1rem; right: 8px;",

      iptFocused: false,
    },
    

    "private:def" :{
      input: undefined, // extra definition added to "input"
      leftIcon: undefined, // extra definition added to "leftIcon"
      rightIcon: undefined, // extra definition added to "leftIcon"
    },

    beforeInit(unifiedDef, unifiedDefChilds) {
      // console.log(unifiedDef, unifiedDefChilds)
      if (unifiedDef._def?.input !== undefined){
        unifiedDefChilds[0].input = {
          ...unifiedDef.childs[0].input, 
          ...unifiedDef._def?.input 
        }
      }
      // console.log(unifiedDef)
      return unifiedDef
    },

    class: css(`position: relative; width 100%`),

    '=>': [

      { input: {
        a: {
          value: Bind(f`@value`),
          type: $ => $.type,
          placeholder: $ => $.placeholder
        },
        
        style: $ => $.inputStyle,

        "ha_style.paddingLeft": $ => $.leftIcon === undefined ? '10px' : '35px',
        "ha_style.paddingRight": $ => $.rightIcon === undefined ? '10px' : '35px',

        when_focusin: { handler: $ => { $.iptFocused = true}},
        when_focusout: { handler: $ => { $.iptFocused = false}},
      }},

      Use(BootstrapIcon, { meta: { if: $ => $.leftIcon !== undefined },
        let_icon: $ => 'bi bi-' + $.leftIcon,

        style: $ => $.leftIconStyle, 
        "ha_style.color": $ => $.iptFocused ? '#9b4dca' : '#cdcdcd',
        "ha_style.cursor": $ => $.onLeftIconClicked !== undefined ? 'pointer' : null,
        
        handle_onclick($, e){ $.onLeftIconClicked !== undefined && $.onLeftIconClicked(e) }
      }),
      
      Use(BootstrapIcon, { meta: { if: $ => $.rightIcon !== undefined },
      let_icon: $ => 'bi bi-' + $.rightIcon,
      
        style: $ => $.rightIconStyle, 
        "ha_style.color": $ => $.iptFocused ? '#9b4dca' : '#cdcdcd',
        "ha_style.cursor": $ => $.onRightIconClicked !== undefined ? 'pointer' : null,

        handle_onclick($, e){ $.onRightIconClicked !== undefined && $.onRightIconClicked(e) }
      })
      
    ]

  }
}, 'span')
