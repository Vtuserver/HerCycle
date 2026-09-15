import {redirect} from "next/navigation"; import {auth} from "@/auth"; import ProfileClient from "@/components/ProfileClient";
export default async function Profile(){if(!(await auth())?.user?.id)redirect("/login");return <ProfileClient/>}
