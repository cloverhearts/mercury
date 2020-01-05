# Mercury
<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/10525473/71775435-88984f00-2fc4-11ea-91dc-49bc37e23160.png" style="height: 100px;" />
</div>

## What is Mercury?

``` javascript
const axios = await npmModule('axios')
const response = axios.get('https://some.web.site.or.resource.api.domain')
const remoteData = response.data

const content = HTML`web data is ${remoteData}`
RENDER(content)
```

Mercury is note system. like is [Apache Zeppelin](https://zeppelin.apache.org/), [Jupyter](https://jupyter.org/).

Mercury is a tool visualized by data retrieval through JavaScript.

Easy to implement and use as a web application.

The npm module can be downloaded and integrated directly, and the backend and frontend can be used together.

### Example of use

> Existing storage, including many big data tools, supports the REST API. Simple implementation and control of apps working through the REST API

> Browse libraries such as Puppeteer can be used to create notes targeted for analytics, automation, and external domain sites.

> It is possible to develop control app by integrating SQL and environment using npm packages.


## Features screenshot

### WYSIWYG Editor

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/10525473/71775647-8daacd80-2fc7-11ea-8204-a9766a9f2153.gif" />
</div>

### Running javascript with npm module ( [hello-mercury](https://www.npmjs.com/package/hello-mercury) )
<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/10525473/71775585-75867e80-2fc6-11ea-9abb-cca346059e30.png" />
</div>

### Screenshot other website with npm Puppeteer

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/10525473/71775732-1e35dd80-2fc9-11ea-817e-ee6a10690270.png" />
  <img src="https://user-images.githubusercontent.com/10525473/71775736-30178080-2fc9-11ea-9d00-4d0fb027a722.png" />
</div>

## For Developer
### How to use mercury?

```
git clone https://github.com/cloverhearts/mercury.git
cd mercury
npm install
npm run start && npm run dev
```

### How to build mercury?

#### ALL Platform

```
npm run build
```

##### Windows 32bit and 64bit

```
npm run build:win
```

##### OSX

```
npm run build:osx
```


And, You can find out mercury installation file in dist directory.
