'use client'

import { use, useEffect, useState } from "react"
import { getUser, User} from "../api/connection-details"

export default function Users() {

    const [user, setUser] = useState<User | null>(null)
    const [score, setScore] = useState('')

    useEffect(() => {

        const func = async () => {
            // Using server action in api/connection-details.ts
            const user = await getUser('')
            console.log(user)
            setUser(user)
        }


        const getScore = async () => {
            const response = await fetch('/api/score/', {
               method: 'POST',
               headers: {
                'Content-Type':'text/plain'
               },
               body: 'Give one line about earth'
            })
            const { message } = await response.json()
            setScore(message)
        }

        func()
        getScore()

    },[])

    return (
        <>
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1> This is user {user?.name} with userID {user?.id} </h1>
            <h1> This is the score of the user: {score}</h1>
            <form action={() => {console.log("Hello from form")}}></form>
        </div>
        </>
    )
}