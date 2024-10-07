import axios from "axios";

export const getTaskById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/tasks/${id}`)

        const data = response.data
        console.log("Success get task by id", data)
        return data
    } catch (error) {
        console.log("Error when get tasks", error)
        return
    }
}