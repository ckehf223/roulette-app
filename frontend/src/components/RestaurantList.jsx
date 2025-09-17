import React, { useEffect, useRef, useState } from 'react';
import instance from '/src/auth/axios';
import useModal from '/src/common/useModal';
import ResModal from '/src/components/ResModal';
import foodList from '/src/common/foodList';
import { useAuth } from '/src/common/AuthContext';
import '/src/css/RestaurantList.css';
import { useNavigate } from 'react-router-dom';

const RestaurantList = ({ onSelect, onOpenLink, onRandomSet, count }) => {
  const [resList, setResList] = useState([]);
  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const { isModalOpen, toggleModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({});
  const [activeTab, setActiveTab] = useState("sharelist");
  const { isAuthenticated, role } = useAuth();
  const nav = useNavigate();

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const getResList = async () => {
    let url = `/${activeTab}/find`;
    try {
      const response = await instance.get(url);
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
  }, [activeTab])

  const openResModal = (id) => {
    setSelectedItem({});
    if (id) {
      let selected = resList.find((item) => String(item.id) === String(id));
      setSelectedItem(selected);
    }
    toggleModal();
  };

  const changeActiveTab = (type) => {
    if (!isAuthenticated) {
      nav('/login');
      return;
    }
    setResList([]);
    setActiveTab(type);
  }


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
    <div className='aside-container'>
      <div className='aside-box' >
        <div className='fw-bold'>Store List</div>
        <div className='buttons'>
          <div className='is-random' onClick={() => { randomShuffle() }}></div>
          {isOpenBtn && (activeTab === "myList" || role === "ADMIN") && <button className='is-secondary' onClick={() => { openResModal() }}>Add</button>}
        </div>
      </div>
      <div className='card'>
        <div className="tab-container">
          <div className={`tab-btn img-home ${activeTab === "sharelist" ? "active" : ""}`} onClick={() => changeActiveTab("sharelist")}></div>
          <div className={`tab-btn img-star ${activeTab === "myList" ? "active" : ""}`} onClick={() => changeActiveTab("myList")}></div>
          <div className='tab-blank'> </div>
        </div>
        <ul className='menu-list'>
          {resList.map((obj, idx) => (
            <li key={obj.name} className="menu-card">
              <span className="menu-text tooltip-wrapper" onClick={() => { openResModal(obj.id) }}>
                {obj.name}
                <span className="tooltip-text" >{obj.remark}</span>
              </span>
              <div className='menu-card-buttons'>
                {activeTab === "sharelist" && <div className='menu-card-title'>{obj.cnt}</div>}
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
        role={role}
        type={activeTab}
        selectedItem={selectedItem}
      ></ResModal>
    </div >
  );
};

export default RestaurantList;
