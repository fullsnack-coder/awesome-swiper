import SwiperCore, { Navigation, Virtual } from "swiper"

import {
  Swiper,
  SwiperProps,
  SwiperSlide,
  SwiperSlideProps,
} from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/virtual"
import {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react"

type Props = {
  data: any[]
  renderHeader?: (currentIndex: number, total: number) => React.ReactNode
  renderItem?: (item: any) => React.ReactNode
  containerProps?: SwiperSlideProps
  onChangeSlider?: (index: number) => void
} & Omit<SwiperProps, "onSlideChange">

export type HandledRef = {
  swipeTo: (index: number) => void
}

const Slider = forwardRef<HandledRef, Props>(
  (
    {
      containerProps,
      data,
      initialSlide,
      renderHeader,
      renderItem,
      onChangeSlider,
      ...rest
    },
    innerRef
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>()

    useImperativeHandle(innerRef, () => ({
      swipeTo: (index: number) => {
        if (controlledSwiper)
          controlledSwiper.slideTo(clamp(index, 0, data.length - 1))
      },
    }))

    const handleSlideChange = useCallback(
      ({ activeIndex }) => {
        setCurrentIndex(activeIndex)
        onChangeSlider?.(activeIndex + 1)
      },
      [onChangeSlider]
    )

    useEffect(() => {
      if (initialSlide !== undefined && controlledSwiper) {
        setCurrentIndex(initialSlide)
        controlledSwiper.slideTo(initialSlide)
      }
    }, [initialSlide, controlledSwiper])

    return (
      <section className="slider-wrapper">
        {renderHeader?.(currentIndex + 1, data.length)}
        {data.length > 0 ? (
          <Swiper
            onSwiper={setControlledSwiper}
            modules={[Navigation, Virtual]}
            onSlideChange={handleSlideChange}
            initialSlide={initialSlide}
            {...rest}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} virtualIndex={index} {...containerProps}>
                {renderItem?.(item)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </section>
    )
  }
)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default Slider
