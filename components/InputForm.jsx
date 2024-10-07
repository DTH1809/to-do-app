"use client"
import React, { useTransition, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createTask } from '@/db/createTask'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const InputForm = () => {

    const [pending, startTransition] = useTransition()
    const [taskName, setTaskName] = useState('')
    const router = useRouter()

    const handleSubmit = (event) => {
        if(!taskName) return
        startTransition(async () => {
            await createTask(taskName)
                .then((data) => {
                    console.log("Success creating task")
                    toast.success("Success creating new task", { position: "top-center" })
                    setTaskName("")
                    router.refresh()
                })
                .catch((error) => {
                    console.log("Error creating task", error)
                    toast.error("Error creating task", { position: "top-center" })
                })
        });
    }

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <div className="bg-purple-600 lg:p-10 p-5 flex flex-col items-center justify-center rounded-xl">
            <header className="mb-10">
                <h1 className="text-white text-xl font-semibold uppercase text-center">
                    Add your task
                </h1>
            </header>
            <form className="flex flex-col gap-y-3">
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
                        Add Task
                    </p>
                </Button>
            </form>
        </div>
    </div>
  )
}

export default InputForm