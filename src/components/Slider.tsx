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
import { useEffect, useState } from "react"

type Props = {
  data: any[]
  renderHeader?: (currentIndex: number, total: number) => React.ReactNode
  renderItem?: (item: any) => React.ReactNode
  containerProps?: SwiperSlideProps
} & SwiperProps

const Slider: React.FC<Props> = ({
  containerProps,
  data,
  initialSlide,
  renderHeader,
  renderItem,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>()

  useEffect(() => {
    if (initialSlide !== undefined && controlledSwiper) {
      setCurrentIndex(initialSlide)
      controlledSwiper.slideTo(initialSlide)
    }
  }, [initialSlide, controlledSwiper])

  return (
    <section className="slider-wrapper">
      {renderHeader?.(currentIndex, data.length)}
      {data.length > 0 ? (
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Navigation, Virtual]}
          onSlideChange={({ activeIndex }) => setCurrentIndex(activeIndex)}
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

export default Slider
