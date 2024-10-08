"use client"

import React, { useTransition, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { updateTaskName } from '@/db/updateTask'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const UpdateForm = ({ taskData }) => {

    const [pending, startTransition] = useTransition()
    const [taskName, setTaskName] = useState(taskData.name)
    const router = useRouter()

    const handleSubmit = async (e) => {
        if(taskName === taskData.name) {
            e.preventDefault()
            toast("Task name not change", { position: "top-center" })
            return
        }
        if(taskName === "") {
            e.preventDefault()
            toast("Task name can not empty", { position: "top-center" })
            return
        }
        startTransition(async () => {
            await updateTaskName(taskData.id, taskName)
                .then((data) => {
                        console.log("Success updating task")
                        toast.success("Success updating task", { position: "top-center" })
                        router.push("/")
                })
        });
    } 

  return (
    <div className="w-full flex flex-col items-center justify-center">
        <div className="bg-purple-600 lg:p-10 p-5 flex flex-col items-center justify-center rounded-xl ">
            <header className="mb-10">
                <h1 className="text-white text-xl font-semibold uppercase text-center">
                    Update Task Content
                </h1>
            </header>
            <form className="flex flex-col gap-y-3 p-2 w-full">
                <Input 
                    type="text" 
                    placeholder="Enter name of the task" 
                    className="border-white border text-white focus:border-2 placeholder:text-neutral-300" 
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <Button size="lg" variant="secondary" className="w-full" type="submit" onClick={handleSubmit} disabled={pending}>
                    <p className="text-secondary-foreground">
                        Update
                    </p>
                </Button>
                <Link href="/">
                    <Button size="lg" variant="primary" className="w-full bg-sky-500 hover:bg-opacity-75">
                        <p className="text-destructive-foreground">
                            Go Home
                        </p>
                    </Button>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default UpdateForm