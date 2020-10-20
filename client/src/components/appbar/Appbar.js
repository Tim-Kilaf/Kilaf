import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  InputBase, 
  Badge,
  MenuItem,
  Menu,
  Container,
  Avatar
} from '@material-ui/core';

import { logout, login } from '../../store/actions/actionsUser';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
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

  const user = useSelector((state)  => state.reducerLogin.user);
  const email = useSelector((state)  => state.reducerLogin.email);
  console.log(email, 'email');
  console.log(user, 'user');

  useEffect(() => {
    console.log(user);
  }, [user])

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
      <MenuItem>{email}</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      {/* <MenuItem><p>username</p></MenuItem> */}
    </Menu>
  );

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
        <IconButton aria-label="show 4 new mails" color="primary">
          <Badge color="secondary">
            <MdShoppingCart />
          </Badge>
        </IconButton>
        <p>Keranjang</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar 
          color="primary"
          style={{marginRight: 10}}
        >
          {user ? user[0].toUpperCase() : 'A'}
        </Avatar>
        <p>{user}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor: '#fff'}} position="static">
        <Container>
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
              <Link to="/cart">
                <IconButton aria-label="show 2 products" color="primary">
                  <Badge color="secondary">
                    <MdShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
              <MenuItem style={{color: 'black'}}>
                <Avatar 
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  {user ? user[0].toUpperCase() : 'A'}
                </Avatar>
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
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
