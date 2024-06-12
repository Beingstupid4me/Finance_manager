"use client";
import React from 'react';
import { Container, Grid, Typography, TextField, Button, Divider, CircularProgress, Alert } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/app/actions/registerAction';

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const router = useRouter();

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const onRegisterSubmit = async (data) => {
        await delay(3000);
        console.log(data);
        if (data.email === 'admin@gmail.com' && data.password === 'admin') {
            setError('registration_failed', { type: 'manual', message: 'Invalid registration credentials' });
        } else {
            const res = await registerAction(data);
            console.log(res);
            if (res.status == 400) {
                setError('registration_failed', { type: 'manual', message: res.error });
            }
            router.push('/');
        }
        reset();
    };

    return (
        <Container className='bg-white text-black justify-center px-5 py-5 lg:w-1/4 rounded shadow-xl'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">Register</Typography>
                    <Typography variant="body2">Create a new account</Typography>
                </Grid>
                <Grid item xs={12}>
                    {isSubmitting ? (
                        <CircularProgress />
                    ) : (
                        <form onSubmit={handleSubmit(onRegisterSubmit)} className='visible:'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <Alert severity="error">This field is required</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Email address"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        {...register('email', { required: true })}
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
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && <Alert severity="error">This field is required</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="income"
                                        label="Income"
                                        type=""
                                        variant="outlined"
                                        fullWidth
                                        {...register('income', { required: true })}
                                    />
                                    {errors.income && <Alert severity="error">This field is required</Alert>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                            {errors.registration_failed && <Alert severity="error">{errors.registration_failed.message}</Alert>}
                        </form>
                    )}
                </Grid>
            </Grid>
            {!isSubmitting && <Divider variant="middle" className='py-2' />}
            {!isSubmitting && (
                <Typography variant="body2" className='text-right text-slate-600'>
                    Already have an account? <Link href="/authentication/login" replace className='underline hover:'>Login Here</Link>
                </Typography>
            )}
        </Container>
    );
}
