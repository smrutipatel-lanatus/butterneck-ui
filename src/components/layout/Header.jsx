import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {
  AccessTime,
  Assignment,
  AssignmentInd,
  Campaign,
  ClearAll,
  EventAvailable,
  Home,
  Search,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/butterneck-logo.png';

const pagesRoutes = [
  { name: 'Home', icon: <Home /> },
  { name: 'Roster', icon: <ClearAll /> },
];

const pagesSubMenus = [
  { name: 'Alert', icon: <Campaign /> },
  { name: 'MyStuff', icon: <AssignmentInd /> },
  { name: 'Find', icon: <Search /> },
];

const menuItemsList = [
  { name: 'My Schedule', icon: <EventAvailable />, parent: 'MyStuff', path: '' },
  { name: 'My Assignments', icon: <Assignment />, parent: 'MyStuff', path: '/assignments' },
  { name: 'Recently Visited', icon: <AccessTime />, parent: 'MyStuff' },
];

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setFilteredMenuItems(null);
    setShowMenu(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setFilteredMenuItems(null);
    setShowMenu(null);
  };

  const handleMyProfile = () => {
    navigate('/my-profile');
  };

  const handleOutOffice = () => {
    navigate('/my/out-of-office');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  const handleMenu = (event, name) => {
    setFilteredMenuItems(menuItemsList.filter((item) => item.parent === name));
    setShowMenu(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Responsive Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesRoutes.map(({ name, icon }, i) => (
                <Link
                  key={i}
                  to={name === 'Home' ? '/' : `/${name}`}
                  onClick={handleCloseNavMenu}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem key={name} onClick={handleCloseUserMenu}>
                    <Button key={name} startIcon={icon} onClick={handleCloseUserMenu} sx={{ color: 'black' }}>
                      {name}
                    </Button>
                  </MenuItem>
                </Link>
              ))}
              {pagesSubMenus.map(({ name, icon }, i) => (
                <MenuItem key={name} onClick={(event) => handleMenu(event, name)}>
                  <Button
                    key={name}
                    startIcon={icon}
                    onClick={(event) => handleMenu(event, name)}
                    sx={{ color: 'black' }}
                  >
                    {name}
                  </Button>
                </MenuItem>
              ))}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={showMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(showMenu)}
                onClose={handleCloseNavMenu}
              >
                {filteredMenuItems?.map(({ name, icon, path }, i) => (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Button key={name} startIcon={icon} onClick={() => navigate(path)} sx={{ color: 'black' }}>
                      {name}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Box>

          {/* Logo */}
          <Box
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="logo" width="200" height="50" />
          </Box>

          {/* Menu */}
          <Box sx={{ flexGrow: 0.8, display: { xs: 'none', md: 'flex', display: 'flex', justifyContent: 'center' } }}>
            {pagesRoutes.map(({ name, icon }) => (
              <Link key={name} to={name === 'Home' ? '/' : `/${name}`} onClick={handleCloseUserMenu} sx={{ my: 2 }}>
                <Button key={name} startIcon={icon} sx={{ my: 2, color: 'white' }}>
                  {name}
                </Button>
              </Link>
            ))}

            {pagesSubMenus.map(({ name, icon }, i) => (
              <Button
                key={i}
                startIcon={icon}
                onClick={(event) => handleMenu(event, name)}
                sx={{ my: 2, color: 'white' }}
              >
                {name}
              </Button>
            ))}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={showMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(showMenu)}
              onClose={handleCloseNavMenu}
            >
              {filteredMenuItems?.map(({ name, icon }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Button key={name} startIcon={icon} onClick={handleCloseUserMenu} sx={{ color: 'black' }}>
                    {name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Profile Logout */}
          <Box sx={{ flexGrow: 0.2, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleMyProfile}>
                <Typography textAlign="center">My profile (avatar, title, password, etc)</Typography>
              </MenuItem>
              <MenuItem onClick={handleOutOffice}>
                <Typography textAlign="center">Out of office</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
