import React from 'react'
import { render } from 'react-dom'
import Container from './components/Container';
import style from './assets/style.js';
import './assets/style.css';

window.React = React

render(<Container data={data} />,
                document.getElementById('react-container'))

style();