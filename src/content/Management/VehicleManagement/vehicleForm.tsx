import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
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
import ToastMessage from "../../../toast/ToastMessage";
import { postRequest } from '@/services/api';
import { putRequest } from '@/services/api';

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

const VehicleModals = ({ open, handleClose, editVehicle, onVehicleSuccess }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    type: "success", // or "error", "info", etc.
    message: "",
  });
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
    if (editVehicle) {
      reset({
        vehicleNumber: editVehicle.vehicleNumber || '',
        driverName: editVehicle.driverName || '',
        driverEmail: editVehicle.driverEmail || '',
        driverMobileNumber: editVehicle.driverMobileNumber || null,
        employeeID: editVehicle.employeeID || '',
        gender: editVehicle.gender || '',
        insuranceClosingDate: editVehicle.insuranceClosingDate || '',
        insuranceNumber: editVehicle.insuranceNumber || '',
        address: editVehicle.address || '',
      });
    } else {
      reset();
    }
  }, [editVehicle, reset]);

  const onSubmit = async (data) => {
    // console.log('Form Submitted:', data);
    // handleClose();
    const payload = data;
  
    try {
      if (editVehicle) {
        // ✏️ Edit Mode
        const response = await putRequest(`/vehicles/${editVehicle.id}`, payload); // Use the correct ID
        console.log('Updated:', response.data);
        
        setToastData({
          type: "success",
          message: "User Role Update successfully!",
        });
        setShowToast(true);
      } else {
        const response = await postRequest('/vehicles', payload);
        console.log('Created:', response.data);
        
        // 🆕 Create Mode
        setToastData({
          type: "success",
          message: "User Role Create successfully!",
        });
        setShowToast(true);
      }
  
      // Optional: Close modal and refresh roles list
      handleClose();

      // ✅ Tell parent to refresh table
      onVehicleSuccess?.();
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editVehicle ? 'Edit Vehicle Details' : 'Add Vehicle Details'} />
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
                        {editVehicle ? 'Update' : 'Create'}
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
