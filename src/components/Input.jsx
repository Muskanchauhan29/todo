import { useState } from "react"

const Input = () =>{
    const [input, setInput] = useState("")
    return (
        <>
        <form action="">
            <input className="border rounded px-2" type="text" placeholder="Add a task" value={input}
            onChange={(e)=> setInput(e.target.value)} />
            <button>Add</button>
        </form>
        </>
    )
}

export default Input