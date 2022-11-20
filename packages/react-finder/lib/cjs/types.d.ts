export interface FinderItem {
    id: string;
    parent?: string | null;
    name?: string;
    Component?: any;
    dropOnFile?: DROP_ON_ITEM_OPTIONS;
    data?: any;
}
export interface FinderFolder {
    id: string;
    items: FinderItem[];
    activeItem: string | null;
}
export declare enum DROP_ON_ITEM_OPTIONS {
    CREATE_FOLDER = 0,
    DIRECT_CHILD = 1,
    FORBID = 2
}
