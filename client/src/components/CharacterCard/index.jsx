import React from 'react'

export default function CharacterCard({name, img, description}) {
  return (
    <div className="character-info">
    <h3>Character Information:</h3>
    <p>{name}</p>
    <img className='characterImg' src={img} alt="picture of character" />
    {/* <video className='characterImg' autoPlay loop muted>
        <source src={VideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
    </video> */}
    <p>{description}</p>
    </div>
  )
}
