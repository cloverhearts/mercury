# Mercury

<p align="center">
  <img src="https://user-images.githubusercontent.com/10525473/71776948-dc169700-2fdc-11ea-8e78-987f2df1c098.png">
</p>

## What is Mercury?

``` javascript
const axios = await npmModule('axios')
const response = axios.get('https://some.web.site.or.resource.api.domain')
const remoteData = response.data

const content = HTML`web data is ${remoteData}`
RENDER(content)
```

Mercury is note system such as [Apache Zeppelin](https://zeppelin.apache.org/), [Jupyter](https://jupyter.org/).

Mercury can visualize data through JavaScript

Easy to implement web app by discovery data and Share to other people mercury note through mercury exported note.

And Mercury support npm module(browser/backend) install to use.

If you will use to puppeteer(or other backend side library) and make a small web app,

mercury is good way for your needs.

[APP Download](https://github.com/cloverhearts/mercury/releases)

### Example of use

> Many big data tools has REST API, Mercury can make visualization as good as use through that.

> Mercury has integrated backend-side and frontend-side. so, if you need to make a front visualization from backend-side data. mercury make will super easy. 

> official npm repository has many library and echo system. mercury can use any library.

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
