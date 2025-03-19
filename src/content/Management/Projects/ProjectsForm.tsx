import SidebarLayout from '@/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  TextField,
  Button
} from '@mui/material';

const ProjectModal = ({ open, handleClose, editProject }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    type: '',
    status: '',
    startDate: '',
    endDate: '',
    clientSponsor: '',
    assignedManager: ''
  });

  useEffect(() => {
    if (editProject) {
      setProjectData({
        name: editProject.name || '',
        description: editProject.description || '',
        type: editProject.type || '',
        status: editProject.status || '',
        startDate: editProject.startDate || '',
        endDate: editProject.endDate || '',
        clientSponsor: editProject.clientSponsor || '',
        assignedManager: editProject.assignedManager || ''
      });
    } else {
      setProjectData({ name: '', description: '', type: '', status: '', startDate: '', endDate: '', clientSponsor: '', assignedManager: '' });
    }
  }, [editProject]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editProject ? 'Edit Project' : 'Add Project'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Project Name" type="text" fullWidth required value={projectData.name} onChange={(e) => setProjectData({ ...projectData, name: e.target.value })} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Project Description" type="text" fullWidth required multiline rows={4} value={projectData.description} onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Project Type</InputLabel>
                      <Select value={projectData.type} onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}>
                        <MenuItem value="Internal">Internal</MenuItem>
                        <MenuItem value="Client">Client</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Project Status</InputLabel>
                      <Select value={projectData.status} onChange={(e) => setProjectData({ ...projectData, status: e.target.value })}>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Start Date" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={projectData.startDate} onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={projectData.endDate} onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Client Sponsor Name" type="text" fullWidth value={projectData.clientSponsor} onChange={(e) => setProjectData({ ...projectData, clientSponsor: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Assigned Project Manager</InputLabel>
                      <Select value={projectData.assignedManager} onChange={(e) => setProjectData({ ...projectData, assignedManager: e.target.value })}>
                        <MenuItem value="Manager A">Manager A</MenuItem>
                        <MenuItem value="Manager B">Manager B</MenuItem>
                        <MenuItem value="Manager C">Manager C</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      {editProject ? 'Update Project' : 'Create Project'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};

ProjectModal.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ProjectModal;
