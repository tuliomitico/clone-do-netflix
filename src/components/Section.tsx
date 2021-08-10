import React from 'react'
import Card from './Card'

interface IGenre {
  genre?: string
}

export interface IMovie {
  title: string
  duration: number
  thumbnail: string
  year?: number
  synopsis?: string
}

export type Movie = Record<'movie', IMovie>

const Section: React.FC<IGenre> = ({ genre }) => {
  const [movies, setMovies] = React.useState<IMovie[]>([])
  const [pageState, setPageState] = React.useState<string | null>(null)

  const fetchData = async (): Promise<void> => {
    const response = await fetch('/.netlify/functions/getMovies', {
      method: 'POST',
      body: JSON.stringify({ genre: genre, pageState: pageState })
    })
    const responseBody = await response.json()
    setMovies(responseBody.data.movies_by_genre.values)
    setPageState(responseBody.data.movies_by_genre.pageState)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h2 id={genre}>{genre}</h2>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
          <div
            className="more-button"
            onClick={() => {
              setPageState(pageState)
              fetchData()
            }}
          ></div>
        </div>
      )}
    </>
  )
}

export default Section
