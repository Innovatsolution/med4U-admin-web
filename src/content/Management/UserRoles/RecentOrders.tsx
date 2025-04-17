import { useEffect, useState } from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import RoleManagementTable from './RecentOrdersTable';
import { getRequest } from '@/services/api';

// Mapping from role name to ID
const userRole: Record<string, number> = {
  admin: 1,
  client: 2,
  serviceman: 3,
  auditor: 4,
};

function RecentOrders() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRequest('/user-role');

        // Add roleName to each role object
        const updatedRoles = (data || []).map((roleObj: any) => {
          const roleName = Object.keys(userRole).find(
            key => userRole[key] === roleObj.role
          );
          return {
            ...roleObj,
            roleName: roleName || 'Unknown',
          };
        });

        setRoles(updatedRoles);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <Card>
      {loading ? (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading roles...</Typography>
        </div>
      ) : (
        <RoleManagementTable roles={roles} />
      )}
    </Card>
  );
}

export default RecentOrders;
