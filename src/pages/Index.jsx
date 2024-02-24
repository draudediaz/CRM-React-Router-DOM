import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../data/clientes';

export function loader(){
    const clientes = obtenerClientes()

    return clientes
}

const Index = () => {

    const clientes = useLoaderData();
    console.log(clientes)

  return (
    <>
    <h1 className='font-black text-4xl text-blue-900'>Clients</h1>
    <p className='mt-3'>Administra els teus clients</p>

    {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-blue-800 text-white'>
                <tr>
                    <th className='p-2'>Client</th>
                    <th className='p-2'>Contacte</th>
                    <th className='p-2'>Accions</th>
                </tr>
            </thead>
                <tbody>
                    {clientes.map ( cliente => (
                      <Cliente 
                        cliente={cliente}
                        key={cliente.id}
                      />
                    ))}
                </tbody>
            
        </table>
    ) : (
        <p className='text-center mt-10'>Encara no hi ha clients</p> 
    )}

    </>
  )
}

export default Index