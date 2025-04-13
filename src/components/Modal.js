import React from 'react';

const Modal = ({ show, children, title }) => {
    if (!show) {
        return null;
    }

    return (
        <div className='bg-stone-900/75 w-[100vw] h-[100vh] z-10'>
            <div className="w-[560px] h-[400px] bg-[#D9D9D9] flex items-center justify-center absolute left-[35%] top-[25%] rounded-xl">
                <div className={title ? 'h-[56px] bg-[#FCA311] w-full absolute top-0 rounded-t-xl grid place-content-center border-b-4 border-[#14213D]' : "hidden"}>
                    <h1 className='font-bold text-2xl'>
                        {title}
                    </h1>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal; 