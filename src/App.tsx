import fetch from 'node-fetch'
import React from 'react'

import './App.css'
import Section from './components/Section'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'

interface IGenre {
  value?: string
}

const App: React.FC = () => {
  const genreIncrement = 4

  const [genres, setGenres] = React.useState<IGenre[]>([])
  const [limit, setLimit] = React.useState<number>(genreIncrement)

  const fetchData = async (): Promise<void> => {
    const response = await fetch('/.netlify/functions/getGenres', {
      method: 'POST',
      body: JSON.stringify(limit)
    })
    const responseBody = await response.json()
    console.log(responseBody.data.reference_list.values)
    setGenres(responseBody.data.reference_list.values)
  }

  console.log(limit)

  React.useEffect(() => {
    fetchData()
  }, [limit])

  return (
    <>
      <NavBar />
      <HeroSection />
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre: IGenre, index: number) => (
            <Section key={index} genre={genre.value} />
          ))}
        </div>
      )}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(prevState => prevState + genreIncrement)
        }}
      />
    </>
  )
}

export default App
