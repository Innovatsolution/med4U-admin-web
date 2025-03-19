import { Card } from '@mui/material';
import ProjectsTable from './ProjectsTable';
import { subDays } from 'date-fns';

function Projects() {
  const projects = [
    {
      id: 'P001',
      name: 'Website Redesign',
      description: 'A complete redesign of the corporate website to enhance UX and accessibility.',
      type: 'Client',
      status: 'Ongoing',
      startDate: '2024-01-10',
      endDate: '2024-06-30',
      clientSponsor: 'John Doe',
      assignedManager: 'Manager A',
      created_at: new Date().getTime(),
    },
    {
      id: 'P002',
      name: 'Mobile App Development',
      description: 'Developing a cross-platform mobile application for e-commerce.',
      type: 'Internal',
      status: 'Pending',
      startDate: '2024-03-01',
      endDate: '2024-09-15',
      clientSponsor: 'Jane Smith',
      assignedManager: 'Manager B',
      created_at: subDays(new Date(), 2).getTime(),
    },
    {
      id: 'P003',
      name: 'Cloud Migration',
      description: 'Migrating on-premise infrastructure to a cloud-based solution.',
      type: 'Client',
      status: 'Completed',
      startDate: '2023-06-15',
      endDate: '2023-12-10',
      clientSponsor: 'Robert Johnson',
      assignedManager: 'Manager C',
      created_at: subDays(new Date(), 5).getTime(),
    },
    {
      id: 'P004',
      name: 'AI Chatbot Integration',
      description: 'Integrating an AI-powered chatbot into the company website.',
      type: 'Internal',
      status: 'Ongoing',
      startDate: '2024-02-20',
      endDate: '2024-08-01',
      clientSponsor: 'Emily Davis',
      assignedManager: 'Manager A',
      created_at: subDays(new Date(), 10).getTime(),
    },
    {
      id: 'P005',
      name: 'Cybersecurity Enhancement',
      description: 'Implementing advanced security measures for data protection.',
      type: 'Client',
      status: 'Pending',
      startDate: '2024-05-01',
      endDate: '2024-11-30',
      clientSponsor: 'Michael Brown',
      assignedManager: 'Manager B',
      created_at: subDays(new Date(), 15).getTime(),
    },
    {
      id: 'P006',
      name: 'CRM System Upgrade',
      description: 'Upgrading the existing CRM system to improve performance and scalability.',
      type: 'Internal',
      status: 'Ongoing',
      startDate: '2024-04-05',
      endDate: '2024-10-20',
      clientSponsor: 'Sarah Wilson',
      assignedManager: 'Manager C',
      created_at: subDays(new Date(), 20).getTime(),
    },
    {
      id: 'P007',
      name: 'Digital Marketing Strategy',
      description: 'Developing a comprehensive digital marketing strategy for brand awareness.',
      type: 'Client',
      status: 'Completed',
      startDate: '2023-09-10',
      endDate: '2024-02-25',
      clientSponsor: 'David Martinez',
      assignedManager: 'Manager A',
      created_at: subDays(new Date(), 30).getTime(),
    }
  ];
  
  

  return (
    <Card>
      <ProjectsTable projects={projects} />
    </Card>
  );
}

export default Projects;
