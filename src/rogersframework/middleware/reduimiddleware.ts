const reduiMiddleWare = (store:any) => (next:any) => (action:any) => {
  console.log("Middleware triggered:", action);
  return next(action);
}

export default reduiMiddleWare;