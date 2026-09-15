import {redirect} from "next/navigation"; import {auth} from "@/auth"; import CalendarClient from "@/components/CalendarClient";
export default async function Calendar(){if(!(await auth())?.user?.id)redirect("/login");return <CalendarClient/>}
