import { useState, useEffect} from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import {generarId} from './helpers'
import iconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState ([]);

  useEffect(()=>{
    // console.log('COmponente Listo')
    if(Object.keys(gastoEditar).length > 0){
      // console.log('gasto editar tiene algo') 
      setModal(true);

      setTimeout(()=>{
        // console.log('Animando modal...')
        setAnimarModal(true)
      }, 500 )
    }
  }, [gastoEditar])

  //Primer localStorage para cuando se carga presupuesto
  useEffect(()=>{
    // console.log(presupuesto)
    Number(localStorage.setItem('presupuesto', presupuesto)) ?? 0
  }, [presupuesto])

  //Local Stororage para cuando se argue gastos
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])

  //Segundo Effect que solo va a cargar una vez. Muestra si ya hay un presupuesto, solo muestra el planificador de gasto, mas no donde se coloca presupuesto ( pagina principal), pero si no hay presupuesto, si se muestra la pagina principal
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    // console.log(presupuestoLS)
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  }, [])

  useEffect(()=>{
    if(filtro){
      // console.log('filtrando' , filtro)
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      // console.log(gastosFiltrados)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () =>{
    // console.log('Diste clic para añadir un nuevo gasto')
    setModal(true);
    setGastoEditar({})

    setTimeout(()=>{
      // console.log('Animando modal...')
      setAnimarModal(true)
    }, 500 )
  }



  const guardarGasto = gasto =>{
    // console.log(gasto)
    // return
    if(gasto.id){
      //Actualizar
      const gastosActualizados =gastos.map(gastoState => gastoState.id ===gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{
      //Nuevo Gasto
      gasto.id  = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    } //No va a colocar retur porque necesita lo demas
    // console.log(gasto);
    setAnimarModal(false)

    setTimeout(()=>{
        setModal(false)
    },500 )
  }

  const eliminarGasto = id =>{
    //  console.log('elimnando', id)
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    // console.log(gastosActualizados)
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto ={isValidPresupuesto}
        setIsValidPresupuesto ={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto ={eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src = {iconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
                  setModal = {setModal}
                  animarModal={animarModal}
                  setAnimarModal = {setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar = {setGastoEditar}
                />}
      
    </div>
  )
}

export default App
