import 'babel-polyfill';

import './css/app.scss';

import React from 'react';
import {render} from 'react-dom';

import App from './js/app';

const app = document.getElementById('app');
render(
    <App />,
    app,
);
