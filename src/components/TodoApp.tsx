import { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { config } from '../config'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'
import { wagmiConfig} from './../eth/abi' 
import TodoCard from './ui/TodoCard'

type Todos = {
  id: number,
  isDone: boolean,
  task: string
}

function TodoApp() {
  
  const {address, isConnected} =  useAccount()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [dilogOpen, setDilogOpen] = useState(false);
  const [todos, setTodos] = useState<Todos[]>([])
   const { writeContract } = useWriteContract()

  const disonnectWallet = async () =>{
    const result = await disconnect(config)
    console.log(result);
    navigate('/connect')
  }

async function poll(fn: () => boolean, interval = 2000, timeout = 30000) {
  const endTime = Date.now() + timeout;

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        if (fn()) {
          return resolve(true);
        }
        if (Date.now() < endTime) {
          setTimeout(check, interval); 
        } else {
          reject(new Error("Polling timed out"));
        }
      } catch (err) {
        reject(err); 
      }
    };

    check();
  });
}

  useEffect(() => {
    if(!isConnected){
       navigate('/connect')
    }
    fetchTodos();
  }, [])

  const {data} = useReadContract({
    address: "0x1EaE2f14c40753F89E2Cf8c8c13cBe0D20723D59",
    abi: wagmiConfig.abi,
    functionName: "getMyTodos",
    account: address
  });

  useEffect(() => {
    if (data) {
      setTodos(data as any[]);
      console.log("Fetched todos:", data);
    }
  }, [data]);

  const fetchTodos = () => {
    console.log("started calling data");
    poll(() => !!data)
      .then(() => {
        setTodos(data as any[]);
        console.log("Fetched todos:", data);
      })
      .catch(err => console.log(err));
    console.log("stopped calling data");
    }



const addTodos = () =>{
  if(!title){
    toast("the title must be more than 2 letters")
    return
  }
  
  writeContract({
      address: '0x1EaE2f14c40753F89E2Cf8c8c13cBe0D20723D59',
      abi: wagmiConfig.abi,
      functionName: "addTodo",
      args: [title]
    });
    console.log(title);
    setTitle("");
    setDilogOpen(false) 
  
    
  }

  const getTodo = () =>{
    console.log(todos);
    
  }


  return (
   <div className="min-h-screen w-full px-10 py-20">


    <div className="absolute right-5 top-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                  {
                    address?.slice(0, 10)
                  }
                  ...
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem
              
              >
                  <button
                  onClick={()=>{
                    disonnectWallet()
                  }}
                  className='cursor-pointer text-red-500 font-medium text-right max-w-sm'
                  >
                  Log out
                  </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

    </div>


    <div className="">
      <Dialog open={dilogOpen} onOpenChange={setDilogOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Add New task, By Default it will be marked as Not finished!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Task Title</Label>
              <Input name="title" value={title} onChange={(e)=>{
                setTitle(e.target.value)
              }} /> 
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={addTodos}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {
          todos.map((todo, idx)=>{
            return(
              <>
                <TodoCard key={idx} taskName={todo.task} isDone={todo.isDone}/>              
              </>
            )
          })
        }
      </div>

   </div>
  )
}

export default TodoApp