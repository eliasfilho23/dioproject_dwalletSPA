import { Link, useNavigate } from "react-router-dom";
import { GoSignIn, GoSignOut } from "react-icons/go"
import logo from "../assets/logo.png"
import Button from "../components/Button";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import { findAllTransactions } from "../services/transactions";
import dayjs from "dayjs";
import ReactModal from "react-modal";
import { modalStyles } from "../components/modalStyle"


export default function Home(){
    const [user, setUser] = useState({})
    const [transactions, setTransactions] = useState([])        
    const [balance, setBalance] = useState(0)
    const [apiErrs, setApiErrs] = useState()
    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState("a")
    const navigate = useNavigate()

    function validateToken(){
        const token = Cookies.get("token")
        if (!token) {
            alert("Session expired! Please login.")
            navigate('/signup')}
    }
    async function getUserLogged(){
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data);
        } catch (err) {
            setApiErrs(err.message)
        }
    }
    async function getAllTransactions(){
        try {
            const response = await findAllTransactions()
            setTransactions(response.data)
        } catch (err){
            setApiErrs(err.message)
        }   
    }

    function showStats(value){
        transactions.map((item)=>{
            if(item.value === value){
                setModal(!modal)
                setModalContent({
                    description: item.description,
                    value: item.value
                })
            }
        })
    }

    useEffect(() =>{
        let currentBalance = 0
        transactions.forEach((obj)=>{
            obj.type === "input"? (currentBalance += obj.value): (currentBalance -= obj.value)})
        setBalance(currentBalance)
    }, [getAllTransactions])

    useEffect(() =>{
        validateToken();
        getUserLogged();
        getAllTransactions();
    }, [])

    return <>
        <main className="flex flex-col items-center justify-center bg-zinc-900
        rounded p-8 w-[60rem] h-[35rem] text-2xl my-[11%] ">

        <ReactModal
        ariaHideApp={false}
        isOpen={modal}
        style={modalStyles}>
            <button onClick={()=> setModal(!modal)}><GoSignOut className="text-white text-4xl"/></button>
            <div className=" bg-black text-gray-400 p-4 m-3 flex flex-col gap-12 content-center">
                <div className="text-white text-2xl flex justify-between">
                    <span className="text-2xl font-bold">Descrição:</span>
                    <span className="text-2xl">{modalContent.description}</span>
                </div>
                <div className="text-white flex justify-between">
                    <span className="text-2xl font-bold">Valor:</span>
                    <span className="text-2xl">{modalContent.value},00 R$</span>
                </div>
            </div>
        </ReactModal>

            {apiErrs && <ErrorInput text={apiErrs}/>}   
            <header className="flex items-center justify-between w-full pb-4">
                <img src={logo} alt="" className="w-32"/>
                <div className="bg-zinc-900 text-zinc-500 font-semibold italic text-sm">Passe o mouse pela compra para visualizar detalhes</div>
                <div className="flex items-center gap-4 text-white text-2xl">
                    <h1>Olá,
                    <Link to="/profile" className="hover:text-pink-500 text-pink-400"
                    state={user}>
                    <span> {user.name}</span>
                    </Link>
                    </h1>
                    <Link to="/signin">
                        <GoSignOut />
                    </Link>
                </div>
            </header>
            <section className="bg-zinc-800 p-4 w-full h-full rounded flex items-center
            justify-center">
            <ul className="w-full h-full flex flex-col justify-between">
                <div className="h-[17rem] overflow-auto p-3">
                {transactions.length? transactions.map((obj, index) =>
                <li key={index} className="flex justify-between items-start w-full">
                    <span className="flex gap-2 items-center">
                        <span className="text-base text-zinc-200">
                        {dayjs((obj.created_at)).format("DD/MM")}
                        </span>
                        <button className="hover:font-bold text-white" onClick={()=> showStats(obj.value)}>
                        {obj.description}</button>
                    </span>
                    <button onClick={()=> showStats(obj.value)} className={`${obj.type}` === "input"? "text-green-600 font-bold before:content-['+']" : "text-red-600 font-bold before:content-['-'] "}>
                    {obj.value}</button> 
                </li> )
                : <p className=" text-gray-500">Não há entradas nem saídas.</p>}
                </div>
                <div className="flex justify-between p-3">
                    <span className="text-zinc-200">Saldo:</span>
                    <span className={balance > 0? "text-green-600 font-bold"
                    : "text-red-600 font-bold"}>
                    {balance}
                    </span>
                </div>
            </ul>
            </section>
            <footer className="w-full pt-2 flex gap-2 text-white text-lg">
                <Button type="button" icon="plus" text="Adicionar entrada" transaction="input"/>
                <Button type="button" icon="minus" text="Adicionar saída" transaction="output"/>
            </footer>
        </main>
    </>
}