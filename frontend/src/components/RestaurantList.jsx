import React, { useEffect, useRef, useState } from 'react';
import instance from '/src/auth/axios';
import useModal from '/src/common/useModal';
import ResModal from '/src/components/ResModal';
import foodList from '/src/common/foodList';
import '/src/css/RestaurantList.css';

const RestaurantList = ({ onSelect, onOpenLink, onRandomSet, count }) => {
  const [resList, setResList] = useState([]);
  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const { isModalOpen, toggleModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({});

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const getResList = async () => {
    try {
      const response = await instance.get("/res/find");
      setResList(response.data);
      setIsOpenBtn(true);
    } catch (error) {
      setResList(foodList);
      setIsOpenBtn(false);
      console.error("식당 리스트 로딩중 에러 발생" + error);
    }
  }

  useEffect(() => {
    getResList();
  }, [])

  const openResModal = (id) => {
    setSelectedItem({});
    if (id) {
      let selected = resList.find((item) => String(item.id) === String(id));
      setSelectedItem(selected);
    }
    toggleModal();
  };


  const randomShuffle = async () => {
    if (!resList?.length) return;

    const pool = [...resList];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const picked = new Set();
    const pickedList = [];
    let idx = 0;

    while (true) {
      if (countRef.current === picked.size) break;
      const item = pool[idx++];
      if (picked.has(item.id)) continue;
      picked.add(item.id);
      pickedList.push(item.name);
    }

    onRandomSet(pickedList);

  };

  return (
    <div id='aside-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '7px', marginBottom: '5px', padding: '3px' }}>
        <h3 className='h5 fw-bold m-0'>Store List</h3>
        <div className='buttons'>
          <div className='is-random' onClick={() => { randomShuffle() }}></div>
          {isOpenBtn && <button className='is-secondary' onClick={() => { openResModal() }}>Add</button>}
        </div>
      </div>
      <div className='card' style={{ width: '100%' }}>
        <ul className='menu-list'>
          {resList.map((obj, idx) => (
            <li key={obj.name} className="menu-card">
              <span className="menu-text tooltip-wrapper" onClick={() => { openResModal(obj.id) }}>
                {obj.name}
                <span className="tooltip-text" >{obj.remark}</span>
              </span>
              <div className='menu-card-buttons'>
                <button className="menu-card-button" onClick={() => onSelect(obj.name)}>
                  <div className='add-icon'></div>
                </button>
                <button className="menu-card-button" onClick={() => onOpenLink(obj.linkUrl)}>
                  <div className='link-icon'></div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ResModal
        isOpen={isModalOpen}
        toggle={openResModal}
        title="Edit store"
        reload={getResList}
        selectedItem={selectedItem}
      ></ResModal>
    </div >
  );
};

export default RestaurantList;
