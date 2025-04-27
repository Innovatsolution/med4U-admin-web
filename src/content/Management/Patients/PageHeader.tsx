import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import UserModals from './PatientForm';

function PageHeader( { onPatientRefresh } ) {
  const [open, setOpen] = useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Patient Management
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
          Create Patient
        </Button>
      </Grid>
      <UserModals open={open} handleClose={handleClose} editPatient={null} onPatientSuccess={onPatientRefresh}/>
    </Grid>
  );
}

export default PageHeader;
