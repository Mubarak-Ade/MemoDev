import { Link } from 'react-router'
import { MotionWrap } from './Reusable/Motion'

export const Navbar = () => {
    return (
        <div className="flex h-14 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-sm">
            <div>
                <h1 className="text-base font-semibold tracking-tight">Dev Vault</h1>
            </div>
            <div>
                <ul className="flex gap-5 text-sm text-muted-foreground">
                    <li>Documentation</li>
                    <li>Changelog</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <MotionWrap
                as={Link}
                to="/register"
                className="cursor-pointer rounded-[8px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                Sign up
            </MotionWrap>
        </div>
    )
}
