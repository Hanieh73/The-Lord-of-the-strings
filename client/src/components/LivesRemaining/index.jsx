import React from 'react'

export default function LivesRemaining({livesRemaining}) {
  return (
    <div className="lives-remaining-container">
            {Array.from({ length: livesRemaining }, (_, index) => (
              <span key={index} role="img" aria-label="heart">❤️</span>
            ))}
    </div>
  )
}
