import { ComponentsRegistry, cle, Bind, f, pass} from "cle.js/lib";

ComponentsRegistry.define({ RemoteController: { 

  id: "remote",

  let: {
    ipt: "",
    btnVisible: false,
  },

  signals: {
    changeChannelRequest: "stream => void"
  },

  when_focusin: {
    options: {capture: true, useCapture: true}, 
    handler:$=>{
      // $.btnVisible = true // todo: make it work
  }},
  when_focusout: { 
    options: {capture: true, useCapture: true}, 
    handler: $=>{
      $.btnVisible = false
  }},

  "=>": [
    cle.div({
      style: "display: flex; position: relative",
    }, 
        
      cle.input({
        a: {
          value: Bind(f`@ipt`),
          type: "number",
          placeholder: "Insert channel number here.."
        },
        handle: {
          onkeydown: ($, e) => {if (e.key === 'Enter'){ $.changeChannelRequest.emit(parseInt($.ipt)) }}
        },
        style: "position: relative; border-top: none; border-right: none",
        
      }),

      cle.button({
        style: "border-top-left-radius: 0px; border-bottom-left-radius: 0px",
        onclick: $ => $.changeChannelRequest.emit(parseInt($.ipt))
      }, "Open"),


      cle.span({ style: "position: absolute; left: 5px; bottom: -1rem;"}, $=>{
        return $.le.localdb.getChannelByNum(parseInt($.ipt))?.label
      }),
    ),

    cle.div({ meta: {if: f`@btnVisible`},
      style: "width: 100%; border: 1px solid gray; display: flex; flex: 0 1 100%; flex-wrap: wrap; background: white"
    },
      cle.button({ meta: { forEach: "num", of: [1,2,3,4,5,6,7,8,9,pass,0,pass]}, 
        style:"flex: 0 1 33.33333%;",
        "ha_style.visibility": f`@num === undefined ? 'hidden' : null`,
        onclick: ($, e) => { e.stopPropagation(); $.ipt += $.num;  }
      }, 
        f`@num`
      )
    )

  ]

}}, 'div')