import { useEffect, useState } from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { getRequest } from '@/services/api';

function RecentOrders({vehicleReload}) {
  const [vehicles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

    // ⬇️ Define fetchRoles once
    const fetchRoles = async () => {
      setLoading(true); // Optional: show loader during refresh
      try {
        const data = await getRequest('/vehicles');
        setRoles(data);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
    };

 // ⬇️ Fetch when `reload` prop changes
  useEffect(() => {
    fetchRoles();
  }, [vehicleReload]);

   // ⬇️ Manual refresh (e.g., after a delete inside the table)
   const handleRefresh = () => {
    fetchRoles(); // 🔄 manually re-fetch
  };

  return (
    <Card>
      {loading ? (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading roles...</Typography>
        </div>
      ) : (
        <RecentOrdersTable vehicles={vehicles} onVehicleRefresh={handleRefresh} />
      )}
    </Card>
  );
}

export default RecentOrders;
