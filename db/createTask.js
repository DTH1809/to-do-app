"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";

export const createTask = async (taskName) => {
    try {
        const newTask = await axios.post('http://localhost:3001/tasks', {
            name: taskName,
            status: "incomplete"
        });
        console.log('Task added:', newTask.data)
        revalidatePath('/')
        return newTask
    } catch (error) {
        console.error('Error adding task:', error)
        return
    }
}