import React from 'react';

const TrueMark = ({ width = 16 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} enableBackground="new 0 0 41 41" viewBox="0 0 41 41">
      <g transform="translate(2 2)">
        <path d="m15 28.3-2.3-2.3-6.7-6.7 2.3-2.3 6.7 6.7 12.7-12.7 2.3 2.3-12.7 12.7z" />
        <circle cx="18.5" cy="18.5" fill="none" r="18.5" stroke="#000" strokeWidth={3} />
      </g>
    </svg>
  );
};

export default TrueMark;
