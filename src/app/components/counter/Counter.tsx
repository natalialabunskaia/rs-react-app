import style from '@components/counter/Counter.module.css';
import { useCounterStore } from '@stores/counterStore';

const Counter = () => {
  const count = useCounterStore((state) => state.count);

  const increment = useCounterStore((store) => store.increment);
  const decrement = useCounterStore((store) => store.decrement);

  return (
    <aside className={style.pokemonCounter}>
      <section className={style.pokemonDetails}>
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
