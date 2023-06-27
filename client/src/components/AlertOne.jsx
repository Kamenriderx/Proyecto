import 'animate.css'

const AlertOne = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600 animate__animated animate__backInUp ' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 animate__animated animate__backInUp`}>
    {alerta.message}
</div>
  )
}

export default AlertOne