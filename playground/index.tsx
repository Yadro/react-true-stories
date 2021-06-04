import React from 'react';
import ReactDOM from 'react-dom';

import { Story } from '../src';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello instagram story</h1>
      <Story />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('.root'));
