import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div
    className="h-screen w-full flex items-center justify-center flex-col gap-2"
    >
        <h1 className='font-medium text-3xl'>Todo Dapp</h1>
        <span>a on-chain todo app!</span>
        <Button
        onClick={()=>{
            navigate('/connect')
        }}
        >
            Get Started
        </Button>
    </div>
  )
}

export default Home