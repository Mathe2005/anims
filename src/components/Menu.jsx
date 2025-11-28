
import { useState, useEffect, useRef } from 'react';
import { SVGImages } from '../data/svgImages';
import '../styles/menu.css';

function Menu({ animationList, activeCategory, fastSlots, setFastSlots, walkStyle, onPlay }) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggableItem, setDraggableItem] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const categoryName = activeCategory?.name || '';
  const getImage = activeCategory?.img && SVGImages[activeCategory.img] ? SVGImages[activeCategory.img] : '';
  const isSpecial = activeCategory?.special || false;

  const getCurrentStyle = () => {
    if (isSpecial && walkStyle !== null) {
      return animationList.find(animation => animation.style === walkStyle);
    }
    return null;
  };

  const isActive = (animation) => {
    return animation === getCurrentStyle();
  };

  const animationClone = (animation) => {
    const clone = JSON.parse(JSON.stringify(animation));
    if (activeCategory) {
      clone.category = JSON.parse(JSON.stringify(activeCategory));
    }
    return clone;
  };

  const handleDragStart = (animation) => {
    setDraggableItem(animationClone(animation));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (slotNumber) => {
    if (draggableItem && !isSpecial) {
      setFastSlots(prev => ({
        ...prev,
        [slotNumber]: [draggableItem]
      }));
    }
    setIsDragging(false);
  };

  const deleteQuick = (slotNumber) => {
    setFastSlots(prev => ({
      ...prev,
      [slotNumber]: []
    }));
  };

  const playAnimation = (animation) => {
    onPlay(animation, isSpecial);
  };

  const getFastImage = (i) => {
    const slot = fastSlots[i];
    const image = slot.length && slot[0]?.category?.img;
    return image && SVGImages[image] ? SVGImages[image] : '';
  };

  const getFastTitle = (i) => {
    return fastSlots[i].length && fastSlots[i][0]?.category?.name || '';
  };

  const getSubTitle = (i) => {
    return fastSlots[i].length && fastSlots[i][0]?.name || '';
  };

  const isFree = (i) => {
    return fastSlots[i].length === 0;
  };

  return (
    <div className="animation__main">
      <p className="main__header">ანიმაციები</p>
      <div className="main__list">
        {animationList.map((animation) => (
          <div
            key={animation.id}
            className={`main__cell ${isActive(animation) ? 'active' : ''}`}
            draggable={!isSpecial}
            onDragStart={() => handleDragStart(animation)}
            onDragEnd={handleDragEnd}
            onClick={() => playAnimation(animation)}
          >
            <div
              className="cell__image"
              dangerouslySetInnerHTML={{ __html: getImage }}
            />
            <div className="cell__text">
              <p className="cell__title">{categoryName}</p>
              <p className="cell__subtitle">{animation.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="quick__block">
        <p className="quick__title">სწრაფი წვდომა</p>
        <p className="quick__subtitle">
          მაუსის მარცხენა კლიკით შეგიძლიათ ანიმაციების სწრაფ სლოტში დამატება.
        </p>
        <div className="quick__menu">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="menu__cell"
              data-slot={i}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
            >
              <div className={`anim__slot ${isFree(i) ? 'free' : ''} ${isDragging ? 'drag' : ''}`}>
                {!isFree(i) && (
                  <>
                    <div
                      className="cell__image"
                      dangerouslySetInnerHTML={{ __html: getFastImage(i) }}
                    />
                    <div className="cell__text">
                      <p className="cell__title">{getFastTitle(i)}</p>
                      <p className="cell__subtitle">{getSubTitle(i)}</p>
                    </div>
                    <div className="cell__close" onClick={() => deleteQuick(i)}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.32003 4.00023L7.79489 1.52538C8.06837 1.2519 8.06837 0.80854 7.79489 0.535527L7.46494 0.205577C7.19146 -0.0679034 6.7481 -0.0679034 6.47509 0.205577L4.00023 2.68043L1.52538 0.20511C1.2519 -0.0683701 0.80854 -0.0683701 0.535527 0.20511L0.20511 0.53506C-0.0683701 0.80854 -0.0683701 1.2519 0.20511 1.52491L2.68043 4.00023L0.205577 6.47509C-0.0679034 6.74857 -0.0679034 7.19193 0.205577 7.46494L0.535527 7.79489C0.809007 8.06837 1.25236 8.06837 1.52538 7.79489L4.00023 5.32003L6.47509 7.79489C6.74857 8.06837 7.19193 8.06837 7.46494 7.79489L7.79489 7.46494C8.06837 7.19146 8.06837 6.7481 7.79489 6.47509L5.32003 4.00023Z"/>
                      </svg>
                    </div>
                  </>
                )}
                <div className="slot__number">{i}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="help__footer">
        <span>ESC</span> - რათა დახუროთ
      </p>
    </div>
  );
}

export default Menu;
