const clickedOutput = (state = 0, action) => {
  switch (action.type) {
    case "enable":
      return (state = 1);

    case "disable":
      return (state = 0);
    default:
      return state;
  }
};

export default clickedOutput;
