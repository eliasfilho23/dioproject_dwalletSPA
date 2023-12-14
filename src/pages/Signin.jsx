import logo from '../assets/logo.png'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import ErrorInput from '../components/ErrorInput.jsx'
import { signinSchema } from '../schemas/signinSchema.js'
import { signin } from '../services/user.js'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export default function Signin() {
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(signinSchema)});
    const navigate = useNavigate();

    async function handleSubmitForm(data){
        try{
            const token = await signin(data)
            Cookies.set('token', token.data, {expires: 1})
            navigate("/")
        }
        catch (error){
            console.log(error.message)}
    }

    useEffect(() => {
        Cookies.remove("token")
    }, [])


    return (
        <>
        <div className="flex flex-col mx-auto self-center items-center justify-around bg-zinc-900 rounded my-[11%]
        p-8 w-[35rem] h-[35rem]">
            <img src={logo} alt="Logo Oficial" className='w-44'/>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input type="email" placeholder="Email" register={register}
                name="email" />
                {errors.email && <ErrorInput text={errors.email.message}></ErrorInput>}
                <Input type="password" placeholder="Password" register={register}
                name="password" />
                {errors.password && <ErrorInput text={errors.password.message}></ErrorInput>}
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