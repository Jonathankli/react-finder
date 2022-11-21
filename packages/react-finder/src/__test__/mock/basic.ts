import { FinderItem } from "../../types";


export const initTree: FinderItem[] = [
    {
      id: "folder",
      name: "Folder",
      parent: null,
    },
    {
      id: "item",
      name: "Item",
      parent: null,
    },
    {
      id: "nestedFolder",
      name: "Nested folder",
      isFolder: true,
      parent: "folder",
    },
    {
      id: "nestedItem",
      name: "Nested item",
      parent: "folder",
    },
    {
      id: "doubleNestedItem",
      name: "Double nested item",
      parent: "nestedFolder",
    },
  ]