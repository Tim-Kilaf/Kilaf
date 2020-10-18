let currentState = {
  items: [],
  item: {}
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
      case 'FETCH_ITEM_DETAIL':
        
        return state
      case 'ADD_BIDDING':

        // console.log(action.payload)
        return state
      case 'REALTIME_BIDDING':
        console.log(action.payload)
        let newDetail = {
          ...state,
          item: action.payload
        }
        return newDetail     
      default:
          return state
  }
}

export default reducerItem