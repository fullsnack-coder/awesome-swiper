import { useEffect, useRef, useState } from "react"
import "./App.css"
import Slider, { HandledRef as SliderRef } from "./components/Slider"

import { getImages, Image } from "./services"

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [initialSlide, setInitialSlide] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const [useAltered, setUseAltered] = useState(false)
  const [pageNumber, setPageNumber] = useState("1")
  const sliderRef = useRef<SliderRef>(null)

  const alteredImages = images.filter((_, i) => i < 10)

  useEffect(() => {
    getImages().then(setImages)
  }, [])

  return (
    <div className="App">
      <h1>hello from vite</h1>
      <button onClick={() => setInitialSlide(10)}>initial slide</button>
      <button onClick={() => setSlidesPerView(1)}>reset</button>
      <button onClick={() => setUseAltered((prevUse) => !prevUse)}>
        toggle images
      </button>
      <button onClick={() => setSlidesPerView((prev) => prev + 1)}>
        add slides
      </button>
      <Slider
        ref={sliderRef}
        onChangeSlider={(idx) => setPageNumber(idx.toString())}
        renderHeader={(currentSlide, totalSlides) => (
          <header>
            <h2>Slider</h2>
            <p style={{ textAlign: "center" }}>imperative control</p>
            <input
              ref={inputRef}
              className="slider-input"
              value={pageNumber}
              onBlur={() => {
                if (!pageNumber) setPageNumber(`${currentSlide}`)
              }}
              onChange={({ target: { value } }) => {
                if (/\d/g.test(value) || value === "")
                  setPageNumber(value.replace(/\s/g, "").trim())
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const selectedNumber = (Number(pageNumber) ?? 0) - 1
                  sliderRef.current?.swipeTo(selectedNumber)
                }
              }}
              type="text"
            />
            <span>{` / ${totalSlides}`}</span>
          </header>
        )}
        virtual
        navigation
        initialSlide={initialSlide}
        slidesPerGroup={slidesPerView}
        slidesPerView={slidesPerView}
        className="app__slider"
        data={useAltered ? alteredImages : images}
        renderItem={(image) => {
          return (
            <div className="app__image">
              <img src={image.url} alt={image.title} />
            </div>
          )
        }}
      />
    </div>
  )
}

export default App
