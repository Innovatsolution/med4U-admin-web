// import { Card } from '@mui/material';
// import RecentOrdersTable from './RecentOrdersTable';
// import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { getRequest } from '@/services/api';

// Mapping from role name to ID
const userRole: Record<string, number> = {
  admin: 1,
  client: 2,
  serviceman: 3,
  auditor: 4,
};

function RecentOrders({reload}) {
  
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
      // ⬇️ Define fetchUsers once
      const fetchUsers = async () => {
        setLoading(true); // Optional: show loader during refresh
        try {
          const data = await getRequest('/users');
    
          const updatedUsers = (data || []).map((roleObj: any) => {
            const roleName = Object.keys(userRole).find(
              key => userRole[key] == roleObj.role
            );
            return {
              ...roleObj,
              roleName: roleName || 'Unknown',
            };
          });
    
          setUsers(updatedUsers);
        } catch (error) {
          console.error('Error fetching user Users:', error);
        } finally {
          setLoading(false);
        }
      };
  

 // ⬇️ Fetch when `reload` prop changes
  useEffect(() => {
    fetchUsers();
  }, [reload]);
  

   // ⬇️ Manual refresh (e.g., after a delete inside the table)
   const handleRefresh = () => {
    fetchUsers(); // 🔄 manually re-fetch
  };
  return (
    // <Card>
    //   <RecentOrdersTable users={users} />
    // </Card>
    <Card>
      {loading ? (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading Users...</Typography>
        </div>
      ) : (
        <RecentOrdersTable users={users} onRefresh={handleRefresh} />
      )}
    </Card>
  );
}

export default RecentOrders;
