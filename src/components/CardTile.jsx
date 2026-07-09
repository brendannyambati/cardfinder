import { fmt } from '../utils/format';

const CardTile = ({ card, isWinner, pct, diff }) => {
  return (
    <div className={`card-tile ${isWinner ? 'winner' : ''}`}>
      {isWinner && <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right'
      }}>
        <div className="winner-tag">Best match</div>
        </div>}
      <div className="tile-main">
        <div className="tile-left">
          <div className="tile-name">{card.name}</div>
          <div className="tile-issuer">{card.issuer} · {card.fee === 0 ? 'No annual fee' : `$${card.fee}/yr fee`}</div>
        </div>
        <div className="tile-right">
          <div className="tile-value">{fmt(card.val)}</div>
          <div className="tile-yr">est. / year</div>
        </div>
      </div>
      <div className="bar-wrap">
        <div className="bar-track"><div className="bar-fill" style={{width:`${pct}%`}}></div></div>
      </div>
      <div className="tile-foot">
        <span className="tile-note">{card.note}</span>
        {Math.abs(diff) > 10 && (
          <span className={`diff-chip ${diff > 10 ? 'up' : 'down'}`}>
            {diff > 10 ? `+${fmt(diff)}/yr vs current` : `-${fmt(Math.abs(diff))}/yr vs current`}
          </span>
        )}
      </div>
      {isWinner && <button className="apply-btn" onClick={() => window.open(card.url,'_blank')}>Apply for {card.name} →</button>}
    </div>
  );
};

export default CardTile;
