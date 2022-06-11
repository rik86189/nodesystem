const sendDetails = (state = 0, action) => {
  switch (action.type) {
    case "sendData":
      return (state = action.data);

    case "disable":
      return (state = 0);
    default:
      return state;
  }
};

export default sendDetails;
