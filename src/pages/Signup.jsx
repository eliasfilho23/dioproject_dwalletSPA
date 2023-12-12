import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import Button from '../components/Button'
import Input from '../components/Input'
import { IoArrowBack } from "react-icons/io5";

export default function Signup(){
    return (
        <div className="flex flex-col mx-auto items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[40rem] my-[8%] relative">
            <img src={logo} alt="Logo Oficial" className='w-44'/>
            <Link to="/signin">
            <IoArrowBack className="text-white text-2xl absolute top-10 left-7 hover:text-pink-400" />
            </Link>
            <h1 className='text-white font-bold text-5xl py-5'>Registre-se</h1>
            <form className='flex flex-col items-center justify-center gap-4 w-full text-2xl'>
                <Input type="text" placeholder="Nome completo"/>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Input type="password" placeholder="Password"/>
                <Button type="submit" text="SIGNUP"/>
            </form>
        </div>
    )
}