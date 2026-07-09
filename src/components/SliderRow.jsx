const SliderRow = ({ category, value, onChange }) => {
  return (
    <div className="slider-row">
      <div className="slider-top">
        <span className="slider-name"><span className="slider-emoji">{category.emoji}</span>{category.label}</span>
        <span className="slider-val">${value.toLocaleString()}</span>
      </div>
      <input type="range" min="0" max={category.max} step="25" value={value}
             onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
};

export default SliderRow;
