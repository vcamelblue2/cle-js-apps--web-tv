import {SmartAlias, cle} from 'cle.js/lib'
import { hasTooltip } from '../global-di-components/directives/tooltip.directives'


export const Testpage = async (state, params)=>{

  console.log(state, params)

  return cle.div({ style: "min-height: 100vh"}, 

    { 'component-SettingsModel': { id: "settings" }},
    { 'component-ScreenService': { id: "screen" }},
    { 'component-LocalDbService': { id: "localdb" }},
    { 'component-ExtPlayerService': { id: "extplayer" }},
    { 'component-ChannelSearchService': { id: "chsearch" }},
    { 'component-TooltipService': { id: "tooltipsvc" }},
    

    cle.use_navbar({ class: css("background: #f4f5f6; border-bottom: 0.1rem solid #d1d1d1; padding: 5px 10px; position: sticky; top: 0px; z-index: 1;") }, 
      
      cle.span({ class: $ => [
        css("margin: 0px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;"), 
        $.le.screen.isMobile_M ? css('flex-wrap: nowrap; flex-direction: column; align-items: center; gap: 15px') : '' 
      ]}, 
        
        cle.h2({ class: css("margin: 0px")}, "Web Tv "),

        cle.span({ class: $ => [
          css("display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 25px"), 
          $.le.screen.isMobile_M ? css('flex-wrap: nowrap; flex-direction: column; align-items: center; gap: 15px;') : ''
        ]},
            
          { 'use-ChannelSearchInput': {
            ...hasTooltip($=>$.iptFocused ? '' : "Filter Channels by name or number", {position: "bottom", delay: 300}), 
          } },
          
          { 'use-Toggle': {
            ...hasTooltip("Enable or disable In App Preview (Experimental, work only for some channels)", {position: "bottom", delay: 200}), 

            let: {
              status: SmartAlias("$.le.settings.useIframes"),
              customStatus: { "true": "Preview: ON", "false": "Preview: OFF" },
            }
          }}
        )
      ),
    ),

    cle.use_RemoteController({

      ...hasTooltip($=>$.btnVisible || $.ipt || $.focused ? '' : "Play channel by number. \n Insert and press 'Enter' or 'Open' button to open. \n You can also open Number Dialer with the icon on the right", {position: "bottom", delay: 300, maxWidth: 300}), 

      let: {
        getChannelByNum: $ => $.le.localdb.getChannelByNum
      },

      on_changeChannelRequest: ($, num) => {

        let channel = $.le.localdb.getChannelByNum(num)

        if (channel === undefined){
          return console.log("CH NOT FOUND!")
        }

        $.le.extplayer.play(channel)
      },

      on_le_extplayer_playngChannelChanged: ($, channel) => {
        if (channel === undefined || channel.num != $.ipt) {
          $.ipt = channel?.num ?? ""
        }
      }

    }),

    cle.use_contents({
      style: "padding: 25px; padding-top: 10px;",
      open_group: undefined, // utils for autoclose open group if max 1 group enabled
    },

      cle.use_content({ meta: { forEach: "group", of: $ => $.le.chsearch.filtering ? $.le.chsearch.getFilteredChannels($.le.localdb.channels) : $.le.localdb.channels, full_optimized: true },
        open: false,
        forcedOpen: $ => $.open || $.le.chsearch.filtering,
        style: "padding: 20px; margin: 10px; border-radius: 5px; background: whitesmoke;",
        
        "ha_style.display": $ => $.le.chsearch.filtering && !$.le.chsearch.groupMatchSearch($.group) ? 'none' : null,
        "a_open": $ => $.le.chsearch.filtering || $.open ? '' : null,

        on_open_groupChanged: ($, group) => { 
          if ($.le.settings.maxOneGroupOpen && $.this.el.open && $.open_group !== $.group){
            $.open = $.this.el.open = false
          }
        },
        onclick: $ => { setTimeout(() => {$.open = $.this.el.open; if ($.open) {$.open_group = $.group} }, 10); }
      },

        cle.summary({ style: "cursor: pointer" }, $ => $.group.group, " (", $ => $.group.channels.length, ")"),

        cle.use_channel_group({ style: {
            display: 'flex',
            overflow: 'auto',
            justifyContent: 'flex-start',
            gap: '10%',
            marginTop: '25px'
          },
          class: [css(`transition: height 1s ease-out;`)], // TODO: work on transition..
          "ha_style.height": $ => $.forcedOpen ? null : '0px'
        }, 

          cle.use_channel({ meta: { forEach: "channel", of: $ => $.group.channels },
            style: "display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px; min-width: 200px",
            "ha_style.width": $ => $.channel.oversize ? '100%' : '33%'
          }, 

            cle.h4({ style: "margin: 0"}, 
              cle.span({style: "background: #ccc; padding: 0px 10px; border-radius: 100px; margin-right: 7px;"}, $ => $.channel.num), $ => $.channel.label
            ),

            { 'use-EmbeddedPlayer': { meta: { if: $ => $.forcedOpen && $.le.settings.useIframes && $.channel.preview },
              let: {
                url: $ => $.channel.url,
                width: $ => $.channel.oversize ? "80%" : 700,
              }
            }},

            { div: { meta: { if: $ => !$.le.settings.useIframes || !$.channel.preview},
              style: { width: "200px", height: "200px", background: "gray", borderRadius: "25px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "white", fontSize: "12rem", fontWeight: "800", cursor: "pointer" },
              class: css(`&:hover{transform: scale(1.05)} transition: 0.2s ease-out;`),
              text: $ => $.channel.num,
              onclick: $ => {
                $.le.extplayer.play($.channel)
              }
            }},

            { button: {
              text: "Open External Player",
              onclick: $ => {
                $.le.extplayer.play($.channel)
              }
            }}
          
          ),
        )
      ),
    ),

    cle.use_footer({ meta: {if: $ => $.le.extplayer.playng},
      style: "background: #cdcdcd; color: white; padding: 5px 10px; position: fixed; bottom: 0px; width: 100%"
    }, 

      cle.div({ style: "display: flex; justify-content: space-between; align-items: center;"}, 

        { h3: {
          style: "margin: 0",
          text: $ => "Now Playng: " + $.le.extplayer.playngChannel?.num + " - " + $.le.extplayer.playngChannel?.label
        }},

        { button: {
          style: "margin: 0",
          text: "Close external",
          onclick: $ => {
            $.le.extplayer.stop()
          }
        }}

      ),
    ),

  )
}