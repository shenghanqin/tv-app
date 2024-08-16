const userAgent = window.navigator.userAgent
const userAgentLowerCase = userAgent.toLocaleLowerCase()
// let app = navigator.appVersion

export const isAndroid = () => {
  return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1
}

export const isIOS = () => {
  return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
 


export function getTouchActionProps() {

  let touchMap = {}
  let cssSupports = window.CSS && window.CSS.supports
  let touchAll = ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none']

  touchAll.forEach((val) => {

    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true
  })
  return touchMap
}


export function detectTouchNone() {
  let cssSupports = window.CSS && window.CSS.supports
  return cssSupports ? window.CSS.supports('touch-action', 'none') : true
}

export function detectAspectRatio() {
  let cssSupports = window.CSS && window.CSS.supports
  return cssSupports ? window.CSS.supports('aspect-ratio', '1/1') : false
}