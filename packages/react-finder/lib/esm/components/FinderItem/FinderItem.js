var _this = this;
import React from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import "./styles.css";
import { SELECT_TYPE } from "../../hooks/useFolders";
var FinderItem = function (props) {
    var _a;
    var item = props.item, hasChildren = props.hasChildren, open = props.open, _b = props.active, active = _b === void 0 ? false : _b;
    var actions = hasChildren && ((_a = item.data) === null || _a === void 0 ? void 0 : _a.hasDetails) ? (React.createElement("div", { className: "finder-item-actions" },
        React.createElement(IconEye, { onClick: open.bind(_this, SELECT_TYPE.DETAILS) }))) : null;
    var icon = hasChildren ? React.createElement(IconFolder, null) : React.createElement(IconFile, null);
    return (React.createElement("div", { className: "finder-item ".concat(active ? "isActive" : ""), onClick: function () { return (hasChildren ? open() : open(SELECT_TYPE.DETAILS)); } },
        React.createElement("div", { className: "finder-item-icon" }, icon),
        React.createElement("p", { className: "finder-item-title" }, item.name),
        actions));
};
export default FinderItem;
