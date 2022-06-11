import { useState } from "react";
import { ConnectionParrent } from "./components/connectionParrent";

import { NodeParrent } from "./components/nodeParrent";
import { useSelector } from "react-redux";

import { OutputHandler } from "./components/outputHandler";

function App() {
  const [nodeAmount, setNodeAmmount] = useState(1);
  const connectionData = useSelector((state) => state.connecties);

  return (
    //background

    <div className="bg-slate-800 w-full h-full absolute ">
      <div className="bg-slate-400 block p-3">
        <button
          onClick={() => {
            setNodeAmmount(nodeAmount + 1);
          }}
        >
          add new node
        </button>

        <button className="p-3">bereken uitkomst</button>
      </div>

      <OutputHandler />

      <ConnectionParrent test={connectionData} />
      <NodeParrent NodeAmmount={nodeAmount} />
    </div>
  );
}

export default App;
