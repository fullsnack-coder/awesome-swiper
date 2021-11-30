import { Navigation, Virtual } from "swiper"

import {
  Swiper,
  SwiperProps,
  SwiperSlide,
  SwiperSlideProps,
} from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/virtual"
import { useState } from "react"

type Props = {
  data: any[]
  renderHeader?: (currentIndex: number, total: number) => React.ReactNode
  renderItem?: (item: any) => React.ReactNode
  containerProps?: SwiperSlideProps
  defaultIndex?: number
} & Omit<SwiperProps, "initialSlide">

const Slider: React.FC<Props> = ({
  containerProps,
  data,
  renderHeader,
  renderItem,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="slider-wrapper">
      {renderHeader?.(currentIndex, data.length)}
      <Swiper
        modules={[Navigation, Virtual]}
        onSlideChange={({ activeIndex }) => {
          setCurrentIndex(activeIndex)
          console.log("changing...", activeIndex)
        }}
        {...rest}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} virtualIndex={index} {...containerProps}>
            {renderItem?.(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Slider
