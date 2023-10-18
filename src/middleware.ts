import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId) {
      const user = await clerkClient.users.getUser(auth.userId)
      if (!user.publicMetadata.role) {
        console.log("Updating user metadata")
        await clerkClient.users.updateUserMetadata(auth.userId, {
          publicMetadata: {
            role: "visitor",
          },
        })
      }
    }
  },
  clockSkewInMs: 1000 * 60 * 30 // 30 minutes
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};