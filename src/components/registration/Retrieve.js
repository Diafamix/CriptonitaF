/* eslint-disable */

import * as React from "react";
import "antd/dist/antd.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { Link as Link2 } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Cryptonita
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "primary",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "primary",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2196f3",
    },
  },
});

const theme = createTheme({
  components: {
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        input: sx({
          borderColor: "white",
          color: "white",
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: sx({
          borderColor: "white",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
  },
});

export default function Retrive() {
  const [password, setPassword] = React.useState("");
  const [leyenda, setLeyenda] = React.useState("");
  const [errorpassword, setErrorPassword] = React.useState(false);

  const [status, setStatus] = useState([false]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;

    axios
      .post("http://localhost:8080/authentication/retrieve?mail=" + email, null, {
        //Test if the connection is established correctly
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((data) => {
        console.log(data.data)
        if (!data.data.result === "true") return;

        console.log("successfully");
        setStatus(true);
      })
      .catch((e) => console.log(e));
  };

  if (sessionStorage.getItem("username") !== null) {  // Already logger in
    return <Navigate to="/"></Navigate>
}

  if (status === true) return <Navigate to="/" />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            fontFamily="Digitalism"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cryptonita
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              sx={{
                color: "white",
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    
  );
}