import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorInput from "../components/ErrorInput";
import { transactionSchema } from "../schemas/transactionSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { createNewTransaction } from "../services/transactions";
import { useState } from "react";

export default function NewTransaction(){
    const navigate = useNavigate();
    const {type} = useParams();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: zodResolver(transactionSchema)})

    const [apiErrs, setApiErrs] = useState()

    async function onSubmitForm(data){
        try{
            const body = {...data, type}
            await createNewTransaction(body);
            navigate('/')
        } catch(err){
            setApiErrs(err.message)
        }
    }
    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded
        p-12 gap-7 relative my-[35%]"> 
            <header>
                <Link to="/">
                    <BiArrowBack className="text-white absolute top-3 left-3 text-2xl"/>
                </Link>
                <h1 className="text-white font-bold text-5xl">
                {type.toString() === "input"? "Registrar entrada" : "Registrar saída"}</h1>
            </header>

            {apiErrs && <ErrorInput text={apiErrs}/>}

            <form onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col justify-center gap-4 w-full p-4 text-2xl">
                <Input type="number"
                placeholder="Valor"
                register={register}
                name="value"/>
                {errors.value && <ErrorInput text={errors.value.message}></ErrorInput>}
                <Input type="text"
                placeholder="Descrição"
                register={register}
                name="description"/>
                {errors.description && <ErrorInput text={errors.description.message}></ErrorInput>}
                <Button type="submit" text="SALVAR"/>
            </form>
        </div>
    )
}