import { Button, TextField, Typography, Grid, Box } from '@mui/material';
import {useEffect, useReducer} from 'react'
import ConfirmationDialog from './ConfirmationDialog';

const SECURITY_CODE = 'test';

const initialState = {
    confirmationCode: '',
    error: false,
    loading: false,
    deleted: false,
    isPasswordCorrect: false
}

const actionTypes = {
    confirmationCode: 'CONFIRMATION_CODE',
    startConfirmation: 'START_CONFIRMATION',
    confirmationFailed: 'CONFIRMATION_FAILED',
    confirmationSuccess: 'CONFIRMATION_SUCCESS',
    deleted: 'DELETED',
    reset: 'RESET'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.confirmationCode: {
            return {
                ...state,
                confirmationCode: action.payload,
            };
        }
        case actionTypes.startConfirmation : {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case actionTypes.confirmationFailed: {
            return {
                ...state,
                isPasswordCorrect: false,
                confirmationCode: '',
                loading: false,
                error: true,
            };
        }
        case actionTypes.confirmationSuccess: {
            return {
                ...state,
                isPasswordCorrect: true,
                loading: false,
                error: false,
            };
        }
        case actionTypes.deleted: {
            return {
                ...state,
                deleted: true,
            };
        }
        case actionTypes.reset: {
            return { ...initialState };
        }
        default: return state;
    }
}

export default function Main() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const onWrite = (event) => dispatch({type:  actionTypes.confirmationCode, payload: event.target.value})
    const onCheck = () => dispatch({type: actionTypes.startConfirmation })
    const onError = () => dispatch({type: actionTypes.confirmationFailed})
    const onConfirm = () => dispatch({type: actionTypes.confirmationSuccess})
    const onReset = () => dispatch({type: actionTypes.reset})
    const onDeleted = () => dispatch({type: actionTypes.deleted})

    useEffect(() => {
        if(state.loading){
            // Uso setTimeout para simular el llamado a una api
            setTimeout(() => {
                if(state.confirmationCode !== SECURITY_CODE){
                    onError()
                } else {
                    onConfirm()
                }
            }, 3000)
        }
    }, [state.loading])


    if(state.deleted) {
        return <Box mt={2}>
            <Typography variant="h3">Repositorio eliminado con exito</Typography>
            <Box mt={4}>
                <Button variant="contained" onClick={onReset}>Volver al inicio</Button>
            </Box>
        </Box>
    }

    return <Box m={2}>
        <Typography variant="h3">Eliminar Repositorio</Typography>
        <Box mt={4} mb={4}>
            <Typography>Por favor, escribe el codigo de seguridad</Typography>
        </Box>

        {state.error && !state.loading && (
            <Box mt={2} mb={2}>
                <Typography>Error: el código es incorrecto</Typography>
            </Box>
        )}
        {state.loading && (
            <Box mt={2} mb={2}>
                <Typography>Cargando...</Typography>
            </Box>
        )}

        <Grid container justifyContent="center" >
            <TextField label="Codigo de seguridad" value={state.confirmationCode} onChange={onWrite}/>
            <Button variant="contained" color="error" onClick={onCheck}>Eliminar</Button>
        </Grid>
        {
            state.isPasswordCorrect && !state.deleted && (
                <ConfirmationDialog onDeleted={onDeleted} onReset={onReset} />
            )
        }
    </Box>
}