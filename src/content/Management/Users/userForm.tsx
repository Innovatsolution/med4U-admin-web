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
  Avatar,
  IconButton
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const UserModals = ({ open, handleClose, editUser }) => {
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: '',
    employeeID: '',
    address: ''
  });

  // Populate form fields when editing a user
  useEffect(() => {
    if (editUser) {
      setUserData({
        name: editUser.name || '',
        email: editUser.email || '',
        mobileNumber: editUser.mobileNumber || '',
        designation: editUser.designation || '',
        employeeID: editUser.employeeID || '',
        address: editUser.address || ''
      });
      setRole(editUser.role || '');
      setGender(editUser.gender || '');
      setProfileImage(editUser.profileImage || null);
    } else {
      setUserData({ name: '', email: '', mobileNumber: '', designation: '', employeeID: '', address: '' });
      setRole('');
      setGender('');
      setProfileImage(null);
    }
  }, [editUser]);

  // Handle Profile Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editUser ? 'Edit User' : 'Add User'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  
                  {/* Profile Image Upload */}
                  <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src={profileImage || '/default-profile.png'}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <input
                      accept="image/*"
                      type="file"
                      style={{ display: 'none' }}
                      id="profile-upload"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="profile-upload">
                      <IconButton color="primary" component="span">
                        <PhotoCameraIcon />
                      </IconButton>
                    </label>
                  </Grid>

                  {/* User Role */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>User Role</InputLabel>
                      <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Two Fields Per Row */}
                  <Grid item xs={6}>
                    <TextField label="Name" type="text" fullWidth value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Email" type="text" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField label="Mobile Number" type="text" fullWidth value={userData.mobileNumber} onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Designation" type="text" fullWidth value={userData.designation} onChange={(e) => setUserData({ ...userData, designation: e.target.value })} />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField label="Emp ID" type="text" fullWidth value={userData.employeeID} onChange={(e) => setUserData({ ...userData, employeeID: e.target.value })} />
                  </Grid>
                  
                  {/* Gender */}
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

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField label="Address" type="text" multiline rows={4} fullWidth value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
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

UserModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserModals;
