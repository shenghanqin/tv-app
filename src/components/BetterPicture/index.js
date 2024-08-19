import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntersection } from '../../hooks/use-intersection'
import { detectAspectRatio } from '../../utils/device-utils'

import "./styles.css";


let cx = require('classnames/bind')

const PREFIX_CLASS = 'xxl-better-picture'

const isSupportRatio = detectAspectRatio()

const littleImg = 'data:image/png;base64,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'

const getHttpsSrc = (src = '') => src.replace('http://', 'https://')

// compressImage
const compressImage = (src, maxImageWidth, needWebp) => {
  // if (src.startsWith('data:')) return src

  // let compressedSrc = `${getHttpsSrc(src)}?imageView2/2`

  // if (maxImageWidth) {
  //   compressedSrc = `${compressedSrc}/w/${maxImageWidth}`
  // }

  // if (needWebp) {
  //   compressedSrc = `${compressedSrc}/format/webp/ignore-error/1`
  // }

  return src
}

const getImgRealProps = ({
  src,
  width,
  height,
  ratio,
  maxImageWidth
}) => {
  if (ratio) {
    width = maxImageWidth
    height = parseInt(maxImageWidth * ratio)
  } else if (width && height) {
    ratio = height / width
  }
  
  let blurSrc = littleImg // 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'  //getHttpsSrc(src) + `?imageMogr2/thumbnail/30x30/blur/3x5`

  return {
    widthInt: width,
    heightInt: height,
    ratioInt: ratio || 0,
    blurSrc,
    maxWidthInt: maxImageWidth || width * 3
  }
}

// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, onLoadingComplete) {
  if (!img) {
    return
  }

  // console.log(`img.src`, img.src)
  const handleLoad = () => {
    if (!img.src.startsWith('data:')) {
      const p = 'decode' in img ? img.decode() : Promise.resolve()
      p.catch(() => { }).then(() => {
        if (onLoadingComplete) {
          onLoadingComplete()
        }
      })
    }
  }
  if (img.complete) {
    // If the real image fails to load, this will still remove the placeholder.
    // This is the desired behavior for now, and will be revisited when error
    // handling is worked on for the image component itself.
    handleLoad()
  } else {
    img.onload = handleLoad
  }
}

export default function BetterPicture({
  src,
  layout,
  objectFit,
  width,
  height,
  ratio,
  maxImageWidth,
  className,
  disableBlur,
  enableWebp,
  rootMargin,
  withAnimation,
  onClick
}) {
  const {
    blurSrc,
    widthInt,
    heightInt,
    ratioInt,
    maxWidthInt
  } = getImgRealProps({ src, width, height, ratio, maxImageWidth })

  const [setRef, isIntersected] = useIntersection({
    rootMargin,
    // threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    disabled: disableBlur,
  })

  const showBlur = ratioInt > 0 && !disableBlur
  const isVisible = disableBlur || isIntersected
  const srcAttr = isVisible ? src : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const [isLoaded, setLoaded] = useState(disableBlur)
  const [blurLoading, setBlurLoading] = useState(showBlur)

  // picture包装层
  let innerStyle = {}
  let innerClassName = {}
  // 实际图片
  let imgStyle = {}

  if (showBlur) {
    if (isSupportRatio) {
      // imgStyle.aspectRatio = `${widthInt}/${heightInt}`
      imgStyle[`--${PREFIX_CLASS}-ratio`] = `${widthInt}/${heightInt}`
    } else {
      innerStyle = {
        paddingTop: `${heightInt / widthInt * 100}%`,
      }
      innerClassName = PREFIX_CLASS + '-inner-abs'

      if (layout === 'fixed') {
        innerStyle.width = widthInt + 'px'
      }
    }
  }
  
  if (objectFit) {
    imgStyle.objectFit = objectFit
  }

  const onLoadingComplete = () => {
    !isLoaded && setLoaded(true)
  }

  const onAnimationEnd = () => {
    setBlurLoading(false)
  }

  return (
    <div
      className={cx(PREFIX_CLASS, (PREFIX_CLASS + '-' + (layout || 'layout-none')), className, {
        [PREFIX_CLASS + '-with-blur']: ratioInt > 0,
        [PREFIX_CLASS + '-with-ani']: showBlur && withAnimation,
        [PREFIX_CLASS + '-img-done']: isLoaded,
      })}
      onClick={onClick}
    >
      {blurLoading && (
        <>
          {
            isSupportRatio
              ? (
                <img className={cx(PREFIX_CLASS + '-blur', isLoaded && PREFIX_CLASS + '-blur-hide')} width={widthInt} src={blurSrc}
                  style={{
                    [`--${PREFIX_CLASS}-ratio`]: `${widthInt}/${heightInt}`
                  }}
                />
              )
              : (
                <svg className={cx(PREFIX_CLASS + '-blur', isLoaded && PREFIX_CLASS + '-blur-show')} width={widthInt} height={heightInt} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{
                    backgroundImage: `url(${blurSrc})`
                  }}
                />
              )
          }
        </>
      )}
      <picture className={cx(PREFIX_CLASS + '-inner', innerClassName)} style={innerStyle}>
        {!srcAttr.startsWith('data:') && enableWebp && <source type="image/webp" srcSet={compressImage(srcAttr, maxWidthInt, true)} />}
        <img
          src={compressImage(srcAttr, maxWidthInt)}
          className={cx(PREFIX_CLASS + '-img')}
          width={widthInt}
          onAnimationEnd={onAnimationEnd}
          ref={(img) => {
            setRef(img)
            !isLoaded && handleLoading(img, onLoadingComplete)
          }}
          style={imgStyle}
        />
      </picture>
    </div>
  )
}

BetterPicture.propTypes = {
  /**
   * 图片src
   */
  src: PropTypes.string,
  /**
   * 图片布局方式
   */
  layout: PropTypes.oneOfType(['fill', 'fixed', 'intrinsic', 'responsive', undefined ]),
  /**
   * 图片Fit
   */
  objectFit: PropTypes.oneOfType(['fill', 'cover', 'contain', undefined ]),
  /**
   * 图片显示宽度
   */
  width: PropTypes.number,
  /**
   * 图片显示高度
   */
  height: PropTypes.number,
  /**
   * 七牛图片的最大宽度
   */
  maxImageWidth: PropTypes.number,
  /**
   * 图片的高宽比 h / w
   */
  ratio: PropTypes.number,
  /**
   * 是否启用webp
   */
  enableWebp: PropTypes.bool,
  /**
   * 禁用blur，直接加载大图
   */
  disableBlur: PropTypes.bool,
  /**
   * 自定义 ClassName
   */
  className: PropTypes.string,
  /**
   * 用来扩展或缩小rootBounds这个矩形的大小
   * 从而影响intersectionRect交叉区域的大小
   * 它使用CSS的定义方法，比如10px 20px 30px 40px，表示 top、right、bottom 和 left 四个方向的值
  */
  rootMargin: PropTypes.string,
  /**
   * 是否使用loading动画
   */
  withAnimation: PropTypes.bool,
  /**
   * 点击方法
   */
  onClick: PropTypes.func
}

BetterPicture.defaultProps = {
  src: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
  enableWebp: true,
  className: '',
  disableBlur: false,
  rootMargin: '0px',
  withAnimation: true,
  onClick: () => {}
}