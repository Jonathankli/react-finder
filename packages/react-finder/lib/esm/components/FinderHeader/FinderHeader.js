import React from 'react';
import { IconX } from '@tabler/icons';
import './styles.css';
var FinderHeader = function (props) {
    var _a = props.title, title = _a === void 0 ? "Finder" : _a;
    return (React.createElement("div", { className: 'finder-header' },
        React.createElement("p", null, title),
        React.createElement(IconX, null)));
};
export default FinderHeader;
