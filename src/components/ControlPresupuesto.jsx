import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar' 
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
 
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(()=>{
    // console.log('componentes listos')
    const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);

    const totalDisponible = presupuesto -totalGastado;

    //Calcular el porcentaje gasto para colocar en el grafico
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

    // console.log(totalDisponible)
    setDisponible(totalDisponible)
    // console.log(totalGastado) 
    setGastado(totalGastado)

    setTimeout(()=>{
      // console.log(nuevoPorcentaje)
      setPorcentaje(nuevoPorcentaje);
    },1000)
  }, [gastos])

  const formatearCantidad = (cantidad) =>{
    return cantidad.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
  }

  const handleResetApp = () =>{
    // console.log('reseteando la app')
    const resultado = confirm('¿Deseas reiniciar presupuestos y gastos?')

    if(resultado){
      // console.log('SI')
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                trailColor: '#f5f5f5',
                textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',

              })}
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
            />
        </div>
            
        <div className='contenido-presupuesto'>
            <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
              Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>   

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>   

            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>   
        </div>
    </div>
  )
}

export default ControlPresupuesto
