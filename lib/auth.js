import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { getServerSession } from "next-auth";
import { getDb } from "./mongo";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        const db = await getDb();
        const user = await db.collection('users').findOne({
          email: credentials.email.toLowerCase()
        });

        if (!user || !user.password) {
          throw new Error('No user found with this email');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          verified: !!user.verified,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "discord") {
        try {
          const db = await getDb();
          const users = db.collection('users');
          await users.updateOne(
            { email: user.email.toLowerCase() },
            {
              $set: {
                username: user.name,
                image: user.image,
                lastLogin: new Date(),
                verified: true, // OAuth users are verified
              },
              $setOnInsert: {
                createdAt: new Date(),
                role: 'user',
              }
            },
            { upsert: true }
          );
          return true;
        } catch (err) {
          console.error("Error saving user on signin", err);
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.verified = user.verified;
      }
      // Handle session update trigger to refresh verified status
      if (trigger === "update" && session?.verified !== undefined) {
        token.verified = session.verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.verified = token.verified;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  }
};

export async function getServerAuthSession(req, res) {
  return await getServerSession(req, res, authOptions);
}

export default authOptions;
