import {redirect} from "next/navigation"; import {auth} from "@/auth"; import DashboardClient from "@/components/DashboardClient";
export default async function Dashboard(){if(!(await auth())?.user?.id) redirect("/login");return <DashboardClient/>}
