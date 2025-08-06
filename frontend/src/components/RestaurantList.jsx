import React, { useEffect, useState } from 'react';
import instance from '/src/common/axios';
import useModal from '../common/useModal';
import ResModal from './ResModal';

const foodList = [
  { name: '소담정', linkUrl: 'https://naver.me/xgNETSQ6' },
  { name: '야키', linkUrl: 'https://naver.me/x2jM6r31' },
  { name: '돈까스앤우찌', linkUrl: 'https://naver.me/x1V5Cubg' },
  { name: '일월카츠', linkUrl: 'https://naver.me/GeUR1nci' },
  { name: '스미레', linkUrl: 'https://naver.me/GRo45oJ9' },
  { name: '담솥', linkUrl: 'https://naver.me/G9r5qoF8' },
  { name: '애호락', linkUrl: 'https://naver.me/xrSQBZ0r' },
  { name: '부대찌개', linkUrl: 'https://naver.me/5k7fmurG' },
  { name: '신의주국밥', linkUrl: 'https://naver.me/FpxlGDKp' },
  { name: '대림국수', linkUrl: 'https://naver.me/5l7kSApN' },
  { name: '헤비스테이크', linkUrl: 'https://naver.me/IMyGIv53' },
  { name: '유즈라멘', linkUrl: 'https://naver.me/5S9QHorh' },
  { name: '오레노라멘', linkUrl: 'https://naver.me/55rm7oGo' },
  { name: '온센', linkUrl: 'https://naver.me/5iTdAXxl' },
  { name: '유소바', linkUrl: 'https://naver.me/FxFto3zO' },
  { name: '이도곰탕', linkUrl: 'https://naver.me/xk1nx2Vs' },
  { name: '신라제면', linkUrl: 'https://naver.me/59voVT86' },
  { name: '북촌김치재', linkUrl: 'https://naver.me/xNLZsc30' },
  { name: '떡산', linkUrl: 'https://naver.me/513N4huY' },
  { name: '수왕', linkUrl: 'https://naver.me/5EUZHHRJ' },
  { name: '등촌샤브샤브', linkUrl: 'https://naver.me/5D8tiJmG' },
  { name: '재동순두부', linkUrl: 'https://naver.me/FHlgN49Y' },
]

const RestaurantList = ({ onSelect, onOpenLink }) => {
  const [resList, setResList] = useState([]);
  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const { isModalOpen, toggleModal } = useModal();


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

  const openResModal = () => {
    toggleModal();
  };

  return (
    <div id='aside-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '7px', marginBottom: '5px', padding: '3px' }}>
        <h3 className='h5 fw-bold m-0'>근처 음식점 리스트</h3>
        {isOpenBtn && <button className='is-secondary' onClick={() => { openResModal() }}>추가</button>}
      </div>
      <div className='card' style={{ width: '100%', height: '100%' }}>
        <ul className='menu-list'>
          {resList.map((obj, idx) => (
            <li key={obj.name} className="menu-card">
              <span className="menu-text tooltip-wrapper" onClick={() => onSelect(obj.name)}>
                {obj.name}
                <span className="tooltip-text">{obj.remark}</span>
              </span>
              <button className="menu-card-button" onClick={() => onOpenLink(obj.linkUrl)}>링크</button>
            </li>
          ))}
        </ul>
      </div>
      <ResModal
        isOpen={isModalOpen}
        toggle={openResModal}
        title="음식점 등록"
        reload={getResList}
      ></ResModal>
    </div>
  );
};

export default RestaurantList;
