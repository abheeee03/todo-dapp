import { useState } from "react";
import { Card, CardTitle } from "./card";

export default function TodoCard({taskName, isDone}: {taskName: string, isDone: boolean}){

    const [checked, setchecked] = useState(isDone)

    const onCheckChange = () =>{
        setchecked(!checked)
    }

    return(
        <>
            <Card className="max-w-sm px-5">
                <CardTitle>
                    <div className="flex gap-2">
                    <input onChange={onCheckChange} checked={checked} type="checkbox" className="cursor-pointer"/>
                    <h1
                    className={`${checked && "line-through"}`}
                    >{taskName}</h1>
                    </div>
                </CardTitle>

            </Card>
        </>
    )
}