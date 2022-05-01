import {useEffect, useReducer} from 'react'

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

    let viewToShow = '';

    if(!state.deleted && !state.isPasswordCorrect){
        viewToShow = <div>
            <h2>Eliminar Repositorio</h2>
            <p>Por favor, escribe el codigo de seguridad</p>

            {state.error && !state.loading && (
                <p>Error: el código es incorrecto</p>
            )}
            {state.loading && (
                <p>Cargando...</p>
            )}

            <input placeholder="codigo de seguridad" value={state.confirmationCode} onChange={onWrite}/>
            <button type="button" onClick={onCheck}>Comprobar</button>
        </div>
    } else if(state.isPasswordCorrect && !state.deleted){
        viewToShow = <div>
            <h1>Vista Confirmacion</h1>
            <p>¿Deseas eliminar el estado?</p>
            <button onClick={onDeleted}>Si</button>
            <button onClick={onReset}>No</button>
        </div>
    } else {
        viewToShow = <div>
            <h1>Eliminado con exito</h1>
            <button onClick={onReset}>Volver al inicio</button>
        </div>
    }

    return viewToShow;
}