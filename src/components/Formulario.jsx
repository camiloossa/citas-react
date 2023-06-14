import React, { useState, useEffect } from 'react'
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Validamos que el objeto paciente tenga información
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setCorreo(paciente.correo);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  // Metodo para generar ID aleatorio, no se usa cuando manejamos bases de datos, esto una improvisación ya que usaremos LocalStorage
  const generarId = () => {
    const random = Math.random().toString(36).slice(3);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del Formulario
    if([nombre, propietario, correo, fecha, sintomas].includes('') ) {
      console.log('Existe al menos un campo vacio');
      setError(true);
      return;
    }

    setError(false);

    // Construir un Objeto para enviarlo en la función hacia al padre que envio el Prots

    const objetoPaciente = {
      nombre, 
      propietario, 
      correo,
      fecha, 
      sintomas
    }

    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );
      setPacientes(pacientesActualizados);
      setPaciente({})
    }else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes(pacientes => [...pacientes, objetoPaciente]);
    }


    // Limpiando campos de texto una vez se envie información
    setNombre('');
    setPropietario('');
    setCorreo('');
    setFecha('');
    setSintomas('');



  }
  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
          Añade Pacientes y <span className='text-indigo-600 font-bold '>Administralos</span>
        </p>

        <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-5' onSubmit={handleSubmit}>

          { error && <Error><p>Todos los campos son obligatorios</p></Error> }

          <div className='mb-5'>
            <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre de la mascota</label>
            <input type="text" id="mascota" placeholder='Nombre de la mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value = { nombre } onChange= { (e) => setNombre(e.target.value) }/>
          </div>
          
          <div className='mb-5'>
            <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>Nombre del Propietario</label>
            <input type="text" id="propietario" placeholder='Nombre del propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value = { propietario } onChange= { (e) => setPropietario(e.target.value) }/>
          </div>

          <div className='mb-5'>
            <label htmlFor="correo" className='block text-gray-700 uppercase font-bold'>Correo Electronico</label>
            <input type="email" id="correo" placeholder='Ingrese el correo' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value = { correo } onChange= { (e) => setCorreo(e.target.value) }/>
          </div>

          <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
            <input type="date" id="alta" className='border-2 w-full p-2 mt-2  rounded-md'
            value = { fecha } onChange= { (e) => setFecha(e.target.value) }/>
          </div>

          <div className='mb-5'>
            <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>sintomas</label>
            <textarea className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' name="sintomas" id="sintomas" cols="10" rows="5" 
            value = { sintomas } onChange= { (e) => setSintomas(e.target.value) }/>
            
          </div>

          <input type="submit" 
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all cursor-pointer rounded-md' 
            value= { paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } 
          />

        </form>
    </div>
  )
}

export default Formulario
