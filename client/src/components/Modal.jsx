const Modal = ({ Visible, Close, children }) => {
  if (!Visible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='wrapper'>
        <div className='w-[600px] flex flex-col overflow-y-aut'>
            <button className='text-white text-xl place-self-end' onClick={()=>Close(false)}>X</button>
            <div className='bg-white p-2 roundedo overflow-y-auto'>{children}</div>
        </div>
    </div>
  );
};

export default Modal;
