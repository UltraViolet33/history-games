import { Character } from "./Character";
import { Droppable } from "react-beautiful-dnd";

export const Column = ({ column, list }) => {
  return (
    <section className="container-list">
      <h3 className="padding">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={
              snapshot.isDraggingOver
                ? "is-dragging padding"
                : "is-not-dragging padding"
            }
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {list.map((character, index) => (
              <Character
                key={character.id}
                character={character}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};
