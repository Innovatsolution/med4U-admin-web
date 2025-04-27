import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import VehicleModals from './vehicleForm';

function PageHeader({ onTripRefresh }) {
  const [open, setOpen] = useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Trip Management
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
          Create Trip
        </Button>
      </Grid>
      <VehicleModals open={open} handleClose={handleClose} editTrip={null} onTripSuccess={onTripRefresh}/>
    </Grid>
  );
}

export default PageHeader;
