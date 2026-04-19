import { Loader2 } from 'lucide-react'

export function FullPageSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background" role="status" aria-live="polite" aria-label="Loading">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
    </div>
  )
}
