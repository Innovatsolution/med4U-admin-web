import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/VehicleManagement/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import { useState } from 'react';
import RecentOrders from '@/content/Management/VehicleManagement/RecentOrders';

function ApplicationsTransactions() {
  const [reloadTable, setReloadTable] = useState(false);

  const handleRefresh = () => {
    setReloadTable(prev => !prev); // toggle to trigger refresh
  };
  return (
    <>
      <Head>
        <title>Vehicle Management - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader onVehicleRefresh={handleRefresh}/>
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
            <RecentOrders  vehicleReload={reloadTable}/>
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
