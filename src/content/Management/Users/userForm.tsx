import SidebarLayout from '@/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: yup
  .string()
  .matches(/^(?:\+91[-\s]?)?[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number (with or without +91)')
  .required('Mobile Number is required'),
  designation: yup.string().required('Designation is required'),
  employeeID: yup.string().required('Employee ID is required'),
  address: yup.string().required('Address is required'),
  role: yup.string().required('Role is required'),
  gender: yup.string().required('Gender is required')
});

const UserModals = ({ open, handleClose, editUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: '',
      designation: '',
      employeeID: '',
      address: '',
      role: '',
      gender: ''
    }
  });

  useEffect(() => {
    if (editUser) {
      reset({
        name: editUser.name || '',
        email: editUser.email || '',
        mobileNumber: editUser.mobileNumber || '',
        designation: editUser.designation || '',
        employeeID: editUser.employeeID || '',
        address: editUser.address || '',
        role: editUser.role || '',
        gender: editUser.gender || ''
      });
      setProfileImage(editUser.profileImage || null);
    } else {
      reset();
      setProfileImage(null);
    }
  }, [editUser, reset]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editUser ? 'Edit User' : 'Add User'} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={profileImage || '/default-profile.png'} sx={{ width: 100, height: 100, mb: 2 }} />
                    <input accept="image/*" type="file" id="profile-upload" style={{ display: 'none' }} onChange={handleImageChange} />
                    <label htmlFor="profile-upload">
                      <IconButton color="primary" component="span">
                        <PhotoCameraIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  {(['name', 'email', 'mobileNumber', 'designation', 'employeeID', 'address'] as const).map((field) => (
                  <Grid item xs={field === 'address' ? 12 : 6} key={field}>
                    <Controller
                      name={field}
                      control={control}
                      render={({ field: controllerField }) => (
                        <TextField
                          {...controllerField}
                          label={field.charAt(0).toUpperCase() + field.slice(1)}
                          fullWidth
                          multiline={field === 'address'}
                          rows={field === 'address' ? 4 : 1}
                          error={!!errors[field]}
                          helperText={errors[field]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel>Role</InputLabel>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel>Gender</InputLabel>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                      {editUser ? 'Update' : 'Create'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

UserModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserModals;
