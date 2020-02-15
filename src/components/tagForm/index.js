import React, { useContext } from 'react';
import './index.scss';
import AppContext from '../../contexts/AppContext';

const TagForm = ({ className, label }) => {
  const { tag1, setTag1 } = useContext(AppContext);
  return (
    <div className={className}>
      <div>{tag1}</div>
      <label className="tag-label" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type="text"
        value={tag1}
        onChange={e => setTag1(e.target.value)}
      />
    </div>
  );
};

export default TagForm;
