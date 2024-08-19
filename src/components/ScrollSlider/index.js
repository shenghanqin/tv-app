import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { getWebpSupport } from '../../utils/img-utils'
import "./styles.css";

let cx = require('classnames/bind')

const SLIDER_CLASSNAME = 'xxl-scroll-slider'




const Slide = React.forwardRef(
  (
    { slideIndex, children, snapPosition = '', nowIndex, activeIndex },
    ref
  ) => {

    return (
      <div className={cx(SLIDER_CLASSNAME + '-item', {
        [SLIDER_CLASSNAME + '-item-' + snapPosition]: (
          (activeIndex === -1 && nowIndex === -1 && !!snapPosition)
          || (nowIndex >= 0 && slideIndex === nowIndex)
        ),
      })}
        data-index-number={slideIndex}
        key={slideIndex}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

Slide.displayName = 'Slide'

const getObserver = (
  root = null,
  ref,
  callback,
  threshold
) => {
  const observer = ref.current
  if (observer !== null) {
    return observer
  }
  const newObserver = new IntersectionObserver(callback, {
    root,
    rootMargin: '0px',
    threshold: threshold,
  })
  ref.current = newObserver
  return newObserver
}

export const Carousel = forwardRef(
  (
    {
      isNeedPCSlide,
      isNeedScrollbar,
      slidesPerPageSettings,
      slideWidth,
      onScrollStart,
      onScrollEnd,
      onSlidesVisibilityChange,
      onSlideVisible,
      children,
      snapPosition,
      defaultIndex,
      activeIndex,
      arrowScrollPercent,

      tellIsScrollable,
      tellArrowStatus,
    },
    ref
  ) => {
    // 判断是否在滚动
    const [isScrolling, setIsScrolling] = useState(false)
    // ios13及以下版本在Tabs高亮时会触发滚动回首屏的bug。所以支持webp的ios14及其他浏览器才开启。
    const [isUseSnap] = useState(getWebpSupport())
    const [activeStyle, setActiveStyle] = useState({})
    const [isScrollable, setIsScrollable] = useState(true)
    const [nowIndex, setNowIndex] = useState(-1)
    // 滚动的内部定时器
    const scrollTimeout = useRef(null)
    // 滚动的内部定时器
    const indexTimeout = useRef(null)
    // 滚动主容器
    const sliderRef = useRef(null)
    // 子项目列表
    const slideItemRefs = useRef([])
    // prev箭头
    const arrowPrevRef = useRef(null)
    // next箭头
    const arrowNextRef = useRef(null)
    // 观察器
    const observer = useRef(null)
    // 最后一个 index
    const lastVisibleSlideIndex = useRef(0)
    // 中间的 index
    const medianVisibleSlideIndex = useRef(0)
    // 在可视区域内的index
    const visibleSlidesIndices = useRef([])
    // 可视范围。0-1？
    const intersectionThreshold = 0.5
    // 隐藏箭头所需的距离
    const hideArrowThreshold = 5

    // 添加node
    const addNode = useCallback((node, index) => {
      slideItemRefs.current[index] = node
    }, [])

    // 获取单个item的宽度
    const getSlideWidth = useCallback(
      () => {
        // (sliderRef.current?.firstChild?.firstChild)?.clientWidth || 0

        if (sliderRef.current && sliderRef.current.firstChild && sliderRef.current.firstChild) {
          return sliderRef.current.firstChild.firstChild.clientWidth
        }
        return 0
      },
      []
    )

    // 设置观察器的具体方法
    const intersectionCallback = useCallback(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target
          const index = Number(target.dataset.indexNumber)

          if (entry.intersectionRatio >= intersectionThreshold) {
            lastVisibleSlideIndex.current = index
            visibleSlidesIndices.current.push(index)
            visibleSlidesIndices.current.sort()


            if (slideItemRefs.current[index]) {
              slideItemRefs.current[index].setAttribute('aria-hidden', 'false')
            }

            onSlideVisible && onSlideVisible(index)

            return
          }

          visibleSlidesIndices.current = visibleSlidesIndices.current.filter(
            (item) => item !== index
          )
    
          if (slideItemRefs.current[index]) {
            slideItemRefs.current[index].setAttribute('aria-hidden', 'true')
          }
        })

        medianVisibleSlideIndex.current =
          visibleSlidesIndices.current[
          Math.floor(visibleSlidesIndices.current.length / 2)
          ]

        onSlidesVisibilityChange &&
          onSlidesVisibilityChange(medianVisibleSlideIndex.current)
      },
      []
    )

    // 判断容器是能左右滚动
    const isSliderScrollable = useCallback(() => {
      if (!sliderRef.current) return false

      const sliderWidth = sliderRef.current.clientWidth
      const trueWidth = sliderRef.current.scrollWidth

      let scrollable = trueWidth > sliderWidth
      setIsScrollable(scrollable)

      tellIsScrollable && tellIsScrollable(scrollable)   
      return scrollable
    }, [])

    // 平移距离 prev与next箭头控制
    const manualScroll = (direction) => {
      const dir = direction === 'prev' ? -1 : 1

      if (sliderRef.current && arrowScrollPercent !==1) {
        let clientWidth = sliderRef.current.clientWidth

        if (sliderRef.current.scrollBy) {
          sliderRef.current.scrollBy({
            top: 0,
            behavior: 'smooth',
            left: arrowScrollPercent * clientWidth * dir,
          })
          return
        }

        // 兼容旧浏览器，如IE11
        const sliderScrollLeft = sliderRef.current.scrollLeft
        sliderRef.current.scrollLeft = sliderScrollLeft + arrowScrollPercent * clientWidth * dir
        return
      } 
      if (sliderRef.current) {
        const slideWidth = getSlideWidth()
        const slidesToScroll = Math.floor(
          sliderRef.current.clientWidth / slideWidth
        )

        if (sliderRef.current.scrollBy) {
          sliderRef.current.scrollBy({
            top: 0,
            behavior: 'smooth',
            left: slidesToScroll * slideWidth * dir,
          })
          return
        }

        // 兼容旧浏览器，如IE11
        const sliderScrollLeft = sliderRef.current.scrollLeft
        sliderRef.current.scrollLeft = sliderScrollLeft + slidesToScroll * slideWidth * dir

      }
    }

    // 判断容器是否在滚动中
    const onSliderScroll = (e) => {
      // console.log(`e`, e)
      scrollTimeout.current && clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null
        setIsScrolling(false)
        onScrollEnd && onScrollEnd(medianVisibleSlideIndex.current)
      }, 250)

      if (!isScrolling) {
        setIsScrolling(true)
      }
    }

    const scrollTo = useCallback((left, behavior) => {
      if (!sliderRef.current) return

      sliderRef.current.scrollTo({
        top: 0,
        behavior,
        left,
      })
    }, [])

    // 这个方法适合Items宽度较为接近的情况。
    // 不适合Tabs中长短不一的。可以使用activeIndex来完成。
    const scrollToSlide = useCallback((index, behavior = 'smooth') => {

      if (!sliderRef.current) return

      const sliderScrollLeft = sliderRef.current.scrollLeft
      const sliderWidth = sliderRef.current.clientWidth
      const slideWidth = getSlideWidth()
      const slideLeft = slideWidth * index

      // only scroll to the left if target slide is outside of view to the left
      if (slideLeft < sliderScrollLeft) {
        scrollTo(slideLeft, behavior)
        return
      }

      // only scroll to the right if target slide is outside of view to the right
      if (slideLeft + slideWidth > sliderScrollLeft + sliderWidth) {
        scrollTo(slideLeft + slideWidth - sliderWidth, behavior)
      }
    }, [])


    // 暴露给父级的方法，跳到对应的slideItem
    useImperativeHandle(ref, () => ({
      scrollToSlide,
      sliderRef,
      isSliderScrollable,
      manualScroll
    }))

    useEffect(() => {
      if (observer.current) observer.current.disconnect()
      const newObserver = getObserver(
        sliderRef.current,
        observer,
        intersectionCallback,
        intersectionThreshold
      )
      for (const node of slideItemRefs.current) {
        if (node) {
          newObserver.observe(node)
        }
      }
      return () => newObserver.disconnect()
    }, [React.Children.count(children)])

    const setNowIndexHandler = (index) => {
      if (!isUseSnap) return

      indexTimeout.current && clearTimeout(indexTimeout.current)
      setNowIndex(index)
      indexTimeout.current = setTimeout(() => {
        setNowIndex(-1)
      }, 300)
    }

    useEffect(() => {
      if (defaultIndex >= 0) {
        // setNowIndexHandler(defaultIndex)
        // 默认高亮的，一般宽度接近
        scrollToSlide(defaultIndex, 'auto')
      }
    }, [])

    useEffect(() => {
      if (activeIndex >= 0) {
        // 激活高亮的，适用于Tabs中文字宽度不一样的
        setNowIndexHandler(activeIndex)
      }
    }, [activeIndex])

    // 滚动条偏移位置
    useEffect(() => {
      if (!isScrolling) {
        // 滚动结束后，设置
        const getActiveStyle = () => {
          const sliderScrollLeft = sliderRef.current.scrollLeft
          const trueWidth = sliderRef.current.scrollWidth
          const sliderWidth = sliderRef.current.clientWidth
          const maxDiff = trueWidth - sliderWidth

          return {
            transform: `translateX(${sliderScrollLeft * 100 / maxDiff}%)`
          }
        }
        if (isNeedScrollbar) {
          setActiveStyle(getActiveStyle())
        }
        return
      }

      onScrollStart && onScrollStart(medianVisibleSlideIndex.current)
    }, [isScrolling])

    // 设置左右切换按钮
    useEffect(() => {

      if (!isNeedPCSlide) return
      
      if (!isSliderScrollable()) return

      if (!sliderRef.current) return

      if (isScrolling) {

        if (tellArrowStatus) {
          tellArrowStatus({
            isScrolling: true,
            nextDisabled: false,
            prevDisabled: false,
          })
          return
        }

        if (arrowNextRef.current) arrowNextRef.current.style.display = 'none'
        if (arrowPrevRef.current) arrowPrevRef.current.style.display = 'none'

        return
      }

      if (sliderRef.current.scrollLeft <= hideArrowThreshold) {
        if (tellArrowStatus) {
          tellArrowStatus({
            isScrolling: false,
            nextDisabled: false,
            prevDisabled: true,
          })
          return
        }
        if (arrowNextRef.current) arrowNextRef.current.style.display = 'block'
        if (arrowPrevRef.current) arrowPrevRef.current.style.display = 'none'

      } else if (

        sliderRef.current.clientWidth + sliderRef.current.scrollLeft >=
        sliderRef.current.scrollWidth - hideArrowThreshold

      ) {
        if (tellArrowStatus) {
          tellArrowStatus({
            isScrolling: false,
            nextDisabled: true,
            prevDisabled: false,
          })
          return
        }
        if (arrowNextRef.current) arrowNextRef.current.style.display = 'none'
        if (arrowPrevRef.current) arrowPrevRef.current.style.display = 'block'

      } else {
        if (tellArrowStatus) {
          tellArrowStatus({
            isScrolling: false,
            nextDisabled: false,
            prevDisabled: false,
          })
          return
        }
        if (arrowNextRef.current) arrowNextRef.current.style.display = 'block'
        if (arrowPrevRef.current) arrowPrevRef.current.style.display = 'block'
      }
    }, [React.Children.count(children), isScrolling])

    return (
      <div className={cx(SLIDER_CLASSNAME)}>
       
        <div className={cx(SLIDER_CLASSNAME + '-inner')} onScroll={onSliderScroll} ref={sliderRef}>
          <div className={cx(SLIDER_CLASSNAME + '-list')}>
            {Children.map(children, (child, index) => (
              <Slide
                key={index}
                slideIndex={index}
                activeIndex={activeIndex}
                nowIndex={nowIndex}
                slidesPerPageSettings={slidesPerPageSettings}
                slideWidth={slideWidth}
                snapPosition={snapPosition}
                ref={(node) => addNode(node, index)}
              >
                {child}
              </Slide>
            ))}
          </div>
        </div>
        {
          isScrollable && (
            <>
              {
                isNeedScrollbar && (
                  <div className={cx(`${SLIDER_CLASSNAME}-scrollbar`)}>
                    <div className={cx(`${SLIDER_CLASSNAME}-scrollbar-active`)} style={activeStyle}></div>
                  </div>
                )
              }
              {isNeedPCSlide && !tellArrowStatus && (
                <>
                  <div className={cx(SLIDER_CLASSNAME + '-nav', SLIDER_CLASSNAME + '-nav-prev')}
                    ref={arrowPrevRef}
                    direction={'prev'}
                    onClick={() => manualScroll('prev')}
                  >
                  </div>
                  <div className={cx(SLIDER_CLASSNAME + '-nav', SLIDER_CLASSNAME + '-nav-next')}
                    ref={arrowNextRef}
                    direction={'next'}
                    onClick={() => manualScroll('next')}
                  >
                  </div>
                </>
              )}
            </>
          )
        }
      </div>
    )

  })

