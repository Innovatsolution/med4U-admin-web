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
  Button,
  Autocomplete
} from '@mui/material';

const CampModal = ({ open, handleClose, editCamp }) => {
  const [campData, setCampData] = useState({
    name: '',
    type: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    country: '',
    state: '',
    district: '',
    village: '',
    gpsLatitude: '',
    gpsLongitude: '',
    assignedManager: '',
    assignedMedicalStaff: [],
    driverName: '',
    clientSponsor: ''
  });

  useEffect(() => {
    if (editCamp) {
      setCampData({
        name: editCamp.name || '',
        type: editCamp.type || '',
        description: editCamp.description || '',
        status: editCamp.status || '',
        startDate: editCamp.startDate || '',
        endDate: editCamp.endDate || '',
        country: editCamp.country || '',
        state: editCamp.state || '',
        district: editCamp.district || '',
        village: editCamp.village || '',
        gpsLatitude: editCamp.gpsLatitude || '',
        gpsLongitude: editCamp.gpsLongitude || '',
        assignedManager: editCamp.assignedManager || '',
        assignedMedicalStaff: editCamp.assignedMedicalStaff || [],
        driverName: editCamp.driverName || '',
        clientSponsor: editCamp.clientSponsor || ''
      });
    } else {
      setCampData({
        name: '', type: '', description: '', status: '', startDate: '', endDate: '',
        country: '', state: '', district: '', village: '', gpsLatitude: '', gpsLongitude: '',
        assignedManager: '', assignedMedicalStaff: [], driverName: '', clientSponsor: ''
      });
    }
  }, [editCamp]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editCamp ? 'Edit Camp' : 'Add Camp'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Camp Name" type="text" fullWidth required value={campData.name} onChange={(e) => setCampData({ ...campData, name: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Camp Type</InputLabel>
                      <Select value={campData.type} onChange={(e) => setCampData({ ...campData, type: e.target.value })}>
                        <MenuItem value="Medical">Medical</MenuItem>
                        <MenuItem value="Educational">Educational</MenuItem>
                        <MenuItem value="Relief">Relief</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Camp Description" type="text" fullWidth required multiline rows={4} value={campData.description} onChange={(e) => setCampData({ ...campData, description: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Start Date" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={campData.startDate} onChange={(e) => setCampData({ ...campData, startDate: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={campData.endDate} onChange={(e) => setCampData({ ...campData, endDate: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Country" type="text" fullWidth required value={campData.country} onChange={(e) => setCampData({ ...campData, country: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="State" type="text" fullWidth required value={campData.state} onChange={(e) => setCampData({ ...campData, state: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="District/City" type="text" fullWidth required value={campData.district} onChange={(e) => setCampData({ ...campData, district: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Village / Local Area" type="text" fullWidth required value={campData.village} onChange={(e) => setCampData({ ...campData, village: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="GPS Latitude" type="text" fullWidth value={campData.gpsLatitude} onChange={(e) => setCampData({ ...campData, gpsLatitude: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="GPS Longitude" type="text" fullWidth value={campData.gpsLongitude} onChange={(e) => setCampData({ ...campData, gpsLongitude: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select value={campData.status} onChange={(e) => setCampData({ ...campData, status: e.target.value })}>
                        <MenuItem value="Planned">Planned</MenuItem>
                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Assigned Project Manager</InputLabel>
                      <Select value={campData.assignedManager} onChange={(e) => setCampData({ ...campData, assignedManager: e.target.value })}>
                        <MenuItem value="Manager A">Manager A</MenuItem>
                        <MenuItem value="Manager B">Manager B</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={["Doctor A", "Doctor B", "Doctor C"]}
                      value={campData.assignedMedicalStaff}
                      onChange={(event, newValue) => {setCampData({ ...campData, assignedMedicalStaff: newValue
                       }),console.log(event)}}
                      renderInput={(params) => <TextField {...params} label="Assigned Medical Staff" required fullWidth />}
                    />
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Driver Name</InputLabel>
                      <Select value={campData.driverName} onChange={(e) => setCampData({ ...campData, driverName: e.target.value })}>
                        <MenuItem value="Driver A">Driver A</MenuItem>
                        <MenuItem value="Driver B">Driver B</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Client Sponsor</InputLabel>
                      <Select value={campData.clientSponsor} onChange={(e) => setCampData({ ...campData, clientSponsor: e.target.value })}>
                        <MenuItem value="Sponsor A">Sponsor A</MenuItem>
                        <MenuItem value="Sponsor B">Sponsor B</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">Submit</Button>
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

CampModal.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CampModal;
