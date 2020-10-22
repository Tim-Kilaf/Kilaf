import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Button, 
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Box
} from '@material-ui/core';

import { logout } from '../../store/actions/actionsUser';
import { getCategory } from '../../store/actions/actionsItem';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'primary',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { carts } = useSelector(state => state.reducerItem)

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [username, setUsername] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function handleLogout() {
    dispatch(logout());
    history.push('/');
  }

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
    dispatch(getCategory())
  }, [])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
      <MenuItem onClick={handleMenuClose}>
        <Avatar color="primary"style={{marginRight: 10}}>
          {username ? username[0].toUpperCase() : 'A'}
        </Avatar>
        <p>{username}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      <IconButton aria-label="show 4 new mails" color="primary">
          <Badge color="secondary">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <p>Logout</p> 
      </MenuItem>
      {/* <MenuItem><p>username</p></MenuItem> */}
    </Menu>
  );

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/create" style={{textDecoration: 'none'}}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
          >
            Create Item
          </Button>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar 
          color="primary"
          style={{marginRight: 10}}
        >
          {username ? username[0].toUpperCase() : 'A'}
        </Avatar>
        <p>{username}</p>
      </MenuItem>
      <MenuItem>
        <Link to="/cart">
          <IconButton aria-label="show 4 new mails" color="primary">
            <Badge color="secondary">
              <MdShoppingCart />
            </Badge>
          </IconButton>
          </Link>
        <p style={{textDecoration: 'none'}}>Keranjang</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="primary">
          <Badge color="secondary">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor: '#fff'}} position="static">
        <Box style={{width: '74%', margin: '0 auto',}}>
          <Toolbar>
            <Link style={{marginRight: 20}} to="/">
              <img src="https://i.imgur.com/DkXvWFJ.png" alt="logo" height="35px" />
            </Link>
            <div className={classes.grow} />
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}
            <div className={classes.sectionDesktop}>
              <Link to="/create" style={{textDecoration: 'none', marginTop: 10, marginRight: 20}}>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Create Item
                </Button>
              </Link>
              <Link to="/cart">
                {carts.length > 0 ? (
                  <IconButton aria-label={carts.length > 1 ? `show ${carts.length} products` : carts.length > 0 ? `show 1 product` : `your cart is empty`} color="primary">
                    <Badge badgeContent={carts.length} color="secondary">
                      <MdShoppingCart />
                    </Badge>
                  </IconButton>
                )
                  : (
                    <IconButton aria-label={carts.length > 1 ? `show ${carts.length} products` : carts.length > 0 ? `show 1 product` : `your cart is empty`} color="primary">
                      <Badge badgeContent={carts.length} color="secondary">
                      <MdShoppingCart />
                    </Badge>
                  </IconButton>
                  )
                }
              </Link>
              <MenuItem style={{color: 'black'}}>
                <Avatar 
                  onClick={handleProfileMenuOpen}
                  color="primary"
                  style={{marginRight: '.5em'}}
                >
                  {username ? username[0].toUpperCase() : 'A'}
                </Avatar>
                <span>{username}</span>
              </MenuItem>
              <MenuItem>
              </MenuItem>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="primary"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
