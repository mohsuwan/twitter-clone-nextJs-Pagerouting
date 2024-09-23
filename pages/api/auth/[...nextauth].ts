// import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { pages } from "next/dist/build/templates/app-page";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// import prisma from "@/libs/prismadb";
// import test from "node:test";
const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // email: { label: "Email", type: "email", placeholder: "em@gmail.com" },
        // password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "suwanabdnabeelmoh@gmail.com" || password !== "123321") {
          return null;
        }
        return {
          id: "1234",
          name: "mohammed suwan",
          email: "suwanabdnabeelmoh@gmail.com",
          image: "/default-avatar.webp",
        };
        // pages
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

// export default NextAuth({
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
// credentials: {
// email: { label: "email", type: "text", placeholder: "email" },
// password: { label: "Password", type: "password" },
// },
//       async authoriz(credentials: any) {
//         console.log(credentials, "credentials");

//         const staticEmail = "suwanabdnabeelmoh@gmail.com";
//         const staticPassword = "123321";
//         if (
//           credentials?.email === staticEmail &&
//           credentials?.password === staticPassword
//         ) {
//           return { id: 1, name: "suwan", email: staticEmail };
//         } else {
//           throw new Error("Invaled credentials");
//         }
//         // if (!credentials?.email || !credentials?.password) {
//         //   throw new Error("Invalid credentials");
//         // }
//         // const user = await prisma.user.findUnique({
//         //   where: { email: credentials.email },
//         // });
//         // if (!user || !user?.hashadPassword) {
//         //   throw new Error("Invalid credentials");
//         // }
//         // const isCurrectPassword = await bcrypt.compare(
//         //   credentials.password,
//         //   user.hashadPassword
//         // );
//         // if (!isCurrectPassword) {
//         //   throw new Error("Invalid credentials");
//         // }
//         // const isCurrrentToken = await

//         // return user;
//       },
//     }),
//   ],
//   debug: process.env.NODE_ENV !== "development",
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
