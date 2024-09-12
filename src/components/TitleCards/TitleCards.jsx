import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category }) => {
  
  const [apiData,setApiData] = useState([])
  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTQ0NmIxNTY1NmZmYTJmNDI2MzFlYTY0NmMzYzIzYiIsIm5iZiI6MTcyNjEyNTQxMy43MDQ2NjcsInN1YiI6IjY2ZDVlNTYxNTBmODQyYzAyODI3NjE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx_Txdt38FQMac8XaCYt3iT20JmzMias0zmaiFo2F1s'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name} />
              <p>{card.original_title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
