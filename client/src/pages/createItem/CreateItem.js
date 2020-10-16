import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createItem } from '../../store/actions/actionsItem'

export default function CreateItem() {
  const dispatch = useDispatch()  

  const [payload, setPayload] = useState({
    image: []
  })
 
  const onChangeHandler = (e) => {    
    setPayload({
      ...payload,
      image: e.target.files
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
  
    const formData = new FormData()    

    for(let i = 0; i < payload.image.length; i++) {
      formData.append('images', payload.image[i], payload.image[i].name)
    }

    dispatch(createItem(formData))
  }

  return (
    <Box>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input 
          onChange={(e) => onChangeHandler(e)}
          type="file" 
          multiple
        />
        <Button color="secondary" type="submit">
          Create New
        </Button>
      </form>
    </Box>
  )
}
