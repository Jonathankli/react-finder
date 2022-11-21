import React, { useState } from 'react';
import Finder from '../components/Finder/Finder';
import { FinderItem } from '../types';

function TestComponent({initTree}: {initTree: FinderItem[]}) {

  const [tree, setTree] = useState(initTree);

  return (
    <div className="App" style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      maxWidth: "900px",
      maxHeight: "600px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Finder tree={tree} setTree={setTree}/>
    </div>
  );
}

export default TestComponent;
