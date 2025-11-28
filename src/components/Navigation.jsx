
import { SVGImages } from '../data/svgImages';
import '../styles/navigation.css';

function Navigation({ categoriesList, activeCategory, onSetCategory }) {
  const getImage = (category) => {
    return category?.img && SVGImages[category.img] ? SVGImages[category.img] : '';
  };

  const getName = (category) => {
    return category?.name || '';
  };

  const isActive = (category) => {
    return category === activeCategory;
  };

  const handleClick = (category) => {
    if (!isActive(category)) {
      onSetCategory(category);
    }
  };

  return (
    <div className="animation__navigation">
      {categoriesList.map((category) => (
        <div
          key={category.id}
          className={`navigation__paragraph ${isActive(category) ? 'active' : ''}`}
          onClick={() => handleClick(category)}
        >
          <div
            className="paragraph__image"
            dangerouslySetInnerHTML={{ __html: getImage(category) }}
          />
          <p className="paragraph__text">{getName(category)}</p>
        </div>
      ))}
    </div>
  );
}

export default Navigation;
