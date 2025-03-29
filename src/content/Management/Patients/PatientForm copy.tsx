import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { subYears } from 'date-fns';
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
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Paper
} from '@mui/material';

// Validation Schema using Yup - Medical history removed
const validationSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  bloodGroup: yup.string().required('Blood group is required'),
  maritalStatus: yup.string().required('Marital status is required'),
  nationality: yup.string().required('Nationality is required'),
  aadharCardNumber: yup
    .string()
    .matches(/^\d{4}-\d{4}-\d{4}$/, 'Aadhar number must be in XXXX-XXXX-XXXX format')
    .required('Aadhar number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: yup
    .string()
    .matches(/^[0-9+ ]{10,}$/, 'Invalid phone number')
    .required('Mobile number is required'),
  emergencyContactNumber: yup
    .string()
    .matches(/^[0-9+ ]{10,}$/, 'Invalid phone number')
    .required('Emergency contact number is required'),
  address: yup.string().required('Address is required'),
  height: yup.string().required('Height is required'),
  weight: yup.string().required('Weight is required'),
  doctorAssigned: yup.string().required('Doctor name is required'),
  checkingDate: yup.string().required('Checking date is required'),
  lifestyleHabits: yup.array().min(1, 'Select at least one lifestyle habit'),
  pregnancyStatus: yup.string().required('Pregnancy status is required'),
});

