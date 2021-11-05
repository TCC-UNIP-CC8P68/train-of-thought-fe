import React, { useEffect, useState } from 'react';
import wordCloud from '../../assets/wordCloud.png';
import { getTopSites } from '../../utils/utilsApi';

import './Dashboard.scss';

const Dashboard = () => {
  const [topSites, setTopSites] = useState({}); 

  useEffect(() => {
    getSites();
  }, []);  
  
  const getSites = async () => {
    const sites =  await getTopSites();
    setTopSites(sites);
  }

  return (
    <div className="block_options dashboard-block">
      <div className="div-block">
        <h2> Dashboard</h2>
        <div className="div-container">
          <h3>Word Cloud</h3>
          <img className="word-cloud" src={wordCloud} alt="word cloud"/>
        </div>
        <div className="div-container link-container">
          <h3>Top 10 sites acessados</h3>
          <ul>
            {Object.entries(topSites).map((site, index) => {
              return(
                <li key={site[index]}>
                  <div>
                    {index + 1}
                  </div>
                  <div>
                    <b>Site: </b>
                    <span> {site[0]}</span>
                  </div>
                  <div>
                    <b>Frequência: </b>
                    <span>{site[1]}</span>
                  </div>
                </li>
              );            
            })}
          </ul>
        </div>      
        
      </div>
    </div>
  );
};

export default Dashboard;
