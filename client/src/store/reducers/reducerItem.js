let currentState = {
  items: [],
  hottestItems: [],
  item: {},
  detailRefetch: '',
  carts: [],
  categorized: [],
  category: []
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
    case 'FETCH_HOTTEST_ITEM':
      let hottestState = {
        ...state,
        hottestItems: action.payload.items
      }
      console.log(action.payload.items)
      return hottestState
      case 'FETCH_ITEM_DETAIL':        
        let newDetail = {
          ...state,
          item: action.payload
        }

        return newDetail
      case 'ADD_BIDDING':

        // console.log(action.payload)
        return state  
      case 'FETCH_CART':        
        let newCart = {
          ...state,
          carts: action.payload
        }
      return newCart;
      case 'FETCH_CATEGORY':        
        let category = {
          ...state,
          category: action.payload
        }
      return category;
      case 'FETCH_ITEM_CATEGORY':
        console.log(action.payload)
        let categorized = {
          ...state,
          categorized: action.payload
        }
      return categorized;
      default:
          return state
  }
}

export default reducerItem