import React from 'react';
import wordCloud from '../../assets/wordCloud.png';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Dashboard</h2>
        <img className="word-cloud" src={wordCloud} alt="word cloud"/>
      </div>
    </div>
  );
};

export default Dashboard;
