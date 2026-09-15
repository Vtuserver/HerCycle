import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session:{strategy:"jwt"},
  providers:[
    Credentials({
      credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user=await User.findOne({email:String(credentials.email).toLowerCase()});
        if(!user) return null;
        const ok=await bcrypt.compare(String(credentials.password),user.passwordHash);
        if(!ok) return null;
        return {id:String(user._id),name:user.name,email:user.email};
      }
    })
  ],
  callbacks:{
    async jwt({token,user}){if(user?.id) token.sub=user.id;return token},
    async session({session,token}){if(session.user && token.sub) session.user.id=token.sub;return session}
  },
  pages:{signIn:"/login"}
});
