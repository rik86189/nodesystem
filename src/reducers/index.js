import clickedOutput from "./clickedOutput"
import modifyConnectionArray from "./modifyConnectionArray"
import sendDetails from "./clickedOutputDetails"
import sourceCords from "./sourceCords";

import {combineReducers } from "redux"
import nodeList from "./nodelist"
import nodeTreeState from "./nodeTreeArray"

const allReducers = combineReducers({

    UIstateManager: clickedOutput,
    connecties: modifyConnectionArray,
    connectieData:sendDetails,
    nodeList: nodeList,
    treeHiearchy:nodeTreeState,
    sourceCords:sourceCords
})

export default allReducers