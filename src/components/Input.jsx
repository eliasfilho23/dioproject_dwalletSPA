export default function Input({type, placeholder}){
    return(
        <input
        type={type}
        placeholder={placeholder}
        className="rounded m-1.5 p-2 w-full"
        />
    )
}