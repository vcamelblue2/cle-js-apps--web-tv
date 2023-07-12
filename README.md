# Clean.js App Template - With Html Components Style

This is a template project for Cle Apps with Html Components style as preferred Cle style and CSZ for css-in-js, usefull as clone-to-start project with pre-configured Parcell for development & production build.

Install the project:
```sh
npm install
```

Run the project in development on port 4200:
```sh
npm start
```

Build the project:
```sh
npm build
```

Test locally the production build on port 4200:
```sh
npm run test-build
```

### Generate Remote Html Components
To generate a remote html components:

generate a `".ui.html"` file 
```html
<script>...</script>

<view>...</view>

<style>...</style>
```
and generate a `".deps.js"` file with
```js

import html from "bundle-text:./xxx.ui.html" // for inling and disable remote / lazy import

export const Component = defineHtmlComponent(html, { isRemote: false }) // setup script / def Deps Injection here


// import html from "./xxx.ui.html"  for remote and "lazy" import
// export const Component = defineHtmlComponent(html, { isRemote: true })

```

Use the component by awaiting it and setup parametrs
```js
import { Component } from "./xxx.deps.js"

... async ... () => {
  await Component()
}
```


### Notes
- The .terserrc is required in production, shuld not be changed / removed to work properly. It prevent the "$" mangling during minifaction

- Mix any style but remember that Imports should be made in .js file by .js file, because of Parcel static analysis. Untill a specific plugin will be created, Parcel is not aware of what .html file does and how handle imports.

- Static file location and handling should be manually configured

- Handle the pre-configured .proxyrc in case of /api reverse proxy