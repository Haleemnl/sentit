import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],

    callbacks: {
        async signIn({ user, profile }) {
            try {
                // Destructure user and profile information
                const { name, image, email } = user;
                const { id, login, bio } = profile;

                // Check if the user is an existing user
                const existingUser = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: id });

                // If no existing user, create a new author document
                if (!existingUser) {
                    await writeClient.create({
                        _type: 'author',
                        id: id,
                        name: name,
                        username: login,
                        email: email,
                        image: image,
                        bio: bio || ''
                    });
                    return true; // Explicitly return true for new users
                }

                return true; // Return true for existing users
            } catch (error) {
                console.error('Sign-in error:', error);
                return false; // Return false if there's an error
            }
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    // Fetch user from Sanity using GitHub ID
                    const user = await client
                        .withConfig({ useCdn: false })
                        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

                    // Add Sanity user ID to the JWT token
                    if (user) {
                        token.id = user?._id;
                    }
                } catch (error) {
                    console.error('JWT callback error:', error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
            }
            return session;
        }
    }
})