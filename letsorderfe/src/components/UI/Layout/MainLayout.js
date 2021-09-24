import React from 'react';
import { Grid } from '@material-ui/core';
import Header from '../Header/Header';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';

export const MainLayout = () => (
  <>
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12}>
        <Body />
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  </>
);

export default MainLayout;
