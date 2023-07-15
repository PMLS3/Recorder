import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ControlBar from './ControlBar';

import FaStyle from '@fortawesome/fontawesome-svg-core/styles.css';
import CommonStyle from '../Common/styles.css';

const target = document.body.appendChild(document.createElement('DIV'));

declare global {
  interface Window {
    __QuickSellRecorder_CLEAN_UP: () => void;
    __QuickSellRecorder_SCRIPT: boolean | null;
    wrappedJSObject: {
      __QuickSellRecorder_SCRIPT: boolean;
    };
  }
  function exportFunction(fn: Function, scope: Window, opts: any): void;
}

// Expose a clean up function after a test completes
function cleanUp() {
  window.__QuickSellRecorder_SCRIPT = null;
  // @ts-ignore - the typing doesn't like shadow roots for some reason
  unmountComponentAtNode(target.shadowRoot);
}

// Expose clean up to window
window.__QuickSellRecorder_CLEAN_UP = cleanUp;
// For firefox
if (typeof exportFunction === 'function') {
  exportFunction(cleanUp, window, { defineAs: '__QuickSellRecorder_CLEAN_UP' });
}

if (window.__QuickSellRecorder_SCRIPT == null) {
  window.__QuickSellRecorder_SCRIPT = true;
  // For firefox
  if (window.wrappedJSObject != null) {
    window.wrappedJSObject.__QuickSellRecorder_SCRIPT = true;
  }

  target.attachShadow({ mode: 'open' });
  render(
    <>
      <style>
        {CommonStyle}
        {FaStyle}
      </style>
      <ControlBar onExit={cleanUp} />
    </>,
    target.shadowRoot
  );
}
