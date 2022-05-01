import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ConfirmationDialog({onDeleted, onReset}){
    return(
        <div>
            <Dialog
                open={true}
                onClose={onReset}
            >
                <DialogTitle>¿Deseas eliminar el repositorio?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Si eliminas el repositorio no podras volver a recuperarlo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onReset}>Cancelar</Button>
                    <Button onClick={onDeleted}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}