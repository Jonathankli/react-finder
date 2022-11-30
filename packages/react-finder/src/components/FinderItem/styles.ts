import styled from "styled-components";

interface ItemStyleProps {
    active: boolean,
}

export const Item = styled.div<ItemStyleProps>`
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
        background-color: rgba(25, 113, 194, .2);;
    }
    ${({ active }) => active && `
        background-color: rgba(25, 113, 194, .5);;
    `}
`

export const ItemIcon = styled.div`
    padding-right: 10px;
`

export const ItemTitle = styled.p`
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 14px;
`

export const ItemActions = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`

export const ItemAction = styled.li`
    * {
        cursor: pointer;
        padding: 0 2.5px;
        width: 16px;
        height: 16px;
    }
`