import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import {
  Grid, Card, CardHeader, CardContent, Divider, FormControl, InputLabel, Select,
  MenuItem, Dialog, TextField, Button, Autocomplete, FormHelperText
} from '@mui/material';

const validationSchema = yup.object().shape({
  name: yup.string().required('Camp Name is required'),
  type: yup.string().required('Camp Type is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup.date()
    .required('End Date is required')
    .min(yup.ref('startDate'), 'End Date should be after Start Date'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  district: yup.string().required('District is required'),
  village: yup.string().required('Village is required'),
  gpsLatitude: yup.number().typeError('Latitude must be a number').required('Latitude is required'),
  gpsLongitude: yup.number().typeError('Longitude must be a number').required('Longitude is required'),
  assignedManager: yup.string().required('Manager is required'),
  assignedMedicalStaff: yup.array().min(1, 'At least one medical staff required'),
  driverName: yup.string().required('Driver Name is required'),
  clientSponsor: yup.string().required('Client Sponsor is required')
});

const CampModal = ({ open, handleClose, editCamp }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '', type: '', description: '', status: '', startDate: null, endDate: null,
      country: '', state: '', district: '', village: '', gpsLatitude: null, gpsLongitude: null,
      assignedManager: '', assignedMedicalStaff: [], driverName: '', clientSponsor: ''
    }
  });

  useEffect(() => {
    if (editCamp) {
      Object.keys(editCamp).forEach((key:any) => setValue(key, editCamp[key] || ''));
    }
  }, [editCamp, setValue]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={editCamp ? 'Edit Camp' : 'Add Camp'} />
              <Divider />
              <CardContent>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Camp Name" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth error={!!errors.type}>
                        <InputLabel>Camp Type</InputLabel>
                        <Select {...register('type')}>
                          <MenuItem value="Medical">Medical</MenuItem>
                          <MenuItem value="Educational">Educational</MenuItem>
                          <MenuItem value="Relief">Relief</MenuItem>
                        </Select>
                        <FormHelperText>{errors.type?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Description" fullWidth multiline rows={4} {...register('description')} error={!!errors.description} helperText={errors.description?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Start Date" type="date" fullWidth {...register('startDate')} error={!!errors.startDate} helperText={errors.startDate?.message} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="End Date" type="date" fullWidth {...register('endDate')} error={!!errors.endDate} helperText={errors.endDate?.message} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Country" fullWidth {...register('country')} error={!!errors.country} helperText={errors.country?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="State" fullWidth {...register('state')} error={!!errors.state} helperText={errors.state?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="District/City" fullWidth {...register('district')} error={!!errors.district} helperText={errors.district?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Village / Local Area" fullWidth {...register('village')} error={!!errors.village} helperText={errors.village?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="GPS Latitude" fullWidth {...register('gpsLatitude')} error={!!errors.gpsLatitude} helperText={errors.gpsLatitude?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="GPS Longitude" fullWidth {...register('gpsLongitude')} error={!!errors.gpsLongitude} helperText={errors.gpsLongitude?.message} />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth error={!!errors.status}>
                        <InputLabel>Status</InputLabel>
                        <Select {...register('status')}>
                          <MenuItem value="Planned">Planned</MenuItem>
                          <MenuItem value="Ongoing">Ongoing</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                        <FormHelperText>{errors.status?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth error={!!errors.assignedManager}>
                        <InputLabel>Assigned Manager</InputLabel>
                        <Select {...register('assignedManager')}>
                          <MenuItem value="Manager A">Manager A</MenuItem>
                          <MenuItem value="Manager B">Manager B</MenuItem>
                        </Select>
                        <FormHelperText>{errors.assignedManager?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="assignedMedicalStaff"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            options={["Doctor A", "Doctor B", "Doctor C"]}
                            {...field}
                            onChange={(_, data) => field.onChange(data)}
                            renderInput={(params) => <TextField {...params} label="Assigned Medical Staff" error={!!errors.assignedMedicalStaff} helperText={errors.assignedMedicalStaff?.message} fullWidth />}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth error={!!errors.driverName}>
                        <InputLabel>Driver Name</InputLabel>
                        <Select {...register('driverName')}>
                          <MenuItem value="Driver A">Driver A</MenuItem>
                          <MenuItem value="Driver B">Driver B</MenuItem>
                        </Select>
                        <FormHelperText>{errors.driverName?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth error={!!errors.clientSponsor}>
                        <InputLabel>Client Sponsor</InputLabel>
                        <Select {...register('clientSponsor')}>
                          <MenuItem value="Sponsor A">Sponsor A</MenuItem>
                          <MenuItem value="Sponsor B">Sponsor B</MenuItem>
                        </Select>
                        <FormHelperText>{errors.clientSponsor?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Button variant="contained" color="primary" type="submit">Submit</Button>
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

CampModal.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default CampModal;
