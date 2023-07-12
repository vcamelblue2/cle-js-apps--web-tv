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
