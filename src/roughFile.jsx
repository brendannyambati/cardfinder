import { useState, useMemo } from 'react';
import './index.css';

const categories = [
  { id:"groceries",     emoji:"🛒", label:"Groceries",          max:1500, def:600  },
  { id:"dining",        emoji:"🍽", label:"Dining & takeout",    max:800,  def:250  },
  { id:"gas",           emoji:"⛽", label:"Gas & EV charging",   max:600,  def:150  },
  { id:"travel",        emoji:"✈️", label:"Travel & hotels",     max:1000, def:100  },
  { id:"subscriptions", emoji:"📺", label:"Streaming & subs",    max:200,  def:50   },
  { id:"drugstore",     emoji:"💊", label:"Drugstore & health",  max:300,  def:80   },
  { id:"other",         emoji:"🛍️", label:"Everything else",     max:2000, def:400  },
];

const cards = [
  { id:"amex_blue_pref",      name:"Blue Cash Preferred",   issuer:"American Express", fee:95,  rates:{groceries:0.06,subscriptions:0.06,gas:0.03},        catchall:0.01, note:"6% groceries & streaming, 3% gas",     url:"#" },
  { id:"chase_sapphire_pref", name:"Sapphire Preferred",    issuer:"Chase",            fee:95,  rates:{dining:0.03,travel:0.03,groceries:0.03,subscriptions:0.03}, catchall:0.01, note:"3× dining, travel & groceries",        url:"#" },
  { id:"citi_double",         name:"Double Cash",           issuer:"Citi",             fee:0,   rates:{},                                                    catchall:0.02, note:"Simple 2% on everything",              url:"#" },
  { id:"amex_blue_ev",        name:"Blue Cash Everyday",    issuer:"American Express", fee:0,   rates:{groceries:0.03,gas:0.02,subscriptions:0.03},          catchall:0.01, note:"3% groceries, no annual fee",           url:"#" },
  { id:"cap_one_savor",       name:"Savor Rewards",         issuer:"Capital One",      fee:95,  rates:{dining:0.04,groceries:0.03,subscriptions:0.04,travel:0.05}, catchall:0.01, note:"4% dining & entertainment",            url:"#" },
  { id:"chase_freedom",       name:"Freedom Unlimited",     issuer:"Chase",            fee:0,   rates:{dining:0.03,drugstore:0.03,travel:0.05},              catchall:0.015,note:"1.5% base + 3% dining & drugstore",    url:"#" },
  { id:"bilt",                name:"Bilt Mastercard",       issuer:"Wells Fargo",      fee:0,   rates:{dining:0.03,travel:0.02},                             catchall:0.01, note:"Points on rent + 3× dining",            url:"#" },
];

const currentRates = {
  none:                {catchall:0},
  chase_freedom:       {dining:0.03,drugstore:0.03,travel:0.05,catchall:0.015},
  citi_double:         {catchall:0.02},
  amex_blue_ev:        {groceries:0.03,gas:0.02,subscriptions:0.03,catchall:0.01},
  discover_it:         {catchall:0.01},
  cap_one_quicksilver: {catchall:0.015},
};

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

  const fmt = (n) => `$${Math.abs(n).toLocaleString()}`;

  return (
    <>
      <header>
        <div className="logo">card<span>max</span></div>
        <div className="header-right">
          <span className="header-tag">Free · No sign-up</span>
          <div className="header-dot"></div>
        </div>
      </header>

      <div className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Rewards calculator</div>
          <h1>Stop leaving money<br />on the <em>table.</em></h1>
          <p>Drag the sliders to match your monthly spending. We rank every major card by what you'd actually earn — not generic estimates.</p>
        </div>
        <div className="counter">
          <div className="counter-top">Best card earns you</div>
          <div className="counter-num">{fmt(bestCard.val)}</div>
          <div className="counter-sub">per year in rewards</div>
          {Math.abs(gain) > 10 && (
            <div className={`counter-gain ${gain > 10 ? 'up' : 'down'}`}>
              {gain > 10 ? `▲ ${fmt(gain)} more than current card` : `▼ ${fmt(gain)} less than current card`}
            </div>
          )}
        </div>
      </div>

      <div className="layout">
        <div className="left">
          <div className="section-label">Monthly spending</div>
          {categories.map(cat => (
            <div className="slider-row" key={cat.id}>
              <div className="slider-top">
                <span className="slider-name"><span className="slider-emoji">{cat.emoji}</span>{cat.label}</span>
                <span className="slider-val">${spending[cat.id].toLocaleString()}</span>
              </div>
              <input type="range" min="0" max={cat.max} step="25" value={spending[cat.id]}
                     onChange={(e) => setSpending({...spending, [cat.id]: Number(e.target.value)})} />
            </div>
          ))}

          <div className="rule"></div>

          <div className="section-label" style={{marginBottom:'0.65rem'}}>Your current card</div>
          <select value={currentCard} onChange={(e) => setCurrentCard(e.target.value)}>
            <option value="none">No rewards card</option>
            <option value="chase_freedom">Chase Freedom Unlimited (1.5%)</option>
            <option value="citi_double">Citi Double Cash (2% all)</option>
            <option value="amex_blue_ev">Amex Blue Cash Everyday</option>
            <option value="discover_it">Discover it (1% all)</option>
            <option value="cap_one_quicksilver">Capital One Quicksilver (1.5%)</option>
          </select>

          <div className="total-row">
            <span className="total-label">Monthly total</span>
            <span className="total-val">${monthlyTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="right">
          <div className="section-label">Ranked by annual value</div>
          {scoredCards.map((card, i) => {
            const isWinner = i === 0;
            const pct = Math.max(0, (card.val / Math.max(bestCard.val, 1)) * 100);
            const diff = card.val - currentCardVal;
            
            return (
              <div className={`card-tile ${isWinner ? 'winner' : ''}`} key={card.id}>
                {isWinner && <div className="winner-tag">Best match</div>}
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
          })}
          <div className="disclosure">
            Affiliate disclosure: some links earn us a commission if you apply and are approved, at no cost to you. Cards are ranked purely by estimated annual value for your inputs — never by commission rate. Reward estimates are based on published rates and may vary.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
