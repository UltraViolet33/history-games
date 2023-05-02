import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Element = ({ element, index }) => {
  const [isTransition, setTransition] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const showInfo = element => {
    if (element.isGoodIndex) {
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
  }, [element]);

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDragging
              ? "is-dragged element-container"
              : element.isGoodIndex
              ? "element-good-index element-container"
              : "element-container"
          }
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className="element-header">
            <div className="element-name">{element.name}</div>
            <div className="expand-div" onClick={() => showInfo(element)}>
              {element.isGoodIndex ? (
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
            <h2>{element.date}</h2>
            <img src={element.imageLink} width="256" />
            <p className="description">{element.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
