import React from 'react'

/**
 * generate image grid
 */
const ImageGrid = ({imgUrls, setSelectedImg}) => {
  return (
    <div className="img-grid">
      {imgUrls &&
        imgUrls.map((img, idx) => (
          <div
            className="img-wrap"
            key={idx}
            onClick={() =>
              setSelectedImg(
                `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`,
              )
            }
          >
            <img
              src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
              alt="uploaded pic"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 1}}
            />
          </div>
        ))}
    </div>
  )
}

export default ImageGrid
