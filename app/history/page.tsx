import {redirect} from "next/navigation"; import {auth} from "@/auth"; import HistoryClient from "@/components/HistoryClient";
export default async function History(){if(!(await auth())?.user?.id)redirect("/login");return <HistoryClient/>}
