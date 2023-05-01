import { King } from "./King";
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
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            {list.map((king, index) => (
              <King key={king.id} king={king} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};
