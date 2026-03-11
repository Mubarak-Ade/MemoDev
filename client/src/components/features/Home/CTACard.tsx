
export const CTACard = () => {
  return (
    <div className="relative p-10 overflow-hidden min-h-[80vh]">
        <div className="w-full absolute left-1/2 -translate-x-1/2 h-90 z-0 top-1/2 -translate-y-1/2 bg-linear-to-r blur-3xl opacity-30 from-transparent via-primary/80 to-transparent p-20"></div>
        <div className='w-full absolute mx-auto left-1/2 -translate-x-1/2 border border-border/20  p-20 flex-col bg-primary/2 rounded-4xl flex items-center'>
            <h1 className='text-5xl w-150 text-center font-bold'>Ready to sync your knowledge?</h1>
            <p className='mt-5 w-150 text-center font-light text-accent text-lg'>Join the elite developers who have already optimized their daily workflow. Never solve the same problem twice.</p>
            <button className='bg-primary px-10 cursor-pointer py-4 rounded-xl mt-5 font-semibold text-lg'>Join The WaitList</button>
            <span className='mt-5 text-sm text-accent'>Free during beta • No credit card required • Instant access</span>
        </div>
    </div>
  )
}
