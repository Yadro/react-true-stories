import React from 'react';
import ReactDOM from 'react-dom';

import { Story } from '../src';

const stories = [{ url: './assets/img1.png' }, { url: './assets/img2.png' }, { url: './assets/img1.png' }];

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello instagram story</h1>
      <Story
        stories={stories}
        size={{
          height: 400,
          width: 200,
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('.root'));
