import axios from "axios";

export const getTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3001/tasks")

        const data = response.data
        console.log("Success get tasks", data)
        return data
    } catch (error) {
        console.log("Error when get tasks", error)
        return
    }
}