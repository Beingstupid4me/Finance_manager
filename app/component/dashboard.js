"use client";
import { Card, Divider } from '@mui/material'
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { Container, Grid, Typography, Box, CardContent, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LineChart } from '@mui/x-charts/LineChart';
import Timeliner from './timeline';
import Listing from './virtual_list';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getRecordsByUserId } from '../actions/readDatabase';

function dashboard(){

    const [showExactNumber, setShowExactNumber] = useState(false);
    const [showExactNumberexp, setShowExactNumberexp] = useState(false);
    const [data, setData] = useState([]);
    const [income, setincome] = useState("00,000");
    const [expenses, setexpenses] = useState("00,000");
    // let res = data;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const getdata = async () => {
        await delay(3000);
        let res = await getRecordsByUserId();
        console.log(res);
        setData(res);
        console.log(res.income," and ", res.expenses);
        setincome(res.income);
        setexpenses(res.expenses);
    }
    useEffect(() => {
        getdata();
    }, []);

  return (
    <Grid container spacing={5} className=" mx-0 my-0 w-full h-full ">
          <Grid xs={12} md={8}>
            <Container className=" border rounded-xl  w-full h-[45vh] bg-white">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                        },
                    ]}
                    fullWidth
                />
            </Container>
          </Grid>
          <Grid xs={12} md={4}>
            <Container className=" border rounded-md items-center justify-center flex flex-col h-[45vh] bg-white">
                    <Card className=' w-full'>
                        <Box className= "flex flex-col w-full" >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" noWrap>
                                Net Income :
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography component="div" variant="h6" className=' text-ellipsis overflow-hidden'>
                                    <CurrencyRupeeIcon/>{showExactNumber ? income : '•••••'}
                                </Typography>
                                <IconButton onClick={() => setShowExactNumber(!showExactNumber)} className=' ml-auto' >
                                    {showExactNumber ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </Box>
                            </CardContent>
                        </Box>
                    </Card>
                    <Divider className='my-2' />
                    <Card className=' w-full'>
                        <Box className= "flex flex-col w-full" >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" noWrap>
                                Net Expenses :
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography component="div" variant="h6" className=' text-ellipsis overflow-hidden'>
                                <CurrencyRupeeIcon/>{showExactNumberexp ? expenses : '•••••'}
                                </Typography>
                                <IconButton onClick={() => setShowExactNumberexp(!showExactNumberexp)} className=' ml-auto' >
                                    {showExactNumberexp ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </Box>
                            </CardContent>
                        </Box>
                    </Card>
            </Container>
          </Grid>
          <Grid xs={12} md={2}>
          <Container className=" border rounded-md px-0 mx-0  h-[45vh] bg-white">
            <Timeliner data = {data} />
          </Container>
          </Grid>
          <Grid xs={12} md={10}>
          <Container className=" border rounded-md  h-[45vh] bg-white">
            <Listing data = {data} setData={setData} />
          </Container>
          </Grid>
    </Grid>
  )
}

export default dashboard

