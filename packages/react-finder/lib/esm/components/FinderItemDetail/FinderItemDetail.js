import React from "react";
import { IconFile } from "@tabler/icons";
import "./styles.css";
var FinderDetail = function (props) {
    var item = props.item;
    return (React.createElement("div", { className: "finderdetail" },
        React.createElement("div", { className: "finderdetail-icon" },
            React.createElement(IconFile, null)),
        React.createElement("p", { className: "finderdetail-title" }, item.name)));
};
export default FinderDetail;
