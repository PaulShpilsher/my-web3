import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import logo from './metamask.svg';

function Demo() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Stack direction="row" spacing={2}>
            <Typography variant="h3" component="div">
              NFT Collection
            </Typography>
            <Avatar alt="logo" src={logo} sx={{ width: 64, height: 64 }} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
      </Container>
    </React.Fragment>
  );
}

export default Demo;