import React, { useEffect, useState } from 'react';
import instance from '/src/common/axios';
import useModal from '/src/common/useModal';
import ResModal from '/src/components/ResModal';
import foodList from '/src/common/foodList';
import '/src/css/RestaurantList.css';

const RestaurantList = ({ onSelect, onOpenLink }) => {
  const [resList, setResList] = useState([]);
  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const { isModalOpen, toggleModal } = useModal();
  const [selectedItem, setSelectedItem] = useState({});


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

  return (
    <div id='aside-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '7px', marginBottom: '5px', padding: '3px' }}>
        <h3 className='h5 fw-bold m-0'>음식점 리스트</h3>
        {isOpenBtn && <button className='is-secondary' onClick={() => { openResModal() }}>추가</button>}
      </div>
      <div className='card' style={{ width: '100%', height: '100%' }}>
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
        title="음식점 등록"
        reload={getResList}
        selectedItem={selectedItem}
      ></ResModal>
    </div >
  );
};

export default RestaurantList;
