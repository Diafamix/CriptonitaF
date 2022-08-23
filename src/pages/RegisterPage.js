import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from "@mui/material/styles";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const Register = () => {
  const [password, setPassword] = React.useState("");
  const [leyenda, setLeyenda] = React.useState("");
  const [errorpassword, setErrorPassword] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string()
        .max(8, "Password cannot be longer than 8 characters")
        .required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Navbar></Navbar>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="white" variant="h4">
                  Create a new account
                </Typography>
                <Typography color="primary" gutterBottom variant="body2">
                  Use your email to create a new account
                </Typography>
              </Box>
              <CssTextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
              />
              <CssTextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <CssTextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                }}
              >
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography color="white" variant="body2">
                  I have read the{" "}
                  <NextLink href="#" passHref>
                    <Link
                      color="primary"
                      underline="always"
                      variant="subtitle2"
                    >
                      Terms and Conditions
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign Up Now
                </Button>
              </Box>
              <Typography color="white" variant="body2">
                Have an account?{" "}
                <Link href="/Login" variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </form>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Register;
