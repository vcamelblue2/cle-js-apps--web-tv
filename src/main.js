/**
*
DISCLAIMER: 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

THIS SOFTWARE IS NOT AFFILIATED, CONNECTED OR ASSOCIATED IN ANY WAY WITH ANY OF THE LINKED WEBSITE. 
IT DOES NOT COLLECT DATA, DOES NOT USE COOKIES, DOES NOT MAKE PROFIT FROM THE LINKED SERVICER, FROM ADS OR ANY OTHER FORM.
IT'S SCOPE IS TO PRESENT, ALL IN ONE PAGE, THE LINKS TO SOME OF THE OFFICIAL ITALIAN TV STREAMING WEBSITE/SERVICES,
OFFERING A CUTE AND HANDY VIEW FOR A BETTER USER EXPERIENCE. THE CONTENTS ARE NOT BEING ALTERED OR RETOUCHED IN ANY WAY.
THE CONTENTS RESPONSIBILITY, THE USAGE NORMS AND CONDITIONS REMAIN TO THE LINKED WEBSITES.
USER REMAIN RESPONSIBLE FOR WRONG USAGE OF THIS SOFTWARE.
* 
*/


// import Clean.js
import {LE_InitWebApp, cle} from 'cle.js/lib'
import {InitRouter, Router, RedirectTo} from "cle.js/routing/lite_routing"

import "./utils/csz.js"

import "./app/global-di-components/**/*.js"

import "./style.css"

// import { Homepage } from './app/pages/home.page.deps'
import { Testpage } from './app/pages/test.page.js'



LE_InitWebApp(async ()=>{

  await InitRouter({

    pages: {
      "": Testpage

      // "/": Homepage

      // "/": RedirectTo("/home"),
      // "/home": HomePage,
      // "/details/:detail_id": DetailPage,
      // "/details/:detail_id/subdetails": SubDetailsPage,
      // "/details/:detail_id/subdetails/:subdetail_id": SubDetailPage,

    },
  
    defaultRoute: "/"
  })

})
