import { DetailComponent, FinderDetailProps, FinderItemProps, ItemComponent } from "../types";

const renderComponent = (
    Component: ItemComponent | DetailComponent,
    props: any
): JSX.Element => {
    if (typeof Component === "function") {
        return <Component {...props} />;
    }
    return Component;
};

export default renderComponent;
