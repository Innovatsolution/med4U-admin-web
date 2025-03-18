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

function Overview() {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempt with:', email);
  };

  return (
    <OverviewWrapper>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      
      <Container maxWidth="lg">
        <LoginCard>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Enter your email to reset your password 
          </Typography>
          
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Reset
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </LoginCard>
      </Container>
      
    </OverviewWrapper>
  );
}

export default Overview;
