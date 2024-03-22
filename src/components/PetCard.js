
import { db } from './pets';

import TinderCard from 'react-tinder-card';
import React, { useState, useRef, useMemo } from 'react';
import { getPawpularityScore } from '../utils/api';
import Score from "./Score";


function PetCard() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex);
  const [pawpularityScore, setPawpularityScore] = useState(null);


  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    setPawpularityScore(null);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx &&
      childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log("Swiping", dir, "at index", currentIndex);
      await childRefs[currentIndex].current.swipe(dir);
      if (dir === "left") {
        setCurrentIndex(currentIndex + 1); // Mettre à jour l'index après avoir swipé à gauche
      }
    }
  };

  const swiped = (direction, nameToDelete, index) => {
    console.log("Swiped", direction, "at index", index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };




  const showPawpularityScore = async () => {
    try {
      console.log("Current image ID:", db[currentIndex].id); // Ajoutez cette ligne pour vérifier la valeur de l'ID de l'image
      const score = await getPawpularityScore(db[currentIndex].id);
      console.log(`Pawpularity Score: ${score}`);
      setPawpularityScore(score); // Mettre à jour l'état du score
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Pets Finder</h1>
      <div className="cardContainer">
        {db.map((character, index) => (
          <div key={character.id}>
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.id} // Ajout de la prop "key" avec la valeur de l'ID de l'image
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{ backgroundImage: `url(${character.url})` }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button
          style={{ backgroundColor: "#c3c4d3" }}
          onClick={() => swipe("left", currentIndex)}
        >
          Swipe left!
        </button>
        <button
          onClick={showPawpularityScore} // Utilisation de la fonction pour afficher le score de "pawpularity"
        >
          Show Pawpularity Score
        </button>
        <button
          style={{ backgroundColor: "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}

      <Score score={pawpularityScore} />

    </div>
  );
}

export default PetCard;