import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Patients/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import { useState } from 'react';
import RecentOrders from '@/content/Management/Patients/RecentOrders';

function ApplicationsTransactions() {
  const [patientReloadTable, setReloadTable] = useState(false);

  const handlePatientRefresh = () => {
    setReloadTable(prev => !prev); // toggle to trigger refresh
  };
  return (
    <>
      <Head>
        <title>Patient Management - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader onPatientRefresh={handlePatientRefresh} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders patientReload={patientReloadTable} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
