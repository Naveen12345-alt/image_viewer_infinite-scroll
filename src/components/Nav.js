import React, {useState} from 'react'
import ImageGrid from './imageGrid'
import Modal from './modal'

const Nav = () => {
  const [textInput, setTextInput] = useState('')
  const [data, setData] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const [click, setClick] = useState(false)
  const [searchedText, setSearchedText] = useState('')
  /**
   * below function handles case when user is typing and fetch new images
   * according to textInput
   */
  const inputHandler = e => {
    setTextInput(e.target.value)
    if (textInput) {
      fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=03e4bd13c3dd2255ee399ada6d3d69e7&tags=${textInput}&per_page=20&format=json&nojsoncallback=1`,
      )
        .then(res => res.json())
        .then(data => {
          setData(data.photos.photo)
        })
    }
    setClick(true)
  }
  /**
   * after a user has done few searches, they will be stored in localStorage
   * allowing user to fetch photos/results from any of its previous query
   */
  const listHandler = e => {
    if (textInput) {
      fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=03e4bd13c3dd2255ee399ada6d3d69e7&tags=${e.target.textContent}&per_page=20&format=json&nojsoncallback=1`,
      )
        .then(res => res.json())
        .then(data => {
          setData(data.photos.photo)
        })
    }
    setSearchedText(e.target.textContent)
    setTextInput('')
    setClick(false)
  }
  /**
   * set searched item to local Storage
   */
  const submitSearch = e => {
    e.preventDefault()
    if (localStorage.hasOwnProperty('rememberMe')) {
      localStorage.setItem('rememberMe', [
        localStorage.getItem('rememberMe'),
        textInput,
      ])
    } else {
      localStorage.setItem('rememberMe', textInput)
    }
    setSearchedText(textInput)
    setTextInput('')
    setClick(false)
  }

  return (
    <React.Fragment>
      <div className="navbar">
        <h1 className="navbar-header"> Gallery</h1>
        <form className="search search-layout">
          <div className="search-div">
            <input
              value={textInput}
              placeholder="Search for Images"
              onChange={inputHandler}
              type="text"
            />
            {click && localStorage.hasOwnProperty('rememberMe') ? (
              <ul className="search-list">
                {localStorage
                  .getItem('rememberMe')
                  .split(',')
                  .map((data, idx) => (
                    <li
                      key={idx}
                      className="search-list-item"
                      onClick={data => listHandler(data)}
                    >
                      {data}
                    </li>
                  ))}
              </ul>
            ) : (
              ''
            )}
          </div>
          <button className="search-form-button" onClick={submitSearch}>
            submit
          </button>
        </form>
      </div>
      {data.length ? (
        <div className="searched">
          <h1>Searched Image:{textInput.length ? textInput : searchedText}</h1>
          <ImageGrid imgUrls={data} setSelectedImg={setSelectedImg} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </div>
      ) : textInput ? (
        <div className="searched">
          <div>No data</div>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default Nav
