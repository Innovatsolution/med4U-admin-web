import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  TextField,
  CardHeader
} from '@mui/material';

import { RoleManagement } from '@/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import UserRoleCreateModals from "./userRoleForm";
import DeleteModal from '../../common/DeleteConfirm';

interface Role {
  id: string;
  name: string;
  created_at?: number;
}

interface RecentOrdersTableProps {
  className?: string;
  RoleManagements: RoleManagement[];
}

interface Filters {
  search?: string;
}

const applyFilters = (
  RoleManagements: RoleManagement[],
  filters: Filters
): RoleManagement[] => {
  return RoleManagements.filter((RoleManagement) => {
    let matches = true;

    if (filters.search && RoleManagement.name !== filters.search) {
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
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    search: null
  });
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  
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
  
  // Open Delete Modal
  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
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
  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setOpenRoleModal(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setOpenRoleModal(false);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
                <TextField label="Search" type="text" fullWidth value={filters.search} onChange={handleRoleChange} />
            </FormControl>
          </Box>
        }
        title="User Roles"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoleManagements.map((role) => {
              return (
                <TableRow
                  hover
                  key={role.id}
                >
                  <TableCell align="left">
                    {role.name}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {/* Edit Button */}
                      <Tooltip title="Edit Role">
                        <IconButton color="primary" onClick={() => handleEditRole(role)}>
                          <EditTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                      {/* Delete Button */}
                      <Tooltip title="Delete Role">
                        <IconButton color="error" onClick={() => handleDeleteRole(role)}>
                          <DeleteTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
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
      
      {/* Role Modal */}
      <UserRoleCreateModals open={openRoleModal} handleModalClose={handleCloseModal} editRole={selectedRole}/>
      {/* Delete Modal */}
      <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} data={roleToDelete} />
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
