import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import ToastMessage from "../../../toast/ToastMessage";
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
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Avatar,
  FormHelperText,
  Paper,
} from '@mui/material';
import { postRequest } from '@/services/api';
import { putRequest } from '@/services/api';

// Validation Schema using Yup
const validationSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  bloodGroup: yup.string().required('Blood group is required'),
  maritalStatus: yup.string().required('Marital status is required'),
  nationality: yup.string().required('Nationality is required'),
  aadharCardNumber: yup.string().required('Aadhar Card Number is required').matches(/^\d{4}-\d{4}-\d{4}$/, 'Invalid Aadhar format (XXXX-XXXX-XXXX)'),
  email: yup.string().required('Email is required').email('Invalid email'),
  mobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9+ ]{10,}$/, 'Invalid phone number'),
  emergencyContactNumber: yup.string().required('Emergency contact number is required').matches(/^[0-9+ ]{10,}$/, 'Invalid phone number'),
  address: yup.string().required('Address is required'),
  height: yup.string().required('Height is required'),
  weight: yup.string().required('Weight is required'),
  pregnancyStatus: yup.string().required('Pregnancy Status is required'),
  doctorAssigned: yup.string().required('Doctor Assigned is required'),
  checkingDate: yup.string().required('Checking Date is required'),
  lifestyleHabits: yup.array().min(1, 'At least one habit should be selected'),
  profilePicture: yup.mixed().required("Profile picture is required"),
  aadharCardPicture: yup.mixed().required("Aadhar Card is required"),
});

