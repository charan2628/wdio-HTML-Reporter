import React from 'react'
import { render } from 'react-dom'
import Feature from './components/Feature'
import style from './style';

window.React = React

render(<Feature features={data} result={true} />,
                document.getElementById('react-container'))

style();