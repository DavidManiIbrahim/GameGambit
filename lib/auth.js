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
          if (!user.email) return false; // Email is required

          const db = await getDb();
          const users = db.collection('users');
          const email = user.email.toLowerCase();

          // Check if user exists
          const existingUser = await users.findOne({ email });

          if (existingUser) {
            // Update existing user
            await users.updateOne(
              { email },
              {
                $set: {
                  // Don't overwrite username to preserve custom changes
                  image: user.image,
                  lastLogin: new Date(),
                }
              }
            );
          } else {
            // Create new user
            let username = user.name;

            // Ensure username uniqueness
            let isUnique = false;
            let attempt = 0;
            while (!isUnique && attempt < 5) {
              const check = await users.findOne({ username });
              if (!check) {
                isUnique = true;
              } else {
                attempt++;
                username = `${user.name}${Math.floor(Math.random() * 10000)}`;
              }
            }

            // If still not unique after attempts, use timestamp
            if (!isUnique) username = `${user.name}_${Date.now()}`;

            await users.insertOne({
              email,
              username,
              image: user.image,
              createdAt: new Date(),
              lastLogin: new Date(),
              role: 'user',
            });
          }
          return true;
        } catch (err) {
          console.error("Error saving user on signin", err);
          return false; // Fail sign in if DB error
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;

        // If signing in with OAuth, ensure we have the DB ID
        if (account && (account.provider === 'google' || account.provider === 'discord')) {
          try {
            const db = await getDb();
            const dbUser = await db.collection('users').findOne({ email: user.email.toLowerCase() });
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.name = dbUser.username; // Use DB username
            }
          } catch (e) {
            console.error('Error fetching/mapping user in jwt', e);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.image;
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
