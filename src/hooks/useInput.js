import { useState } from 'react';

const useInput = initialValue => {
  const { value, setValue } = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const bind = {
    value: value,
    onChange: e => {
      return setValue(e.target.value);
    }
  };

  return [value, bind, reset];
};

export default useInput;
