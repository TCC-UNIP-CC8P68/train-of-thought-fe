import React from 'react';

import './TimeStopwatch.scss';

function TimeStopwatch() {
  return (
    <React.Fragment>
      <div className="chronoTime">
        <div className="contdownContainer">
          <div>
            <span>1</span>
            <span>0</span>
          </div>
          <span className="column_divider">:</span>
          <div>
            <span>0</span>
            <span>1</span>
          </div>
        </div>
        <button disabled type="button" className="contdownButton">
          Ativar
        </button>
      </div>
    </React.Fragment>
  );
}

export default TimeStopwatch;
