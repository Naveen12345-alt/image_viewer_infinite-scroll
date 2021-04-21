import React, {useEffect, useState} from 'react'
//Router
import Nav from './components/Nav'
import ImageGrid from './components/imageGrid'
import Modal from './components/modal'
function App() {
  const [imgUrls, setImgUrls] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [page, setPage] = useState(1)

  const fetchApi = page =>
    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=03e4bd13c3dd2255ee399ada6d3d69e7&per_page=20&page=${page}&format=json&nojsoncallback=1`

  const fetchInitialUi = _ => {
    fetch(fetchApi(page))
      .then(res => res.json())
      .then(final => {
        setImgUrls(prev => [...prev, ...final.photos.photo])
        setPage(page + 1)
      })
  }

  window.onscroll = () => {
    console.log(
      window.innerHeight,
      document.documentElement.scrollTop,
      document.documentElement.offsetHeight,
    )
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
