import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/account/customer-list-results";
import { CustomerListToolbar } from "../components/account/customer-list-toolbar";
import { customers } from "../components/account/customers";
import Navbar from "../components/Navbar";

const Customers = () => (
  <>
    <Navbar></Navbar>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        mt: 4,
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Customers;
