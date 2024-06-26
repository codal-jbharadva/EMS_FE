import "./index.scss"
import Select from "react-select";
type props={
    name: string
}



const FilterButton = ({name}:props)=>{
    return (
        <>
            <button className="btn"><p>{name}</p> <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#1D275F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>                
            </button>
            
        </>
    )
}

export default FilterButton;