import "./DeleteModal.css";
import {
    AlertTriangle,
    Trash2,
    X
} from "lucide-react";

function DeleteModal({

    open,

    title,

    message,

    loading,

    onCancel,

    onConfirm

}){

    if(!open){

        return null;

    }

    return(

        <div className="delete-overlay">

            <div className="delete-modal">

                <button

                    className="close-modal"

                    onClick={onCancel}

                >

                    <X size={22}/>

                </button>

                <div className="delete-icon">

                    <AlertTriangle size={60}/>

                </div>

                <h2>

                    {title}

                </h2>

                <p>

                    {message}

                </p>

                <div className="delete-buttons">

                    <button

                        className="cancel-delete"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                    <button

                        className="confirm-delete"

                        onClick={onConfirm}

                        disabled={loading}

                    >

                        <Trash2 size={18}/>

                        {

                            loading

                            ?

                            "Deleting..."

                            :

                            "Delete Product"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;