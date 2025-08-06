import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";


const positions = {
  2: [
    { left: '200px', top: '100px' },
    { left: '200px', top: '280px' }
  ],
  3: [
    { left: '150px', top: '110px' },
    { left: '140px', top: '280px' },
    { left: '310px', top: '195px' }
  ],
  4: [
    { left: '205px', top: '80px' },
    { left: '310px', top: '200px' },
    { left: '205px', top: '320px' },
    { left: '90px', top: '200px' }
  ],
  5: [
    { left: '275px', top: '105px' },
    { left: '315px', top: '230px' },
    { left: '205px', top: '320px' },
    { left: '90px', top: '230px' },
    { left: '125px', top: '105px' },
  ],
  6: [
    { left: '200px', top: '65px' },
    { left: '315px', top: '135px' },
    { left: '315px', top: '255px' },
    { left: '200px', top: '330px' },
    { left: '90px', top: '255px' },
    { left: '90px', top: '135px' },
  ],
  7: [
    { left: '260px', top: '75px' },
    { left: '330px', top: '170px' },
    { left: '305px', top: '270px' },
    { left: '202px', top: '330px' },
    { left: '90px', top: '270px' },
    { left: '75px', top: '170px' },
    { left: '135px', top: '75px' },
  ],
  8: [
    { left: '260px', top: '65px' },
    { left: '330px', top: '150px' },
    { left: '330px', top: '240px' },
    { left: '260px', top: '330px' },
    { left: '135px', top: '330px' },
    { left: '75px', top: '240px' },
    { left: '75px', top: '150px' },
    { left: '135px', top: '65px' },
  ],

};


function RouletteBoard({ items }) {
  const [count, setCount] = useState(2);
  const [options, setOptions] = useState(Array(8).fill(''));
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [isMotion, setIsMotion] = useState(true);


  useEffect(() => {
    if (!items || items.length <= 0) {
      return;
    }

    const newOptions = [...options];
    items.forEach((e, i) => {
      newOptions[i] = e;
    });
    setOptions(newOptions);
    let cnt = items.length > 2 ? items.length : 2;
    setCount(cnt);
    setRotation(0);
    setIsAllFilled(true);
  }, [items]);

  useEffect(() => {
    const filled = options.slice(0, count).every((v) => v.trim() !== '');
    setIsAllFilled(filled);
  }, [options, count]);


  const onMinusClick = () => {
    if (count <= 2) return;
    setOptionValue(count - 1, '');
    setIsAllFilled(false);
    setIsVisible(false);
    resetRotation();
    setCount(count - 1);
  }

  const onPlusClick = () => {
    if (count >= 8) return;
    setIsAllFilled(false);
    setIsVisible(false);
    resetRotation();
    setCount(count + 1);
  }

  const setOptionValue = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  }

  const resetOptionValue = () => {
    setIsVisible(false);
    setOptions(Array(8).fill(''));
    resetRotation();
  }

  const modifyOptions = () => {
    setIsVisible(false);
    resetRotation();
  }

  const resetRotation = () => {
    setIsMotion(false);
    setRotation(0);

    setTimeout(() => { setIsMotion(true) }, 300)
  }

  const setComplete = () => {

    setIsVisible(true);
  }

  const spinRoulette = () => {
    const degreesPerSection = 360 / count + 1 / 2;
    const selectedIndex = Math.floor(Math.random() * count);
    const rotationCount = Math.floor(Math.random() * (20 - 5) + 5);

    const targetRotation = 360 * rotationCount + (360 - selectedIndex * degreesPerSection);

    const newRotation = rotation + targetRotation;
    setRotation(newRotation);
  };

  const addOptionValue = (value) => {
    if (isAllFilled) {
      return;
    }

    const emptyIndex = options.findIndex((v, i) => i < count && v.trim() === '');
    if (emptyIndex !== -1) {
      setOptionValue(emptyIndex, value);
    }
  }

  const openLinkPopup = (addr) => {
    window.open(addr, '_blank', 'noopener,noreferrer');
  }


  return (
    <>
      <div className="mt-3">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="fs-5">옵션 개수</span>
          <button id="minusBtn" onClick={onMinusClick}>-</button>
          <div>
            <span className="fs-5 fw-bold">{count}</span><span className="fs-5">개</span>
          </div>
          <button id="plusBtn" onClick={onPlusClick}>+</button>
        </div>
        <div id="board-container" className="d-flex justify-content-center align-items-center mt-4">
          <div style={{
            margin: '0 auto',
            position: 'relative'
          }}>
            <div id="choice"></div>
            <div id="boardDiv"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isMotion ? 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
                transformOrigin: 'center center',
              }}
            >

              <img id="boradImg" src={`/images/pp${count}.png`}></img>
              {isVisible &&
                <ul>
                  {positions[count].map((pos, idx) => (
                    <li key={idx}
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        left: pos.left,
                        top: pos.top,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {options[idx]}
                    </li>
                  ))}
                </ul>}

              {!isVisible &&
                <ul>
                  {positions[count].map((pos, idx) => (
                    <li key={idx}>
                      <input
                        type='text'
                        className="style-pp"
                        placeholder={`옵션 ${idx + 1}`}
                        value={options[idx]}
                        onChange={(e) => { setOptionValue(idx, e.target.value) }}

                        style={{
                          position: 'absolute',
                          left: pos.left,
                          top: pos.top,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </li>
                  ))}
                </ul>
              }
            </div>

          </div>


        </div>

        {isVisible &&
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button id="btnReset" onClick={() => { modifyOptions() }}>변경</button>
            <button id="btnSpin" onClick={() => { spinRoulette() }}>돌리기</button>
          </div>}

        {!isVisible &&
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button id="btnReset" onClick={() => { resetOptionValue() }}>초기화</button>
            {isAllFilled && <button id="btnComplete" onClick={() => { setComplete() }}>설정완료</button>}
          </div>}

      </div>

      <RestaurantList
        onSelect={addOptionValue}
        onOpenLink={openLinkPopup}
      />

    </>
  )

}
export default RouletteBoard