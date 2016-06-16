export default socket => store => next => action => {
  // console.log('MIDDLEWARE WARNING!! WIIIUUUUU!');
  // console.log(store);
  // console.log(next);
  // console.log(action);
  // console.log(action.type);
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}
