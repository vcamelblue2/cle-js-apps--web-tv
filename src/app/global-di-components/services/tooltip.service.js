import { ComponentsRegistry } from "cle.js/lib";

export const hasTooltip = (txt, {position="bottom", delay=300, maxWidth=200}={})=>{
  return {
    
    // regenerate overwritten mouse events as signal until cle will have an embedded "directives" system
    signal_mouseenter_sig: "stream => e: event", 
    signal_mousedown_sig: "stream => e: event",
    signal_mouseleave_sig: "stream => e: event",


    handle_onmouseenter($, e){
      $.__show_tooltip(e)
      $.mouseenter_sig.emit(e)
    },

    handle_onmouseleave($, e){
      $.__hide_tooltip(e)
      $.mouseleave_sig.emit(e)
    },


    // handle condition changes when tooltip is already rendered
    let___tooltip_condition: txt,
    let___tooltip_active: false,
    let___tooltip_target_evt: undefined,
    
    on___tooltip_conditionChanged($, v){ 
      if ($.__tooltip_active) {
        let currEv = $.__tooltip_target_evt
        $.__hide_tooltip(currEv)
        $.__show_tooltip(currEv)
      } 
    },

    def___show_tooltip($, e){
      // console.log("SHOW", e)
      $.le.tooltipsvc.show(e, $.__tooltip_condition, {position, delay, maxWidth})
      $.__tooltip_active = true
      $.__tooltip_target_evt = e
    },
    def___hide_tooltip($, e){
      $.le.tooltipsvc.hide(e)
      $.__tooltip_active = false
      $.__tooltip_target_evt = undefined
    },

  }
}


ComponentsRegistry.define({ TooltipService: {
  
  id: "tooltipsvc",

  // per-instance oos obj require a function
  oos: ()=>({ 
    running_timeout: new Map(),
    running_tooltips: new Map()
  }),

  def: {
    
    /**
     * @param {{oos: {running_timeout: Map<HTMLElement, number>}}} $ 
     * @param {MouseEvent & {target: HTMLElement}} ev 
     * @param {string} txt 
     * @param {{position: string, delay: number, maxWidth: number}} options 
     */
    show($, ev, txt, options){
      // console.log("SHOW TOOLTIP FOR: ", ev, txt)
      if (txt){
        $.oos.running_timeout.set(
          ev.target, 
          setTimeout(() => { $.render.create(ev, txt, options) }, options.delay)
        )
      }
    },

    /**
     * @param {{oos: {running_timeout: Map<HTMLElement, number>}}} $ 
     * @param {MouseEvent & {target: HTMLElement}} ev 
     */
    hide($, ev){
      // console.log("HIDE TOOLTIP FOR: ", ev)
      clearTimeout($.oos.running_timeout.get(ev.target))
      $.oos.running_timeout.delete(ev.target)
      $.render.destroy(ev)
    },

    // true html tooltip render
    render:{

      /**
       * @param {{oos: {running_tooltips: Map<any, number>}}} $ 
       * @param {MouseEvent & {target: HTMLElement}} ev 
       * @param {string} txt 
       * @param {{position: string, delay: number}} options 
       */
      create($, ev, txt, options){
        
        if (txt){

          let bounds = ev.target.getBoundingClientRect()
          // console.log("BOUNDS", bounds)

          $.oos.running_tooltips.set( ev.target, 
            $.u.newConnectedSubRenderer(document.body, { div: {
              
              let: {
                computedWidth: 0,
              },

              def: {
                align: $ => {
                  $.computedWidth = $.this.el.getBoundingClientRect().width // recompute and adjust width to match center
                }
              },
              
              class: css(`
                position: absolute; display: inline-block; background: black; 
                color: white; padding: 15px; border-radius: 5px;
                z-index: 99999;

                :before{
                  content: "";
                  position: absolute;
                  ${options.position === 'bottom' ? 'top' : 'bottom'}: -3px;
                  left: calc(50% - 2.5px);
                  background: black;
                  rotate: 45deg;
                  width: 10px;
                  height: 10px;
                }
              `),

              style: $ => ({
                maxWidth: options.maxWidth+"px",
                top: ((options.position === 'bottom' ? bounds.bottom+5 : bounds.top+5))+"px",
                left: (bounds.left+(bounds.width/2)-($.computedWidth/2))+"px"
              }),

              afterChildsInit: $ => { $.align() },

              text: txt

            }})
          )
        }
      },

      /**
       * @param {{oos: {running_tooltips: Map<any, number>}}} $ 
       * @param {MouseEvent & {target: HTMLElement}} ev 
       */
      destroy($, ev){
        setTimeout(() => {
          let app = $.oos.running_tooltips.get(ev.target)
          app?.destroy()
          $.oos.running_tooltips.delete(ev.target)
        }, 0);
      }
    },

  }


}}, 'Service')