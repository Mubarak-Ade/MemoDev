import { Outlet } from 'react-router'
import { Navbar } from '../features/Navbar'

const MainLayout = () => {
    return (
        <div className='h-screen flex items-center flex-col'>
            <div className="px-5 w-full font-sans py-4 items-center border-b border-accent/20 flex justify-between">
                <div className="">
                    <h1 className="text-xl font-bold">MemoDev</h1>
                </div>
            </div>
            <main className="flex flex-col items-center w-full h-full p-5 justify-center">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
