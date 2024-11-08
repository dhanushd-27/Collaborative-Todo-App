import { ObjectId } from "mongoose"

interface signInData{
    email: string,
    password: string
}

interface signUpData{
    username: string,
    email: string,
    password: string
}

interface taskData{
    title: string,
    description: string,
    assignee: ObjectId,
    priority: string,
    dueDate: Date
}

export { signInData, signUpData, taskData }