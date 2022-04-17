import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';

import './styles.css';

const SELECTOR = 'root';

const domRoot = document.getElementById(SELECTOR);

// Check if root element exists
if (!domRoot) {
  throw new Error(`DOM element with id "${SELECTOR}" is not defined`);
}

createRoot(domRoot).render(
  <StrictMode>
    <App />
  </StrictMode>
);