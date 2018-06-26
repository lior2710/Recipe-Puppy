import './utils'

import ServiceController from './serviceController'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ClassNames from 'classnames'

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;
window.ClassNames = ClassNames;
window.App = {
    ServiceController: new ServiceController()
};