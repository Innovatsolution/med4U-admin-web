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
  IconButton,
  FormHelperText
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { postRequest } from '@/services/api';
import { putRequest } from '@/services/api';
import { getRequest } from '@/services/api';
import ToastMessage from "../../../toast/ToastMessage";

const userRole: Record<string, number> = {
  admin: 1,
  client: 2,
  serviceman: 3,
  auditor: 4,
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile_number: yup
  .string()
  .matches(/^(?:\+91[-\s]?)?[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number (with or without +91)')
  .required('Mobile Number is required'),
  designation: yup.string().required('Designation is required'),
  emp_id: yup.string().required('Employee ID is required'),
  address: yup.string().required('Address is required'),
  role: yup.string().required('Role is required'),
  gender: yup.string().required('Gender is required'),
  profilePicture: yup.string().required('Profile picture is required'),
});

const UserModals = ({ open, handleClose, editUser, onSuccess }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    type: "success", // or "error", "info", etc.
    message: "",
  });
  const [roles, setRoles] = useState([]);
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      mobile_number: '',
      designation: '',
      emp_id: '',
      address: '',
      role: '',
      gender: '',
      profilePicture: ''
    }
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRequest('/user-role');
        
        const updatedRoles = (data || []).map((roleObj: any) => {
          const roleName = Object.keys(userRole).find(
            key => userRole[key] === roleObj.role
          );
          return {
            ...roleObj,
            roleName: roleName || 'Unknown',
          };
        });
  
        setRoles(updatedRoles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };
    if (editUser) {
      reset({
        name: editUser.name || '',
        email: editUser.email || '',
        mobile_number: editUser.mobile_number || '',
        designation: editUser.designation || '',
        emp_id: editUser.emp_id || '',
        address: editUser.address || '',
        role: editUser.role || '',
        gender: editUser.gender || ''
      });
      setProfileImage(editUser.profilePicture || null);
    } else {
      reset();
      setProfileImage(null);
    }

    fetchRoles();
  }, [editUser, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String); // for preview
        setValue('profilePicture', base64String); // for submission
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      name : data.name,
      email : data.email,
      mobile_number : data.mobile_number,
      designation : data.designation,
      emp_id : data.emp_id,
      address : data.address,
      role : data.role,
      gender : data.gender,
      profilePicture : data.profilePicture,
    };

    try {
      if (editUser) {
        // ✏️ Edit Mode
        setToastData({
          type: "success",
          message: "User Role Update successfully!",
        });
        setShowToast(true);
        const response = await putRequest(`/users/${editUser.id}`, payload); // Use the correct ID
        
        console.log('Updated:', response.data);
      } else {
        // 🆕 Create Mode
        setToastData({
          type: "success",
          message: "User Role Create successfully!",
        });
        setShowToast(true);
        const response = await postRequest('/users', payload);
        console.log('Created:', response.data);
      }

      // Optional: Close modal and refresh roles list
      handleClose();

      // ✅ Tell parent to refresh table
      onSuccess?.();
      // console.log('Form Submitted:', data);
    } catch (error) {
      setToastData({
        type: "warning",
        message: "something went wrong",
      });
      setShowToast(true);
      console.error('API Error:', error.response?.data || error.message);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <ToastMessage show={showToast} setShow={setShowToast} toastData={toastData} />
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
                  {(['name', 'email', 'mobile_number', 'designation', 'emp_id', 'address'] as const).map((field) => (
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
                        <Select {...field} label="Role">
                          {roles.map((role: any) => (
                            <MenuItem key={role.role} value={role.role}>
                              {role.roleName}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                      <FormHelperText>{errors.role?.message}</FormHelperText>
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
                      <FormHelperText>{errors.gender?.message}</FormHelperText>
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
