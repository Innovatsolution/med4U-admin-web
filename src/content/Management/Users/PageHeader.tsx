import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import UserModals from './userForm';

function PageHeader() {
  const [open, setOpen] = useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Users
        </Typography>
        {/* <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography> */}
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={()=>setOpen(true)}
        >
          Create User
        </Button>
      </Grid>
      <UserModals open={open} handleClose={handleClose} editUser={null}/>
    </Grid>
  );
}

export default PageHeader;
