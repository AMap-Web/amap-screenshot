# @amap/screenshot
[![npm (tag)](https://img.shields.io/npm/v/@amap/screenshot)](https://www.npmjs.org/package/@amap/screenshot)
[![NPM downloads](http://img.shields.io/npm/dm/@amap/screenshot.svg)](https://npmjs.org/package/@amap/screenshot)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/@amap/screenshot/dist/index.js?compression=gzip&label=gzip%20size:%20JS)
[![NPM](https://img.shields.io/npm/l/@amap/screenshot)](https://github.com/AMap-Web/amap-screeshot)
[![star](https://badgen.net/github/stars/amap-web/amap-screeshot)](https://github.com/AMap-Web/amap-screeshot)

### 简介
本项目为高德地图的截图插件

### 加载方式
当前项目支持CDN加载和npm加载两种方式。

#### CDN加载
CDN加载需要先加载高德地图JS，代码如下
```js
<!--加载高德地图JS 2.0 -->
<script src = 'https://webapi.amap.com/maps?v=2.0&key=YOUR_KEY'></script>
<!--加载screenshot插件 -->
<script src="https://cdn.jsdelivr.net/npm/@amap/screenshot/dist/index.js"></script>
```

#### npm加载
npm加载可以直接使用安装库
```shell
npm install '@amap/screenshot'
```

### 使用示例

#### CDN方式
```js
<script src = 'https://webapi.amap.com/maps?v=2.0&key=YOUR_KEY'></script>
<script src="https://cdn.jsdelivr.net/npm/@amap/screenshot/dist/index.js"></script>
<script type="text/javascript">
  const center = [116.335036, 39.900082];
  const map = new AMap.Map(app', {
      center: center,
      zoom: 10,
      viewMode: '3D',
      pitch: 35,
      WebGLParams: {
        preserveDrawingBuffer: true
      }
    });
      map.add(new AMap.Marker({
        position: center
      }))
      const screenshot = new AMap.Screenshot(map)
      function screenMap(){
        screenshot.toDataURL().then(url => {
          document.getElementById('test').setAttribute('src', url)
        })
      }
</script>
```

#### npm方式
```js
import {Screenshot} from '@amap/screenshot'
const map = new AMap.Map('app', {
  center: [120,31],
  zoom: 14,
  viewMode: '3D',
  pitch: 35,
  WebGLParams: {
    preserveDrawingBuffer: true
  }
})
const screenshot = new Screenshot(map)
function screenMap() {
  screenshot.toDataURL().then(url => {
    console.log('url: ', url)
  })
}
```

### API文档说明

#### Screenshot说明
地图截图<br/>
``  new AMap.Screenshot(map: AMap.Map)  ``<br/>
###### 参数说明
map: 地图实例对象<br/>

###### 成员函数

| 函数名       | 入参                                                    | 返回值                          | 描述                                              |
|-----------|-------------------------------------------------------|------------------------------|-------------------------------------------------|
| toCanvas  | 无                                                     | Promise\<HTMLCanvasElement\> | 返回生成的canvas对象                                   |
| toDataURL | imageType(可选值：`image/png` `image/jpeg`，默认`image/png`) | Promise\<string\>              | 返回生成的图片的base64值                                 |
| download  | {filename: string, type: imageType}                            | Promise\<boolean\>             | 下载文件，默认下载png格式，可以修改为jpg，type的值与上面toDataURL的参数一致 |

###### 事件列表

| 事件名 | 参数 | 描述 |
| ---- | ---- | ---- |

