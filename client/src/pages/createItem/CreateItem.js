import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createItem } from '../../store/actions/actionsItem'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      }
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    marginTop: '3em',
    margin: '0 auto',
    alignItems: 'center',
    borderRadius: 20
  },
  form: {
    padding: '2em 0'
  },
  inputBox: {
    margin: '1em 0'
  }
}))

const ValidationTextField = withStyles({
  root: {
    '& input: invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2
    }
  }
})(TextField)

export default function CreateItem() {
  const dispatch = useDispatch()
  const clasess = useStyles()

  const [payload, setPayload] = useState({
    name: '',
    condition: 'Bekas',
    description: '',
    starting_price: '',
    buyout_price: '',
    bid_increment: '',
    start_date: '',
    end_date: '',
    image: []
  })

  const onChangeHandler = (e) => {
    setPayload({
      ...payload,
      image: e.target.files
    })
  }

  const onTextHandler = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()

    for (let key in payload) {
      formData.append(key, payload[key])
    }

    for (let i = 0; i < payload.image.length; i++) {
      formData.append('images', payload.image[i], payload.image[i].name)
    }     

    dispatch(createItem(formData))
  }

  return (
    <Box className={clasess.container} boxShadow={3}>
      <h1>Create New Item</h1>
      <form onSubmit={(e) => onSubmitHandler(e)} className={clasess.form}>
        <Box className={clasess.inputBox}>
          <ValidationTextField id="validation-outlined-input" style={{ width: '100%' }} onChange={(e) => onTextHandler(e)} name="name" id="outlined-basic" label="Item's Name" variant="outlined" required />
        </Box>
        <Box className={clasess.inputBox}>
          <ValidationTextField name="description" onChange={(e) => onTextHandler(e)} style={{ width: '100%' }} id="outlined-basic" label="Description" variant="outlined" required />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box><ValidationTextField name="starting_price" onChange={(e) => onTextHandler(e)} type="number" id="outlined-basic" label="Starting Price" variant="outlined" required /></Box>
          <Box><ValidationTextField name="buyout_price" onChange={(e) => onTextHandler(e)} type="number" id="outlined-basic" label="Buyout Price" variant="outlined" required /></Box>
        </Box>
        <Box className={clasess.inputBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <InputLabel id="demo-simple-select-helper-label">Item Condition</InputLabel>
            <Select onChange={(e) => onTextHandler(e)} name="condition" style={{ width: '100%' }} 
              defaultValue={payload.condition} id="demo-simple-select-helper">
              <MenuItem value='Bekas'>Bekas</MenuItem>
              <MenuItem value='Baru'>Baru</MenuItem>
            </Select>
          </Box>
          <Box><ValidationTextField name="bid_increment" onChange={(e) => onTextHandler(e)} type="number" label="Bid Increment" variant="outlined" required /></Box>
        </Box>
        <Box className={clasess.inputBox}>
          <ValidationTextField name="start_date" onChange={(e) => onTextHandler(e)} label="Start Date" type="datetime-local" InputLabelProps={{ shrink: true }} required />
          <ValidationTextField name="end_date" onChange={(e) => onTextHandler(e)} label="End Date" type="datetime-local" InputLabelProps={{ shrink: true }} required />
        </Box>
        <input
          className={clasess.inputBox}
          onChange={(e) => onChangeHandler(e)}
          type="file"
          multiple
          required
        />
        <Box className={clasess.inputBox}>
          <Button color="secondary" type="submit" variant="contained" style={{ width: '100%' }}>
            Create New
          </Button>
        </Box>
      </form>
    </Box>
  )
}
