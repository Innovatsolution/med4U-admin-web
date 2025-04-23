import SidebarLayout from '@/layouts/SidebarLayout';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
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
import { useEffect, useState  } from 'react';

// ✅ Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Project Name is required'),
  description: yup.string().required('Project Description is required'),
  type: yup.string().required('Project Type is required'),
  status: yup.string().required('Project Status is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup.date().required('End Date is required').min(yup.ref('startDate'), 'End date cannot be before start date'),
  clientSponsor: yup.string().required('Client Sponsor is required'),
  assignedManager: yup.string().required('Assigned Manager is required')
});

const ProjectModal = ({ open, handleClose, editProject, onSuccess }) => {
  
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
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      type: '',
      status: '',
      startDate: null,
      endDate: null,
      clientSponsor: '',
      assignedManager: ''
    }
  });

  // Populate form when editing a project
  useEffect(() => {
    if (editProject) {
      Object.keys(editProject).forEach((key:any) => setValue(key, editProject[key] || ''));
    } else {
      reset();
    }
  }, [editProject, setValue, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    // handleClose(); // Close modal after submission

    const payload = data;
  
    try {
      if (editProject) {
        // ✏️ Edit Mode
        setToastData({
          type: "success",
          message: "User Role Update successfully!",
        });
        setShowToast(true);
        const response = await putRequest(`/projects/${editProject.id}`, payload); // Use the correct ID
        
        console.log('Updated:', response.data);
      } else {
        // 🆕 Create Mode
        setToastData({
          type: "success",
          message: "User Role Create successfully!",
        });
        setShowToast(true);
        const response = await postRequest('/projects', payload);
        console.log('Created:', response.data);
      }
  
      // Optional: Close modal and refresh roles list
      handleClose();

      // ✅ Tell parent to refresh table
      onSuccess?.();
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
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editProject ? 'Edit Project' : 'Add Project'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Project Name"
                      fullWidth
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Project Description"
                      fullWidth
                      multiline
                      rows={4}
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Project Type</InputLabel>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Internal">Internal</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.type?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>Project Status</InputLabel>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.status?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Start Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register('startDate')}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register('endDate')}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Client Sponsor Name"
                      fullWidth
                      {...register('clientSponsor')}
                      error={!!errors.clientSponsor}
                      helperText={errors.clientSponsor?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.assignedManager}>
                      <InputLabel>Assigned Project Manager</InputLabel>
                      <Controller
                        name="assignedManager"
                        control={control}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="Manager A">Manager A</MenuItem>
                            <MenuItem value="Manager B">Manager B</MenuItem>
                            <MenuItem value="Manager C">Manager C</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText>{errors.assignedManager?.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      {editProject ? 'Update Project' : 'Create Project'}
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

ProjectModal.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ProjectModal;