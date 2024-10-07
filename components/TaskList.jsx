"use client"
import React, { useState } from 'react'
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
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'


const TaskList = ({ tasksArray }) => {

    const [filter, setFilter] = useState("all")
    const [tasks, setTasks] = useState(tasksArray)

    const handleFilterChange = (value) => {
        setFilter(value);
    }

    const filteredTasks = tasks.filter((task) => {
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
        <div className="flex flex-col justify-center items-center lg:p-10 p-5 bg-yellow-600 rounded-xl">
            <header className="mb-10">
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
            <ul className="flex-1">
                {filteredTasks.map((task, i) => (
                    <li className="w-full flex justify-center items-center" key={task.id}>
                        <div className="flex justify-between items-center p-2 gap-x-4">
                            <Link href={`/task/${task.id}`}>
                            <Tooltip>
                                <TooltipTrigger >
                                    <p className="text-white font-semibold text-lg hover:text-blue-600">
                                        {task.name}
                                    </p>                
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">
                                        Update Task
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                            </Link>
                            <Tooltip>
                                <TooltipTrigger >
                                    <Checkbox checked={task.status === "completed"} onClick={() => handleUpdateStatus(task.id, task.status)} />              
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">
                                        Update Task Status
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TaskList