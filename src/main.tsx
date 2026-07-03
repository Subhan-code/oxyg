import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider.tsx';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (event) => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.backgroundColor = 'red';
  container.style.color = 'white';
  container.style.padding = '10px';
  container.style.zIndex = '999999';
  container.style.fontSize = '14px';
  container.style.fontFamily = 'monospace';
  container.innerText = 'Runtime Error: ' + event.message + ' at ' + event.filename + ':' + event.lineno;
  document.body.appendChild(container);
});

window.addEventListener('unhandledrejection', (event) => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.backgroundColor = 'darkred';
  container.style.color = 'white';
  container.style.padding = '10px';
  container.style.zIndex = '999999';
  container.style.fontSize = '14px';
  container.style.fontFamily = 'monospace';
  container.innerText = 'Promise Rejection: ' + event.reason;
  document.body.appendChild(container);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HashRouter>
        <TooltipProvider delayDuration={100}>
          <App />
        </TooltipProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
);
