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

const VehicleModals = ({ open, handleClose, editUser }) => {
  const [gender, setGender] = useState('');
  const [userData, setUserData] = useState({
    vehicleNumber: '',
    driverName: '',
    driverEmail: '',
    driverMobileNumber: '',
    employeeID: '',
    insuranceClosingDate: '',
    insuranceNumber: '',
    address: ''
  });

  // Populate form fields when editing a user
  useEffect(() => {
    if (editUser) {
      setUserData({
        vehicleNumber: editUser.vehicleNumber || '',
        driverName: editUser.driverName || '',
        driverEmail: editUser.driverEmail || '',
        driverMobileNumber: editUser.driverMobileNumber || '',
        employeeID: editUser.employeeID || '',
        insuranceClosingDate: editUser.insuranceClosingDate || '',
        insuranceNumber: editUser.insuranceNumber || '',
        address: editUser.address || ''
      });
      setGender(editUser.gender || '');
    } else {
      // Reset form for creating a new user
      setUserData({
        vehicleNumber: '',
        driverName: '',
        driverEmail: '',
        driverMobileNumber: '',
        employeeID: '',
        insuranceClosingDate: '',
        insuranceNumber: '',
        address: ''
      });
      setGender('');
    }
  }, [editUser]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editUser ? 'Edit Vehicle Details' : 'Add Vehicle Details'} />
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
                      value={userData.vehicleNumber}
                      onChange={(e) => setUserData({ ...userData, vehicleNumber: e.target.value })}
                    />
                  </Grid>

                  {/* Driver Name */}
                  <Grid item xs={6}>
                    <TextField
                      label="Driver Name"
                      type="text"
                      fullWidth
                      value={userData.driverName}
                      onChange={(e) => setUserData({ ...userData, driverName: e.target.value })}
                    />
                  </Grid>

                  {/* Driver Email */}
                  <Grid item xs={6}>
                    <TextField
                      label="Driver Email"
                      type="email"
                      fullWidth
                      value={userData.driverEmail}
                      onChange={(e) => setUserData({ ...userData, driverEmail: e.target.value })}
                    />
                  </Grid>

                  {/* Driver Mobile Number */}
                  <Grid item xs={6}>
                    <TextField
                      label="Driver Mobile Number"
                      type="text"
                      fullWidth
                      value={userData.driverMobileNumber}
                      onChange={(e) => setUserData({ ...userData, driverMobileNumber: e.target.value })}
                    />
                  </Grid>

                  {/* Employee ID */}
                  <Grid item xs={6}>
                    <TextField
                      label="Emp ID"
                      type="text"
                      fullWidth
                      value={userData.employeeID}
                      onChange={(e) => setUserData({ ...userData, employeeID: e.target.value })}
                    />
                  </Grid>

                  {/* Gender Dropdown */}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Vehicle Insurance Closing Date */}
                  <Grid item xs={6}>
                    <TextField
                      label="Vehicle Insurance Closing Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={userData.insuranceClosingDate}
                      onChange={(e) => setUserData({ ...userData, insuranceClosingDate: e.target.value })}
                    />
                  </Grid>

                  {/* Insurance Number */}
                  <Grid item xs={6}>
                    <TextField
                      label="Insurance Number"
                      type="text"
                      fullWidth
                      value={userData.insuranceNumber}
                      onChange={(e) => setUserData({ ...userData, insuranceNumber: e.target.value })}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      type="text"
                      multiline
                      rows={4}
                      fullWidth
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      {editUser ? 'Update' : 'Create'}
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
