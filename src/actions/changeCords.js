export const changeCords = (data,index,inpoutOutputToggle,inputID)=>{

    return {
        type:"changeCords",
        data:data,
        nodeIndex:index,
        inputOutput:inpoutOutputToggle,
        inputID:inputID
    }


} 