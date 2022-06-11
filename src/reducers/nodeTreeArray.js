const nodeTreeArray = (state = [], action) => {
    switch (action.type) {
        case "buildHierachy":

            let nodeList = []
            let connectieList = action.data



            //3 in the data array is the nodeLis    
            if (connectieList != undefined) {

                for (let i = 0; i < connectieList.length +1; i++) {

                    let allChildren = findChildren(i, connectieList);

                    nodeList[i] = allChildren;
                }
            }



            return nodeList
            

        default:
            return state;
    }
};

export default nodeTreeArray;

function findChildren(node, array) {
    let childrenArray = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i].inputNode == node) {
            childrenArray.push(array[i].sourceNode);
        }
    }
    return childrenArray.length == 0 ? null : childrenArray;
}

function findParrent(node, array) {
    let nodeParrent = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i].sourceNode == node) {
            nodeParrent = array[i].inputNode;
        } else {
            nodeParrent = null;
        }
    }
    return nodeParrent;
}