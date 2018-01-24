import React from 'react';
import ReactDOM from 'react-dom';

import Switcher from './components/switcher'

const App = function () {
    return (
        <div>
            <Switcher />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector("#container")
);