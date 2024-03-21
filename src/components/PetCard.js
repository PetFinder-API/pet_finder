
import dog1 from "../images/dogs/96bd9aac07e756e952c0c96d1a8e84bd.jpg"
import cat1 from "../images/cats/640px-Chaton.jpg"
import dog2 from "../images/dogs/b640bfb_afp-32d82q9.jpg"
import cat2 from "../images/cats/377122-232743_light.jpg"
import dog3 from "../images/dogs/black-german-shepherd-smile.jpg"
import cat3 from "../images/cats/chat-moche-souriant-74983f3a8849116a.jpg"
import dog4 from "../images/dogs/e4f9dd9613ae30a361676b499f6590d7.jpg"

import TinderCard from 'react-tinder-card';
import React, { useState, useRef, useMemo } from 'react';
import { getPawpularityScore } from './api';
import { db } from "./pets";

function PetCard() {
  const [currentIndex, setCurrentIndex] = useState(0, );
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [pawpularityScore, setPawpularityScore] = useState(null);
  const handleNextButtonClick = () => {
    if (currentIndex < db.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const db = [
  { id: '96bd9aac07e756e952c0c96d1a8e84bd.jpg', name: 'René', url: dog1 },
  { id: '640px-Chaton.jpg', name: 'Kyota', url: cat1 },
  { id: 'b640bfb_afp-32d82q9.jpg', name: 'Amine', url: dog2 },
  { id: '377122-232743_light.jpg', name: 'José', url: cat2 },
  { id: 'black-german-shepherd-smile.jpg', name: 'Henri', url: dog3 },
  { id: 'chat-moche-souriant-74983f3a8849116a.jpg', name: 'Bilal', url: cat3 },
  { id: 'e4f9dd9613ae30a361676b499f6590d7.jpg', name: 'Francis', url: dog4 }
];

  const handlePreviousButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const childRefs = useMemo(
      () =>
          Array(db.length)
              .fill(0)
              .map((i) => React.createRef()),
      []
  );


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
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
                      style={{backgroundImage: `url(${character.url})`}}
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
              style={{backgroundColor: "#c3c4d3"}}
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
              style={{backgroundColor: "#c3c4d3"}}
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
      </div>
  );
}

export default PetCard;