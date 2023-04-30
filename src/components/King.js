import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${props =>
    props.isDragging ? "#F47174" : props.isGoodIndex ? "lightgreen" : "white"};
  display: flex;
  flex-direction: column;
  min-height: 60px;
`;

const Infos = styled.div`
  display: ${props => (props.isDisplayed ? "block" : "none")};
  transition: all 2s linear;
  visibility: ${props => (props.isTransition ? "1" : "0")};
  opacity: ${props => (props.isTransition ? "1" : "0")};
  transition: opacity 600ms, visibility 600ms;
  margin: 10px;
`;

const Description = styled.p`
  text-align: justify;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  flex: 2;
  // border: 1px solid lightgrey;
`;

const ExpandDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const King = ({ king, index }) => {
  const [isTransition, setTransition] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const showInfo = king => {
    if (king.isGoodIndex) {
      console.log("sd");
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

  return (
    <Draggable draggableId={king.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isGoodIndex={king.isGoodIndex}>
          <Header>
            <Title>{king.name}</Title>
            <ExpandDiv onClick={() => showInfo(king)}>
              {king.isGoodIndex ? (
                isDisplayed ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )
              ) : (
                ""
              )}
            </ExpandDiv>
          </Header>
          <Infos isDisplayed={isDisplayed} isTransition={isTransition}>
            <h2>{king.date}</h2>
            <img src={king.imageLink} width="256" />
            <Description>{king.description}</Description>
          </Infos>
        </Container>
      )}
    </Draggable>
  );
};
