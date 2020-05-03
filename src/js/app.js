import React, {lazy, Suspense} from 'react';
import {useRoutes, A} from 'hookrouter';

// Lazy Views
const Home = lazy(() => import('./views/home'));
const About = lazy(() => import('./views/about'));
const Fonts = lazy(() => import('./views/fonts'));
const NotFound = lazy(() => import('./views/not_found'));

// Hookrouter
const routes = () => ({
  '/': () => <Home />,
  '/about/': () => <About />,
  '/fonts/': () => <Fonts />,
});

const App = () => {
  const content = useRoutes(routes()) || <NotFound />;

  return (
    <div>
      <ul>
        <li><A href="/">Home</A></li>
        <li><A href="/about/">About</A></li>
        <li><A href="/fonts/">Fonts</A></li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        { content }
      </Suspense>
    </div>
  );
};

export default App;
