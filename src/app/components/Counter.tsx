import { useCounterStore } from '@stores/counterStore';

const Counter = () => {
  const count = useCounterStore((state) => state.count);

  const increment = useCounterStore((store) => store.increment);
  const decrement = useCounterStore((store) => store.decrement);

  return (
    <aside className="p-4 position-sticky bottom-0 mt-auto mb-4 z-3">
      <section className="bg-white rounded-4 p-3 border text-center w-100 mx-auto">
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
