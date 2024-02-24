import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError()
    
    return (
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold text-blue-900 mt-20">CRM - Clientes</h1>
            <p className="text-center">Hi ha hagut un error:</p>
            <p className="text-center">{error.statusText || error.message}</p>
        </div>
    )
}