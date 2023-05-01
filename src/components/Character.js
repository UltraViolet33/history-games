import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Character = ({ character, index }) => {
  const [isTransition, setTransition] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const showInfo = character => {
    if (character.isGoodIndex) {
      if (isDisplayed) {
        setTransition(false);
        setTimeout(() => {
          setIsDisplayed(false);
        }, 20);
      } else {
        setIsDisplayed(true);
        setTimeout(() => {
          setTransition(true);
        }, 20);
      }
    }
  };

  useEffect(() => {
    setIsDisplayed(false);
    setTransition(false);
  }, [character]);

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDragging
              ? "is-dragged character-container"
              : character.isGoodIndex
              ? "character-good-index character-container"
              : "character-container"
          }
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className="character-header">
            <div className="character-name">{character.name}</div>
            <div className="expand-div" onClick={() => showInfo(character)}>
              {character.isGoodIndex ? (
                isDisplayed ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={
              isDisplayed && isTransition
                ? "info-container info-container-is-displayed info-container-is-transition"
                : isDisplayed && !isTransition
                ? "info-container info-container-is-displayed"
                : "info-container"
            }>
            <h2>{character.date}</h2>
            <img src={character.imageLink} width="256" />
            <p className="description">{character.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
