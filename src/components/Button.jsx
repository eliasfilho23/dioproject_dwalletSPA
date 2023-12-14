import { BiPlusCircle, BiMinusCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function Button({ text, type, icon,  transaction }){
    const navigate = useNavigate();
    let IconComponent
    if (icon === "plus") IconComponent = BiPlusCircle;
    if (icon === "minus") IconComponent = BiMinusCircle;

    return(
        <button 
        type={type}
        className="px-4 py-2 rounded w-full font-bold text-white text-2xl flex items-center justify-center gap-3 bg-gradient-to-r from-defaultPurple to-defaultPink"
        onClick={() => transaction && navigate(`/transaction/${transaction}`)}>
        {IconComponent && <IconComponent />} {text}
        </button>
    )
}