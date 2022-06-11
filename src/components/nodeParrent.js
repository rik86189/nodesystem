import BaseNode from "./baseNode";
import { useContext, useState } from "react";
import addNode from "../actions/nodeTreeActions/addNode"
import { useSelector, useDispatch, useStore } from "react-redux";

export function NodeParrent(props) {
  let nodes = [];
  const dispatch = useDispatch();


  let idArray = []

  const test = useStore();
  const nodeTreeNodeList = test.getState().nodeList;



  nodeTreeNodeList.forEach(element => {

    idArray.push(element.nodeId)

  });



  //props.NodeAmmount

  for (let i = 0; i < props.NodeAmmount; i++) {
    if (i == 0) {
      nodes.push(<BaseNode nodeIndex={0} key={0} inputAmmount={1} outputAmmount={0} nodeType="output" />);
      if (!idArray.includes(i)) {

        dispatch(addNode([i, "output", 1, 1]))

      }


    } else {

      nodes.push(<BaseNode nodeIndex={i} key={i} inputAmmount={2} outputAmmount={1} />);

      if (!idArray.includes(i)) {

        dispatch(addNode([i, "multiply", 1, 1]))

      }

    }

  }

  return (
    //background

    <div className=" w-full h-full absolute ">{nodes}</div>
  );
}
