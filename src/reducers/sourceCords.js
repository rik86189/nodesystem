const sourceCords = (state = 0, action) => {
    switch (action.type) {
      case "updateSourceCords":
        return (state = action.data);
  
      
      default:
        return state;
    }
  };
  
  export default sourceCords;
  