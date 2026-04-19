/** Clerk publishable key from Vite env (required for the SDK to finish loading). */
export const clerkPublishableKey = (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined) ?? ''

export function hasClerkPublishableKey(): boolean {
  return clerkPublishableKey.trim().length > 0
}
