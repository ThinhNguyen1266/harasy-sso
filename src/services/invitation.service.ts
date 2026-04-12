import { delay } from '@/lib/utils'
import { mockInvitations } from '@/mocks/invitation.mock'
import type { TenantInvitation } from '@/types/invitation.types'

/** In-session demo state (starts from mock seed; not persisted). */
const pendingIds = new Set(
  mockInvitations.filter((i) => i.status === 'pending').map((i) => i.id),
)

export async function getInvitations(): Promise<TenantInvitation[]> {
  await delay(280)
  return mockInvitations.filter((i) => i.status === 'pending' && pendingIds.has(i.id))
}

export async function acceptInvitation(invitationId: string): Promise<{ ok: true }> {
  await delay(350)
  if (!mockInvitations.some((i) => i.id === invitationId)) {
    throw new Error('Invitation not found')
  }
  if (!pendingIds.has(invitationId)) {
    throw new Error('Invitation is no longer pending')
  }
  pendingIds.delete(invitationId)
  return { ok: true }
}

export async function declineInvitation(invitationId: string): Promise<{ ok: true }> {
  await delay(300)
  if (!mockInvitations.some((i) => i.id === invitationId)) {
    throw new Error('Invitation not found')
  }
  if (!pendingIds.has(invitationId)) {
    throw new Error('Invitation is no longer pending')
  }
  pendingIds.delete(invitationId)
  return { ok: true }
}
