import * as React from "react";
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    TextField,
    Paper,
    Grid,
    styled
  } from '@mui/material';
  import { useState } from 'react';
  
  import Link from 'src/components/Link';
  import Head from 'next/head';
  
  import Logo from 'src/components/LogoSign';
  import ToastNotification from '@/toast/ToastMessage';
  import { toast } from 'react-toastify';
  
  const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
  `
  );
  
  const OverviewWrapper = styled(Box)(
    ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
  `
  );
  
  const LoginCard = styled(Paper)(
    ({ theme }) => `
      padding: ${theme.spacing(4)};
      margin: ${theme.spacing(4)} auto;
      max-width: 450px;
      box-shadow: ${theme.shadows[3]};
      border-radius: ${theme.shape.borderRadius}px;
  `
  );
  
  function CreatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleCreatePassword = () => {
      if (password !== confirmPassword) {
        // showToast("Passwords do not match!", "error");
        // toast"Passwords do not match!"(m, {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     theme: "dark",
        //   });
        // };
        // alert("Passwords do not match!");
        return;
      }
      console.log('Password created successfully:', password);
      // Redirect user to login or dashboard after success
    };
  
    return (
      <OverviewWrapper>
        <Head>
          <title>Create Password</title>
        </Head>
        <HeaderWrapper>
          <Container maxWidth="lg">
            <Box display="flex" alignItems="center">
              <Logo />
              <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
                <Box />
              </Box>
            </Box>
          </Container>
        </HeaderWrapper>
        
        <Container maxWidth="lg">
          <LoginCard>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Create Your Password
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCreatePassword}
              >
                Create Password
              </Button>
  
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Back to Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </LoginCard>
        {/* Toast Message */}
        <ToastNotification />
        </Container>
        
      </OverviewWrapper>
    );
  }
  
  export default CreatePassword;
  