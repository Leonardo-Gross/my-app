import React from 'react';

export function User(props) {
    return (
        <div className='container-user-list'>
            <div className='user-list'>
                <img className='user-list-img' src={props.userImage} alt={props.name} />
                <div className='user-profile'>
                    <h4>{props.name}</h4>

                    <h4>ID: {props.id} - Username: {props.username}</h4>
                </div>
            </div>

            <div className='button'>
                <button onClick={props.onClick}>Pagar</button>
            </div>
        </div>
    );
}