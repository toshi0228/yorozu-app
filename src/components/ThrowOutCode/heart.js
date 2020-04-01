import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/heart.scss';

const GoodScore = () => {
  const msg = {
    userSelect: 'none'
  };

  const [count, setCount] = useState(0);
  return (
    <div>
      <i
        className="fa fa-heart"
        onClick={() => setCount(count + 1)}
        style={msg}
      ></i>
      <div>いいね数 {count}</div>
    </div>
  );
};

export default GoodScore;
