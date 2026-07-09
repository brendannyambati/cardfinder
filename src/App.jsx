import { useState, useMemo } from 'react';
import './index.css';
import { categories, cards, currentRates } from './data/cards';
import Header from './components/Header';
import Hero from './components/Hero';
import SpendingPanel from './components/SpendingPanel';
import ResultsPanel from './components/ResultsPanel';

function App() {
  const [spending, setSpending] = useState(() => {
    const initial = {};
    categories.forEach(c => initial[c.id] = c.def);
    return initial;
  });
  const [currentCard, setCurrentCard] = useState('none');

  const monthlyTotal = useMemo(() => Object.values(spending).reduce((a, b) => a + b, 0), [spending]);

  const calcCardVal = (card) => {
    let total = 0;
    categories.forEach(cat => {
      const rate = card.rates[cat.id] ?? card.catchall;
      total += spending[cat.id] * rate * 12;
    });
    return Math.round(total - card.fee);
  };

  const calcCurrentVal = () => {
    const rates = currentRates[currentCard] ?? {catchall:0};
    let total = 0;
    categories.forEach(cat => {
      const rate = rates[cat.id] ?? rates.catchall;
      total += spending[cat.id] * rate * 12;
    });
    return Math.round(total);
  };

  const currentCardVal = calcCurrentVal();

  const scoredCards = useMemo(() => {
    return cards.map(c => ({...c, val: calcCardVal(c)})).sort((a,b) => b.val - a.val);
  }, [spending]);

  const bestCard = scoredCards[0];
  const gain = bestCard.val - currentCardVal;

  return (
    <>
      <Header />
      <Hero bestValue={bestCard.val} gain={gain} />
      <div className="layout">
        <SpendingPanel
          spending={spending}
          onSpendingChange={(id, value) => setSpending({...spending, [id]: value})}
          currentCard={currentCard}
          onCardChange={setCurrentCard}
          monthlyTotal={monthlyTotal}
        />
        <ResultsPanel scoredCards={scoredCards} bestValue={bestCard.val} currentCardVal={currentCardVal} />
      </div>
    </>
  );
}

export default App;
