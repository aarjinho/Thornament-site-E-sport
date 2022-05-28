import React from 'react';
import './index.css';
import Toornament from './Components/Toornament';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataContextProvider from '../../dataContext'


export default function Tournament() {
  return (
    <Toornament />
  )
}