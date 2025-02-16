import React from 'react';
import { CardContent, IconButton, Typography, Card, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';

export default function CustomCard(props) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        if (!props?.showActions) navigate(`/product-preview/${props?.index}`)
    }

    return (
        <Card onClick={handleCardClick} variant="outlined" sx={{ minWidth: '300px', maxWidth: '300px', margin: '4px', cursor: !props?.showActions ? 'pointer' : '' }}>
            <CardContent>
                <Typography variant="h5" component="div">{props?.product?.name}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{props?.product?.price}rs</Typography>
                <Typography variant="body2">Availability - {props?.product?.availability}</Typography>
                <Typography variant="body2">Category - {props?.product?.category}</Typography>
            </CardContent>
            {props?.showActions && <CardActions>
                <IconButton onClick={() => props?.handleEditProduct(props?.index, props?.product)}>
                    <ModeEditIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton onClick={() => props?.handleDelete(props?.index)}>
                    <DeleteIcon sx={{ color: 'black' }} />
                </IconButton>
            </CardActions>}
        </Card>
    )
}