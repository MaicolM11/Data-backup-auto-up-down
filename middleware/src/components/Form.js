import React,{useState} from 'react'

function Form() {

    const [text,setText]=useState("")
    const [date,setDate]=useState("")

    function sendData(){
        if (text && date) {
            let d=new Date(date)
            fetch(`${window.location}notes`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({text: text, date: d})
            })
            .then(()=>{
                alert('La nota se guardado perfectamente')
            })
            .catch(()=>{
                alert('Ha ocurrido un error ')
            })
        }else{
            alert("Por favor rellene todos los campos")
        }
    }

    return (
        <div class="mb-3 ">
            <div class="card-header text-center">
                <h1>
                    CREA UNA NOTA
                </h1>
            </div>
            <label className="form-label" >NOTA:</label>
            <textarea className="form-control" placeholder="Agrega una descripción a la nota" onChange={e=>{setText(e.target.value)}}/>
            <label className="form-label" >Fecha:</label>
            <input className="form-control" type="date" onChange={e=>{setDate(e.target.value)}} ></input>
            <div className="text-center">
                <button  className="btn btn-primary mt-2" onClick={sendData}>ENVIAR</button>
            </div>
        </div>
    )
}

export default Form;