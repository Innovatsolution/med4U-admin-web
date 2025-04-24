import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect, useState  } from 'react';
import ToastMessage from "../../../toast/ToastMessage";
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Dialog,
    Button,
    Typography,
    FormControlLabel,
    FormGroup,
    Switch,
    styled
} from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import CommuteTwoToneIcon from '@mui/icons-material/CommuteTwoTone';
import { postRequest } from '@/services/api';
import { putRequest } from '@/services/api';

const userRole: Record<string, number> = {
  admin: 1,
  client: 2,
  serviceman: 3,
  auditor: 4,
};
  
// Styled Timeline Wrapper
const TimelineWrapper = styled(Timeline)(
  ({ theme }) => `
    margin-left: ${theme.spacing(2)};
    .MuiTimelineDot-root {
      left: -${theme.spacing(2)};
      margin-top: 0;
      top: ${theme.spacing(0.5)};
    }
    .MuiTimelineContent-root {
      padding-left: ${theme.spacing(4)};
    }
    .MuiFormControlLabel-root {
      margin-left: -${theme.spacing(0.7)};
    }
`
);

// Permission Options Array
const PermissionOptions = [
  { name: "Dashboard", icon: <DashboardTwoToneIcon /> },
  { name: "User Management", icon: <PeopleAltTwoToneIcon /> },
  { name: "Users", icon: <PersonOutlineTwoToneIcon /> },
  { name: "Projects", icon: <DesignServicesTwoToneIcon /> },
  { name: "Vehicle Management", icon: <DirectionsCarTwoToneIcon /> },
  { name: "Reports & Analytics", icon: <BarChartTwoToneIcon /> },
  { name: "Vehicle Trip Details", icon: <CommuteTwoToneIcon /> },
];

// Validation Schema using Yup
const schema = yup.object().shape({
  roleName: yup.number().required('Role name is required'),
  permissions: yup
    .array()
    .test('at-least-one', 'At least one permission must be enabled', (value) =>
      value?.some((perm) => perm.list || perm.add || perm.edit || perm.delete)
    ),
});

const UserRoleCreateModals = (props) => {

  console.log(props.editRole);
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
    resolver: yupResolver(schema),
    defaultValues: {
      roleName: props.editRole?.role || '',
      permissions: PermissionOptions.map(() => ({ list: false, add: false, edit: false, delete: false })),
    },
  });

  // useEffect(() => {
  //   if (props.editRole) {
  //     setValue('roleName', props.editRole.role || '');
  //   }
  // }, [props.editRole, setValue]);
  useEffect(() => {
    if (props.editRole) {
      const roleNameValue = Object.entries(userRole).find(
        ([, value]) => value === props.editRole.role
      )?.[1];
  
      // Map back the permissions to match the form
      const formPermissions = PermissionOptions.map((_, index) => {
        const key = Object.keys(props.editRole.permission || {})[index];
        const perm = props.editRole.permission?.[key] || {};
        return {
          list: perm.read === 1,
          add: perm.create === 1,
          edit: perm.edit === 1,
          delete: perm.delete === 1,
        };
      });
  
      reset({
        roleName: roleNameValue,
        permissions: formPermissions,
      });
    }
  }, [props.editRole, reset]);

  const formatPermissions = (permissions) => {
    const permissionKeys = [
      'dashboard',
      'userrole',
      'users',
      'projects',
      'camp_details',
      'vehicle_management',
      'trip_details',
      'patient_details',
      'reports',
    ];
  
    const formatted = {};
  
    permissionKeys.forEach((key, index) => {
      const perm = permissions[index] || {};
      formatted[key] = {
        create: perm.add ? 1 : 0,
        read: perm.list ? 1 : 0,
        edit: perm.edit ? 1 : 0,
        delete: perm.delete ? 1 : 0,
      };
    });
  
    return formatted;
  };
  const onSubmit = async (data) => {
    const payload = {
      role: data.roleName,
      permission: formatPermissions(data.permissions),
    };
  
    try {
      if (props.editRole) {
        // ✏️ Edit Mode
        const response = await putRequest(`/user-role/${props.editRole.id}`, payload); // Use the correct ID
        console.log('Updated:', response.data);
        
        setToastData({
          type: "success",
          message: "User Role Update successfully!",
        });
        setShowToast(true);
      } else {
        const response = await postRequest('/user-role', payload);
        console.log('Created:', response.data);
        
        // 🆕 Create Mode
        setToastData({
          type: "success",
          message: "User Role Create successfully!",
        });
        setShowToast(true);
      }
  
      // Optional: Close modal and refresh roles list
      props.handleModalClose();

      // ✅ Tell parent to refresh table
      props.onUserRoleSuccess?.();
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
    <Dialog onClose={props.handleModalClose} open={props.open} className="custom-scrollbar">
      <ToastMessage show={showToast} setShow={setShowToast} toastData={toastData} />
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={props.editRole ? 'Edit User Role' : 'Add User Role'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  {/* Role Name Field */}
                  <Grid item xs={12}>
                  <Controller
                    name="roleName"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.roleName}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                          {...field}
                          labelId="role-select-label"
                          label="Role"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {Object.entries(userRole).map(([key, value]) => (
                            <MenuItem key={value} value={value}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.roleName && (
                          <Typography variant="body2" color="error">
                            {errors.roleName.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                  </Grid>

                  {/* Permissions Section */}
                  <Grid item xs={12}>
                    <TimelineWrapper>
                      {PermissionOptions.map((option, index) => (
                        <TimelineItem key={option.name}>
                          <TimelineSeparator>
                            <TimelineDot color="primary">{option.icon}</TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="h4" sx={{ pb: 2 }}>
                              {option.name}
                            </Typography>
                            <FormGroup>
                              <Grid container spacing={2}>
                                {['list', 'add', 'edit', 'delete'].map((action) => (
                                  <Grid item xs={3} key={action}>
                                    <Controller
                                      name={`permissions.${index}.${action}`}
                                      control={control}
                                      render={({ field }) => (
                                        <FormControlLabel
                                          control={<Switch {...field} checked={field.value} color="success" />}
                                          label={action.charAt(0).toUpperCase() + action.slice(1)}
                                        />
                                      )}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </FormGroup>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </TimelineWrapper>

                    {/* Show validation error if no permissions are selected */}
                    {errors.permissions && (
                      <Typography color="error" variant="body2">
                        {errors.permissions.message}
                      </Typography>
                    )}
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                      {props.editRole ? 'Edit' : 'Create'}
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

UserRoleCreateModals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserRoleCreateModals;
