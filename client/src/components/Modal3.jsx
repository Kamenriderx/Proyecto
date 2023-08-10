const Modal3 = ({ Visible, Close, children }) => {
  if (!Visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[1200px] flex flex-col overflow-y-aut">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => Close(false)}
        >
          X
        </button>
        <div className="bg-white p-2 roundedo overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal3;
