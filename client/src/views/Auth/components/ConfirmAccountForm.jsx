const ConfirmAccountForm = () => {
    return ( 

        <form action="" className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-x-4">
            <div className="text-center space-y-2 sm:text-left">

                <p className="text-lg text-black font-semibold">
                    Nueva contraseña
                </p>
                <input type="text" className="border border-r-indigo-500"  placeholder="Contraseña"/>
                <input type="text" className="focus:outline-none border-r-indigo-500" placeholder="Repite tu contraseña"/>

            </div>
                <button  className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Enviar</button>

        </form>
    );
}

export default ConfirmAccountForm;