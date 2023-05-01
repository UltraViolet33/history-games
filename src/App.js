import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Column } from "./components/Column";
import { queens } from "./data/queens";
import { kings } from "./data/kings";
import "./App.css";

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export const App = () => {
  const [gameWon, setGameWon] = useState(false);
  const [data, setData] = useState(kings);

  const setStateData = data => {
    if (data === "kings") {
      setData(kings);
    } else if (data === "queens") {
      setData(queens);
    }
  };

  const newKings = () => {
    const kings = {};
    for (const [key, value] of Object.entries(data.kings)) {
      kings[key] = { ...value, isGoodIndex: false };
    }
    return kings;
  };

  const [state, setState] = useState({
    ...data,
    kings: newKings(),
    columns: {
      ...data.columns,
      "column-1": {
        ...data.columns["column-1"],
        kingsIds: data.columns["column-1"].kingsIds.sort(
          (a, b) => 0.5 - Math.random()
        ),
      },
    },
  });

  useEffect(() => {
    setGameWon(false);
    
    setState({
      ...data,
      kings: newKings(),
      columns: {
        ...data.columns,
        "column-1": {
          ...data.columns["column-1"],
          kingsIds: data.columns["column-1"].kingsIds.sort(
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
    const newKingIds = Array.from(column.kingsIds);

    newKingIds.splice(source.index, 1);
    newKingIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      kingsIds: newKingIds,
    };

    const newKings = state.kings;

    for (const index in newKingIds) {
      if (index == newKingIds[index] - 1) {
        newKings[newKingIds[index]].isGoodIndex = true;
      } else {
        newKings[newKingIds[index]].isGoodIndex = false;
      }
    }

    const newState = {
      ...state,
      kings: newKings,
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
    const validOrder = data.columns["column-1"].kingsIds;
    const column = state.columns["column-1"];
    const newKingIds = Array.from(column.kingsIds);

    console.log(newColumn.kingsIds);
    console.log(validOrder);
    for (const index in newColumn.kingsIds) {
      console.log(index);
      console.log(newColumn.kingsIds[index]);
      if (index != newColumn.kingsIds[index] - 1) {
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
      <Content>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map(columnId => {
            const column = state.columns[columnId];
            const kings = column.kingsIds.map(kingId => state.kings[kingId]);
            return <Column key={column.id} column={column} kings={kings} />;
          })}
        </DragDropContext>
      </Content>
    </>
  );
};