const PatientModals = ({ open, handleClose, editPatient, onPatientSuccess }) => {
  
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      patientName: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      nationality: '',
      aadharCardNumber: '',
      email: '',
      mobileNumber: '',
      emergencyContactNumber: '',
      address: '',
      height: '',
      weight: '',
      pregnancyStatus: '',
      doctorAssigned: '',
      checkingDate: '',
      lifestyleHabits: [],
    }
  });

  useEffect(() => {
    if (editPatient) {
      reset(editPatient);
    }
  }, [editPatient, reset]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [aadharCardPicture, setAadharCardPicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);

  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      setValue(field, file);
      if (field === "profilePicture") {
        setProfilePreview(URL.createObjectURL(file));
      } else {
        setAadharPreview(URL.createObjectURL(file));
      }
    }
  };

  const removeImage = (field) => {
    setValue(field, null);
    if (field === "profilePicture") {
      setProfilePreview(null);
    } else {
      setAadharPreview(null);
    }
  };
  
  const handleProfilePictureUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setProfilePicture(file);
  };

  const handleAadharCardUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setAadharCardPicture(file);
  };


  const onSubmit = async (data) => {
    // console.log('Form Submitted:', data);
    // handleClose();
        const payload = data;
      
        try {
          if (editPatient) {
            // ✏️ Edit Mode
            const response = await putRequest(`/patients/${editPatient.id}`, payload); // Use the correct ID
            console.log('Updated:', response.data);
            
            setToastData({
              type: "success",
              message: "User Role Update successfully!",
            });
            setShowToast(true);
          } else {
            const response = await postRequest('/patients', payload);
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
          onPatientSuccess?.();
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
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <ToastMessage show={showToast} setShow={setShowToast} toastData={toastData} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editPatient ? 'Edit Patient Details' : 'Add Patient Details'} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  {/* Patient Name */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Patient Name"
                      fullWidth
                      {...register('patientName')}
                      error={!!errors.patientName}
                      helperText={errors.patientName?.message}
                    />
                  </Grid>

                  {/* Date of Birth */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register('dateOfBirth')}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth?.message}
                    />
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12} md={4}>
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

                  {/* Blood Group */}
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={!!errors.bloodGroup}>
                      <InputLabel>Blood Group</InputLabel>
                      <Controller
                        name="bloodGroup"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.bloodGroup?.message}</FormHelperText>
                    </FormControl>
                  </Grid>

                  {/* Marital Status */}
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={!!errors.maritalStatus}>
                      <InputLabel>Marital Status</InputLabel>
                      <Controller
                        name="maritalStatus"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Divorced">Divorced</MenuItem>
                            <MenuItem value="Widowed">Widowed</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.maritalStatus?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* Nationality */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Nationality"
                      fullWidth
                      {...register('nationality')}
                      error={!!errors.nationality}
                      helperText={errors.nationality?.message}
                    />
                  </Grid>

                  {/* Aadhar Card Number */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Aadhar Card Number"
                      placeholder="XXXX-XXXX-XXXX"
                      fullWidth
                      {...register('aadharCardNumber')}
                      error={!!errors.aadharCardNumber}
                      helperText={errors.aadharCardNumber?.message}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  {/* Mobile Number */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Mobile Number"
                      fullWidth
                      {...register('mobileNumber')}
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                    />
                  </Grid>

                  {/* Emergency Contact Number */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Emergency Contact Number"
                      fullWidth
                      {...register('emergencyContactNumber')}
                      error={!!errors.emergencyContactNumber}
                      helperText={errors.emergencyContactNumber?.message}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Address"
                      fullWidth
                      multiline
                      rows={2}
                      {...register('address')}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>
                  {/* Height */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Height (cm)"
                      fullWidth
                      {...register('height')}
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                  </Grid>

                  {/* Weight */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Weight (kg)"
                      fullWidth
                      {...register('weight')}
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  </Grid>
                  {/* Pregnancy Status */}
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={!!errors.pregnancyStatus}>
                      <InputLabel>Pregnancy Status</InputLabel>
                      <Controller
                        name="pregnancyStatus"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Not Pregnant">Not Pregnant</MenuItem>
                            <MenuItem value="Pregnant">Pregnant</MenuItem>
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.pregnancyStatus?.message}</FormHelperText>
                    </FormControl>
                  </Grid>

                  {/* Doctor Assigned */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Doctor Assigned"
                      fullWidth
                      {...register('doctorAssigned')}
                      error={!!errors.doctorAssigned}
                      helperText={errors.doctorAssigned?.message}
                    />
                  </Grid>

                  {/* Checking Date */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Checking Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register('checkingDate')}
                      error={!!errors.checkingDate}
                      helperText={errors.checkingDate?.message}
                    />
                  </Grid>

                  {/* Lifestyle & Habits */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Lifestyle & Habits</Typography>
                    <FormControl error={!!errors.lifestyleHabits}>
                      <Controller
                        name="lifestyleHabits"
                        control={control}
                        render={({ field }) => (
                          <Box>
                            {['Smoking', 'Alcohol', 'Normal'].map((habit) => (
                              <FormControlLabel
                                key={habit}
                                control={
                                  <Checkbox
                                    checked={field.value.includes(habit)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setValue(
                                        'lifestyleHabits',
                                        checked
                                          ? [...field.value, habit]
                                          : field.value.filter((h) => h !== habit)
                                      );
                                    }}
                                  />
                                }
                                label={habit}
                              />
                            ))}
                          </Box>
                        )}
                      />
                      <Typography color="error">{errors.lifestyleHabits?.message}</Typography>
                    </FormControl>
                  </Grid>

                  {/* Profile Picture Upload */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Profile Picture</Typography>
                    <Controller
                      name="profilePicture"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "profilePicture")} />
                          </Button>
                          {profilePreview && (
                            <Paper sx={{ mt: 1, p: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Avatar src={profilePreview} sx={{ width: 100, height: 100, mb: 1 }} />
                              <Button onClick={() => removeImage("profilePicture")} variant="outlined" color="error">
                                Remove
                              </Button>
                            </Paper>
                          )}
                          {errors.profilePicture && <Typography color="error">{errors.profilePicture.message}</Typography>}
                        </>
                      )}
                    />
                  </Grid>

                  {/* Aadhar Card Upload */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Aadhar Card</Typography>
                    <Controller
                      name="aadharCardPicture"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Button variant="contained" component="label">
                            Upload Aadhar Card
                            <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "aadharCardPicture")} />
                          </Button>
                          {aadharPreview && (
                            <Paper sx={{ mt: 1, p: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <img src={aadharPreview} alt="Aadhar Card" style={{ width: "150px", height: "100px" }} />
                              <Button onClick={() => removeImage("aadharCardPicture")} variant="outlined" color="error">
                                Remove
                              </Button>
                            </Paper>
                          )}
                          {errors.aadharCardPicture && <Typography color="error">{errors.aadharCardPicture.message}</Typography>}
                        </>
                      )}
                    />
                  </Grid>
                  
                  {/* Submit Button */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {editPatient ? 'Update' : 'Create'}
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

export default PatientModals;