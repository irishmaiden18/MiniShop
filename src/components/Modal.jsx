
const Modal = ({isOpen, onClose, children}) => {

    if (!isOpen) return null

  return (
    <>
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="p-0 relative rounded-xl w-full max-w-lg overflow-y-auto shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <button className="absolute top-4 right-4 z-50 text-2xl font-bold w-8 h-8" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    </>
  )
}

export default Modal