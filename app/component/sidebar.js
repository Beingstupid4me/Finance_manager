"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Container, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const router = useRouter();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index == 3) {
        handleSignOut();
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        router.push('/login');
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  }

  return (
    <Container className='border rounded-md h-full px-0 mx-0 bg-white'>
        <Container className='w-full h-1/4 px-0 mx-0 items-center flex'>
            <Container className='w-full flex '>
                <MonitorHeartIcon className='mx-auto' fontSize='large' />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                >
                    Financer
                </Typography>
            </Container>
        </Container>
        <Container className=' h-3/4 px-0 mx-0'>
            <div className=' w-full'>
            <List component="nav" aria-label="main mailbox folders" >
                <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                >
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                </ListItemButton>
            </List>
            <Divider variant="middle" />
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                >
                <ListItemText primary="Register" />
                <ListItemIcon edge="end">
                    <PersonAddIcon />
                </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                >
                <ListItemText primary="Sign-out" />
                <ListItemIcon edge="end">
                    <LogoutIcon />
                </ListItemIcon>
                </ListItemButton>
            </List>
        </div>
        </Container>
    </Container>
  );
}


export default Sidebar
