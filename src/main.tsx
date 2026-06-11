import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// ViteReactSSG provides the Router (no BrowserRouter needed) and handles both
// server-side prerendering (renderToString) and client hydration. StrictMode is
// applied on the client only, avoiding double-render during prerender.
export const createRoot = ViteReactSSG({ routes });
