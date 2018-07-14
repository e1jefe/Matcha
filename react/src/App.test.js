import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../www/app/src/user/main/components/headerComponents/SigninForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
