import React from 'react'

export default function CharacterCard({name, img, description}) {
  return (
    <div className="character-info">
    <h3>Character Information:</h3>
    <p>Name: {name}</p>
    <img className='characterImg' src={img} alt="picture of Dr. Ava Lin" />
    <p>{description}</p>
    </div>
  )
}
