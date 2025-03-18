import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
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
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import UserModals from './userForm';
import DeleteUserModal from './DeleteConfirm';

interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  designation: string;
  employeeID: string;
  created_at: number;
}

interface UserTableProps {
  className?: string;
  users: User[];
}

interface Filters {
  role?: string;
}

const applyFilters = (users: User[], filters: Filters): User[] => {
  return users.filter((user) => !filters.role || user.role === filters.role);
};

const applyPagination = (users: User[], page: number, limit: number): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

const UserManagementTable: FC<UserTableProps> = ({ users }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ role: '' });
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Open Delete Modal
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Confirm Delete
  const handleConfirmDelete = (userId: string) => {
    console.log(userId);
    setOpenDeleteModal(false);
  };

  // Open Edit Modal
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({ role: e.target.value !== 'all' ? e.target.value : '' });
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(users, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={200}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select value={filters.role || 'all'} onChange={handleRoleChange} label="Role">
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Office Assistant">Office Assistant</MenuItem>
                <MenuItem value="Client Project Manager">Client Project Manager</MenuItem>
                <MenuItem value="Client Sponsor">Client Sponsor</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Users"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.employeeID}</TableCell>
                <TableCell>{format(user.created_at, 'MMMM dd yyyy')}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Edit Button */}
                    <Tooltip title="Edit User">
                      <IconButton color="primary" onClick={() => handleEditUser(user)}>
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Delete Button */}
                    <Tooltip title="Delete User">
                      <IconButton color="error" onClick={() => handleDeleteUser(user)}>
                        <DeleteTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* User Modal */}
      <UserModals open={openModal} handleClose={handleCloseModal} editUser={selectedUser} />
      {/* Delete User Modal */}
      <DeleteUserModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} user={userToDelete} />
    </Card>
  );
};

UserManagementTable.propTypes = {
  users: PropTypes.array.isRequired
};

UserManagementTable.defaultProps = {
  users: []
};

export default UserManagementTable;
