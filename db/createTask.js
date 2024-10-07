import axios from "axios";
import { NextResponse } from "next/server";

export const createTask = async (taskName) => {
    try {
        const newTask = await axios.post('http://localhost:3001/tasks', {
            name: taskName,
            status: "incomplete"
        });
        console.log('Task added:', newTask.data)
        return newTask
    } catch (error) {
        console.error('Error adding task:', error);
    }
}