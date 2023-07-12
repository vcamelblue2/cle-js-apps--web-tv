import { ComponentsRegistry, str, str_ } from "cle.js/lib";

ComponentsRegistry.define({ EmbeddedPlayer: {

  let: {
    url: null,
    width: 700,
    height: 700,

    exposed_iframe: $ => $.ref.frame.el
  },

  style: { 
    display: str.flex, alignItems: str.center, justifyContent: str.center, textAlign: str.center,
    color: str.black, 
    cursor: str.pointer,
    backgroundColor: '#ccc',
    width: '100%',
    height: '50vh',
    overflow: str.scroll,
    borderRadius: str_._25px,  // equivalent to borderRadius: " 5px"
  },

  childsRef: {
    frame: "single"
  },

  "=>": [

    { iframe: { name: "frame",
      
      attrs: {
        src: $ => $.url,
        height: $ => $.height+"px",
        width: $ => $.width+"px",
        name: "myiFrame",
        scrolling: "yes",
        frameborder: "1",
        marginheight: "0px",
        marginwidth: "0px",
        allowfullscreen: 'true'
      },
      
      style: {
        border: "0px #ffffff none",
        margin: "auto"
      }
    }}
    
  ]

}})