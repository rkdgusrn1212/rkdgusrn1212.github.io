import './index.scss';
import App from './App';
import ReactDom from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = ReactDom.createRoot(rootElement);
if (rootElement.hasChildNodes()) {
  ReactDom.hydrateRoot(rootElement, <App />);
} else {
  root.render(<App />);
}
