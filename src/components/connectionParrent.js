import { useDispatch } from "react-redux";
import buildHiearchy from "../actions/nodeTreeActions/buildHierachy";

export function ConnectionParrent(props) {
  const isTryingToConnect = props.test;

  let connectionArray = [];

  const dispatch = useDispatch();

  dispatch(buildHiearchy(isTryingToConnect));

  for (let i = 0; i < isTryingToConnect.length; i++) {
    const cords = isTryingToConnect[i];

    connectionArray.push(
      <line
        x1={cords.inputNodeCords.x}
        y1={cords.inputNodeCords.y -65}
        x2={cords.sourceNodeCords.x + 10}
        y2={cords.sourceNodeCords.y - 65}
        key={i}
        strokeWidth={4}
        className="border-2 border-white"
      />
    );
  }

  return (
    <svg className="stroke-emerald-600   fill-transparent w-full h-full absolute pointer-events-none">
      {connectionArray}
    </svg>
  );
}

//connect(mapStateToProps)(ConnectionParrent);
