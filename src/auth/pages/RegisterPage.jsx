import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthLayout } from '../layout/AuthLayout';

import { useEffect } from 'react';
import { useAuthStore } from '../../hooks';
import Swal from 'sweetalert2';


const namePattern = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const schema = yup.object().shape({
  name: yup.string()
                .required('Campo requerido')
                .matches(namePattern, 'Este campo solo puede contener letras y espacios')
                .min(2, 'El nombre debe tener un min. de 2 caracteres')
                .max(15, 'El nombre debe tener un max. de 20 caracteres'),            
  surname: yup.string()
                .required('Campo requerido')
                .matches(namePattern, 'Este campo solo puede contener letras y espacios')
                .min(2, 'El apellido debe tener un min. de 2 caracteres')
                .max(15, 'El apellido debe tener un max. de 20 caracteres'),               
  email: yup.string()
                .required('Campo requerido')
                .max(30, 'El email debe tener un max. de 30 carácteres')               
                .email('El email no es válido'),
  password: yup.string()
                .required('Campo requerido')
                .min(6, 'La contraseña debe tener un min. 6 caracteres')
                .max(12, 'La contraseña debe tener un max. de 12 caracteres')
                .matches(passwordPattern, 'La contraseña debe contener por lo menos una letra mayúscula, una minúscula, un número y un caracter especial.'),
  confirmPassword: yup.string()
                .required('Campo requerido')
                .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
}).required();

export const RegisterPage = () => {

  const { control, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const { startRegister, errorMessage } = useAuthStore();

  const onSubmit = ( {name, surname, email, password} ) => {
    startRegister({ name, surname, email, password });
  };

  useEffect(() => {
    if( errorMessage !== undefined ) {
      Swal.fire('Error en el Registro', errorMessage, 'error')
    }
  }, [errorMessage]);
  
 
  return (
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Nombre(s)"
                    fullWidth
                    type="text" 
                    placeholder='Martín'
                    name='name'
                    inputProps={{ maxLength: 15 }}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <Controller
                name="surname"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Apellido(s)" 
                    type="text" 
                    placeholder='Robles'
                    fullWidth
                    name='surname'
                    error={Boolean(errors.surname)}
                    helperText={errors.surname?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

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
                rules={{ validate: (value) => schema.validateSync({ email: value }) }}
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

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Contraseña" 
                    type="password" 
                    placeholder='contraseña'
                    fullWidth
                    name='password'
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                    {...field}
                  />
                )}
              />
            </Grid>


            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth type='submit'>
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
