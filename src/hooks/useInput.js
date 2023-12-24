import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return [value, handleValueChange, setValue];
};

export default useInput;
