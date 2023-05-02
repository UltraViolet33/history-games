import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Column } from "./components/Column";
import { queens } from "./data/queens";
import { kings } from "./data/kings";
import { KINGS, QUEENS, BATTLES } from "./constants";
import { battles } from "./data/battles";
import "./App.css";

export const App = () => {
  const [gameWon, setGameWon] = useState(false);
  const [data, setData] = useState(kings);

  const setStateData = data => {
    if (data === KINGS) {
      setData(kings);
    } else if (data === QUEENS) {
      setData(queens);
    } else if (data === BATTLES) {
      setData(battles);
    }
  };

  const newListElements = () => {
    const elements = {};
    for (const [key, value] of Object.entries(data.elements)) {
      elements[key] = { ...value, isGoodIndex: false };
    }
    return elements;
  };

  const [state, setState] = useState({
    ...data,
    elements: newListElements(),
    columns: {
      ...data.columns,
      "column-1": {
        ...data.columns["column-1"],
        elementsIds: data.columns["column-1"].elementsIds.sort(
          (a, b) => 0.5 - Math.random()
        ),
      },
    },
  });

  useEffect(() => {
    setGameWon(false);
    setState({
      ...data,
      elements: newListElements(),
      columns: {
        ...data.columns,
        "column-1": {
          ...data.columns["column-1"],
          elementsIds: data.columns["column-1"].elementsIds.sort(
            (a, b) => 0.5 - Math.random()
          ),
        },
      },
    });
  }, [data]);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newElementsIds = Array.from(column.elementsIds);

    newElementsIds.splice(source.index, 1);
    newElementsIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      elementsIds: newElementsIds,
    };

    const newElements = state.elements;

    for (const index in newElementsIds) {
      if (index == newElementsIds[index] - 1) {
        newElements[newElementsIds[index]].isGoodIndex = true;
      } else {
        newElements[newElementsIds[index]].isGoodIndex = false;
      }
    }

    const newState = {
      ...state,
      elements: newElements,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);

    if (checkWon(newColumn)) {
      setGameWon(true);
    } else {
      setGameWon(false);
    }
  };

  const checkWon = newColumn => {
    for (const index in newColumn.elementsIds) {
      if (index != newColumn.elementsIds[index] - 1) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Header setData={setStateData} />
      <div className="top">
        <h2>Remets les personnages historiques dans le bon ordre !</h2>
        <p>
          Drag and drop les personnages dans le bon ordre ! La case devient
          verte si elle est à la bonne place.
        </p>
        <p>
          Si un <IoIosArrowDown /> s'affiche une description est disponible.
        </p>
        {gameWon ? <h3>Gagné !</h3> : ""}
      </div>
      <div className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map(columnId => {
            const column = state.columns[columnId];
            const elements = column.elementsIds.map(
              characterId => state.elements[characterId]
            );
            return <Column key={column.id} column={column} list={elements} />;
          })}
        </DragDropContext>
      </div>
    </>
  );
};
