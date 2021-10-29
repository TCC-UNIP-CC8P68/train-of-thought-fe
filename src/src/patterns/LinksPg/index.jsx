import React, { useEffect, useState } from 'react';
import './LinksPg.scss';

import { getUserUrlCaptures } from '../../utils/utilsApi';

const LinksPg = () => {
  const [captures, setCaptures] = useState([]);

  useEffect(async () => {
    const userCaptures = await getUserUrlCaptures(10, 0);
    setCaptures(userCaptures);
  }, []);

  console.log(captures);
  
  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Links </h2>
        <div className="link-container">
          <ul>
            {captures.map(capture => {
              return (
              <li>
                <div>
                  <b>Site visitado:</b>
                </div>
                <div>
                  <a href={capture.capturedUrl}>
                  {capture.capturedUrl.substring(0,100)} 
                  {capture.capturedUrl.length > 100 && ' ...'} 
                  </a>
                </div>
                <div>Visitado no dia: 26/10/2021</div>
              </li>
              );
            })}             
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinksPg;
