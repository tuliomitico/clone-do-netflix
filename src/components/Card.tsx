import React from 'react'
import { Movie } from './Section'

const Card: React.FC<Movie> = ({ movie }) => {
  const [isShown, setIsShown] = React.useState<boolean>(false)
  return (
    <div
      className="card"
      onMouseEnter={() => {
        setIsShown(true)
      }}
      onMouseLeave={() => {
        setIsShown(false)
      }}
    >
      {!isShown && (
        <video className="video" controls>
          <source src={movie.thumbnail} type="video/mp4" />
        </video>
      )}

      {isShown && (
        <>
          <video className="video" controls autoPlay={true} loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <div className="info-box">
            <p>{movie.title}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
