import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function ConnectWallet(){
    const {address} = useAccount()
    const { connectors } = useConnect()
    const navi = useNavigate()
    useEffect(() => {
       if(address){
        navi('/app')
       }      
    }, [])
    

    return(
        <>
            <div className="h-screen w-full flex flex-col gap-5 items-center justify-center">
                <h1 className="text-xl font-medium">Please Connect Wallet to Continue.</h1>
                <div className="flex flex-wrap gap-4">
                    {   
                    connectors.map((connector, idx)=>{
                        return <Button 
                        onClick={()=>{
                            try{
                               connector.connect().then(()=>{
                                   window.location.href = '/app'
                                })
                            } catch(err){
                                console.log(err);
                            }
                        }}
                        className="cursor-pointer"
                        key={idx}>
                            {connector.name}
                        </Button>
                    })


                    }
                </div>
            </div>
        </>
    )


}
