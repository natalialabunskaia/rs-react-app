import React from 'react';
import type { CrashButtonState } from '../utils/types';

export class CrashButton extends React.Component<object, CrashButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleClick = () => {
    this.setState({
      error: 1,
    });
  };

  render() {
    if (this.state.error) {
      throw new Error('Test application error');
    }
    return (
      <div className="d-grid gap-2 col-6 mx-auto my-5">
        <button
          onClick={this.handleClick}
          type="button"
          className="btn btn-danger"
        >
          Crash App
        </button>
      </div>
    );
  }
}
