"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_TYPE = void 0;
var react_1 = require("react");
var uuid_1 = require("uuid");
var types_1 = require("../types");
var SELECT_TYPE;
(function (SELECT_TYPE) {
    SELECT_TYPE[SELECT_TYPE["DETAILS"] = 0] = "DETAILS";
    SELECT_TYPE[SELECT_TYPE["CHILDREN"] = 1] = "CHILDREN";
})(SELECT_TYPE = exports.SELECT_TYPE || (exports.SELECT_TYPE = {}));
var defaultFolderFactory = function (item, targetItem) { return ({
    id: (0, uuid_1.v4)(),
    name: "Neuer Ordner",
    parent: targetItem.parent
}); };
var useFolder = function (tree, setTree, contentRef, dropOnFile, folderFactory) {
    if (folderFactory === void 0) { folderFactory = defaultFolderFactory; }
    var _a = (0, react_1.useState)([]), activeItems = _a[0], setActiveItems = _a[1];
    var _b = (0, react_1.useState)(SELECT_TYPE.CHILDREN), detailView = _b[0], setDetailView = _b[1];
    var hasChildren = (0, react_1.useCallback)(function (id) {
        return tree.some(function (item) { return item.parent === id; });
    }, [tree]);
    var folders = (0, react_1.useMemo)(function () {
        var folder = activeItems.map(function (item, depth) { return ({
            id: item,
            items: tree.filter(function (child) { return child.parent === item; }),
            activeItem: activeItems.length > depth ? activeItems[depth + 1] : null,
        }); });
        folder.unshift({
            id: "root",
            items: tree.filter(function (item) { return !item.parent; }),
            activeItem: activeItems.length > 0 ? activeItems[0] : null,
        });
        if (!folder[folder.length - 1].items.length ||
            detailView === SELECT_TYPE.DETAILS) {
            folder.pop();
        }
        return folder;
    }, [tree, activeItems, detailView]);
    var detailItem = (0, react_1.useMemo)(function () {
        var id = activeItems.at(-1);
        if (id && (!hasChildren(id) || detailView === SELECT_TYPE.DETAILS)) {
            var item = tree.find(function (item) { return item.id === id; });
            if (!item)
                return null;
            setTimeout(function () {
                contentRef.current.scrollTo({
                    top: 0,
                    left: contentRef.current.scrollWidth -
                        contentRef.current.offsetWidth,
                    behavior: "smooth",
                });
            }, 10);
            return item;
        }
        return null;
    }, [tree, activeItems, detailView, contentRef, hasChildren]);
    var selectItem = function (depth, id, type) {
        if (type === void 0) { type = SELECT_TYPE.CHILDREN; }
        var item = tree.find(function (item) { return item.id === id; });
        if (!item) {
            throw new Error("Item with id '" + id + "' not found.");
        }
        if (detailView !== type) {
            setDetailView(type);
        }
        setActiveItems(function (prev) {
            if (prev.length < depth) {
                throw new Error("Parent is not selected!");
            }
            if (prev.length === depth) {
                return __spreadArray(__spreadArray([], prev, true), [id], false);
            }
            return __spreadArray(__spreadArray([], prev.slice(0, depth), true), [id], false);
        });
    };
    var deselectItem = function (depth, type) {
        if (type === void 0) { type = SELECT_TYPE.CHILDREN; }
        if (detailView !== type) {
            setDetailView(type);
        }
        setActiveItems(function (prev) {
            if (prev.length < depth) {
                throw new Error("Parent is not selected!");
            }
            return prev.slice(0, depth);
        });
    };
    var getParents = function (itemId, first) {
        if (first === void 0) { first = true; }
        if (itemId === "root") {
            return [];
        }
        var item = tree.find(function (item) { return item.id === itemId; });
        if (!item) {
            throw new Error("Item not found!");
        }
        if (item.parent && first) {
            return getParents(item.parent, false);
        }
        if (!item.parent) {
            return [item];
        }
        return __spreadArray([
            item
        ], getParents(item.parent, false), true);
    };
    var handleDrop = function (itemId, targetId) {
        var parents = getParents(targetId);
        if (parents.find(function (parent) { return parent.id === itemId; }) || itemId === targetId) {
            console.error("Can not net item in it self!");
            return;
        }
        setTree(function (prev) {
            var itemIndex = prev.findIndex(function (item) { return item.id === itemId; });
            if (itemIndex === -1) {
                throw new Error("Item not found!");
            }
            if (targetId === "root") {
                var copy = prev.slice();
                copy[itemIndex].parent = null;
                return copy;
            }
            var parentIndex = prev.findIndex(function (item) { return item.id === targetId; });
            if (parentIndex === -1) {
                throw new Error("Target not found!");
            }
            var isFolder = hasChildren(targetId);
            var _dropOnFile = prev[parentIndex].dropOnFile ? prev[parentIndex].dropOnFile : dropOnFile;
            if (isFolder || _dropOnFile === types_1.DROP_ON_ITEM_OPTIONS.DIRECT_CHILD) {
                var copy = prev.slice();
                copy[itemIndex].parent = targetId;
                return copy;
            }
            if (_dropOnFile === types_1.DROP_ON_ITEM_OPTIONS.FORBID) {
                return prev;
            }
            if (_dropOnFile === types_1.DROP_ON_ITEM_OPTIONS.CREATE_FOLDER) {
                var _parent = folderFactory(prev[itemIndex], prev[parentIndex]);
                var copy = prev.slice();
                copy.push(_parent);
                copy[itemIndex].parent = _parent.id;
                copy[parentIndex].parent = _parent.id;
                return copy;
            }
            return prev;
        });
        if (activeItems.includes(itemId)) {
            var parentDepth = activeItems.indexOf(itemId) - 1;
            var parentId = activeItems[parentDepth];
            selectItem(parentDepth, parentId);
        }
    };
    return {
        activeItems: activeItems,
        folders: folders,
        detailItem: detailItem,
        selectItem: selectItem,
        deselectItem: deselectItem,
        hasChildren: hasChildren,
        handleDrop: handleDrop,
    };
};
exports.default = useFolder;
