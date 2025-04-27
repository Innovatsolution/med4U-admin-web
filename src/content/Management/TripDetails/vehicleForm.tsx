import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState  } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  FormHelperText,
  IconButton
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import ToastMessage from "../../../toast/ToastMessage";
import { postRequest } from '@/services/api';
import { putRequest } from '@/services/api';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const schema = yup.object().shape({
  vehicleNumber: yup.string().required('Vehicle Number is required'),
  tripType: yup.string().required('Trip Type is required'),
  driverName: yup.string().required('Driver Name is required'),
  tripDate: yup.string().required('Trip Date is required'),
  startLocation: yup.string().required('Start Location is required'),
  endLocation: yup.string().required('End Location is required'),
  startGPS: yup.string().required('Start GPS is required'),
  endGPS: yup.string().required('End GPS is required'),
  speedometerBefore: yup.number().typeError('Must be a number').required('Required'),
  speedometerAfter: yup.number().typeError('Must be a number').required('Required'),
  vehicleIssues: yup.string().required('Required'),
  tripStatus: yup.string().required('Required'),
  startTime: yup.string().required('Required'),
  endTime: yup.string().required('Required'),
  totalDistance: yup.string().required('Required'),
  fuelRefillingAmount: yup.string().required('Required'),
  fuelRefillingLocation: yup.string().required('Required'),
  issueDescription: yup.string().when('vehicleIssues', (vehicleIssues, schema) => {
    if (Array.isArray(vehicleIssues)) {
      vehicleIssues = vehicleIssues[0]; // Extract the first value if it's an array
    }
    if (typeof vehicleIssues === 'string' && vehicleIssues === 'Yes') {
      return schema.required('Please describe the issue');
    }
    return schema;
  }), 
  attachments: yup
  .array()
  .min(1, "At least one attachment is required") // ✅ At least one file is required
  .test("fileSize", "Each file must be under 5MB", (files) =>
    files.every((file) => file.size <= 5 * 1024 * 1024)
  ),
});

