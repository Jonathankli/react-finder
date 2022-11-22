import React, { useState } from 'react';
import Finder from '../components/Finder/Finder';
import { FinderItem } from '../types';

function TestComponent({initTree}: {initTree: FinderItem[]}) {

  const [tree, setTree] = useState(JSON.parse(JSON.stringify(initTree)));

  return (
    <div className="App">
      <Finder tree={tree} setTree={setTree}/>
    </div>
  );
}

export default TestComponent;
