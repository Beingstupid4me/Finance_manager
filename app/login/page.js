"use client";
import React from 'react'
import { Container, Grid, Typography, TextField, Button, Divider, CircularProgress, Alert } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/actions/loginAction';



export default function page() {
    
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors , isSubmitting },
      } = useForm();

      const watchAllFields = watch();

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));

      const onmmSubmit = async (data) => {
        // e.preventDefault();
        await delay(3000);
        console.log(data);
        if(data.email === 'admin@gmail.com' && data.password === 'admin'){
            setError('login_failed', { type: 'manual', message: 'Invalid email or password' });
        }
        else{
            const res = await loginAction(data);
            console.log(res);
            if(res.status === 200){
                router.push('/');
            }
            else{
                setError('login_failed', { type: 'manual', message: 'Invalid email or password' });
            }

        }
        reset();
      }

    return (
        <Container className='bg-white text-black justify-center px-5 py-5 lg:w-1/4 rounded shadow-xl'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">Login</Typography>
                    <Typography variant="body2">Login to your account</Typography>
                </Grid>
                <Grid item xs={12}>
                    {isSubmitting? (
                        <CircularProgress/>
                    ) : (
                        <form onSubmit={handleSubmit(onmmSubmit)}className=' visible:' >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Email address"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <Alert severity="error">This field is required</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password && <Alert severity="error">This field is required</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                            {errors.login_failed && <Alert severity="error">{errors.login_failed.message}</Alert>}
                        </form>
                    )}
                </Grid>
            </Grid>
            {!isSubmitting && <Divider variant="middle" className=' py-2'/>}
            {!isSubmitting && <Typography variant="body2" className='text-right text-slate-600'>Don't have an account? <Link href="/authentication/register" replace className='underline hover:'>Register Here</Link> </Typography>}
        </Container>
    )
}


