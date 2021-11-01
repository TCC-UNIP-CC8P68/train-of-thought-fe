import React, { useEffect, useState } from 'react';
import './LinksPg.scss';
import ButtonCustom from '../../components/ButtonCustom';

import { getUserUrlCaptures } from '../../utils/utilsApi';

const LinksPg = () => {
  const [captures, setCaptures] = useState([]);
  const [capturesApiOffset, setCapturesApiOffset] = useState(10);

  useEffect(async () => {
    const userCaptures = await getUserUrlCaptures(10, 0);
    setCaptures(userCaptures);
  }, []);

  const loadCaptures = async () => {
    setCapturesApiOffset(capturesApiOffset + 10);
    const newCaptures = await getUserUrlCaptures(10, capturesApiOffset);

    if(newCaptures.length > 0) {
      const updatedCaptures = captures.concat(newCaptures);
      setCaptures(updatedCaptures);
    } 
  }

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
                  <a target="_blank" href={capture.capturedUrl}>
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
        <button className="pagination-button" onClick={loadCaptures}>More captures</button>
      </div>
    </div>
  );
};

export default LinksPg;
