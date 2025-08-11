import { handleAuth } from "@auth0/nextjs-auth0";

async function authHandler(request, context) {
  // Ensure params are awaited if they exist
  if (context?.params) {
    context.params = await context.params;
  }

  return handleAuth()(request, context);
}

export const GET = authHandler;
export const POST = authHandler;
