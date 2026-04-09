
export const CTACard = () => {
  return (
    <div className="relative overflow-hidden p-4">
        <div className="absolute left-1/2 top-1/2 z-0 h-72 w-full -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-primary/30 to-transparent blur-3xl opacity-50" />
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-border bg-secondary px-6 py-8 text-center">
            <h1 className="dv-h2 max-w-2xl">
                Ready to sync your knowledge?
            </h1>
            <p className="mt-4 max-w-2xl dv-body text-muted-foreground">
                Join the developers who have already optimized their daily workflow. Never solve
                the same problem twice.
            </p>
            <button className="mt-6 cursor-pointer rounded-[8px] bg-primary px-4 py-2 font-semibold text-primary-foreground">
                Join The WaitList
            </button>
            <span className="mt-4 dv-small text-muted-foreground">
                Free during beta • No credit card required • Instant access
            </span>
        </div>
    </div>
  )
}
