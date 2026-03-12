import { Feature } from '@/components/features/Home/Feature'
import { Footer } from '@/components/features/Home/Footer'
import { Hero } from '@/components/features/Home/Hero'
import { Navbar } from '@/components/features/Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Feature />
            <Footer />
        </div>
    )
}

export default HomePage
