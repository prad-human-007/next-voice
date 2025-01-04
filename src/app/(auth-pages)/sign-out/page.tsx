'use client'

import { signOutAction } from "@/app/actions"
import { Button } from "@/components/ui/button"

export default async function Signout() {

    const handleSignOut = async () => {
        try {
            await signOutAction();            
        } catch (error) {
            console.log("Error handeling signout");
        }
    }
    return(
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1>
                This is the sign out page
            </h1>
            <Button onClick={handleSignOut}> Sign-Out </Button>
        </div>
    )
}