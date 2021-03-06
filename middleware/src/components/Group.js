import React,{useState,useEffect} from 'react'
import Note from './Note'

function Group() {
    const [data, setData]=useState([])
    const [loaded, setLoaded]=useState(false)
    
    useEffect(()=>{
        fetch(`${window.location}notes`)
        .then((response)=>{
            console.log(response)
            return response.json()
        })
        .then((data)=>{
            setData(data)
            setLoaded(true)
        })
    })

    return (
        <div className="col"> 
            <div class="card-header text-center mt-5 mb-2">
                <h1>
                    NOTAS
                </h1>
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