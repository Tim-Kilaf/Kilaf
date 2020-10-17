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