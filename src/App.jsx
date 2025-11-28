
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import { animationList } from './data/animList';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [animationsList, setAnimationsList] = useState([]);
  const [fastSlots, setFastSlots] = useState({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] });
  const [walkStyle, setWalkStyle] = useState('clipset@move@trash_fast_turn');

  useEffect(() => {
    // Initialize categories
    const browserCategories = animationList.map(category => ({
      id: category.id,
      name: category.name,
      img: category.img,
      special: category.special,
    }));
    setCategoriesList(browserCategories);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeApp();
      }
    };
    window.addEventListener('keyup', handleEscape);
    return () => window.removeEventListener('keyup', handleEscape);
  }, [fastSlots]);

  const handleSetCategory = (category) => {
    setActiveCategory(category);
    const categoryData = animationList.find(cat => cat.id === category.id);
    if (categoryData) {
      setAnimationsList(categoryData.animations);
    }
  };

  const closeApp = () => {
    setIsActive(false);
    // Mock mp.trigger for browser
    if (typeof mp !== 'undefined') {
      mp.trigger('saveSlots', JSON.stringify(fastSlots));
    } else {
      console.log('saveSlots', JSON.stringify(fastSlots));
    }
  };

  const playAnimation = (animation, isSpecial) => {
    if (isSpecial) {
      setWalkStyle(animation.style);
      if (typeof mp !== 'undefined') {
        mp.trigger('setWalk', JSON.stringify(animation));
      } else {
        console.log('setWalk', JSON.stringify(animation));
      }
    } else {
      if (typeof mp !== 'undefined') {
        mp.trigger('playAnim', JSON.stringify(animation));
      } else {
        console.log('playAnim', JSON.stringify(animation));
      }
    }
  };

  if (!isActive) return null;

  return (
    <div id="app">
      <div className="animation">
        <Navigation
          categoriesList={categoriesList}
          activeCategory={activeCategory}
          onSetCategory={handleSetCategory}
        />
        <Menu
          animationList={animationsList}
          activeCategory={activeCategory}
          fastSlots={fastSlots}
          setFastSlots={setFastSlots}
          walkStyle={walkStyle}
          onPlay={playAnimation}
        />
      </div>
    </div>
  );
}

export default App;
