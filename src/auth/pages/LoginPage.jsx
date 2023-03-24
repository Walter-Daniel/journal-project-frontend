import { Button, Grid, Link, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';


import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const schema = yup.object().shape({             
  email: yup.string()
                .required('Campo requerido')
                .max(30, 'El email debe tener un max. de 30 carácteres')               
                .email('El email no es válido'),
  password: yup.string()
                .required('Campo requerido')
                .min(6, 'La contraseña debe tener un min. 6 caracteres')
                .max(12, 'La contraseña debe tener un max. de 12 caracteres')
                .matches(passwordPattern, 'La contraseña debe contener por lo menos una letra mayúscula, una minúscula, un número y un caracter especial.')
}).required();

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const { control, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = ( { email, password }  ) => {
    startLogin({ email, password });
  };

  useEffect(() => {
    if( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])
  

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Correo" 
                    fullWidth
                    name='email'
                    placeholder='martin@email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...field}
                  />
                  
                )}
            />

            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Contraseña" 
                    type="password" 
                    placeholder='contraseña'
                    fullWidth
                    name='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />

            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } >
                <Button type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
