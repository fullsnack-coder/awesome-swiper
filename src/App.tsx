import { useEffect, useState } from "react"
import "./App.css"
import Slider from "./components/Slider"

import { getImages, Image } from "./services"

function App() {
  const [images, setImages] = useState<Image[]>([])
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [initialSlide, setInitialSlide] = useState(6)

  useEffect(() => {
    getImages().then(setImages)
  }, [])

  return (
    <div className="App">
      <h1>hello from vite</h1>
      <button onClick={() => setInitialSlide(10)}>initial slide</button>
      <button onClick={() => setSlidesPerView(1)}>reset</button>
      <button onClick={() => setSlidesPerView((prev) => prev + 1)}>
        add slides
      </button>

      <Slider
        renderHeader={(currentSlide, totalSlides) => (
          <header>
            <h2>Slider</h2>
            <p>{`${currentSlide} / ${totalSlides}`}</p>
          </header>
        )}
        virtual
        navigation
        initialSlide={initialSlide}
        slidesPerGroup={slidesPerView}
        slidesPerView={slidesPerView}
        className="app__slider"
        data={images}
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
