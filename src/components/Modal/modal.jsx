import React from "react";
import "./modal.css";
import Close from "../../Images/close-window.png"

export function Modal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="header-button">
                        <img className="button-png" src={Close} alt="Fechar" onClick={props.closeModal}/>
                    </button>
                </div>

                <div className="modal-body">
                    <span className="title">
                        {props.title}
                    </span>
                    <span className="subtitle">
                        {props.subtitle}
                    </span>
                </div>

                <div className="modal-footer">
                    {props.children}
                </div>
            </div>
        </div>
    );
}