import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { config } from '../config'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
function TodoApp() {
  const {address, isConnected} =  useAccount()
  const navigate = useNavigate()

const disonnectWallet = async () =>{
    
    const result = await disconnect(config)
    console.log(result);
    navigate('/connect')
}
  useEffect(() => {
    if(!isConnected){
       navigate('/connect')
    }

  }, [])
  
  return (
   <div className="min-h-screen w-full">
    <div className="absolute right-5 top-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                  {
                    address?.slice(0, 10)
                  }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem
              
              >
                  <button
                  className='cursor-pointer text-red-500 font-medium text-right max-w-sm'
                  >
                  Log out
                  </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

    </div>

   </div>
  )
}

export default TodoApp