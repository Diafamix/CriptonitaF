import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../utils/get-initials";

export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [historial, setHistorial] = useState(undefined);

  useEffect(() => {
    getHistorial();
  }, []);

  const getHistorial = () => {
    axios
      .get(
        "http://localhost:8080/api/history?start=10-08-2022&end=30-12-2022",
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          auth: {
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setHistorial(data.data.data);
      })
      .catch((e) => console.log(e));
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (historial === undefined) return null;

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table sx={{ backgroundColor: "#2196f3" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Destiny
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "#121212" }}>
              {historial.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.user.name}
                  selected={
                    selectedCustomerIds.indexOf(customer.user.name) !== -1
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedCustomerIds.indexOf(customer.user.name) !== -1
                      }
                      onChange={(event) =>
                        handleSelectOne(event, customer.user.name)
                      }
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={customer.user.name} sx={{ mr: 2 }}>
                        {getInitials(customer.user.name)}
                      </Avatar>
                      <Typography color="white" variant="body1">
                        {customer.user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {customer.origin}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {customer.destiny}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {customer.quantity}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{customer.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          color: "white",
          backgroundColor: "#2196f3",
        }}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
