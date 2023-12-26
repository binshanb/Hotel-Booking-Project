import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import instance from '../../../utils/Axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constants';
import { useSelector } from 'react-redux';


const theme = createTheme(); 
export default function SetForgotPassword() {

  const tokens = useSelector((state) => state.auth.userInfo?.access);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  console.log(confirmPassword,"confpassword");
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors},watch}=useForm()
  
  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyError = (message) => {
    toast.error(message);
  };
  const onSubmit = (event) => {
    const formData = {
      new_password: password,
      new_password2: confirmPassword
    };



    const token = tokens
      console.log(token,"token");
      const data = JSON.stringify(formData)
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      
      };
      instance
      .post(`${baseUrl}/api/change-password/`, data,{headers})
      .then((response) => {
        if (response.status === 200) {
          notifySuccess('The user details have been updated.');
          navigate('/');
        } else {
          notifyError('Invalid Details');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
        notifyError(error.response?.data?.detail || 'An error occurred');
      });
  };

  

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5" >
            Reset PassWord
          </Typography>
          <Box component="form"  onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>


              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                        }}
                  inputProps={register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/,
                    maxLength: 10,
                    minLength: 5,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-xs italic text-red-500">
                    Enter a Valid Password
                  </p>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <p className="text-xs italic text-red-500">
                    Password Should Contain At Least One Capital Letter One
                    Small Letter and one digit
                  </p>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <p className="text-xs italic text-red-500">
                    Exceeds Maximum Length
                  </p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-xs italic text-red-500">
                    Minimum 5 Characters Required
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                        }}
                  inputProps={register("ConfirmPassword", {
                    validate: (value) => value === watch("password"),
                  })}
                />
                  {errors.ConfirmPassword && (
                    <p className="text-xs italic text-red-500 error-signup">
                      Passwords do not match
                    </p>
                  )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"black"}}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}