import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState('')

    //Cuando presione el boton del submit se va a aplicar la funcion handlePresupuesto
    const handlePresupuesto= (e)=>{
        e.preventDefault();

        // console.log('enviando formualario')
        if(!presupuesto || presupuesto <0 ){
            setMensaje('No es un presupuesto valido')

            //Con el return rompemos el ciclo del if
            return;
        }

        // console.log('presupuesto valido')
        // ('') ->string vacio
        setMensaje('')
       
        setIsValidPresupuesto(true)
        // console.log(Number(presupuesto))
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
            <label>Definir Presupuesto</label>

            <input
                className='nuevo-presupuesto'
                type='number'
                placeholder='Añade tu presupuesto'
                value={presupuesto}
                onChange={(e)=> setPresupuesto(Number(e.target.value ))}

            />
        </div>
        <input
            type='submit'
            value={'Añadir'}
        />

        {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
