import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getItemByCategory } from '../../store/actions/actionsItem'
import BiddingCard from '../../components/cards/BiddingCard'

export default function Category() {
  const dispatch = useDispatch()
  const param = useParams()

  useEffect(() => {
    dispatch(getItemByCategory(param.id))
  }, [dispatch])

  const items = useSelector(state => state.reducerItem.categorized.items)

  console.log(items && items.name)

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
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
