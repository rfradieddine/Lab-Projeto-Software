// CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#6200ea',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#3700b3',
    },
    padding: theme.spacing(1, 4),
    borderRadius: '8px',
    textTransform: 'none',
}));

const CustomButton = ({ children, ...props }) => {
    return <MyButton {...props}>{children}</MyButton>;
};

export default CustomButton;
