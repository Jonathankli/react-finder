import styled from "styled-components";

export const Finder = styled.div`
    border: 2px solid rgb(25, 113, 194);
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const FinderContent = styled.div`
    flex: 1;
    display: flex;
    overflow-x: scroll;
`

export const FinderFolderContainer = styled.div`
    flex: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
`

export const FinderDetailContainer = styled.div`
    flex: 1;
`