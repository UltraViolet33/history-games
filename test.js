{win && <p>you won !</p>}
{list &&
  list.map((item, index) => (
    <Item
      item={item}
      index={index}
      onDrop={drop}
      setCurrentItem={setCurrentItem}
      setOverItem={setOverItem}
    />
  ))}