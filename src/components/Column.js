import styled from "styled-components";
import { King } from "./King";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 12px;
  width: 650px;

  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const KingsList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;

export const Column = ({ column, kings }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <KingsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {kings.map((king, index) => (
              <King key={king.id} king={king} index={index} />
            ))}
            {provided.placeholder}
          </KingsList>
        )}
      </Droppable>
    </Container>
  );
};
