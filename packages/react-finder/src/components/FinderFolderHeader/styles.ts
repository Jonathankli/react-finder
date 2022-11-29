import styled from "styled-components";

export const FolderHeader = styled.div`
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    padding-left: 30px;
    position: relative;

    &::before {
        content: ">";
        font-size: 12px;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        height: 1px;
        width: calc(100% - 20px);
        transform: translateX(-50%);
        background: rgb(25, 113, 194);
        transform: translateX(-50%);
    }

    p{
        font-size: 12px;
        padding: 0;
        margin: 0;
    }
`

export const FolderActions = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`

export const FolderAction = styled.li`
    * {
        cursor: pointer;
        padding: 0 2.5px;
        width: 16px;
        height: 16px;
    }
`