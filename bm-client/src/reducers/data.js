// import List from 'immutable'

const data = (state = [], action) => {
  switch (action.type) {
  case 'SET_DATA':
    return (action.data ? action.data : state);
  default:
    return state;
  }
};

export default data;
