import React from 'react'
import words from './words'
const Photo = ({
  urls:{regular}, 
  alt_description,
  likes,
  user:{
    name,
    portfolio_url,
    profile_image:{medium},
  },
  }) => {
    const randomWord=Math.floor(Math.random()*words.length)
  return <article className="photo">
    <img src={regular} alt={alt_description}/>
    <div className="photo-info">
    <div className="word">{words[randomWord]}</div>
    <div>
    <h4>{name}</h4>
      <p>{likes} likes</p>
      </div>
    <a href={portfolio_url}>
      <img src={medium} alt={name} className='user-img'/>
    </a>
      </div>
  </article>
}

export default Photo
