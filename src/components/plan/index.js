import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Plan = ({
  id,
  title,
  image,
  description,
  price,
  tag1,
  tag2,
  tag3,
  tag4
}) => {
  return (
    <div className="plan-container">
      <div className="left-container">
        <img className="plan-image" alt="" src={image} />
      </div>

      <div className="right-container">
        <div className="title">
          <Link to={`/plan/detail/${id}`}>{title}</Link>
        </div>
        <div className="heart-icon">いいねボタン</div>
        <div className="price">{price}</div>
        <div className="description">{description}</div>
        <div className="message">相談してみるボタン</div>

        <div className="tag-list">
          <Link to="/" className="tag">
            {`#${tag1}`}
          </Link>
          <Link to="/" className="tag">
            {`#${tag2}`}
          </Link>
          <Link to="/" className="tag">
            {`#${tag3}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Plan;
