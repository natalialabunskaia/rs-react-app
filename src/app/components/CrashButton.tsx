import { useState } from 'react';

const CrashButton = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Test application error');
  }

  return (
    <div className="d-grid gap-2 col-6 mx-auto my-5">
      <button
        data-testid="crash-button"
        onClick={() => setError(true)}
        type="button"
        className="btn btn-danger"
      >
        Crash App
      </button>
    </div>
  );
};

export default CrashButton;
