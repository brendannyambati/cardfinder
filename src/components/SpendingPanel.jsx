import { categories } from "../data/cards";
import SliderRow from "./SliderRow";

const SpendingPanel = ({
  spending,
  onSpendingChange,
  currentCard,
  onCardChange,
  monthlyTotal,
}) => {
  return (
    <div className="left">
      <div className="section-label" style={{ marginBottom: "0.65rem" }}>
        Your current card
      </div>
      <select
        value={currentCard}
        onChange={(e) => onCardChange(e.target.value)}
      >
        <option value="none">No rewards card</option>
        <option value="chase_freedom">Chase Freedom Unlimited (1.5%)</option>
        <option value="citi_double">Citi Double Cash (2% all)</option>
        <option value="amex_blue_ev">Amex Blue Cash Everyday</option>
        <option value="discover_it">Discover it (1% all)</option>
        <option value="cap_one_quicksilver">
          Capital One Quicksilver (1.5%)
        </option>
      </select>
      <div className="total-row">
        <span className="total-label">Monthly total</span>
        <span className="total-val">${monthlyTotal.toLocaleString()}</span>
      </div>
      <div className="rule"></div>
      <div className="section-label">Monthly spending</div>
      {categories.map((cat) => (
        <SliderRow
          key={cat.id}
          category={cat}
          value={spending[cat.id]}
          onChange={(value) => onSpendingChange(cat.id, value)}
        />
      ))}
    </div>
  );
};

export default SpendingPanel;
