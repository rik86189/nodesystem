import { act } from "react-dom/test-utils";


const modifyConnectionArray = (state = [], action) => {
  switch (action.type) {
    case "add":
      state = state.concat();

      state.push(action.data);
    

      return state;

    case "changeCords":
      let test = [...state];

      for (let i = 0; i < test.length; i++) {
        if (
          test[i].sourceNode == action.nodeIndex &&
          action.inputOutput == true
        ) {
          test[i].inputNodeCords.x = action.data.X;
          test[i].inputNodeCords.y = action.data.Y;
        } else if (
          test[i].inputNode == action.nodeIndex &&
          action.inputOutput == false &&
          test[i].inputNodeIndex == action.inputID
        ) {
          
     
          test[i].sourceNodeCords.x = action.data.X;
          test[i].sourceNodeCords.y = action.data.Y;
        }
      }

      return test;

    default:
      return state;
  }
};





export default modifyConnectionArray;
