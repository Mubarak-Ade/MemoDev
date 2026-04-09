export const Footer = () => {
    return (
        <div className="flex flex-col gap-4 border-t border-border dv-section lg:flex-row lg:items-center lg:justify-between">
            <h2 className="dv-h3">Dev Vault</h2>
            <p className="dv-small text-muted-foreground">
                © 2024 Memory Vault. All rights reserved. Built for developers, by developers.
            </p>
            <h4 className="dv-small text-muted-foreground">
                System Status: <span className="text-success">All Operational</span>
            </h4>
        </div>
    )
}
