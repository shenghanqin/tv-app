/**
 * 图片模块
 * @module utils/img-utils
*/

/**
 * 判断浏览器是否兼容 Webp 格式图片
 */
let hasWebP = false
function checkWebp () {
  var img = new Image()
  img.onload = function () {
    hasWebP = !!(img.height > 0 && img.width > 0)
  }
  img.onerror = function () {
    hasWebP = false
  }
  img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
}

checkWebp()

export const getWebpSupport = () => hasWebP

/**
 * 获取图片原始地址（去除已拼接的裁剪参数）
 * @param {string} url 图片地址
 * @returns {string} 获取的源图片地址
 */
export function getOriginImgUrl(url = '') {
  let originUrl = url.split('?').length > 0 ? url.split('?')[0] : url

  return originUrl || ''
}


const ccImageRegx = /\s*http(s)?:\/\/(cc.hjfile.cn|n1image.hjfile.cn)\s*/

/**
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会缩放至该宽度（等比）
 * 宽度小于改宽度的时候图片不缩放
 *
 * @param {string} url 传入的图片地址
 * @param {string} width 指定的图片最大宽度
 * @param {string} prefix 拼接的前缀，默认为 `?imageView2/2/w/`
 * @returns {string} 根据参数拼接的新图片地址
 */
export function getImgByWidth(url, maxWidth, prefix = '?imageView2/2/w/') {
  // if(!ccImageRegx.test(url)) return url
  let origin = getOriginImgUrl(url)
  return `${origin}${prefix}${Math.ceil(maxWidth)}`
}

/**
 * 默认返回 webp 格式
 * 传入原始图片url，根据指定宽度获取图片地址，宽度大于`width`的时候会缩放至该宽度（等比）
 * 宽度小于改宽度的时候图片不缩放
 *
 * @param {string} url 传入的图片地址
 * @param {string} width 指定的图片最大宽度
 * @param {string} prefix 拼接的前缀，默认为 `?imageView2/2/w/`
 * @returns {string} 根据参数拼接的新图片地址
 */
export function getWebpByWidth(url, maxWidth, prefix = '?imageView2/2/w/') {
  // if(!ccImageRegx.test(url)) return url
  let origin = getOriginImgUrl(url)

  return `${origin}${prefix}${Math.ceil(maxWidth)}${hasWebP ? '/format/webp/ignore-error/1' : ''}`
}