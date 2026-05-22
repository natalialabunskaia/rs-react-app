import '@pages/HomePage/HomePage.css';
import { useCounterStore } from '../store/store';

const Counter = ({ count }: { count: number }) => {
  const increment = useCounterStore((store) => store.increment);
  const decrement = useCounterStore((store) => store.decrement)
  return (
    <aside className="pokemon-counter">
      <section className="order-details">
        <div>
          <h1>Counter</h1>
          <p>Count: {count}</p>
        </div>
        <div className="d-grid gap-2">
          <button onClick={increment} className="btn btn-primary" type="button">
            +
          </button>
          <button onClick={decrement} className="btn btn-primary" type="button">
            -
          </button>
        </div>
      </section>
    </aside>
  );
};

export default Counter;
