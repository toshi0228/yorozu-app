import React from './node_modules/react';
import './index.scss';

const TagForm = ({ className, label, tag, setTag }) => {
  return (
    <div className={className}>
      <label className="tag-label" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type="text"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />
    </div>
  );
};

export default TagForm;

// const TagForm = ({ className, label }) => {
//   const { tag1, setTag1 } = useContext(AppContext);
//   return (
//     <div className={className}>
//       <div>{tag1}</div>
//       <label className="tag-label" htmlFor={label}>
//         {label}
//       </label>
//       <input
//         id={label}
//         type="text"
//         value={tag1}
//         onChange={e => setTag1(e.target.value)}
//       />
//     </div>
//   );
// };
