import logo from '../assets/logo.png'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { Link } from 'react-router-dom'

export default function Signin() {
    // const name = "Elias"
    return (
        <>
        <div className="flex flex-col mx-auto self-center items-center justify-around bg-zinc-900 rounded my-[11%]
        p-8 w-[35rem] h-[35rem]">
            <img src={logo} alt="Logo Oficial" className='w-44'/>
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button type="submit"text="Entrar"/>
            </form>
            <div className='block bg-pink-500 w-1/3 h-0.5'></div>
            <p className='text-white'>Não tem uma conta?
            <Link to="/signup">
                <span className='text-pink-400 hover:text-pink-300'> Registre-se aqui.</span>
            </Link>
            </p>
        </div>
        </>
    )
}