import Head from 'next/head';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Users/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import RecentOrders from '@/content/Management/Users/RecentOrders';

function ApplicationsTransactions() {
  const [reloadTable, setReloadTable] = useState(false);

  const handleRefresh = () => {
    setReloadTable(prev => !prev); // toggle to trigger refresh
  };
  return (
    <>
      <Head>
        <title>Users - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader  onRefresh={handleRefresh} />
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
            <RecentOrders reload={reloadTable} /> {/* ✅ pass reload prop */}
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
