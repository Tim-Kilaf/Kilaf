import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getItemByCategory } from '../../store/actions/actionsItem'
import BiddingCard from '../../components/cards/BiddingCard'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  active: {
    borderRadius: 20,
    color: 'white',    
    fontWeight: 700,    
    whiteSpace: 'nowrap'
  },
  inactive: {
    borderRadius: 20,
    fontWeight: 700,
    whiteSpace: 'nowrap'
  }
}));

export default function Category() {
  const dispatch = useDispatch()
  const param = useParams()
  const classes = useStyles();

  useEffect(() => {
    dispatch(getItemByCategory(param.id))
  }, [dispatch, param.id])

  const items = useSelector(state => state.reducerItem.categorized.items)
  const category = useSelector(state => state.reducerItem.category.result)

  return (
    <div style={{ width: '70%', margin: '0 auto'}}>
      <div style={{ display: 'flex', marginTop: 30, overflow: 'auto'  }}>
        {category && category.map(el => {
          return(
            <div style={{ marginRight: 20 }}>
              {param.id == el.id ? 
                <div className={classes.active}>         
                  <Button variant="contained" color="primary"> {el.name} </Button>    
                </div>
                :
                <Link to={`/category/${el.id}`} style={{ color: 'gray', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  <Button variant="outlined" color="default"> {el.name} </Button>    
                </Link>
              }
            </div>
          )
        })}
      </div>      
      <h1> {items && items.name} </h1>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          { items && items.Items && items.Items.map(el => {
              return (
                <BiddingCard data={el} />
              )
            })
          }
        </div>
    </div>
  )
}
