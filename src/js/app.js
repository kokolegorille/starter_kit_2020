import React, {lazy, Suspense} from 'react';
import {useRoutes, A} from 'hookrouter';

// Lazy Views
const Home = lazy(() => import('./views/home'));
const About = lazy(() => import('./views/about'));
const NotFound = lazy(() => import('./views/not_found'));

// Hookrouter
const routes = () => ({
  '/': () => <Home />,
  '/about': () => <About />,
});

const App = () => {
  const content = useRoutes(routes()) || <NotFound />;

  return (
    <div>
      <ul>
        <li><A href="/">Home</A></li>
        <li><A href="/about">About</A></li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        { content }
      </Suspense>
    </div>
  );
};

export default App;
