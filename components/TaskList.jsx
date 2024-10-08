"use client"
import React, { useState, useEffect } from 'react'
import { Checkbox } from './ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from 'next/link'
import { toast } from 'sonner'
import { updateTaskStatus } from '@/db/updateTask'


const TaskList = ({ tasksArray }) => {

    const [filter, setFilter] = useState("all")
    const [tasks, setTasks] = useState(tasksArray)

    // Update local tasks state whenever tasksArray prop changes
    useEffect(() => {
        setTasks(tasksArray)
    }, [tasksArray])

    const handleFilterChange = (value) => {
        setFilter(value);
    }

    const filteredTasks = tasks?.filter((task) => {
        if (filter === "completed") return task.status === "completed"
        if (filter === "incomplete") return task.status === "incomplete"
        return true
    })

    const handleUpdateStatus = async (id, status) => {
        const updatedStatus = status === "completed" ? "incomplete" : "completed"
        try {
            console.log("Updating")
            await updateTaskStatus(id, updatedStatus)

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, status: updatedStatus } : task
                )
            )

            toast.success("Task status updated!", { position: "top-center" })
        } catch (error) {
            toast.error("Error when update task status", { position: "top-center" })
        }
    }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center h-full p-2">
        <div className="flex flex-col justify-center items-center p-5 bg-yellow-600 rounded-xl lg:w-[400px] lg:h-[400px] overflow-y-auto custom-scrollbar">
            <header className="my-10">
                <h1 className="text-xl font-semibold text-white uppercase">
                    Your Tasks
                </h1>
            </header>
            <div className="mb-10">
                <Select onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="incomplete">Incomplete</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ul className="flex-1 flex items-center justify-center flex-col w-full gap-y-2">
                {filteredTasks?.map((task, i) => (
                    <li className="w-full lg:max-w-[80%] flex justify-center items-center" key={task.id}>
                        <div className="flex justify-between items-center gap-x-2 w-full">
                            <Link href={`/task/${task.id}`}>
                                <p className="text-white font-semibold text-lg hover:text-blue-600 text-wrap">
                                    {task.name}
                                </p>                 
                            </Link>
                            <Checkbox checked={task.status === "completed"} onClick={() => handleUpdateStatus(task.id, task.status)} />                 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TaskList