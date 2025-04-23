import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import ProjectForm from './ProjectsForm';

function PageHeader({ onRefresh }) {
  const [open, setOpen] = useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Projects
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={()=>setOpen(true)}
        >
          Create Project
        </Button>
      </Grid>
      <ProjectForm open={open} handleClose={handleClose} editProject={null} onSuccess={onRefresh}/>
    </Grid>
  );
}

export default PageHeader;
