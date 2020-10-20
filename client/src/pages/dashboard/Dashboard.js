import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box';
import { DashboardCarousel } from '../../components/carousel/DashboardCarousel'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { getItems, getHottestItems, getCategory } from '../../store/actions/actionsItem'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '74%',
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  container: {        
    padding: 14,
    borderRadius: 15, 
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    width: '11.5em',
    height: '14.5em',
    objectFit: 'cover',
    borderRadius: 20,
    marginRight: 13,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const items = useSelector(state => state.reducerItem.items)
  const hottest = useSelector(state => state.reducerItem.hottestItems)
  const category = useSelector(state => state.reducerItem.category.result)

  const imageUrl = [
    'https://img.freepik.com/free-photo/woman-green-dress-hat-yellow-background_1303-10554.jpg?size=626&ext=jpg',
    'https://image.freepik.com/free-photo/toys-model-plane-airplane-colorful-model-blue-background_40163-49.jpg',
    'https://image.freepik.com/free-photo/glasses-mobile-phone-laptop-flower-stickers-paper-clips-stationery-yellow-background-workplace-freelancer-businessman-entrepreneur_112337-1210.jpg',
    'https://image.freepik.com/free-photo/cosmetic-make-up-flat-lay-pink-background-copy-space-text-beauty_71163-456.jpg',
    'https://image.freepik.com/free-photo/toys-model-plane-airplane-colorful-model-blue-background_40163-49.jpg',
  ]

  useEffect(() => {
    dispatch(getItems())
    dispatch(getHottestItems())
    dispatch(getCategory())
  }, [dispatch])

  console.log(category)

  return (
    <Box class={classes.mainContainer}>
      <Box style={{ margin: '3em 0' }}>        
        <h1>What Are You Looking For?</h1>
        <Box style={{ display: 'flex', overflow: 'auto' }}>
          {category && category.map((el, i) => {
            return(
              <Box>
                <Link to={`/category/${el.id}`}  style={{ color: 'black', textDecoration: 'none' }}>
                  <img
                    src={imageUrl[i]}
                    className={classes.image}
                  />
                  <h3> {el.name} </h3>
                </Link>                
              </Box>             
            )
          })}
        </Box>                
      </Box>
      <Box className={classes.container} boxShadow={2} >
        <DashboardCarousel data={items} text="New Items You Have To Check Out!"/>
      </Box>            
      <Box className={classes.container} boxShadow={3}>
        <DashboardCarousel data={hottest} text="Trending Right Now"/>
      </Box>
    </Box>
  )
}
