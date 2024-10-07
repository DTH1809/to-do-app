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


const TaskList = ({ tasksArray }) => {

    const [filter, setFilter] = useState("all")

    const handleFilterChange = (value) => {
        setFilter(value);
    }

    const filteredTasks = tasksArray.filter((task) => {
        if (filter === "completed") return task.status === "completed"
        if (filter === "incomplete") return task.status === "incomplete"
        return true
    })

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
                            <p className="text-white font-semibold text-lg">
                                {task.name}
                            </p>
                            <Checkbox checked={task.status === "completed"} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TaskList