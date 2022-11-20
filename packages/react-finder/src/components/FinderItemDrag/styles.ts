import styled from "styled-components";

interface ItemDragStyleProps {
    isOver: boolean
}

export const ItemDrag = styled.div<ItemDragStyleProps>`
    border: ${({isOver}) => isOver ? "1px solid rgba(25, 113, 194)" : "1px solid rgba(25, 113, 194, 0)"};
`