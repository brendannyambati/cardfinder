import { fmt } from '../utils/format';

const Counter = ({ value, gain }) => {
  return (
    <div className="counter">
      <div className="counter-top">Best card earns you</div>
      <div className="counter-num">{fmt(value)}</div>
      <div className="counter-sub">per year in rewards</div>
      {Math.abs(gain) > 10 && (
        <div className={`counter-gain ${gain > 10 ? 'up' : 'down'}`}>
          {gain > 10 ? `▲ ${fmt(gain)} more than current card` : `▼ ${fmt(gain)} less than current card`}
        </div>
      )}
    </div>
  );
};

export default Counter;
