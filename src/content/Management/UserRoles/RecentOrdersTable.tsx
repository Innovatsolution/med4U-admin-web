import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
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
  useTheme,
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import UserRoleCreateModals from './userRoleForm';
import DeleteRoleModal from './DeleteRoleModal';
import { deleteRequest } from '@/services/api';

interface Role {
  id: string;
  roleName: string;
}

interface RoleManagementTableProps {
  className?: string;
  roles: Role[];
  onUserRoleRefresh: any;
}

const applyPagination = (roles: Role[], page: number, limit: number): Role[] => {
  return roles.slice(page * limit, page * limit + limit);
};

const RoleManagementTable: FC<RoleManagementTableProps> = ({ roles, onUserRoleRefresh }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const selectedBulkActions = selectedRoles.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleSelectAllRoles = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedRoles(event.target.checked ? roles.map((role) => role.id) : []);
  };

  const handleSelectOneRole = (_event: ChangeEvent<HTMLInputElement>, roleId: string): void => {
    if (!selectedRoles.includes(roleId)) {
      setSelectedRoles((prevSelected) => [...prevSelected, roleId]);
    } else {
      setSelectedRoles((prevSelected) => prevSelected.filter((id) => id !== roleId));
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setOpenDeleteModal(true);
  };

  const handleDelete = async ()=>{
        // Delete data
        const response = await deleteRequest(`/user-role/${selectedRole.id}`); // Use the correct ID
        console.log('delete:', response.data);
        onUserRoleRefresh?.();
  }

  const paginatedRoles = applyPagination(roles, page, limit);
  const selectedSomeRoles = selectedRoles.length > 0 && selectedRoles.length < roles.length;
  const selectedAllRoles = selectedRoles.length === roles.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && <CardHeader title="User Role Management" />}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllRoles}
                  indeterminate={selectedSomeRoles}
                  onChange={handleSelectAllRoles}
                />
              </TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoles.map((role) => {
              const isRoleSelected = selectedRoles.includes(role.id);
              return (
                <TableRow hover key={role.id} selected={isRoleSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isRoleSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneRole(event, role.id)
                      }
                      value={isRoleSelected}
                    />
                  </TableCell>
                  <TableCell align="left">{role.roleName}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => handleEditClick(role)}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        onClick={() => handleDeleteClick(role)}
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
          count={roles.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>

      {/* Edit Role Modal */}
      <UserRoleCreateModals
        open={openEditModal}
        handleModalClose={() => setOpenEditModal(false)}
        editRole={selectedRole}
        onUserRoleSuccess={onUserRoleRefresh} // ✅ Pass refresh callback
      />

      {/* Delete Role Modal */}
      <DeleteRoleModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={() => {
          handleDelete();
          setOpenDeleteModal(false);
        }}
        role={selectedRole}
      />
    </Card>
  );
};

RoleManagementTable.propTypes = {
  roles: PropTypes.array.isRequired,
};

RoleManagementTable.defaultProps = {
  roles: []
};

export default RoleManagementTable;
