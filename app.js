import React from 'react'
import { render } from 'react-dom'
import Feature from './components/Feature'
import style from './assets/style.js';
import './assets/style.css';

window.React = React

render(<Feature features={data} result={true} />,
                document.getElementById('react-container'))

style();