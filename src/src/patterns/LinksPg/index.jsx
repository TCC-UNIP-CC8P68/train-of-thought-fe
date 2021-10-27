import React, { useEffect } from 'react';
import './LinksPg.scss';

import { getUserUrlCaptures } from '../../utils/utilsApi';

const LinksPg = () => {
  useEffect(() => {
    getUserUrlCaptures(10, 0);
  }, []);
  
  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Links </h2>        
      </div>
    </div>
  );
};

export default LinksPg;
