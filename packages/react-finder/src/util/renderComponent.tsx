import { DetailComponent, FolderHeaderComponent, ItemComponent } from "../types";

const renderComponent = (
    Component: ItemComponent | DetailComponent | FolderHeaderComponent,
    props: any
): JSX.Element => {
    if (typeof Component === "function") {
        return <Component {...props} />;
    }
    return Component;
};

export default renderComponent;
