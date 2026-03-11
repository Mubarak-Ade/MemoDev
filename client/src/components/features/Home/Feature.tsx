import { HiBookOpen } from 'react-icons/hi'
import { MdOutlineCloudSync } from 'react-icons/md'
import { TbListSearch } from 'react-icons/tb'
import { FeatureCard } from './FeatureCard'
import { CTACard } from './CTACard';

export const Feature = () => {
    return (
        <div className="px-6 py-20 border-b border-accent/20">
            <ul className="grid grid-cols-3 mb-30 gap-10">
                <FeatureCard
                    title="Storage"
                    icon={MdOutlineCloudSync}
                    content="Securely store implementation patterns with full syntax highlighting.
                        Zero-latency cloud synchronization across all your workstations."
                />
                <FeatureCard
                    title="Smart Search"
                    icon={TbListSearch}
                    content="Instantaneous fuzzy search through your entire codebase history. Find that
                        specific RegEx or API config in milliseconds, not minutes."
                />
                <FeatureCard
                    title="Auto Documentation"
                    icon={HiBookOpen}
                    content="Automatically extract context and generate human-readable documentation from
                        your snippets. Documentation that stays in sync."
                />
            </ul>

            <CTACard />
        </div>
    )
}
