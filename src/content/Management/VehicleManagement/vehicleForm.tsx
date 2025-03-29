import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  FormHelperText
} from '@mui/material';

// Validation schema
const validationSchema = yup.object().shape({
  vehicleNumber: yup.string().required('Vehicle number is required'),
  driverName: yup.string().required('Driver name is required'),
  driverEmail: yup.string().email('Invalid email').required('Email is required'),
  driverMobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid phone number'),
  employeeID: yup.string().required('Employee ID is required'),
  gender: yup.string().required('Gender is required'),
  insuranceClosingDate: yup.string().required('Insurance closing date is required'),
  insuranceNumber: yup.string().required('Insurance number is required'),
  address: yup.string().required('Address is required'),
});

const VehicleModals = ({ open, handleClose, editUser }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      vehicleNumber: '',
      driverName: '',
      driverEmail: '',
      driverMobileNumber: null,
      employeeID: '',
      gender: '',
      insuranceClosingDate: '',
      insuranceNumber: '',
      address: '',
    },
  });

  useEffect(() => {
    if (editUser) {
      reset({
        vehicleNumber: editUser.vehicleNumber || '',
        driverName: editUser.driverName || '',
        driverEmail: editUser.driverEmail || '',
        driverMobileNumber: editUser.driverMobileNumber || null,
        employeeID: editUser.employeeID || '',
        gender: editUser.gender || '',
        insuranceClosingDate: editUser.insuranceClosingDate || '',
        insuranceNumber: editUser.insuranceNumber || '',
        address: editUser.address || '',
      });
    } else {
      reset();
    }
  }, [editUser, reset]);

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editUser ? 'Edit Vehicle Details' : 'Add Vehicle Details'} />
              <Divider />
              <CardContent>
                <Box>
                  <Grid container spacing={2}>
                    {/* Vehicle Number */}
                    <Grid item xs={6}>
                      <Controller
                        name="vehicleNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Vehicle Number" fullWidth error={!!errors.vehicleNumber} helperText={errors.vehicleNumber?.message} />
                        )}
                      />
                    </Grid>

                    {/* Driver Name */}
                    <Grid item xs={6}>
                      <Controller
                        name="driverName"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Driver Name" fullWidth error={!!errors.driverName} helperText={errors.driverName?.message} />
                        )}
                      />
                    </Grid>

                    {/* Driver Email */}
                    <Grid item xs={6}>
                      <Controller
                        name="driverEmail"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Driver Email" type="email" fullWidth error={!!errors.driverEmail} helperText={errors.driverEmail?.message} />
                        )}
                      />
                    </Grid>

                    {/* Driver Mobile Number */}
                    <Grid item xs={6}>
                      <Controller
                        name="driverMobileNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Driver Mobile Number" fullWidth error={!!errors.driverMobileNumber} helperText={errors.driverMobileNumber?.message} />
                        )}
                      />
                    </Grid>

                    {/* Employee ID */}
                    <Grid item xs={6}>
                      <Controller
                        name="employeeID"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Employee ID" fullWidth error={!!errors.employeeID} helperText={errors.employeeID?.message} />
                        )}
                      />
                    </Grid>

                    {/* Gender Dropdown */}
                    <Grid item xs={6}>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select {...field} displayEmpty>
                              {/* <MenuItem value="">Select Gender</MenuItem> */}
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            <FormHelperText>{errors.gender?.message}</FormHelperText>                      
                          </FormControl>
                        )}
                      />
                    </Grid>

                    {/* Vehicle Insurance Closing Date */}
                    <Grid item xs={6}>
                      <Controller
                        name="insuranceClosingDate"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Vehicle Insurance Closing Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.insuranceClosingDate} helperText={errors.insuranceClosingDate?.message} />
                        )}
                      />
                    </Grid>

                    {/* Insurance Number */}
                    <Grid item xs={6}>
                      <Controller
                        name="insuranceNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Insurance Number" fullWidth error={!!errors.insuranceNumber} helperText={errors.insuranceNumber?.message} />
                        )}
                      />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12}>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Address" multiline rows={4} fullWidth error={!!errors.address} helperText={errors.address?.message} />
                        )}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Button type="submit" variant="contained" color="primary">
                        {editUser ? 'Update' : 'Create'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

VehicleModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default VehicleModals;
