import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import Button from '../components/Button'
import Input from '../components/Input'
import { IoArrowBack } from "react-icons/io5";
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import ErrorInput from '../components/ErrorInput.jsx'
import { signupSchema } from '../schemas/signupSchema.js';
import { signup } from '../services/user.js';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Signup(){

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(signupSchema)});
    const [apiErrs, setApiErrs] = useState("")
    const navigate = useNavigate();
    
    async function handleSubmitForm(data){
        try{
            const response = await signup(data)
            console.log(response)
            navigate('/signin')
        }
        catch (error){
            setApiErrs(err.message)
        }
    }
    return (
        <div className="flex flex-col mx-auto items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-fitm relative my-[11%]">
            <img src={logo} alt="Logo Oficial" className='w-44'/>
            <Link to="/signin">
            <IoArrowBack className="text-white text-2xl absolute top-10 left-7 hover:text-pink-400" />
            </Link>
            <h1 className='text-white font-bold text-5xl py-5'>Registre-se</h1>
            {apiErrs && <ErrorInput text={apiErrs}/>}
            <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col items-center justify-center gap-4 w-full text-2xl'>
                <Input type="text" placeholder="Nome completo" register={register} name="name"/>
                {errors.name && <ErrorInput text={errors.name.message}></ErrorInput>}
                <Input type="email" placeholder="Email" register={register} name="email"/>
                {errors.email && <ErrorInput text={errors.email.message}></ErrorInput>}
                <Input type="password" placeholder="Password" register={register}
                name="password" />
                {errors.password && <ErrorInput text={errors.password.message}></ErrorInput>}
                <Input type="password" placeholder="Confirm Password"register={register} name="confirmPassword"/>
                {errors.confirmPassword && <ErrorInput text={errors.confirmPassword.message}></ErrorInput>}
                <Button type="submit" text="SIGNUP"/>
            </form>
        </div>
    )
}