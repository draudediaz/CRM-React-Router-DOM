import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import { Form, useNavigate, useLoaderData, useActionData, redirect} from "react-router-dom"
import Error from "../components/Error"

export async function loader({params}){
    const cliente = await obtenerCliente(params.clientId)
    if(Object.values(cliente) === 0){
        throw new Response ('',{
            status: 404,
            statusText: "No hi ha resultats"
        })
    }
    console.log(cliente)
    return cliente
}

export async function action({request, params}){
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)
    console.log(datos)

    const email = formData.get("email")

    //Validación
    const errores = []
    if(Object.values(datos).includes ("")){
        errores.push("Tots els camps son obligatoris")
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push("El Email no és vàlid")
    }


    //Retornar dades dels errors
    if(Object.keys(errores).length){
        return errores
    }
     //ACTUALIZAR CLIENTE
    await actualizarCliente(params.clientId, datos)

    
    return redirect("/")
}


function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Client</h1>
        <p className='mt-3'>A continuació pots modificar les dades del client</p>

        <div className='flex justify-end'>
            <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
            onClick={()=> navigate(-1)}>
                Volver
            </button>
        </div>
        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
            
           {errores?.length && errores.map((error, i)=><Error key={i}>{error}</Error>)} 
            <Form
                method='post'
                noValidate
                
            >
                <Formulario 
                    cliente={cliente}
                />
                <input 
                type='submit'
                className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                value="Actualitzar client"
                />
            </Form>
        </div>
    </>
  )
}

export default EditarCliente