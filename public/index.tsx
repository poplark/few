import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import '../src/styles/index.scss';
import './index.scss';

const rootElement =
  document.getElementById('root') || document.createElement('div');
const root = createRoot(rootElement);

root.render(<App />);
