let currentState = {
  items: []
}


function reducerItem(state = currentState, action) {
  switch (action.type) {      
      case 'CREATE_ITEM':          
        return state
      case 'FETCH_ITEM':
        let newState = {
          ...state,
          items: action.payload.items
        }
        return newState
      default:
          return state
  }
}

export default reducerItem