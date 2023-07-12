
import csz from 'csz'

// fix csz to avoid to use template literal and setup global
window.css = (v)=>csz([v]) 