import SidebarLayout from '@/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
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
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import CommuteTwoToneIcon from '@mui/icons-material/CommuteTwoTone';

const TimelineWrapper = styled(Timeline)(({ theme }) => `
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

  .MuiFormControlLabel-label {
    color: ${theme.colors.alpha.black[50]};
  }
`);

const PermissionOptions = [
  { name: "Dashboard", icon: <DashboardTwoToneIcon /> },
  { name: "User Management", icon: <PeopleAltTwoToneIcon /> },
  { name: "Users", icon: <PersonOutlineTwoToneIcon /> },
  { name: "Projects", icon: <DesignServicesTwoToneIcon /> },
  { name: "Vehicle Management", icon: <DirectionsCarTwoToneIcon /> },
  { name: "Reports & Analytics", icon: <BarChartTwoToneIcon /> },
  { name: "Vehicle Trip Details", icon: <CommuteTwoToneIcon /> }
];

const UserRoleCreateModals = ({ open, handleModalClose, editRole, handleSave }) => {
  const [userData, setUserData] = useState({
    name: '',
    permissions: {}
  });

  useEffect(() => {
    if (editRole) {
      setUserData({
        name: editRole.name || '',
        permissions: editRole.permissions || {}
      });
    } else {
      setUserData({
        name: '',
        permissions: {}
      });
    }
  }, [editRole]);

  const handlePermissionChange = (permission, action) => {
    setUserData((prevState) => ({
      ...prevState,
      permissions: {
        ...prevState.permissions,
        [permission]: {
          ...prevState.permissions[permission],
          [action]: !prevState.permissions[permission]?.[action]
        }
      }
    }));
  };

  const handleSubmit = () => {
    handleSave(userData);
    handleModalClose();
  };

  return (
    <Dialog onClose={handleModalClose} open={open} className="custom-scrollbar">
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={editRole ? 'Edit User Role' : 'Add User Role'} />
            <Divider />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Role"
                      type="text"
                      fullWidth
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimelineWrapper>
                      {PermissionOptions.map((option) => (
                        <TimelineItem key={option.name}>
                          <TimelineSeparator>
                            <TimelineDot color="primary">
                              {option.icon}
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="h4" sx={{ pb: 2 }}>
                              {option.name}
                            </Typography>
                            <FormGroup>
                              <Grid container spacing={2}>
                                {['List', 'Add', 'Edit', 'Delete'].map((action) => (
                                  <Grid item xs={3} key={action}>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          color="success"
                                          checked={userData.permissions[option.name]?.[action] || false}
                                          onChange={() => handlePermissionChange(option.name, action)}
                                        />
                                      }
                                      label={action}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </FormGroup>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </TimelineWrapper>
                  </Grid>
                  {/* Button Alignment Fixed - Always Right */}
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      {editRole ? 'Update' : 'Create'}
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
