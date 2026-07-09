import Counter from './Counter';

const Hero = ({ bestValue, gain }) => {
  return (
    <div className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">Rewards calculator</div>
        <h1>Stop leaving money<br />on the <em>table.</em></h1>
        <p>Drag the sliders to match your monthly spending. We rank every major card by what you'd actually earn — not generic estimates.</p>
      </div>
      <Counter value={bestValue} gain={gain} />
    </div>
  );
};

export default Hero;
