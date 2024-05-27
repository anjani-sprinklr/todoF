import React, { useEffect, useState } from 'react';

// Define type aliases
type ChangeStatusFn = (id:string) => void;
type DeleteItemFn = (id:string) => void;
interface Item{
  id:string,
  text: string;
  deadline: string;
  status: boolean;

}
type ItemProps = {
  item:Item,
  changeStatus: ChangeStatusFn;
  deleteItem: DeleteItemFn;
};

const Item: React.FC<ItemProps> = ({ item, changeStatus, deleteItem }) => {



  const addTooltip = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const elem = document.createElement('div');
    elem.setAttribute('id', 'tooltip');
    elem.innerHTML = 'Delete this Task';
    document.body.append(elem);
    console.log(e);
    const coordElem = e.currentTarget.getBoundingClientRect();
    const left = coordElem.left + (e.currentTarget.offsetWidth - elem.offsetWidth) / 2;
    const top = coordElem.top - 20;

    elem.style.position = 'absolute';
    elem.style.left = `${left}px`;
    elem.style.top = `${top}px`;
  };

  const deleteTooltip = (): void => {
    const ele = document.getElementById('tooltip');
    if (ele != null) ele.remove();
  };

  const toggleStatus = (): void => {
    changeStatus(item.id);
  };

  return (
    <div className="item">
      <div className="txts">{item.text}</div>
      <div
        className="dd"
        style={{
          backgroundColor: item.status ? 'rgba(101, 246, 111, 0.474)' : 'rgba(246, 101, 101, 0.474)',
        }}
      >
        {item.deadline}
      </div>
      <div className="status">
        <input type="checkbox" checked={item.status} onChange={toggleStatus} />
        <button
          className="delB"
          onMouseOver={addTooltip}
          onMouseOut={deleteTooltip}
          onClick={() => {
            deleteTooltip();
            deleteItem(item.id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Item;
