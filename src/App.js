import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Column } from "./components/Column";
import { queens } from "./data/queens";
import { kings } from "./data/kings";
import "./App.css";

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

  const newCharacters = () => {
    const characters = {};
    for (const [key, value] of Object.entries(data.characters)) {
      characters[key] = { ...value, isGoodIndex: false };
    }
    return characters;
  };

  const [state, setState] = useState({
    ...data,
    characters: newCharacters(),
    columns: {
      ...data.columns,
      "column-1": {
        ...data.columns["column-1"],
        charactersIds: data.columns["column-1"].charactersIds.sort(
          (a, b) => 0.5 - Math.random()
        ),
      },
    },
  });

  useEffect(() => {
    setGameWon(false);
    setState({
      ...data,
      characters: newCharacters(),
      columns: {
        ...data.columns,
        "column-1": {
          ...data.columns["column-1"],
          charactersIds: data.columns["column-1"].charactersIds.sort(
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
    const newCharactersIds = Array.from(column.charactersIds);

    newCharactersIds.splice(source.index, 1);
    newCharactersIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      charactersIds: newCharactersIds,
    };

    const newCharacters = state.characters;

    for (const index in newCharactersIds) {
      if (index == newCharactersIds[index] - 1) {
        newCharacters[newCharactersIds[index]].isGoodIndex = true;
      } else {
        newCharacters[newCharactersIds[index]].isGoodIndex = false;
      }
    }

    const newState = {
      ...state,
      characters: newCharacters,
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
    for (const index in newColumn.charactersIds) {
      if (index != newColumn.charactersIds[index] - 1) {
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
      <content className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map(columnId => {
            const column = state.columns[columnId];
            const kings = column.charactersIds.map(
              kingId => state.characters[kingId]
            );
            return <Column key={column.id} column={column} kings={kings} />;
          })}
        </DragDropContext>
      </content>
    </>
  );
};
