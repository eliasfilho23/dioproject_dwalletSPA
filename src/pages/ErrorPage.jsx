import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();

    return <div className="flex flex-col items-center justify-center m-80 bg-black text-white p-9 text-center">
        <h1 className="text-9xl">{error.status}</h1>
    </div>
}