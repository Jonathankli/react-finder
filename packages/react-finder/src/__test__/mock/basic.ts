import { FinderItem } from "../../types";


export const initTree: FinderItem[] = [
    {
      id: "item1",
      name: "Item 1",
      parent: null,
    },
    {
      id: "item2",
      name: "Item 2",
      parent: null,
    },
    {
      id: "item3",
      name: "Item 3",
      isFolder: true,
      parent: "item1",
    },
    {
      id: "item4",
      name: "Item 4",
      parent: "item1",
    },
    {
      id: "item5",
      name: "Item 5",
      parent: "item3",
    },
    {
      id: "item6",
      name: "Item 6",
      parent: "item3",
    },
  ]