const PatientModals = ({ open, handleClose, editPatient }) => {
  const [profilePicture, setProfilePicture] = useState(editPatient?.profilePicture || '');
  const [aadharCardPicture, setAadharCardPicture] = useState(editPatient?.aadharCardPicture || '');

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Handle Aadhar card upload
  const handleAadharCardUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAadharCardPicture(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <Formik
        initialValues={{
          patientName: editPatient?.patientName || 'Jane Smith',
          dateOfBirth: editPatient?.dateOfBirth || subYears(new Date(), 25).toISOString().split('T')[0],
          gender: editPatient?.gender || 'Female',
          bloodGroup: editPatient?.bloodGroup || 'A-',
          maritalStatus: editPatient?.maritalStatus || 'Single',
          nationality: editPatient?.nationality || 'Canadian',
          aadharCardNumber: editPatient?.aadharCardNumber || '2234-5678-9102',
          email: editPatient?.email || 'janesmith@example.com',
          mobileNumber: editPatient?.mobileNumber || '+1 987 654 321',
          emergencyContactNumber: editPatient?.emergencyContactNumber || '+1 123 456 789',
          address: editPatient?.address || '5678 Maple Avenue, Los Angeles, CA',
          height: editPatient?.height || '160 cm',
          weight: editPatient?.weight || '60 kg',
          doctorAssigned: editPatient?.doctorAssigned || 'Dr. Brown',
          checkingDate: editPatient?.checkingDate || new Date().toISOString().split('T')[0],
          lifestyleHabits: editPatient?.lifestyleHabits || ['Normal'],
          pregnancyStatus: editPatient?.pregnancyStatus || 'Not Pregnant',
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          console.log('Form Submitted:', values);
          resetForm();
          handleClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
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
                          name="patientName"
                          label="Patient Name"
                          fullWidth
                          value={values.patientName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.patientName && Boolean(errors.patientName)}
                          helperText={touched.patientName && errors.patientName}
                        />
                      </Grid>

                      {/* Date of Birth */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="dateOfBirth"
                          label="Date of Birth"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                        />
                      </Grid>

                      {/* Gender */}
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={touched.gender && Boolean(errors.gender)}>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            name="gender"
                            value={values.gender}
                            label="Gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Blood Group */}
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={touched.bloodGroup && Boolean(errors.bloodGroup)}>
                          <InputLabel>Blood Group</InputLabel>
                          <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            label="Blood Group"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Marital Status */}
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={touched.maritalStatus && Boolean(errors.maritalStatus)}>
                          <InputLabel>Marital Status</InputLabel>
                          <Select
                            name="maritalStatus"
                            value={values.maritalStatus}
                            label="Marital Status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Divorced">Divorced</MenuItem>
                            <MenuItem value="Widowed">Widowed</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Nationality */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="nationality"
                          label="Nationality"
                          fullWidth
                          value={values.nationality}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.nationality && Boolean(errors.nationality)}
                          helperText={touched.nationality && errors.nationality}
                        />
                      </Grid>

                      {/* Aadhar Card Number */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="aadharCardNumber"
                          label="Aadhar Card Number"
                          placeholder="XXXX-XXXX-XXXX"
                          fullWidth
                          value={values.aadharCardNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.aadharCardNumber && Boolean(errors.aadharCardNumber)}
                          helperText={touched.aadharCardNumber && errors.aadharCardNumber}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="email"
                          label="Email"
                          type="email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      {/* Mobile Number */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="mobileNumber"
                          label="Mobile Number"
                          fullWidth
                          value={values.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                          helperText={touched.mobileNumber && errors.mobileNumber}
                        />
                      </Grid>

                      {/* Emergency Contact Number */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="emergencyContactNumber"
                          label="Emergency Contact Number"
                          fullWidth
                          value={values.emergencyContactNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.emergencyContactNumber && Boolean(errors.emergencyContactNumber)}
                          helperText={touched.emergencyContactNumber && errors.emergencyContactNumber}
                        />
                      </Grid>

                      {/* Address */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="address"
                          label="Address"
                          fullWidth
                          multiline
                          rows={2}
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>

                      {/* Height */}
                      <Grid item xs={12} md={4}>
                        <TextField
                          name="height"
                          label="Height"
                          placeholder="e.g., 160 cm"
                          fullWidth
                          value={values.height}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.height && Boolean(errors.height)}
                          helperText={touched.height && errors.height}
                        />
                      </Grid>

                      {/* Weight */}
                      <Grid item xs={12} md={4}>
                        <TextField
                          name="weight"
                          label="Weight"
                          placeholder="e.g., 60 kg"
                          fullWidth
                          value={values.weight}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.weight && Boolean(errors.weight)}
                          helperText={touched.weight && errors.weight}
                        />
                      </Grid>

                      {/* Pregnancy Status */}
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={touched.pregnancyStatus && Boolean(errors.pregnancyStatus)}>
                          <InputLabel>Pregnancy Status</InputLabel>
                          <Select
                            name="pregnancyStatus"
                            value={values.pregnancyStatus}
                            label="Pregnancy Status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="Not Pregnant">Not Pregnant</MenuItem>
                            <MenuItem value="Pregnant">Pregnant</MenuItem>
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Doctor Assigned */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="doctorAssigned"
                          label="Doctor Assigned"
                          fullWidth
                          value={values.doctorAssigned}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.doctorAssigned && Boolean(errors.doctorAssigned)}
                          helperText={touched.doctorAssigned && errors.doctorAssigned}
                        />
                      </Grid>

                      {/* Checking Date */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="checkingDate"
                          label="Checking Date"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={values.checkingDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.checkingDate && Boolean(errors.checkingDate)}
                          helperText={touched.checkingDate && errors.checkingDate}
                        />
                      </Grid>

                      {/* Lifestyle & Habits */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Lifestyle & Habits
                        </Typography>
                        <FormControl component="fieldset" error={touched.lifestyleHabits && Boolean(errors.lifestyleHabits)}>
                          <Grid container>
                            <Grid item xs={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="lifestyleHabits"
                                    value="Smoking"
                                    checked={values.lifestyleHabits.includes('Smoking')}
                                    onChange={handleChange}
                                  />
                                }
                                label="Smoking"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="lifestyleHabits"
                                    value="Alcohol"
                                    checked={values.lifestyleHabits.includes('Alcohol')}
                                    onChange={handleChange}
                                  />
                                }
                                label="Alcohol"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="lifestyleHabits"
                                    value="Normal"
                                    checked={values.lifestyleHabits.includes('Normal')}
                                    onChange={handleChange}
                                  />
                                }
                                label="Normal"
                              />
                            </Grid>
                          </Grid>
                          {touched.lifestyleHabits && errors.lifestyleHabits && (
                            <Typography color="error" variant="caption">
                              {errors.lifestyleHabits}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>

                      {/* Profile Picture Upload */}
                      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Profile Picture
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Button 
                            variant="contained" 
                            component="label"
                            sx={{ mb: 2 }}
                          >
                            Upload Profile Picture
                            <input type="file" hidden accept="image/*" onChange={handleProfilePictureUpload} />
                          </Button>
                          {profilePicture && (
                            <Paper 
                              elevation={3} 
                              sx={{ 
                                p: 1, 
                                mt: 1, 
                                width: 'fit-content',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant="caption" sx={{ mb: 1 }}>Preview:</Typography>
                              <Avatar 
                                src={profilePicture} 
                                sx={{ width: 100, height: 100, mb: 1 }} 
                              />
                            </Paper>
                          )}
                        </Box>
                      </Grid>

                      {/* Aadhar Card Upload */}
                      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Aadhar Card
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Button 
                            variant="contained" 
                            component="label"
                            sx={{ mb: 2 }}
                          >
                            Upload Aadhar Card
                            <input type="file" hidden accept="image/*" onChange={handleAadharCardUpload} />
                          </Button>
                          {aadharCardPicture && (
                            <Paper 
                              elevation={3} 
                              sx={{ 
                                p: 1, 
                                mt: 1, 
                                width: 'fit-content',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant="caption" sx={{ mb: 1 }}>Preview:</Typography>
                              <Box sx={{ width: 150, height: 100, mb: 1, overflow: 'hidden' }}>
                                <img src={aadharCardPicture} alt="Aadhar Card" style={{ width: '100%', height: 'auto' }} />
                              </Box>
                            </Paper>
                          )}
                        </Box>
                      </Grid>

                      {/* Submit Button */}
                      <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                        <Button 
                          onClick={handleClose} 
                          variant="outlined" 
                          sx={{ mr: 1 }}
                        >
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
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PatientModals;