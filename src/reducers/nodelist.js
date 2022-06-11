const nodeList = (state = [], action) => {
    switch (action.type) {



        case "addNode":

            state = state.concat();




            let nodeInfode = {

                nodeId: action.data[0],
                type: action.data[1],
                input1: action.data[2],
                input2: action.data[3]

            }
            state.push(nodeInfode)



            return state;
        case "changeNodeValue":

            let stateCopy = state.concat()

        

            for (let i = 0; i < stateCopy.length; i++) {

                if (stateCopy[i].nodeId === action.data[0]) {

                    //this.nodeList[i].value[data[2]] = data[1]
                    //this.nodeList[i].value[data[2]] =  parseFloat(data[1]) 
                    if (action.data[2] === 0) {
                        stateCopy[i].input1 =    action.data[1]

                    } else {
                        stateCopy[i].input2 = action.data[1]
                    }

                }

            }
            return stateCopy;
        
        case "changeNodeType":
            
            let statecopy2 = state.concat()

        

            for (let i = 0; i < statecopy2.length; i++) {

                if (statecopy2[i].nodeId === action.data[0]) {


                    statecopy2[i].type = action.data[1]


                }

            }
            return statecopy2;

        default:
            return state;
    }
};

export default nodeList;
