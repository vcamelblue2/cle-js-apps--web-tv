import { ComponentsRegistry, cle, Bind, f, pass} from "cle.js/lib";

ComponentsRegistry.define({ RemoteController: { 

  id: "remote",

  let: {
    ipt: "",
    getChannelByNum: $ => { return (num)=>'' }, 
    btnVisible: false,
  },

  signals: {
    changeChannelRequest: "stream => void"
  },

  "=>": [
    cle.div({
      style: "display: flex; position: relative",
    }, 

      { 'use-InputWithIcons': {

        let: {
          value: Bind(`@ipt`),
          type: "number",
          placeholder: "Insert channel number here..",

          leftIcon: "building",
          rightIcon: "caret-down-square",
          
          onRightIconClicked($){ return ()=>$.btnVisible = !$.btnVisible },

          inputStyle: " border-top: none; border-right: none",
        },
        
        "private:def": { 
          input: {
            handle: {
              onkeydown: ($, e) => {if (e.key === 'Enter'){ $.changeChannelRequest.emit(parseInt($.ipt)) }}
            },
          }
        }
      }},

      cle.button({
        style: "border-top-left-radius: 0px; border-bottom-left-radius: 0px",
        onclick: $ => {
          $.changeChannelRequest.emit(parseInt($.ipt))
          $.btnVisible = false
        }
      }, "Open"),


      cle.span({ style: "position: absolute; left: 5px; bottom: -1rem;"}, $=>{
        return $.getChannelByNum(parseInt($.ipt))?.label
      }),
    ),

    cle.div({ meta: {if: f`@btnVisible`},
      style: "width: 100%; border: 1px solid gray; display: flex; flex: 0 1 100%; column-gap: 12px; flex-wrap: wrap; background: white; margin-top: 1.25rem;"
    },
      cle.button({ meta: { forEach: "num", of: [1,2,3,4,5,6,7,8,9,pass,0,pass]}, 
        
        style:"flex: 0 1 calc(33.33333% - calc(24px / 3))",
        "ha_style.visibility": f`@num === undefined ? 'hidden' : null`,

        onclick: ($, e) => { $.ipt += $.num; }
      }, 
        f`@num`
      )
    )

  ]

}}, 'div')