import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import { RoleManagement, RoleManagementStatus } from '@/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  RoleManagements: RoleManagement[];
}

interface Filters {
  status?: RoleManagementStatus;
}

const getStatusLabel = (RoleManagementStatus: RoleManagementStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[RoleManagementStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  RoleManagements: RoleManagement[],
  filters: Filters
): RoleManagement[] => {
  return RoleManagements.filter((RoleManagement) => {
    let matches = true;

    if (filters.status && RoleManagement.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  RoleManagements: RoleManagement[],
  page: number,
  limit: number
): RoleManagement[] => {
  return RoleManagements.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ RoleManagements }) => {
  const [selectedRoleManagements, setSelectedRoleManagements] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedRoleManagements.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const roleOptions = [
    { 
      id : 'all',
      name : 'All'
    },
    { 
      id : 'Admin',
      name : 'Admin'
    },
    { 
      id : 'Project Manager',
      name : 'Project Manager'
    },
    { 
      id : 'Doctor',
      name : 'Doctor'
    },
    { 
      id : 'Nurse',
      name : 'Nurse'
    },
    { 
      id : 'Office Assistant',
      name : 'Office Assistant'
    },
    { 
      id : 'Client Project Manager',
      name : 'Client Project Manager'
    },
    { 
      id : 'Client Sponsor',
      name : 'Client Sponsor'
    }
  ];

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllRoleManagements = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedRoleManagements(
      event.target.checked
        ? RoleManagements.map((RoleManagement) => RoleManagement.id)
        : []
    );
  };

  const handleSelectOneRoleManagement = (
    _event: ChangeEvent<HTMLInputElement>,
    RoleManagementId: string
  ): void => {
    if (!selectedRoleManagements.includes(RoleManagementId)) {
      setSelectedRoleManagements((prevSelected) => [
        ...prevSelected,
        RoleManagementId
      ]);
    } else {
      setSelectedRoleManagements((prevSelected) =>
        prevSelected.filter((id) => id !== RoleManagementId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredRoleManagements = applyFilters(RoleManagements, filters);
  const paginatedRoleManagements = applyPagination(
    filteredRoleManagements,
    page,
    limit
  );
  const selectedSomeRoleManagements =
    selectedRoleManagements.length > 0 &&
    selectedRoleManagements.length < RoleManagements.length;
  const selectedAllRoleManagements =
    selectedRoleManagements.length === RoleManagements.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleRoleChange}
                  label="Role"
                  autoWidth
                >
                  {roleOptions.map((roleOption) => (
                    <MenuItem key={roleOption.id} value={roleOption.id}>
                      {roleOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="User Roles"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllRoleManagements}
                  indeterminate={selectedSomeRoleManagements}
                  onChange={handleSelectAllRoleManagements}
                />
              </TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoleManagements.map((RoleManagement) => {
              const isRoleManagementSelected = selectedRoleManagements.includes(
                RoleManagement.id
              );
              return (
                <TableRow
                  hover
                  key={RoleManagement.id}
                  selected={isRoleManagementSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isRoleManagementSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneRoleManagement(event, RoleManagement.id)
                      }
                      value={isRoleManagementSelected}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {RoleManagement.roleName}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredRoleManagements.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  RoleManagements: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  RoleManagements: []
};

export default RecentOrdersTable;
