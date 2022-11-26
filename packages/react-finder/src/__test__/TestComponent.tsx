import React, { useState } from 'react';
import Finder from '../components/Finder/Finder';
import { FinderItem, FinderProps } from '../types';
import _ from "lodash";

interface TestComponentProps extends  Omit<FinderProps, "tree" | "setTree"> { //Pick<FinderProps, Exclude<"tree" | "setTree", FinderProps>> {
  initTree: FinderItem[]
}

function TestComponent({initTree, ...props}: TestComponentProps ) {

  const [tree, setTree] = useState(_.cloneDeep(initTree));

  return (
    <div className="App">
      <Finder tree={tree} setTree={setTree} {...props}/>
    </div>
  );
}

export default TestComponent;
