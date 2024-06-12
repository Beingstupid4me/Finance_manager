"use client";
import * as React from 'react';
import { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Snackbar } from '@mui/material';
import { Fab, Tooltip } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { addTransaction } from '../actions/addTransaction';
import { editTransaction } from '../actions/editTransaction';
import { deleteTransaction } from '../actions/deleteTransaction';

function Listing(proping) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [opensnackbar, setOpensnackbar] = React.useState(false);
  const [data, setData] = React.useState(proping.data.transactions || []);
  const [openEdit, setOpenEdit] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    reset,
    formState: { errors , isSubmitting },
  } = useForm();
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectededitValue, setSelectededitValue] = React.useState('');
  const handledialogOpen = () => {
    setOpenDialog(true);
    };

    const handledialogClose = () => {
    setOpenDialog(false);
    };

    const handleEditOpen = () => {
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSnackbar = () => {
        setOpensnackbar(true);
    };
  const handlecloseSnackbar = () => {
        setOpensnackbar(false);
    };

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const onDialogSubmit = async (datar) => {
        if (datar.amount == 0 || datar.amount == '' || datar.transactionType == null) {
            setError('amount', { type: 'manual', message: 'Incorrect or Incomplete details' });
            return;
        }
        await delay(3000);
        console.log(datar);
        const res = await addTransaction(datar);
        if (res.status == 400) {
            setError('transaction_failed', { type: 'manual', message: res.error });
        }
        else if (res.status == 200){
            console.log('Transaction added successfully');
            handleSnackbar();
        }
        reset();
        handledialogClose();
        data.push({amount: datar.amount, timestamp: res.time, message: datar.description, type: datar.transactionType});
        proping.setData({...proping.data,transactions: data});
    };

    const onEditSubmit = async (datar) => {
        if (datar.amount == 0 || datar.amount == '' || datar.transactionType == null) {
            setError('amount', { type: 'manual', message: 'Incorrect or Incomplete details' });
            return;
        }
        await delay(3000);
        console.log(datar);
        const res = await editTransaction({...datar, timestamp: selectedItem.timestamp});
        if (res.status == 400) {
            setError('transaction_failed', { type: 'manual', message: res.error });
        }
        else if (res.status == 200){
            console.log('Transaction edited successfully');
            handleSnackbar();
        }
        reset();
        handleEditClose();
        for (let i = 0; i < data.length; i++) {
            if (data[i].timestamp === res.time) {
                data[i] = {amount: datar.amount, timestamp: res.time, message: datar.description, type: datar.transactionType};
                break;
            }
        }
        proping.setData({...proping.data,transactions: data});
        // console.log(proping);
    };

    const onDeleteHandler = async () => {
        await delay(3000);
        console.log(selectedItem);
        const res = await deleteTransaction(selectedItem);
        if (res.status == 400) {
            setError('transaction_failed', { type: 'manual', message: res.error });
        }
        else if (res.status == 200){
            console.log('Transaction deleted successfully');
            handleSnackbar();
        }
        handleClose();  
        for (let i = 0; i < data.length; i++) {
            if (Number(data[i].timestamp) === Number(res.time)) {
                data.splice(i, 1);
                break;
            }
        }
        proping.setData({...proping.data,transactions: data});
    };

    useEffect(() => {
        setData(proping.data.transactions || []);
    }, [proping.data.transactions]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className=' h-full overflow-auto'>
      {data.map((item, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar className={item.type == "Credit" || item.type == "credit" ? "bg-green-500" : "bg-red-500"}>
              { item.type == "Credit" || item.type == "credit" ? <AddIcon /> : <RemoveIcon/>}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={(item.type == "Credit" || item.type == "credit" ? "+ " : "- ")+"₹"+item.amount}
            secondary={ item.message != '' ? item.message : null}
          />
          <IconButton edge="end" aria-label="menu" onClick={(event) => handleClick(event, item)}>
            <MenuIcon />
          </IconButton>
        </ListItem>
      ))}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditOpen} >
          <Avatar className=' mx-1'>
            <EditIcon fontSize="small" />
          </Avatar>
          Edit
        </MenuItem>
        <MenuItem onClick={onDeleteHandler}>
          <Avatar className=' mx-1'>
            <DeleteIcon fontSize="small" />
          </Avatar>
          Delete 
        </MenuItem>
      </Popover>
        <Tooltip title="New-Transaction" aria-label="add" placement='bottom'>
        <Fab color="secondary" aria-label="add" className=' fixed bottom-10 right-10' size='small' onClick={handledialogOpen} >
            <AddIcon />
        </Fab>
        </Tooltip>
        <Dialog open={openDialog} onClose={handledialogClose} fullWidth maxWidth={"sm"}>
            <DialogTitle>
                Add a new transaction
            </DialogTitle>
            <Divider variant='middle' />
            <form onSubmit={handleSubmit(onDialogSubmit)}>
                <DialogContent>
                    <Typography variant="body1" >Enter the details of the transaction :</Typography>
                    <br/>
                    <TextField
                        id="amount"
                        label="Amount"
                        type="number"
                        variant="outlined"
                        fullWidth
                        {...register("amount", { required: true })}
                    />
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedValue}
                        onChange={(event) => setSelectedValue(event.target.value)}
                    >
                        <FormControlLabel value="Debit" control={<Radio {...register("transactionType")} />} label="Debit" />
                        <FormControlLabel value="Credit" control={<Radio {...register("transactionType")} />} label="Credit" />
                    </RadioGroup>
                    <TextField
                        id="description"
                        label="Message (optional)"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...register("description", { required: false })}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handledialogClose}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} >
                            Add
                        </Button>
                    </DialogActions>
            </form>
        </Dialog>
        <Snackbar
            open={opensnackbar}
            onClose={handlecloseSnackbar}
            message="Transaction added successfully!"
            key={"Snackbar"}
            anchorOrigin={{"vertical": "bottom" , "horizontal" : "center" }}
            autoHideDuration={2000}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
        {openEdit && 
            <Dialog  open={openEdit} onClose={handleEditClose} fullWidth maxWidth={"sm"}>
                <DialogTitle>
                    Edit previous transaction {selectedItem ? selectedItem.amount : 0}
                </DialogTitle>
                <Divider variant='middle' />
                <form onSubmit={handleSubmit(onEditSubmit)}>
                    <DialogContent>
                        <Typography variant="body1" >Enter the details of the transaction :</Typography>
                        <br/>
                        <Controller
                        name="amount"
                        control={control}
                        defaultValue={selectedItem ? selectedItem.amount : 0}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            id="amount"
                            label="Amount"
                            type="number"
                            variant="outlined"
                            fullWidth
                            />
                        )}
                        />
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group"
                            name="row-radio-buttons-group"
                            value={selectededitValue}
                            onChange={(event) => setSelectededitValue(event.target.value)}
                        >
                            <FormControlLabel value="Debit" control={<Radio {...register("transactionType")} />} label="Debit" />
                            <FormControlLabel value="Credit" control={<Radio {...register("transactionType")} />} label="Credit" />
                        </RadioGroup>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={selectedItem ? selectedItem.message : 0}
                            render={({ field }) => (
                                <TextField
                                {...field}
                                id="description"
                                label="Message (optional)"
                                type="text"
                                variant="outlined"
                                fullWidth
                                />
                            )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditClose}>Cancel</Button>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} >
                                Change
                            </Button>
                        </DialogActions>
                </form>
            </Dialog>
        }
    </div>
  );
}

export default Listing;
