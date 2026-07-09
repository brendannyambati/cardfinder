import CardTile from './CardTile';
import Disclosure from './Disclosure';

const ResultsPanel = ({ scoredCards, bestValue, currentCardVal }) => {
  return (
    <div className="right">
      <div className="section-label">Ranked by annual value</div>
      {scoredCards.map((card, i) => (
        <CardTile
          key={card.id}
          card={card}
          isWinner={i === 0}
          ct={Math.max(0, (card.val / Math.max(bestValue, 1)) * 100)}
          diff={card.val - currentCardVal}
        />
      ))}
      <Disclosure />
    </div>
  );
};

export default ResultsPanel;
