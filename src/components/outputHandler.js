import { useSelector } from "react-redux";

export function OutputHandler() {
  const nodeHierachy = useSelector((state) => state.treeHiearchy);
  const nodeList = useSelector((state) => state.nodeList);

  let result = calculateResult(nodeHierachy, nodeList);

  return <h1 className="text-white">result: {result}</h1>;
}
function calculateResult(nodeHierachy, nodeList) {
  let result = 1;
  if (
    nodeHierachy.length > 1 &&
    nodeHierachy !== undefined &&
    nodeList !== undefined
  ) {
    result = recussion(0, nodeHierachy, nodeList);
  }

  return result;
}

function recussion(node, dataStructure, nodeList) {
  let waarde = 0;

  let nodeCHildren = dataStructure[node];

  if (nodeCHildren != null) {
    let currentNodeInfo = nodeList[node];

    if (nodeCHildren.length > 1) {
      waarde =
        parseFloat(recussion(nodeCHildren[0], dataStructure, nodeList)) *
        parseFloat(recussion(nodeCHildren[1], dataStructure, nodeList));

      if (
        currentNodeInfo.type === "multiply" ||
        currentNodeInfo.type === "output"
      ) {
        waarde =
          parseFloat(recussion(nodeCHildren[0], dataStructure, nodeList)) *
          parseFloat(recussion(nodeCHildren[1], dataStructure, nodeList));
      } else if (currentNodeInfo.type === "add") {
        waarde =
          parseFloat(recussion(nodeCHildren[0], dataStructure, nodeList)) +
          parseFloat(recussion(nodeCHildren[1], dataStructure, nodeList));
      } else if (currentNodeInfo.type === "subtract") {
        waarde =
          parseFloat(recussion(nodeCHildren[0], dataStructure, nodeList)) -
          parseFloat(recussion(nodeCHildren[1], dataStructure, nodeList));
      } else if (currentNodeInfo.type === "divide") {
        waarde =
          parseFloat(recussion(nodeCHildren[0], dataStructure, nodeList)) /
          parseFloat(recussion(nodeCHildren[1], dataStructure, nodeList));
      }
    } else if (currentNodeInfo.input1 === "connection@0") {
      if (
        currentNodeInfo.type === "multiply" ||
        currentNodeInfo.type === "output"
      ) {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) *
          parseFloat(currentNodeInfo.input2);
      } else if (currentNodeInfo.type === "add") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) +
          parseFloat(currentNodeInfo.input2);
      } else if (currentNodeInfo.type === "subtract") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) -
          parseFloat(currentNodeInfo.input2);
      } else if (currentNodeInfo.type === "divide") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) /
          parseFloat(currentNodeInfo.input2);
      }
    } else if (currentNodeInfo.input2 === "connection@1") {
      if (
        currentNodeInfo.type === "multiply" ||
        currentNodeInfo.type === "output"
      ) {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) *
          parseFloat(currentNodeInfo.input1);
      } else if (currentNodeInfo.type === "add") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) +
          parseFloat(currentNodeInfo.input1);
      } else if (currentNodeInfo.type === "subtract") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) -
          parseFloat(currentNodeInfo.input1);
      } else if (currentNodeInfo.type === "divide") {
        waarde =
          recussion(nodeCHildren[0], dataStructure, nodeList) /
          parseFloat(currentNodeInfo.input1);
      }
    }
  } else {
    let nodeInfo = nodeList[node];

    if (nodeInfo.type === "multiply") {
      waarde = parseFloat(nodeInfo.input1) * parseFloat(nodeInfo.input2);
    } else if (nodeInfo.type === "add") {
      waarde = parseFloat(nodeInfo.input1) + parseFloat(nodeInfo.input2);
    } else if (nodeInfo.type === "subtract") {
      waarde = parseFloat(nodeInfo.input1) - parseFloat(nodeInfo.input2);
    } else if (nodeInfo.type === "divide") {
      waarde = parseFloat(nodeInfo.input1) / parseFloat(nodeInfo.input2);
    }
  }

  return parseFloat(waarde);
}
