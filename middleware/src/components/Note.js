import React from 'react'

function Note(props) {
    
    return (
        <div className="col">
            <div className ="card">
                <div className="card-body">
                    {props.text}
                </div>
                <div class="card-footer text-muted">
                    {props.date}
                </div>
            </div>
        </div>
        
    )
}

export default Note