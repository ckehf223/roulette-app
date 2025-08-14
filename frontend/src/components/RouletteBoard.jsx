import { useEffect, useRef, useState } from "react";
import RestaurantList from "./RestaurantList";
import '/src/css/RouletteBoard.css';
import positions from "/src/common/position";
import instance from '/src/auth/axios.js';
import { getKrDate } from "/src/utils/dateUtils";

const MAX_COUNT = 12;
const POINTER_DEG = 270;
const COLOR = ["#d5ffb0ff", "#ffec5fff", "#ff7171ff"];

function RouletteBoard({ items }) {
  const [count, setCount] = useState(2);
  const [options, setOptions] = useState(Array(MAX_COUNT).fill(''));
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [isMotion, setIsMotion] = useState(true);
  const [pendingWinner, setPendingWinner] = useState(null);
  const [winnerShift, setWinnerShift] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const canvasRef = useRef(null);
  const CSS_SIZE = 420;

  useEffect(() => {
    if (!items || items.length <= 0) return;

    setOptions(prev => {
      const next = [...prev];
      items.forEach((e, i) => { next[i] = e; });
      return next;
    });

    const cnt = items.length > 2 ? items.length : 2;
    setCount(cnt);
    setRotation(0);
    setIsAllFilled(true);
  }, [items]);

  useEffect(() => {
    const filled = options.slice(0, count).every((v) => v.trim() !== '');
    setIsAllFilled(filled);
  }, [options, count]);

  useEffect(() => {
    drawWheel();
  }, [count, options, isVisible]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const size = CSS_SIZE;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const center = size / 2;
    const radius = center - 8;
    const textRadius = radius - 30;
    const angleStep = (2 * Math.PI) / count;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, i * angleStep, (i + 1) * angleStep);
      ctx.closePath();
      ctx.fillStyle = COLOR[(i % 3)];
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isVisible) {
        const label = (options[i] || `Option ${i + 1}`).toString();
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * angleStep + angleStep / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px system-ui, -apple-system, Arial";
        ctx.fillStyle = "#222";
        const maxWidth = radius - 16;
        ctx.fillText(ellipsize(ctx, label, maxWidth), textRadius, 0);
        ctx.restore();
      }
    }

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const ellipsize = (ctx, text, maxWidth) => {
    if (ctx.measureText(text).width <= maxWidth) return text;
    const ellipsis = "…";
    let lo = 0, hi = text.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      const t = text.slice(0, mid) + ellipsis;
      if (ctx.measureText(t).width <= maxWidth) lo = mid + 1;
      else hi = mid;
    }
    return text.slice(0, lo - 1) + ellipsis;
  };

  const onMinusClick = () => {
    if (count <= 2) return;
    setOptionValue(count - 1, '');
    setIsAllFilled(false);
    setIsVisible(false);
    resetRotation();
    setCount(count - 1);
  };

  const onPlusClick = () => {
    if (count >= MAX_COUNT) return;
    setIsAllFilled(false);
    setIsVisible(false);
    resetRotation();
    setCount(count + 1);
  };

  const setOptionValue = (idx, value) => {
    setOptions(prev => prev.map((v, i) => (i === idx ? value : v)));
  };

  const resetOptionValue = () => {
    setIsVisible(false);
    setOptions(Array(MAX_COUNT).fill(''));
    resetRotation();
  };

  const modifyOptions = () => {
    setIsVisible(false);
    resetRotation();
  };

  const resetRotation = () => {
    setIsMotion(false);
    setRotation(0);
    setTimeout(() => { setIsMotion(true); }, 300);
  };

  const addOptionValue = (value) => {
    if (isAllFilled) return;
    setOptions(prev => {
      const emptyIndex = prev.findIndex((v, i) => i < count && v.trim() === '');
      if (emptyIndex === -1) return prev;
      return prev.map((v, i) => (i === emptyIndex ? value : v));
    });
  };

  const openLinkPopup = (addr) => {
    window.open(addr, '_blank', 'noopener,noreferrer');
  };

  const randomShuffle = (list) => {
    if (!list?.length) return;
    setOptions(prev =>
      prev.map((v, i) => (i < count ? (list[i] ?? '') : v))
    );
  };

  const hasPositions = !!positions[count];

  const spinRoulette = () => {
    if (isSpinning) return;
    const degPer = 360 / count;
    const selectedIndex = Math.floor(Math.random() * count);
    setPendingWinner(selectedIndex);

    const centerAngle = POINTER_DEG - (selectedIndex + 0.5) * degPer;

    const safety = Math.min(10, degPer / 4);
    const maxJitter = Math.max(0, degPer / 2 - safety);
    const jitter = (Math.random() * 2 - 1) * maxJitter;
    const turns = Math.floor(Math.random() * 15) + 5;

    setIsSpinning(true);
    setRotation(turns * 360 + centerAngle + jitter);
  };

  const normalizeDeg = (deg) => ((deg % 360) + 360) % 360;

  const indexFromRotationRaw = (rotationDeg, count) => {
    const degPer = 360 / count;
    const current = normalizeDeg(rotationDeg);
    const underPointer = normalizeDeg(POINTER_DEG - current);
    const EPS = 1e-4;
    return Math.floor((underPointer + EPS) / degPer) % count;
  };

  const handleSpinEnd = async () => {
    const raw = indexFromRotationRaw(rotation, count);
    if (pendingWinner !== null) {
      const shift = (pendingWinner - raw + count) % count;
      setWinnerShift(shift);
    }
    const finalIndex = (raw + winnerShift) % count;

    await saveHistory(finalIndex);

    setIsMotion(false);
    setRotation(normalizeDeg(rotation));
    setTimeout(() => { setIsMotion(true); }, 30);
    setIsSpinning(false);
  };

  const saveHistory = async (index) => {
    try {
      const response = await instance.post("/result/his/save", {
        result: options[index],
        reqDate: getKrDate('yyyyMMddHHmmss'),
        userId: 1,
      });
      console.log(response);
      if (response.status === 200 && response.data > 0) {
        "test"
      }
    } catch (error) {
      console.error("룰렛 기록 저장중 에러 발생" + error);
    }
  }



  return (
    <>
      <div className="board-area">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="fs-5">COUNT</span>
          <button id="minusBtn" onClick={onMinusClick}>-</button>
          <div>
            <span className="fs-5 fw-bold">{count}</span>
          </div>
          <button id="plusBtn" onClick={onPlusClick}>+</button>
        </div>

        <div id="board-container" className="d-flex justify-content-center align-items-center mt-4">
          <div style={{ margin: '0 auto', position: 'relative' }}>
            <div className="selector" style={{ zIndex: 3 }}></div>

            <div
              id="boardDiv"
              onTransitionEnd={handleSpinEnd}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isMotion ? 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
                transformOrigin: 'center center',
                position: 'relative',
                width: CSS_SIZE,
                height: CSS_SIZE,
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  borderRadius: '50%',
                  display: 'block',
                  zIndex: 1,
                }}
              />

              {!isVisible && hasPositions && (
                <ul style={{ zIndex: 2 }}>
                  {positions[count].map((pos, idx) => (
                    <li key={idx}>
                      <input
                        type='text'
                        className="style-pp"
                        placeholder={`Option ${idx + 1}`}
                        value={options[idx]}
                        onChange={(e) => { setOptionValue(idx, e.target.value); }}
                        style={{
                          position: 'absolute',
                          left: pos.left,
                          top: pos.top,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {!isVisible && !hasPositions && (
          <div className="d-flex justify-content-center mt-3">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px',
              width: 'min(640px, 90vw)'
            }}>
              {Array.from({ length: count }).map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="style-pp"
                  placeholder={`Option ${idx + 1}`}
                  value={options[idx]}
                  onChange={(e) => setOptionValue(idx, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}

        {isVisible && (
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button id="btnReset" onClick={modifyOptions}>Modify</button>
            <button id="btnSpin" onClick={spinRoulette}>Spin</button>
          </div>
        )}

        {!isVisible && (
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button id="btnReset" onClick={resetOptionValue}>Reset</button>
            {isAllFilled && <button id="btnComplete" onClick={() => { setIsVisible(true); }}>Complete</button>}
          </div>
        )}
      </div>

      <RestaurantList
        onSelect={addOptionValue}
        onOpenLink={openLinkPopup}
        count={count}
        onRandomSet={randomShuffle}
      />
    </>
  );
}

export default RouletteBoard;
