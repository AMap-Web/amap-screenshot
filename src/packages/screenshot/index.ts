import html2canvas from 'html2canvas'

type ImageType = 'image/png' | 'image/jpeg'

interface DownloadOptions {
  filename?: string
  type?: ImageType
}


class Screenshot {
  map: any // 地图对象

  constructor(map: any) {
    if (!map) {
      throw new Error('请传入地图实例')
    }
    this.map = map

  }

  toCanvas(): Promise<HTMLCanvasElement> {
    return new Promise(resolve => {
      const mapEle = this.map.getContainer()
      const canvas = document.createElement('canvas')
      const width = mapEle.offsetWidth
      const height = mapEle.offsetHeight
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      html2canvas(mapEle, {
        allowTaint: true,
        useCORS: true,
        width,
        height,
        backgroundColor: null,
      }).then(canvas => {
        const src = canvas.toDataURL('image/png')
        const image = new Image()
        image.src = src
        image.onload = () => {
          context?.drawImage(image, 0, 0)
          resolve(canvas)
        }
      })
    })
  }

  async toDataURL(imageType: ImageType = 'image/png') {
    const canvas = await this.toCanvas()
    return canvas.toDataURL(imageType)
  }

  async download(options?: DownloadOptions): Promise<boolean>{
    let imageType = 'image/png' as ImageType
    let fileName = `amap_screenshot_${  new Date().getTime()}`
    if(options){
      if(options.type){
        imageType = options.type
      }
      if(options.filename){
        fileName = options.filename
      }else{
        if(imageType === 'image/png'){
          fileName += '.png'
        }else if(imageType === 'image/jpeg'){
          fileName += '.jpg'
        }else{
          fileName += '.png'
        }
      }
    }
    const url = await this.toDataURL(imageType)
    const downloadA = document.createElement("a");
    downloadA.download = fileName;// 设置下载的文件名，默认是'下载'
    downloadA.href = url;
    document.body.appendChild(downloadA);
    downloadA.click();
    downloadA.remove(); // 下载之后把创建的元素删除
    return true
  }
}

export {Screenshot}
