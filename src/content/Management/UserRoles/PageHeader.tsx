import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import UserRoleCreateModals from "./userRoleForm";

function PageHeader({ onRefresh }) {
  const [modalOpen, setMadalOpen] = useState(false);
  const handleModalClose = () => {
    setMadalOpen(false);
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          User Management
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={()=>setMadalOpen(true)}
        >
          Create Roles
        </Button>
        <UserRoleCreateModals 
          open={modalOpen} 
          handleModalClose={handleModalClose} 
          onSuccess={onRefresh} // ✅ Pass refresh callback
        />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
