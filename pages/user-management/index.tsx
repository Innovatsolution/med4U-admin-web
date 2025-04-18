import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/UserRoles/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import RecentOrders from '@/content/Management/UserRoles/RecentOrders';
import { useState } from 'react'; // ✅ import useState

function ApplicationsTransactions() {
  const [reloadTable, setReloadTable] = useState(false);

  const handleRefresh = () => {
    setReloadTable(prev => !prev); // toggle to trigger refresh
  };

  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader onRefresh={handleRefresh} /> {/* ✅ pass as prop */}
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