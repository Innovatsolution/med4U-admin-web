import ProjectsTable from './ProjectsTable';
import { getRequest } from '@/services/api';
import { useEffect, useState } from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';

function Projects({reload}) {
  const [loading, setLoading] = useState(true);
  const [projects, setRoles] = useState([]);
  
    // ⬇️ Define fetchRoles once
    const fetchRoles = async () => {
      setLoading(true); // Optional: show loader during refresh
      try {
        const data = await getRequest('/projects');
  
        const updatedProjects = (data || []).map((roleObj: any) => {
          return {
            ...roleObj,
          };
        });
  
        setRoles(updatedProjects);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
    };
  
   // ⬇️ Fetch when `reload` prop changes
    useEffect(() => {
      fetchRoles();
    }, [reload]);
  
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
      <ProjectsTable projects={projects}  onRefresh={handleRefresh}/>
      )}
    </Card>
  );
}

export default Projects;
