import React,{useState} from 'react'
import Note from './Note'

function Group() {
    const [data, setData]=useState([])
    
    const getNotes=()=>{
        fetch(`${window.location}notes`)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setData(data)
        })
    }

    return (
        <div className="col"> 
            <div class="card-header text-center mt-5 mb-2">
                <h1>
                    NOTAS
                </h1>
                <button onClick={getNotes} className="btn btn-primary mt-2">REFRESH</button>
            </div>
            <div className="row row-cols-5">
            
            {data.map((element)=>{
                return(<Note text={element.text} date={element.date}/>)
            })}
        </div>
        </div>
        
    )

}

export default Group