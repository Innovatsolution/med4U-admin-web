import { useEffect, useState } from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import CampTable from './CampTable';
import { getRequest } from '@/services/api';

function Camp({campReload}) {
  
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
  
      // ⬇️ Define fetchRoles once
      const fetchRoles = async () => {
        setLoading(true); // Optional: show loader during refresh
        try {
          const data = await getRequest('/camps');
          setCamps(data);
        } catch (error) {
          console.error('Error fetching camps:', error);
        } finally {
          setLoading(false);
        }
      };
  
   // ⬇️ Fetch when `reload` prop changes
    useEffect(() => {
      fetchRoles();
    }, [campReload]);
  
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
      <CampTable camps={camps}  onCampRefresh={handleRefresh}/>
    )}
    </Card>
  );
}

export default Camp;
