"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";

export const updateTaskStatus = async (taskId, updatedStatus) => {
    try {
        const response = await axios.patch(`http://localhost:3001/tasks/${taskId}`, {
            status: updatedStatus
        })

        console.log("Success update task status")
        revalidatePath("/")
        return response.data
    } catch (error) {
        console.log("Error when update task", error)
        return
    }
}

export const updateTaskName = async (taskId, taskName) => {
    try {
        const response = await axios.patch(`http://localhost:3001/tasks/${taskId}`, {
            name: taskName
        })
        console.log("Success update task status")
        revalidatePath("/")
        return response.data
    } catch (error) {
        console.log("Error when update task", error)
        return
    }
}