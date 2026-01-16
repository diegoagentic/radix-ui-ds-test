import { useState } from 'react'
import {
    Box, Flex, Text, Button, IconButton, Avatar, DropdownMenu, Separator, Grid, ThemePanel
} from '@radix-ui/themes'
import {
    HomeIcon, CubeIcon, BarChartIcon, ClipboardIcon, ViewGridIcon, BackpackIcon,
    PersonIcon, FileTextIcon, CheckCircledIcon, CalendarIcon, DotsHorizontalIcon, ExitIcon,
    SunIcon, MoonIcon
} from '@radix-ui/react-icons'
import { useTheme } from '../ThemeContext'

interface NavbarProps {
    onLogout: () => void;
    onNavigateToWorkspace: () => void;
    activeTab?: string;
}

function ThemeToggle() {
    const { appearance, toggleTheme } = useTheme();
    return (
        <IconButton variant="ghost" color="gray" onClick={toggleTheme} style={{ width: '32px', height: '32px', borderRadius: '9999px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {appearance === 'dark' ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
        </IconButton>
    )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Flex
            align="center"
            gap="2"
            className={`nav-item ${active ? 'active' : ''}`}
            style={{
                padding: '8px 12px',
                borderRadius: '9999px',
                cursor: 'pointer',
                backgroundColor: active ? 'var(--gray-a4)' : 'transparent',
                color: active ? 'var(--gray-12)' : 'var(--gray-10)',
                transition: 'all 0.2s ease',
            }}
        >
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </Box>
            <span className="nav-item-label" style={{ fontSize: '13px', fontWeight: 500 }}>
                {label}
            </span>
        </Flex>
    )
}

export default function Navbar({ onLogout, onNavigateToWorkspace, activeTab = 'Overview' }: NavbarProps) {
    const [isAppsOpen, setIsAppsOpen] = useState(false)

    return (
        <>
            <style>{`
                .nav-glass {
                    background-color: var(--color-panel-translucent);
                    backdrop-filter: blur(24px);
                    border: 1px solid var(--gray-a3);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .nav-item-label {
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    margin-left: 0;
                }
                .nav-item:hover .nav-item-label, .nav-item.active .nav-item-label {
                    max-width: 100px;
                    opacity: 1;
                }
            `}</style>

            {/* Floating Capsule Navbar */}
            <Box
                style={{
                    position: 'fixed',
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100,
                    borderRadius: '9999px',
                    width: 'max-content',
                    maxWidth: '90vw',
                }}
                className="nav-glass"
            >
                <Flex align="center" gap="2" p="2">
                    {/* Logo */}
                    <Box px="4">
                        <style>{`
                            .dashboard-logo-light { display: block; }
                            .dashboard-logo-dark { display: none; }
                            .dark .dashboard-logo-light, [data-theme='dark'] .dashboard-logo-light { display: none; }
                            .dark .dashboard-logo-dark, [data-theme='dark'] .dashboard-logo-dark { display: block; }
                        `}</style>
                        <img className="dashboard-logo-light" src="/logo-on-light.jpg" alt="Strata" style={{ height: '20px', width: 'auto' }} />
                        <img className="dashboard-logo-dark" src="/logo-on-dark.jpg" alt="Strata" style={{ height: '20px', width: 'auto' }} />
                    </Box>

                    <Separator orientation="vertical" size="2" style={{ height: '24px', margin: '0 4px' }} />

                    {/* Nav Items */}
                    <Flex gap="1">
                        <NavItem icon={<HomeIcon width="16" height="16" />} label="Overview" active={activeTab === 'Overview'} />
                        <NavItem icon={<CubeIcon width="16" height="16" />} label="Inventory" active={activeTab === 'Inventory'} />
                        <NavItem icon={<BarChartIcon width="16" height="16" />} label="Production" active={activeTab === 'Production'} />
                        <NavItem icon={<ClipboardIcon width="16" height="16" />} label="Orders" active={activeTab === 'Orders'} />
                    </Flex>

                    <Separator orientation="vertical" size="2" style={{ height: '24px', margin: '0 4px' }} />

                    {/* Tools */}
                    <Flex gap="2" align="center" style={{ position: 'relative', paddingRight: '8px' }}>
                        <IconButton
                            variant="ghost"
                            color="gray"
                            radius="full"
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => setIsAppsOpen(!isAppsOpen)}
                        >
                            <ViewGridIcon width="18" height="18" />
                        </IconButton>

                        {isAppsOpen && (
                            <>
                                <div
                                    style={{
                                        position: 'fixed', inset: 0, zIndex: 99, backgroundColor: 'transparent'
                                    }}
                                    onClick={() => setIsAppsOpen(false)}
                                />
                                <style>{`
                                    :root { --apps-menu-bg: rgba(255, 255, 255, 0.85); }
                                    .dark, [data-theme='dark'] { --apps-menu-bg: rgba(23, 25, 35, 0.85); }
                                `}</style>
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '90px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '400px',
                                        padding: 0,
                                        overflow: 'hidden',
                                        backgroundColor: 'var(--apps-menu-bg)',
                                        backdropFilter: 'blur(24px)',
                                        WebkitBackdropFilter: 'blur(24px)',
                                        borderRadius: '24px',
                                        border: '1px solid var(--gray-a4)',
                                        zIndex: 100,
                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <Grid columns="3" gap="3" p="4">
                                        {[
                                            { icon: <BackpackIcon width="24" height="24" />, label: "My Work Space", color: "var(--accent-9)", bg: "var(--accent-3)", isHighlighted: true },
                                            { icon: <HomeIcon width="24" height="24" />, label: "Portal", color: "var(--blue-9)", bg: "var(--blue-3)" },
                                            { icon: <PersonIcon width="24" height="24" />, label: "CRM", color: "var(--plum-9)", bg: "var(--plum-3)" },
                                            { icon: <FileTextIcon width="24" height="24" />, label: "Invoice", color: "var(--green-9)", bg: "var(--green-3)" },
                                            { icon: <CubeIcon width="24" height="24" />, label: "Inventory", color: "var(--orange-9)", bg: "var(--orange-3)" },
                                            { icon: <BarChartIcon width="24" height="24" />, label: "Analytics", color: "var(--pink-9)", bg: "var(--pink-3)" },
                                            { icon: <CheckCircledIcon width="24" height="24" />, label: "Support", color: "var(--cyan-9)", bg: "var(--cyan-3)" },
                                            { icon: <ViewGridIcon width="24" height="24" />, label: "Board", color: "var(--indigo-9)", bg: "var(--indigo-3)" },
                                            { icon: <CalendarIcon width="24" height="24" />, label: "Calendar", color: "var(--tomato-9)", bg: "var(--tomato-3)" },
                                            { icon: <DotsHorizontalIcon width="24" height="24" />, label: "More", color: "var(--slate-9)", bg: "var(--slate-3)" },
                                        ].map((app, i) => (
                                            <Flex
                                                key={i}
                                                direction="column"
                                                align="center"
                                                gap="3"
                                                p="3"
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '16px',
                                                    transition: 'all 0.2s',
                                                    backgroundColor: app.isHighlighted ? 'var(--accent-3)' : 'transparent',
                                                    // @ts-ignore
                                                    border: app.isHighlighted ? '1px solid var(--accent-6)' : 'none'
                                                }}
                                                className="hover-bg hover-scale"
                                                onClick={() => {
                                                    // @ts-ignore
                                                    if (app.label === "My Work Space") {
                                                        onNavigateToWorkspace();
                                                        setIsAppsOpen(false);
                                                    }
                                                }}
                                            >
                                                <Flex justify="center" align="center" style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: app.bg, color: app.color, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                                    {app.icon}
                                                </Flex>
                                                <Text size="2" weight={
                                                    // @ts-ignore
                                                    app.isHighlighted ? "bold" : "medium"
                                                } color={
                                                    // @ts-ignore
                                                    app.isHighlighted ? "var(--accent-11)" : "gray"
                                                }>{app.label}</Text>
                                            </Flex>
                                        ))}
                                    </Grid>
                                </div>
                            </>
                        )}
                        <ThemeToggle />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="ghost" radius="full" style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar fallback="JD" size="1" radius="full" color="indigo" variant="soft" />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <Box p="2">
                                    <Text as="div" size="2" weight="bold">Jhon Doe</Text>
                                    <Text as="div" size="1" color="gray">Admin</Text>
                                </Box>
                                <Separator size="4" my="1" />
                                <DropdownMenu.Item color="red" onClick={onLogout}>
                                    <ExitIcon /> Sign Out
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>
                </Flex>
            </Box >
        </>
    )
}
