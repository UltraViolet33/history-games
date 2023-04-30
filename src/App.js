import { useEffect, useState } from "react";
import { queens } from "./data/queens";
import { kings } from "./data/kings";
import { Column } from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import "./App.css";

const Header = styled.header`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export const App = () => {
  const [gameWon, setGameWon] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [data, setData] = useState(kings);

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
      <nav className="navigation">
        <a href="/" className="brand-name">
          History Games
        </a>
        <button
          className="hamburger"
          onClick={() => {
            console.log(isNavExpanded);
            setIsNavExpanded(!isNavExpanded);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }>
          <ul>
            <li>
              <a
                onClick={() => {
                  setData(kings);

                  console.log(data);
                }}>
                Rois de France
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setData(queens);

                  console.log(data);
                }}>
                Reines de France
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Header>
        <h2>Remets les rois dans le bon ordre !</h2>
        <p>
          Drag and drop les rois de France dans le bon ordre ! La case devient
          verte si elle est à la bonne place.
        </p>
        <p>
          Si un <IoIosArrowDown /> s'affiche une description est disponible
        </p>
        {gameWon ? <h3>Gagné !</h3> : ""}
      </Header>
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
