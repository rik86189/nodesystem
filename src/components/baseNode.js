import React, { useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { enableConnector } from "../actions/enableConnector";
import { addElementToConnectionArray } from "../actions/addElementToConnectionArray";
import { sendData } from "../actions/sendData";
import { disableConnector } from "../actions/disableConnector";
import { changeCords } from "../actions/changeCords";
import changeNodeValue from "../actions/nodeTreeActions/changeNodeValue";
import changeNodeType from "../actions/nodeTreeActions/changeNodeType";

function Input(props) {
  // global context
  const isTryingToConnect = useSelector((state) => state.UIstateManager);
  const sourceNode = useSelector((state) => state.connectieData);
  const dispatch = useDispatch();
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();

  const test = useStore();
  const connecties = test.getState().connecties;

  let allCurrentConencties = findAConnection(connecties, props.nodeIndex);

  let toggle = 0;

  for (let i = 0; i < allCurrentConencties.length; i++) {
    if (allCurrentConencties[i].inputNodeIndex === props.id) {
      toggle = 1;
      dispatch(
        changeNodeValue([props.nodeIndex, "connection@" + props.id, props.id])
      );
    }
  }

  function acceptConnection() {
    if (isTryingToConnect === 1) {
      const testConnection = {
        inputNode: props.nodeIndex,
        inputNodeIndex: props.id,
        sourceNode: sourceNode,
        sourceNodeCords: {
          x: 0,
          y: 0,
        },
        inputNodeCords: {
          x: 0,
          y: 0,
        },
      };

      dispatch(addElementToConnectionArray(testConnection));
      dispatch(disableConnector());
    }
  }

  return (
    <div className="inline-block relative bg-gray-600 col-start-1 p-1">
      <div
        ref={(el) => {
          if (el !== null) {
            const x = el.getBoundingClientRect().x;
            const y = el.getBoundingClientRect().y;

            if (posX !== x && posY !== y) {
              dispatch(
                changeCords({ X: x, Y: y }, props.nodeIndex, false, props.id)
              );
            }

            setPosX(x);
            setPosY(y);
          }
        }}
        className="bg-gray-50 w-3 h-3 block rounded-full absolute -left-2 top-1 "
        onClick={acceptConnection}
      ></div>

      <div className="text-center">
        {toggle === 0 && props.nodeType !== "output" ? (
          <div>
            <input
              className="w-1/2 rounded"
              type={"number"}
              onChange={(e) => {
                let newValue = e.target.value;
                dispatch(
                  changeNodeValue([props.nodeIndex, newValue, props.id])
                );
              }}
              defaultValue={1}
            />{" "}
            <div className="inline">{props.name}</div>{" "}
          </div>
        ) : (
          props.name
        )}
      </div>
    </div>
  );
}

function Output(props) {
  const dispatch = useDispatch();
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  return (
    <div className="inline-block relative bg-gray-600 col-start-2 p-1">
      <div className="text-center">{props.name}</div>

      <div
        className="bg-gray-50 w-3 h-3 block rounded-full absolute -right-2 top-1"
        ref={(el) => {
          if (el != null) {
            const x = el.getBoundingClientRect().x;
            const y = el.getBoundingClientRect().y;

            if (posX !== x || posY !== y) {
              dispatch(changeCords({ X: x, Y: y }, props.nodeIndex, true));
            }

            setPosX(x);
            setPosY(y);
          }
        }}
        onClick={() => {
          dispatch(enableConnector());
          dispatch(sendData(props.nodeIndex));
        }}
      ></div>
    </div>
  );
}

export default function BaseNode(props) {
  const dispatch = useDispatch();
  let [posX, setPosX] = useState(70);
  let [posY, setPosY] = useState(50);
  let [clicked, clickedOnComponent] = useState(0);

  //setType("output")

  const positioning = {
    top: posY + "px",
    left: posX + "px",
  };

  function findDiffrencePostion(e) {
    if (clicked === 1 && posY >= 30) {
      setPosX((posX += e.movementX * 1));
      setPosY((posY += e.movementY * 1));
    } else if (posY <= 30) {
      setPosY((posY += 1));
    }
  }

  let inputNodes = [];
  let outputNodes = [];

  for (let i = 0; i < props.inputAmmount; i++) {
    inputNodes.push(
      <Input
        name={"input " + i}
        nodeIndex={props.nodeIndex}
        id={i}
        key={i}
        nodeType={props.nodeType}
      />
    );
  }
  for (let i = 0; i < props.outputAmmount; i++) {
    outputNodes.push(
      <Output name={"output " + i} nodeIndex={props.nodeIndex} id={i} key={i} />
    );
  }

  return (
    <div
      className=" inline-block w-60 bg-gray-600 rounded-md absolute select-none "
      onMouseDown={() => clickedOnComponent((clicked = 1))}
      onMouseUp={() => clickedOnComponent((clicked = 0))}
      onMouseMove={findDiffrencePostion}
      onMouseLeave={() => clickedOnComponent((clicked = 0))}
      style={positioning}
    >
      <div className="bg-red-600 rounded-t-md p-2">node {props.nodeIndex}</div>
      <div className="grid grid-cols-2">
        {props.nodeType === "output" ? (
          ""
        ) : (
          <div className="col-span-2 grid justify-center  ">
            <select
              className="px-5 py-1 w-full rounded bg-zinc-500"
              onChange={(event) => {
                let value = event.target.value;
                dispatch(changeNodeType([props.nodeIndex, value]));
              }}
            >
              <option value="multiply" key="0">
                multiply
              </option>
              <option value="add" key="1">
                add
              </option>
              <option value="subtract" key="2">
                subtract
              </option>
              <option value="divide" key="3">
                divide
              </option>
            </select>
          </div>
        )}

        {inputNodes}

        {outputNodes}
        {/* <Input name="input 2" nodeIndex={props.nodeIndex} id={2} />
        <Input name="input 3" nodeIndex={props.nodeIndex} id={3} /> */}
      </div>
    </div>
  );
}

function findAConnection(array, nodeIndex) {
  let connectiestoReturn = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i].inputNode === nodeIndex) {
      connectiestoReturn.push(array[i]);
    }
  }

  return connectiestoReturn;
}
