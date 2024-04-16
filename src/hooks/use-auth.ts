import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuth = () => {
    const router = useRouter()

    const signOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error()
            }
            toast.success("Signed out successfully")
            router.push('/log-in')
            router.refresh()
        } catch (err) {
            toast.error("Couldn't sign out. Please try again")
        }
    }

    return {signOut}
}