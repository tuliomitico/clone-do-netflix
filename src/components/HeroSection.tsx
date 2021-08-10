import React from 'react'
import { IMovie } from './Section'

const HeroSection: React.FC = () => {
  const [movie, setMovie] = React.useState<IMovie>()
  const pageState = null

  const fetchData = async (): Promise<void> => {
    const response = await fetch('/.netlify/functions/getMovies', {
      method: 'POST',
      body: JSON.stringify({ genre: 'Action', pageState: pageState })
    })
    const responseBody = await response.json()
    const movies: IMovie[] = responseBody.data.movies_by_genre.values
    setMovie(movies[Math.floor(Math.random() * movies.length)])
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {movie && (
        <div className="hero">
          <video className="hero-video" controls muted autoPlay loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <div className="info-section">
            <h3 className="hero-blurb">{movie.synopsis}</h3>
            <div className="button-section">
              <div className="button play">
                <span>
                  <i className="fas fa-play"></i>
                </span>
                Play
              </div>
              <div className="button more">
                <span>
                  <i className="fas fa-info-circle"></i>
                </span>
                More info
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HeroSection
