import React, { useState } from 'react';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: true },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
//   { id: 3, description: 'lalalala', quantity: 13, packed: false },
// ];

////////////////////////// APP /////////////////////////////////
function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeletItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeletItem}
        onToggle={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

///////////////////////////// LOGO //////////////////////////////

function Logo({ onAddItem }) {
  return <h1>🏖️ Vambora! 🧳</h1>;
}

////////////////////////// FORM /////////////////////////////////
function Form({ onAddItem }) {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Text:', text);
    console.log('Quantity:', quantity);

    if (!text) return;

    const newItem = {
      text,
      quantity,
      packed: false,
      id: Date.now(),
    };
    //chamando uma f que estao no elemento pai
    onAddItem(newItem);

    console.log(newItem);

    // ao criar o obj, reset os valores no campo
    setQuantity(1);
    setText('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>O que precisamos para estudar 📚?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button>Add.</button>
    </form>
  );
}

//////////////////////////// PACKINGLIST ///////////////////////////////

function PackingList({ items, onDeleteItem, onToggle, onClearList }) {
  // como usar useState nesse elemento?
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy == 'input') sortedItems = items;
  if (sortBy == 'description')
    sortedItems = items.slice().sort((a, b) => a.text.localeCompare(b.text));
  if (sortBy == 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Limpar Lista</button>
      </div>
    </div>
  );
}

////////////////////////////// ITEM /////////////////////////////

function Item({ item, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} - {item.text}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

/////////////////////////////// STATE /////////////////////////////////

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const packedItems = items
    .filter(item => item.packed)
    .reduce((acc, item) => acc + item.quantity, 0);
  const percentage = Math.round((packedItems / totalItems) * 100);

  // const names = [
  //   { nome: 'Luiz', sobrenome: 'Herbet' },
  //   { nome: 'Flavio', sobrenome: 'Gaitan' },
  //   { nome: 'Quino', sobrenome: 'Mafi' },
  // // ];
  // const [name, setName] = useState('Luiz');
  // const b = () => 'Herbet';

  // setInterval(() => {
  //   name == 'Luiz' ? setName('Herbet') : setName('Luiz');
  // }, 2000);

  //no front end - o que vamos ter? ok
  //div.{name} ok
  //a cada 10s a name muda
  //comeca com o valor luiz ok
  //passam 10s
  //valor muda para herbet
  //(a)(b)(a)(b)

  return (
    <footer className="stats">
      {/* <div>{name}</div> */}
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go! ✈️'
          : `💼 You have ${totalItems} items on your list, and you already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
