import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
  {
    name: 'Rémi',
    url: ".//pictures//dogs//96bd9aac07e756e952c0c96d1a8e84bd.jpg"
  },
  {
    name: 'Francis',
    url: ".//pictures//dogs//b640bfb_afp-32d82q9.jpg"
  },

  {
    name: 'Nono',
    url: './/pictures//dogs/black-german-shepherd-smile.jpg'
  },
  {
    name: 'Miaou',
    url: './/pictures/cats//Format Exotic identité.jpg'
  },

  {
    name: 'Hello Kitty',
    url: './/pictures//cats/chat-moche-souriant-74983f3a8849116a.jpg'
  },
  {
    name: 'Tom',
    url: './/pictures//cats//377122-232743_light.jpg'
  },
  {
    name: 'Minette',
    url: './/pictures//cats//640px-Chaton.jpg'
  },
  {
    name: 'René',
    url: './/pictures//dogs//e4f9dd9613ae30a361676b499f6590d7.jpg'
  },

];

function Simple () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Simple