const VehicleModals = ({ open, handleClose, editTrip, onTripSuccess }) => {
  
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({
      type: "success", // or "error", "info", etc.
      message: "",
    });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vehicleNumber: '',
      tripType: '',
      driverName: '',
      tripDate: '',
      startLocation: '',
      endLocation: '',
      startGPS: '',
      endGPS: '',
      speedometerBefore: null,
      speedometerAfter: null,
      vehicleIssues: '',
      issueDescription: '',
      tripStatus: '',
      startTime: '',
      endTime: '',
      totalDistance: '',
      fuelRefillingAmount: '',
      fuelRefillingLocation: '',
      attachments: [],
    },
  });

  useEffect(() => {
    if (editTrip) {
      reset(editTrip);
    }
  }, [editTrip, reset]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setValue("attachments", files, { shouldValidate: true }); // ✅ Triggers validation
    }
  };

  // ✅ Handle File Removal
  const handleFileRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue("attachments", newFiles, { shouldValidate: true }); // ✅ Triggers validation
  };

  const onSubmit = async (data) => {
    const payload = data;
  
    try {
      if (editTrip) {
        // ✏️ Edit Mode
        const response = await putRequest(`/trips/${editTrip.id}`, payload); // Use the correct ID
        console.log('Updated:', response.data);
        
        setToastData({
          type: "success",
          message: "Vehicle Trip Details Update successfully!",
        });
        setShowToast(true);
      } else {
        const response = await postRequest('/trips', payload);
        console.log('Created:', response.data);
        
        // 🆕 Create Mode
        setToastData({
          type: "success",
          message: "Vehicle Trip Details Create successfully!",
        });
        setShowToast(true);
      }
  
      // Optional: Close modal and refresh roles list
      handleClose();

      // ✅ Tell parent to refresh table
      onTripSuccess?.();
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editTrip ? 'Edit Trip Details' : 'Add Trip Details'} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Vehicle Number" fullWidth {...register('vehicleNumber')} error={!!errors.vehicleNumber} helperText={errors.vehicleNumber?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.tripType}>
                      <InputLabel>Trip Type</InputLabel>
                      <Controller
                        name="tripType"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Camp Visit">Camp Visit</MenuItem>
                            <MenuItem value="Supply Delivery">Supply Delivery</MenuItem>
                            <MenuItem value="Emergency Response">Emergency Response</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.tripType?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Driver Name" fullWidth {...register('driverName')} error={!!errors.driverName} helperText={errors.driverName?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Trip Date" type="date" fullWidth InputLabelProps={{ shrink: true }} {...register('tripDate')} error={!!errors.tripDate} helperText={errors.tripDate?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.tripStatus}>
                      <InputLabel>Trip Status</InputLabel>
                      <Controller
                        name="tripStatus"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} label="Trip Status">
                            <MenuItem value="Started">Started</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.tripStatus?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Start Location" fullWidth {...register('startLocation')} error={!!errors.startLocation} helperText={errors.startLocation?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="End Location" fullWidth {...register('endLocation')} error={!!errors.endLocation} helperText={errors.endLocation?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Start GPS Coordinates" fullWidth {...register('startGPS')} error={!!errors.startGPS} helperText={errors.startGPS?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="End GPS Coordinates" fullWidth {...register('endGPS')} error={!!errors.endGPS} helperText={errors.endGPS?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="startTime"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Start Time"
                          value={field.value || null}
                          onChange={(value) => field.onChange(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={!!errors.startTime}
                              helperText={errors.startTime?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* End Time - TimePicker */}
                  <Grid item xs={6}>
                    <Controller
                      name="endTime"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="End Time"
                          value={field.value || null}
                          onChange={(value) => field.onChange(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={!!errors.endTime}
                              helperText={errors.endTime?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Distance (km)"
                      type="number"
                      fullWidth
                      {...register('totalDistance')}
                      error={!!errors.totalDistance}
                      helperText={errors.totalDistance?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Fuel Refilling Amount (liters)"
                      type="number"
                      fullWidth
                      {...register('fuelRefillingAmount')}
                      error={!!errors.fuelRefillingAmount}
                      helperText={errors.fuelRefillingAmount?.message}
                    />
                  </Grid>

                  {/* Fuel Refilling Location - TextField */}
                  <Grid item xs={6}>
                    <TextField
                      label="Fuel Refilling Location"
                      type="text"
                      fullWidth
                      {...register('fuelRefillingLocation')}
                      error={!!errors.fuelRefillingLocation}
                      helperText={errors.fuelRefillingLocation?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Speedometer Before Trip" type="number" fullWidth {...register('speedometerBefore')} error={!!errors.speedometerBefore} helperText={errors.speedometerBefore?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Speedometer After Trip" type="number" fullWidth {...register('speedometerAfter')} error={!!errors.speedometerAfter} helperText={errors.speedometerAfter?.message} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.vehicleIssues}>
                      <InputLabel>Any Vehicle Issues?</InputLabel>
                      <Controller
                        name="vehicleIssues"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.vehicleIssues?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Issue Description" fullWidth {...register('issueDescription')} error={!!errors.issueDescription} helperText={errors.issueDescription?.message} />
                  </Grid>
                  
                  
                  {/* File Upload */}
                  <Grid item xs={12}>
                    <Button variant="outlined" component="label">
                      Upload Attachments
                      <input
                        type="file"
                        multiple
                        hidden
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {errors.attachments && (
                      <p style={{ color: "#FF1943", fontWeight: 700 }}>{errors.attachments.message}</p>
                    )}
                  </Grid>

                  {/* Show Uploaded Images */}
                  {selectedFiles.length > 0 && (
                    <Grid item xs={12}>
                      <h4>Uploaded Files</h4>
                      <Grid container spacing={2}>
                        {selectedFiles.map((file, index) => (
                          <Grid item key={index}>
                            <div style={{ position: "relative", display: "inline-block" }}>
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`uploaded-${index}`}
                                  width={80}
                                  height={80}
                                  style={{ borderRadius: 8, objectFit: "cover" }}
                                />
                              ) : (
                                <p>{file.name}</p> // Show filename if not an image
                              )}
                              {/* Delete Button */}
                              <IconButton
                                onClick={() => handleFileRemove(index)}
                                style={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  background: "red",
                                  color: "white"
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                      {editTrip ? 'Update' : 'Create'}
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

VehicleModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default VehicleModals;
