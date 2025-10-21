import React, { useEffect, useRef, useState } from 'react';
import instance from '/src/auth/axios';
import useModal from '/src/common/useModal';
import ResModal from '/src/components/ResModal';
import foodList from '/src/common/foodList';
import { useAuth } from '/src/common/AuthContext';
import '/src/css/RestaurantList.css';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const RestaurantList = ({ onSelect, onOpenLink, onRandomSet, count }) => {
  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const { isModalOpen, toggleModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({});
  const [activeTab, setActiveTab] = useState('sharelist');
  const { isAuthenticated, role } = useAuth();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const { data: resList = [], isLoading, isError } = useQuery({
    queryKey: ['restaurantList', activeTab],
    queryFn: async () => {
      const res = await instance.get(`/${activeTab}/find`);
      setIsOpenBtn(true);
      return res.data;
    },
    onError: () => {
      setIsOpenBtn(false);
      return foodList;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const reloadResList = () => {
    queryClient.invalidateQueries(['restaurantList', activeTab]);
  };

  const openResModal = (id) => {
    setSelectedItem({});
    if (id) {
      const selected = resList.find((item) => String(item.id) === String(id));
      setSelectedItem(selected);
    }
    toggleModal();
  };

  const changeActiveTab = (type) => {
    if (activeTab === type) return;

    if (!isAuthenticated && type === 'myList') {
      nav('/login');
      return;
    }
    setActiveTab(type);
  };

  const randomShuffle = () => {
    if (!resList?.length) return;

    if (resList.length < countRef.current) {
      alert('룰렛의 갯수보다 리스트가 적어 랜덤기능 사용이 불가합니다.');
      return;
    }

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

  if (isLoading) return <div className="aside-container"><p>Loading...</p></div>;
  if (isError) return <div className="aside-container"><p>데이터 불러오기 실패</p></div>;

  return (
    <div className="aside-container">
      <div className="aside-box">
        <div className="fw-bold">Store List</div>
        <div className="buttons">
          <div className="is-random" onClick={randomShuffle}></div>
          {isOpenBtn && (activeTab === 'myList' || role === 'ADMIN') && (
            <button className="is-secondary" onClick={() => openResModal()}>
              Add
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="tab-container">
          <div
            className={`tab-btn img-home ${activeTab === 'sharelist' ? 'active' : ''}`}
            onClick={() => changeActiveTab('sharelist')}
          ></div>
          <div
            className={`tab-btn img-star ${activeTab === 'myList' ? 'active' : ''}`}
            onClick={() => changeActiveTab('myList')}
          ></div>
          <div className="tab-blank"></div>
        </div>

        <ul className="menu-list">
          {resList.map((obj) => (
            <li key={obj.name} className="menu-card">
              <span className="menu-text tooltip-wrapper" onClick={() => openResModal(obj.id)}>
                {obj.name}
                <span className="tooltip-text">{obj.remark}</span>
              </span>
              <div className="menu-card-buttons">
                {activeTab === 'sharelist' && <div className="menu-card-title">{obj.cnt}</div>}
                <button className="menu-card-button" onClick={() => onSelect(obj.name)}>
                  <div className="add-icon"></div>
                </button>
                <button className="menu-card-button" onClick={() => onOpenLink(obj.linkUrl)}>
                  <div className="link-icon"></div>
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
        reload={reloadResList}
        role={role}
        type={activeTab}
        selectedItem={selectedItem}
      ></ResModal>
    </div>
  );
};

export default RestaurantList;
