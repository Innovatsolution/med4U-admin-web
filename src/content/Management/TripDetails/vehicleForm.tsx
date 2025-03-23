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

const VehicleModals = ({ open, handleClose, editTrip }) => {
  const [tripData, setTripData] = useState({
    vehicleNumber: '',
    tripType: '',
    driverName: '',
    tripDate: '',
    tripStatus: '',
    startLocation: '',
    startGPS: '',
    startTime: '',
    endLocation: '',
    endGPS: '',
    endTime: '',
    totalDistance: '',
    fuelRefillingAmount: '',
    fuelRefillingLocation: '',
    speedometerBefore: '',
    speedometerAfter: '',
    vehicleIssues: '',
    issueDescription: '',
    attachments: []
  });

  // Populate form fields when editing a trip
  useEffect(() => {
    if (editTrip) {
      setTripData({
        vehicleNumber: editTrip.vehicleNumber || '',
        tripType: editTrip.tripType || '',
        driverName: editTrip.driverName || '',
        tripDate: editTrip.tripDate || '',
        tripStatus: editTrip.tripStatus || '',
        startLocation: editTrip.startLocation || '',
        startGPS: editTrip.startGPS || '',
        startTime: editTrip.startTime || '',
        endLocation: editTrip.endLocation || '',
        endGPS: editTrip.endGPS || '',
        endTime: editTrip.endTime || '',
        totalDistance: editTrip.totalDistance || '',
        fuelRefillingAmount: editTrip.fuelRefillingAmount || '',
        fuelRefillingLocation: editTrip.fuelRefillingLocation || '',
        speedometerBefore: editTrip.speedometerBefore || '',
        speedometerAfter: editTrip.speedometerAfter || '',
        vehicleIssues: editTrip.vehicleIssues || '',
        issueDescription: editTrip.issueDescription || '',
        attachments: editTrip.attachments || []
      });
    } else {
      // Reset form for new trip entry
      setTripData({
        vehicleNumber: '',
        tripType: '',
        driverName: '',
        tripDate: '',
        tripStatus: '',
        startLocation: '',
        startGPS: '',
        startTime: '',
        endLocation: '',
        endGPS: '',
        endTime: '',
        totalDistance: '',
        fuelRefillingAmount: '',
        fuelRefillingLocation: '',
        speedometerBefore: '',
        speedometerAfter: '',
        vehicleIssues: '',
        issueDescription: '',
        attachments: []
      });
    }
  }, [editTrip]);

  // Handle File Upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTripData({ ...tripData, attachments: files });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editTrip ? 'Edit Trip Details' : 'Add Trip Details'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  {/* Vehicle Number */}
                  <Grid item xs={6}>
                    <TextField
                      label="Vehicle Number"
                      type="text"
                      fullWidth
                      value={tripData.vehicleNumber}
                      onChange={(e) => setTripData({ ...tripData, vehicleNumber: e.target.value })}
                    />
                  </Grid>

                  {/* Trip Type */}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Trip Type</InputLabel>
                      <Select value={tripData.tripType} onChange={(e) => setTripData({ ...tripData, tripType: e.target.value })}>
                        <MenuItem value="Camp Visit">Camp Visit</MenuItem>
                        <MenuItem value="Supply Delivery">Supply Delivery</MenuItem>
                        <MenuItem value="Emergency Response">Emergency Response</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Driver Name */}
                  <Grid item xs={6}>
                    <TextField
                      label="Driver Name"
                      type="text"
                      fullWidth
                      value={tripData.driverName}
                      onChange={(e) => setTripData({ ...tripData, driverName: e.target.value })}
                    />
                  </Grid>

                  {/* Trip Date */}
                  <Grid item xs={6}>
                    <TextField
                      label="Trip Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={tripData.tripDate}
                      onChange={(e) => setTripData({ ...tripData, tripDate: e.target.value })}
                    />
                  </Grid>

                  {/* Start & End Location */}
                  <Grid item xs={6}>
                    <TextField
                      label="Start Location"
                      type="text"
                      fullWidth
                      value={tripData.startLocation}
                      onChange={(e) => setTripData({ ...tripData, startLocation: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Location"
                      type="text"
                      fullWidth
                      value={tripData.endLocation}
                      onChange={(e) => setTripData({ ...tripData, endLocation: e.target.value })}
                    />
                  </Grid>

                  {/* GPS Coordinates */}
                  <Grid item xs={6}>
                    <TextField
                      label="Start GPS Coordinates"
                      type="text"
                      fullWidth
                      value={tripData.startGPS}
                      onChange={(e) => setTripData({ ...tripData, startGPS: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End GPS Coordinates"
                      type="text"
                      fullWidth
                      value={tripData.endGPS}
                      onChange={(e) => setTripData({ ...tripData, endGPS: e.target.value })}
                    />
                  </Grid>

                  {/* Speedometer Readings */}
                  <Grid item xs={6}>
                    <TextField
                      label="Speedometer Before Trip"
                      type="number"
                      fullWidth
                      value={tripData.speedometerBefore}
                      onChange={(e) => setTripData({ ...tripData, speedometerBefore: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Speedometer After Trip"
                      type="number"
                      fullWidth
                      value={tripData.speedometerAfter}
                      onChange={(e) => setTripData({ ...tripData, speedometerAfter: e.target.value })}
                    />
                  </Grid>

                  {/* Vehicle Issues */}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Any Vehicle Issues?</InputLabel>
                      <Select value={tripData.vehicleIssues} onChange={(e) => setTripData({ ...tripData, vehicleIssues: e.target.value })}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Issue Description"
                      type="text"
                      fullWidth
                      value={tripData.issueDescription}
                      onChange={(e) => setTripData({ ...tripData, issueDescription: e.target.value })}
                    />
                  </Grid>

                  {/* Attachments */}
                  <Grid item xs={12}>
                    <Button variant="outlined" component="label">
                      Upload Attachments
                      <input type="file" multiple hidden onChange={handleFileChange} />
                    </Button>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      {editTrip ? 'Update' : 'Create'}
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

VehicleModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default VehicleModals;
