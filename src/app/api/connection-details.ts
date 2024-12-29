import { use } from "react"

export type User = {
    id: string
    name: string
}

const user: User = {
    id: "1024",
    name: "prad"
}
export async function getUser(userId: string) {
    console.log(userId)
    return user
}