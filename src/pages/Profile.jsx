import dayjs from "dayjs";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Profile(){
    let {state} = useLocation();

    return(
        <>        
        <div className="grid bg-zinc-900 items-center justify-left gap-0 text-white text-2xl p-12 m-28 h-[500px] w-[800px] relative">
            <img src={logo} alt="" className="w-32 absolute top-10 block mx-[41%]"/>
            <div className="top-[6.5rem] mx-[46%] absolute text-base text-rose-300">Perfil</div>
            <Link to="/">
                <GoSignOut className="absolute top-8 left-8 text-2xl"/>
            </Link>
            <div className="flex justify-between"><span className="font-bold">Nome:</span> <span>{state.name}</span></div>
            <div className="flex justify-between"><span className="font-bold">E-mail:</span> <span>{state.email}</span></div>
            <div className="flex justify-between"><span className="font-bold">Criado em:</span> <span>{dayjs((state.created_at)).format("DD/MM")}</span></div>
        </div>
        </>
    )
}