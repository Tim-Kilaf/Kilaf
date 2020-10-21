import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, getCategory } from '../../store/actions/actionsItem'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';

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
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      padding: '0 15px'
    },
  },
  form: {
    padding: '2em 0'
  },
  inputBox: {
    margin: '1em 0',
    // display: 'flex',
    // justifyContent: 'space-between'
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
  const history = useHistory()

  const [payload, setPayload] = useState({
    name: '',
    condition: 'Bekas',
    description: '',
    starting_price: '',
    buyout_price: '',
    bid_increment: '',
    start_date: '',
    end_date: '',
    CategoryId: 0,
    image: []
  })

  const category = useSelector(state => state.reducerItem.category)

  console.log(category)

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

    dispatch(createItem(formData, (err => {
      if(!err) {
        history.push('/')
      }
    })))
  }

  return (
    <Box className={clasess.container} boxShadow={3}>
      <h1>Create New Item</h1>
      <form className={clasess.form}>
        <Box className={clasess.inputBox}>
          <ValidationTextField id="validation-outlined-input" style={{ width: '100%' }} onChange={(e) => onTextHandler(e)} name="name" id="outlined-basic" label="Item's Name" variant="outlined" required />
        </Box>
        <Box className={clasess.inputBox}>
          <ValidationTextField name="description" onChange={(e) => onTextHandler(e)} style={{ width: '100%' }} id="outlined-basic" label="Description" variant="outlined" required />
        </Box>
        <Box>
          <ValidationTextField style={{ width: '45%' }} name="starting_price" onChange={(e) => onTextHandler(e)} type="number" id="outlined-basic" label="Starting Price" variant="outlined" required />
          <ValidationTextField style={{ width: '45%', float: 'right' }} name="buyout_price" onChange={(e) => onTextHandler(e)} type="number" id="outlined-basic" label="Buyout Price" variant="outlined" required />
        </Box>
        <Box style={{ margin: '20px 0', color: 'gray' }}>
          <label>
            Item Category
            <select onChange={onTextHandler} name="CategoryId" style={{ width: '100%', padding: '15px 10px', fontSize: 17 }}
              defaultValue="Pilih">
                <option value="Pilih" disabled> Pilih Salah Satu </option>
                {category.result && category.result.map(el => {
                  return (
                    <option value={el.id}> {el.name} </option>
                  )
                })}            
            </select>
          </label>          
        </Box>
        <Box className={clasess.inputBox}>
            <label style={{ color: 'gray' }}>
              Item Condition
              <select onChange={onTextHandler} name="condition" style={{ width: '100%', marginBottom: 25, padding: '15px 10px', fontSize: 17  }}
                defaultValue={payload.condition}>
                <option value='Bekas'>Bekas</option>
                <option value='Baru'>Baru</option>
              </select>
            </label>            
            <ValidationTextField style={{ width: '100%' }} name="bid_increment" onChange={(e) => onTextHandler(e)} type="number" label="Bid Increment" variant="outlined" required />
        </Box>
        <Box>
          <ValidationTextField style={{ width: '45%' }} name="start_date" onChange={(e) => onTextHandler(e)} label="Start Date" type="datetime-local" InputLabelProps={{ shrink: true }} required />
          <ValidationTextField style={{ width: '45%', float:'right' }} name="end_date" onChange={(e) => onTextHandler(e)} label="End Date" type="datetime-local" InputLabelProps={{ shrink: true }} required />
        </Box>
        <input
          className={clasess.inputBox}
          onChange={(e) => onChangeHandler(e)}
          type="file"
          multiple
          required
        />
        <Box className={clasess.inputBox}>
          <Button color="secondary" onClick={onSubmitHandler} type="button" variant="contained" style={{ width: '100%' }}>
            Create New
          </Button>
        </Box>
      </form>
    </Box>
  )
}
