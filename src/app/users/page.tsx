'use client'

import { use, useEffect, useState } from "react"
import { getUser, User} from "../api/connection-details"

export default function Users() {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

        const func = async () => {
            const user = await getUser('')
            console.log(user)
            setUser(user)
        }

        func()

    },[])

    return (
        <>
        <div className="flex w-full h-screen justify-center items-center">
            <h1> This is user {user?.name} with userID {user?.id} </h1>
            <form action={() => {console.log("Hello from form")}}></form>
        </div>
        </>
    )
}