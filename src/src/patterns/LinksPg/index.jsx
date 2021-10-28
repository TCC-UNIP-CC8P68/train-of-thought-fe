import React, { useEffect, useState } from 'react';
import './LinksPg.scss';

import { getUserUrlCaptures } from '../../utils/utilsApi';

const LinksPg = () => {
  /*
  const [captures, setCaptures] = useState([]);

  useEffect(async () => {
    const userCaptures = await getUserUrlCaptures(10, 0);
    setCaptures(userCaptures);
  }, []);
  */

  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Links </h2>
      </div>
    </div>
  );
};

export default LinksPg;
