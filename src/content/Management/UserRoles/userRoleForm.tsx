import SidebarLayout from '@/layouts/SidebarLayout';
import { useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Dialog,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    FormGroup,
    Switch,
    styled
} from '@mui/material';
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
  roleName: yup.string().required('Role name is required').min(3, 'Must be at least 3 characters'),
  permissions: yup
    .array()
    .test('at-least-one', 'At least one permission must be enabled', (value) =>
      value?.some((perm) => perm.list || perm.add || perm.edit || perm.delete)
    ),
});

const UserRoleCreateModals = (props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roleName: props.editRole?.name || '',
      permissions: PermissionOptions.map(() => ({ list: false, add: false, edit: false, delete: false })),
    },
  });

  useEffect(() => {
    if (props.editRole) {
      setValue('roleName', props.editRole.name || '');
    }
  }, [props.editRole, setValue]);

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Dialog onClose={props.handleModalClose} open={props.open} className="custom-scrollbar">
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
                        <TextField
                          {...field}
                          label="Role"
                          type="text"
                          fullWidth
                          error={!!errors.roleName}
                          helperText={errors.roleName?.message}
                        />
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
