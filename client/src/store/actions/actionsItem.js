export function createItem(payload) {
  return dispatch => {
    fetch('http://localhost:3001/item/create', {
      method: 'POST',
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      body: payload
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'CREATE_ITEM',
          payload: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function getItems() {
  return dispatch => {
    fetch('http://localhost:3001/item', {
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_ITEM',
          payload: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function detailItem(id) {
  return dispatch => {
    fetch(`http://localhost:3001/item/${id}`, {
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_ITEM_DETAIL',
          payload: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function addBidding(payload, cb) {
  return dispatch => {
    fetch(`http://localhost:3001/biddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token')
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'ADD_BIDDING',
          payload: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getCart() {
  return dispatch => {
    fetch(`http://localhost:3001/transaction`, {
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_CART',
          payload: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}