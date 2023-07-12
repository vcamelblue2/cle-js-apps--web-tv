import { ComponentsRegistry, html, f, Bind, pass } from "cle.js/lib";


// FROM Milligram PLUS extension (recolorized): https://evodim.github.io/mgplus/#home-extensions
let cls = css(`
  --mg-color-dark: #000000;
  --mg-color-light: #fcfcfc;
  --mg-color-red: #dc3545;
  --mg-color-orange: #fd7e14;
  --mg-color-blue: #007bff;
  --mg-color-green: #28a745;
  --mg-control-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.15);
  --mg-control-radius: 1.5rem;
  --mg-input-radius: 1rem;
  --mg-color-primary: #9b4dca; //#ffb700;
  --mg-color-initial: #302f2f !important;
  --mg-color-secondary: #dadada !important;
  --mg-color-tertiary: #a7a7a7 !important;
  --mg-color-quaternary: #817f7f !important;
  --mg-color-quinary: #4e4e4e !important;

  display: inline-block;

  .mg-toggle {
    position: relative;
    padding-left: 3.8em;
    margin-right: 1.1em;
    // margin-bottom: 1rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .mg-toggle input {
    opacity: 0;
    display: none;
    position: absolute;
    height: 0;
    width: 0;
  }
  
  .mg-toggle input:checked ~ .checkmark {
    background-color: var(--mg-color-primary);
  }
  .mg-toggle input ~ .checkmark {
    background-color: var(--mg-color-quaternary);
  }
  .mg-toggle .checkmark {
    border-radius: var(--mg-control-radius);
    position: absolute;
    top: 0;
    left: 0;
    height: 1.48em;
    width: 3em;
    // border-style: solid;
    // border-color: var(--mg-color-quaternary);
    // border-width: thin;
    transition: all 0.3s;
  }

  .mg-toggle input:checked ~ .checkmark:after {
    left: 1.59em;
  }
  .mg-toggle .checkmark:after {
    content: "";
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 1.41em;
    width: 1.4em;
    left: 0;
    background-color: var(--mg-color-light);
    -webkit-transition: 0.3s;
    transition: 0.3s;
    box-shadow: var(--mg-control-shadow);
  }

  .status-label{
    position: relative;
    top: 1px;
  }
`)

let extraDefs = { iptDefs: {a_checked: Bind(f`@status`)} }

ComponentsRegistry.define({ Toggle:
  html(/* html */`
    <view>
      <label class="mg-toggle">
        <span class="status-label">{{ @customStatus[@status] }}</span>
        <input type="checkbox" extra-defs="iptDefs">
        <span class="checkmark"></span>
      </label>
    </view>
  `, {

    let:{
      status: false,
      customStatus: { "true": "ON", "false": "OFF" },
    },

    class: cls

  }, pass, extraDefs).view 
}, 'span')
// TRICK: extract the definition from the html component ({view: {...}) with "".view" and associate it to the "Toggle" def, then replace the root as "span" when used
