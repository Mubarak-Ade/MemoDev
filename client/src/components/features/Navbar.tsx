import { Link } from 'react-router'
import { MotionWrap } from './Reusable/Motion'

export const Navbar = () => {
    return (
        <div className="px-5 font-sans py-4 items-center border-b border-accent/20 flex justify-between">
            <div className="">
                <h1 className="text-xl font-bold">MemoDev</h1>
            </div>
            <div className="">
                <ul className="flex gap-5 text-sm font-medium">
                    <li>Documentation</li>
                    <li>Changelog</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <MotionWrap
                as={Link}
                to="/register"
                className="px-6 py-3 rounded-md cursor-pointer bg-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                Sign up
            </MotionWrap>
        </div>
    )
}