Carousel.displayName = 'Carousel'

Carousel.propTypes = {
  /**
   * 是否需要PC点击滑动按钮
   */
  isNeedPCSlide: PropTypes.bool,
  /**
   * 是否需要底部滚动条
   */
  isNeedScrollbar: PropTypes.bool,
  /**
   * 默认序号
   */
  defaultIndex: PropTypes.number,
  /**
   * 激活序号
   */
  activeIndex: PropTypes.number,
  /**
   * 吸住的位置 start center end
   */
  snapPosition: PropTypes.string,
  /**
   * 滚动开始
   */
  onScrollStart: PropTypes.func,
  /**
   * 滚动结束
   */
  onScrollEnd: PropTypes.func,
  /**
   * 显示了多少个
   */
  onSlidesVisibilityChange: PropTypes.func,
  /**
   * 显示哪一个
   */
  onSlideVisible: PropTypes.func,
  /**
   * 左右箭头移动的距离
   * 1：表示 每个等宽，所以移动等宽Tab的一整页距离
   * 2：不等宽的情况，使用单页的宽度的百分比
   */
  arrowScrollPercent: PropTypes.number,

  /**
  * 告知当前是否能滚动
  */
  tellIsScrollable: PropTypes.func,
  /**
   * 左右箭头的状态同步出来
   */
  tellArrowStatus: PropTypes.func,
}

Carousel.defaultProps = {
  snapPosition: 'start',
  defaultIndex: -1,
  activeIndex: -1,
  isNeedScrollbar: true,
  isNeedPCSlide: true,
  arrowScrollPercent: 1
}

export default Carousel