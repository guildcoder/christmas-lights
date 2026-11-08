import React from 'react';import{createRoot}from'react-dom/client';import Studio from './Studio';import './style.css';createRoot(document.getElementById('root')!).render(<Studio/>);

if('serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});});
