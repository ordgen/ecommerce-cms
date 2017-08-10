import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';


export default function Spinner() {
  return (
    <div>
      <CircularProgress
        size={60}
        thickness={5}
        style={{ display: 'block', margin: '0 auto' }}
      />
    </div>
  );
}
