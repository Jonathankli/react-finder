export interface FinderItem {
    id: string;
    parent?: string | null;
    name?: string
    Component?: any;
    dropOnFile?: DROP_ON_ITEM_OPTIONS; 
    data?: any;
}

export interface FinderFolder {
    id: string;
    items: FinderItem[];
    activeItem: string | null;
}
export enum DROP_ON_ITEM_OPTIONS {
    CREATE_FOLDER,
    DIRECT_CHILD,
    FORBID,
}