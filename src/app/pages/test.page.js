import {SmartAlias, cle} from 'cle.js/lib'

export const Testpage = async (state, params)=>{

  console.log(state, params)

  return cle.div({ style: "min-height: 100vh"}, 

    { 'component-SettingsModel': { id: "settings" }},
    { 'component-LocalDbService': { id: "localdb" }},
    { 'component-ExtPlayerService': { id: "extplayer" }},
    { 'component-ChannelSearchService': { id: "chsearch" }},
    
    cle.use_navbar({ style: "background: #f4f5f6; border-bottom: 0.1rem solid #d1d1d1; padding: 5px 10px; position: sticky;" }, 
      cle.span({style: "margin: 0px; display: flex; justify-content: space-between; align-items: center;"}, 
        
        cle.h2({style: "margin: 0px"}, "Web Tv "),

        cle.span({ style: "display: flex; justify-content: space-between; align-items: flex-end; gap: 25px"},
            
          { 'use-ChannelSearchInput': {} },
          
          { 'use-Toggle': {
            let: {
              status: SmartAlias("$.le.settings.useIframes"),
              customStatus: { "true": "In App Preview: ON", "false": "In App Preview: OFF" },
            }
          }}
        )
      ),
    ),

    cle.use_RemoteController({

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
      style: "padding: 25px",
      open_group: undefined, // utils for autoclose open group if max 1 group enabled
    },

      cle.use_content({ meta: { forEach: "group", of: $ => $.le.chsearch.filtering ? $.le.chsearch.getFilteredChannels($.le.localdb.channels) : $.le.localdb.channels, full_optimized: true },
        open: false,
        forcedOpen: $ => $.open || $.le.chsearch.filtering,
        style: "margin: 25px",
        
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
            overflow: 'scroll',
            justifyContent: 'flex-start',
            gap: '10%',
            marginTop: '25px'
          },
          class: [css(`transition: height 1s ease-out;`)], // TODO: work on transition..
          "ha_style.height": $ => $.forcedOpen ? null : '0px'
        }, 

          cle.use_channel({ meta: { forEach: "channel", of: $ => $.group.channels },
            style: "display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px",
            "ha_style.width": $ => $.channel.oversize ? '100%' : '33%'
          }, 

            cle.h4({ style: "margin: 0"}, 
              cle.span({style: "background: #ccc; padding: 0px 10px; border-radius: 100px; margin-right: 7px;"}, $ => $.channel.num), $ => $.channel.label
            ),

            { 'use-EmbeddedPlayer': { meta: { if: $ => $.forcedOpen && $.le.settings.useIframes },
              let: {
                url: $ => $.channel.url,
                width: $ => $.channel.oversize ? "80%" : 700,
              }
            }},

            { div: { meta: { if: $ => !$.le.settings.useIframes },
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

        { h2: {
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