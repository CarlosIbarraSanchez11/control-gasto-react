import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'
import { useState, useEffect } from 'react'

const Modal = ({setModal, 
                animarModal, 
                setAnimarModal, 
                guardarGasto, 
                gastoEditar,
                setGastoEditar
               }) => {

  const[mensaje, setMensaje]= useState('');

  const[nombre, setNombre] = useState('');
  const[cantidad, setCantidad] = useState('');
  const[categoria, setCategoria] = useState('');
  const[fecha, setFecha] = useState('');
  const[id, setId] = useState('');

  useEffect(()=> {
    if(Object.keys(gastoEditar).length >0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id);
        setFecha(gastoEditar.fecha);
    }
  },[]);
  const ocultarModal = ()=>{
    // setModal(false)
    setAnimarModal(false)
    setGastoEditar({})

    setTimeout(()=>{
        setModal(false)
    },500 )
  }

  const handleSubmit = e =>{
    e.preventDefault();

    // console.log('Enviando formulario')
    if( [nombre, cantidad, categoria].includes('')){ //Es lo mismo que (nombre === ('') || cantidad ===('') ,....)
        // console.log('Fallo la validacion')
        setMensaje('Todos los campos son obligatorios')

        setTimeout(()=>{
            setMensaje('');
        },3000)
        return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  return (
    <div className="modal">
        {/* <p>Desde Modal</p> */}
        <div className="cerrar-modal">
            <img
                src={cerrarBtn}
                alt='Cerrar modal'
                onClick={ocultarModal}
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            
        >
            <legend>{gastoEditar.nombre ? "Editar Gasto" : 'Nuevo gasto'}</legend>
            {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor='nombre'>
                    Nombre Gasto
                </label>

                <input 
                    id='=nombre'
                    type='text'
                    placeholder='Añade el nombre del gasto'
                    //Agrega al state del Modal, lee del campo Nombre
                    value={nombre}
                    onChange={e =>setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>
                    Cantidad
                </label>

                <input 
                    id='=cantidad'
                    type='number'
                    placeholder='Añade la cantidad del gasto:'
                    value={cantidad}
                    onChange={e =>setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>
                    Categoria
                </label>

                <select
                    id='categoria'
                    value={categoria}
                    onChange={e =>setCategoria(e.target.value)}
                >
                    <option value= ''>---Seleccione---</option>
                    <option value= 'ahorro'>Ahorro</option>
                    <option value= 'comida'>Comida</option>
                    <option value= 'casa'>Casa</option>
                    <option value= 'gastos'>Gastos varios</option>
                    <option value= 'ocio'>Ocio</option>
                    <option value= 'salud'>Salud</option>
                    <option value= 'suscripciones'>Suscripciones</option>

                </select>

            </div>

            <input
                type='submit'
                value={gastoEditar.nombre ? "Guardar cambios" : 'Añadir gasto'}
            />
        </form>
    </div>
  )
}

export default Modal