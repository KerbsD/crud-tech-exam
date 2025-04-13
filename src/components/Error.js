const Error = ({ state, onClick, top }) => {


    return (
        <div className={state ? `bg-[#E5E5E5] duration-150 absolute scale-1 z-20 left-1/2 -translate-x-1/2 ${top} rounded-md flex items-center` : `scale-0 duration-150 z-20 absolute left-1/2 -translate-x-1/2 ${top}`}>
            <h1 className={state ? 'font-medium px-3 duration-150 w-100' : 'duration-150 w-0'}>
                {state}
            </h1>
            <div className={state ? 'p-3 bg-red-500 duration-150 rounded-r-md' : " duration-150"} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </div>
        </div>
    )
}

export default Error;