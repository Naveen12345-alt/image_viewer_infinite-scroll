import React, {useEffect, useState} from 'react'
//Router
import Nav from './components/Nav'
import ImageGrid from './components/imageGrid'
import Modal from './components/modal'
function App() {
  const [imgUrls, setImgUrls] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [page, setPage] = useState(1)
  /**
   * the below function take a page to fetch and create a new url for use
   */
  const fetchApi = page =>
    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=03e4bd13c3dd2255ee399ada6d3d69e7&per_page=20&page=${page}&format=json&nojsoncallback=1`
  /**
   * below code will fetch data from url and pass it to ImgUrls with it previous state.
   * it's going to get called on component and as we reach end of page
   */
  const fetchInitialUi = _ => {
    fetch(fetchApi(page))
      .then(res => res.json())
      .then(final => {
        setImgUrls(prev => [...prev, ...final.photos.photo])
        setPage(page + 1)
      })
  }
  /**
   * fetch new images when end is reached
   */
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      console.log(1)
      fetchInitialUi()
    }
  }

  useEffect(() => {
    fetchInitialUi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * generate image grid using ImageGrid component and as a click on a image
   * open image in a modal
   */
  return (
    <div className="App">
      <Nav />
      <h1>Fresh Images</h1>
      <ImageGrid imgUrls={imgUrls} setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default App
