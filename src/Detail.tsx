import { Button, Card, Flex, Grid, Heading, Text, TextField, Badge, Table, IconButton, Separator, Box, Checkbox, Dialog, DropdownMenu, Avatar, RadioGroup, Tabs, TextArea } from '@radix-ui/themes'
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BellIcon,
    QuestionMarkCircledIcon,
    GearIcon,
    LightningBoltIcon,
    CheckCircledIcon,
    FileTextIcon,
    Pencil2Icon,
    ExclamationTriangleIcon,
    ArchiveIcon,
    ActivityLogIcon,
    ClockIcon,
    PersonIcon,
    ArrowRightIcon,
    UpdateIcon,
    MagicWandIcon,
    InfoCircledIcon,
    Link2Icon,
    PaperPlaneIcon,
    CheckIcon,
    DownloadIcon,
    Pencil1Icon,
    Cross2Icon,
    SunIcon,
    MoonIcon,
    CubeIcon,
    BarChartIcon,
    ClipboardIcon,
    ViewGridIcon,
    CalendarIcon,
    DotsHorizontalIcon,
    ExitIcon,
    ChevronRightIcon,
    Share1Icon,
    PlusIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ComponentPlaceholderIcon
} from '@radix-ui/react-icons';
import { useState } from 'react'
import * as Progress from '@radix-ui/react-progress'
import { useTheme } from './ThemeContext';

function ThemeToggle() {
    const { appearance, toggleTheme } = useTheme();
    return (
        <IconButton variant="ghost" color="gray" onClick={toggleTheme}>
            {appearance === 'dark' ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
        </IconButton>
    )
}

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock" as const, statusColor: 'gray' as const, aiStatus: 'info' },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock" as const, statusColor: 'orange' as const, aiStatus: 'warning' },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock" as const, statusColor: 'red' as const },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock" as const, statusColor: 'orange' as const },
]

interface Message {
    id: number | string;
    sender: string;
    avatar: string;
    content: React.ReactNode;
    time: string;
    type: 'system' | 'ai' | 'user' | 'action_processing' | 'action_success';
}



const DiscrepancyResolutionFlow = () => {
    const [status, setStatus] = useState<'initial' | 'requesting' | 'pending' | 'approved'>('initial')
    const [requestText, setRequestText] = useState('')

    const handleRequest = () => {
        setStatus('pending')
        setTimeout(() => setStatus('approved'), 3000)
    }

    if (status === 'initial') {
        return (
            <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                    <ExclamationTriangleIcon color="orange" />
                    <Text weight="bold" color="orange">Found 3 discrepancies in recent shipments.</Text>
                </Flex>
                <Flex direction="column" gap="1" style={{ paddingLeft: '20px' }}>
                    <Flex align="center" gap="2">
                        <ExclamationTriangleIcon color="orange" width="12" height="12" />
                        <Text size="2" color="gray">Order #ORD-2054: Weight mismatch</Text>
                    </Flex>
                    <Flex align="center" gap="2">
                        <ExclamationTriangleIcon color="orange" width="12" height="12" />
                        <Text size="2" color="gray">Order #ORD-2051: Timestamp sync error</Text>
                    </Flex>
                    <Flex align="center" gap="2">
                        <ExclamationTriangleIcon color="orange" width="12" height="12" />
                        <Text size="2" color="gray">Order #ORD-2048: Missing carrier update</Text>
                    </Flex>
                </Flex>
                <Flex gap="2" mt="1">
                    <Button size="1" variant="soft" color="blue">
                        <UpdateIcon /> Sync & Report
                    </Button>
                    <Button
                        size="1" variant="outline" color="gray"
                        onClick={() => setStatus('requesting')}
                    >
                        <Pencil1Icon /> Request Changes
                    </Button>
                </Flex>
            </Flex>
        )
    }

    if (status === 'requesting') {
        return (
            <Flex direction="column" gap="3" className="animate-in fade-in slide-in-from-bottom-2">
                <Text size="2" weight="medium">Describe required changes:</Text>
                <TextArea
                    placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    style={{ minHeight: '80px' }}
                />
                <Flex justify="between" align="center">
                    <Button size="1" variant="ghost" color="gray">
                        <Link2Icon /> Attach File
                    </Button>
                    <Flex gap="2">
                        <Button size="1" variant="ghost" onClick={() => setStatus('initial')} color="gray">Cancel</Button>
                        <Button size="1" onClick={handleRequest}>Submit Request</Button>
                    </Flex>
                </Flex>
            </Flex>
        )
    }

    if (status === 'pending') {
        return (
            <Flex direction="column" gap="3" className="animate-in fade-in">
                <Flex align="center" gap="2">
                    <UpdateIcon className="animate-spin" color="blue" />
                    <Text color="blue">Requesting approval from Logistics Manager...</Text>
                </Flex>
            </Flex>
        )
    }

    if (status === 'approved') {
        return (
            <Flex direction="column" gap="3" className="animate-in fade-in">
                <Flex align="center" gap="2">
                    <CheckCircledIcon color="green" width="20" height="20" />
                    <Text weight="bold" color="green">Changes approved. PO updated.</Text>
                </Flex>
                <Card style={{ backgroundColor: 'var(--gray-3)', padding: '12px' }}>
                    <Flex align="center" justify="between">
                        <Flex align="center" gap="3">
                            <Box style={{ width: '32px', height: '32px', backgroundColor: 'var(--red-3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileTextIcon color="red" />
                            </Box>
                            <Box>
                                <Text size="2" weight="medium" as="div">PO_Revised_Final.pdf</Text>
                                <Text size="1" color="gray" as="div">Updated just now</Text>
                            </Box>
                        </Flex>
                        <Button size="1" variant="ghost" color="blue">Download</Button>
                    </Flex>
                </Card>
            </Flex>
        )
    }
    return null
}

const collaborators = [
    { name: "Sarah Chen", role: "Logistics Mgr", status: "online", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Mike Ross", role: "Warehouse Lead", status: "offline", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "AI Agent", role: "System Bot", status: "online", avatar: "AI" },
]

const documents = [
    { name: "Packing_Slip_2055.pdf", size: "245 KB", uploaded: "Jan 12, 2025" },
    { name: "Invoice_INV-8992.pdf", size: "1.2 MB", uploaded: "Jan 12, 2025" },
]

const DiscrepancyActionCard = ({ msg }: { msg: Message }) => {
    const [isRequesting, setIsRequesting] = useState(false)
    const [requestText, setRequestText] = useState('')
    const [status, setStatus] = useState<'initial' | 'pending' | 'approved'>('initial')

    const handleSubmit = () => {
        setStatus('pending')
        setTimeout(() => {
            setStatus('approved')
            setIsRequesting(false)
        }, 2000)
    }

    if (status === 'pending') {
        return (
            <Box p="3" style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'var(--green-3)', border: '1px solid var(--green-6)' }}>
                <Flex align="center" gap="2">
                    <UpdateIcon style={{ animation: 'spin 1s linear infinite' }} color="var(--green-11)" />
                    <Text size="2" weight="medium" style={{ color: 'var(--green-11)' }}>Requesting approval...</Text>
                </Flex>
            </Box>
        )
    }

    if (status === 'approved') {
        return (
            <Box style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <Box p="3" style={{ borderRadius: 'var(--radius-3)', backgroundColor: 'var(--green-3)', border: '1px solid var(--green-6)' }}>
                    <Flex justify="between" align="center" mb="1">
                        <Badge color="green" variant="outline">Action Updated</Badge>
                        <Text size="1" color="gray">{msg.time}</Text>
                    </Flex>
                    <Flex gap="2" align="center" mb="3">
                        <CheckIcon color="var(--green-11)" width="20" height="20" />
                        <Text size="2" weight="medium" style={{ color: 'var(--green-11)' }}>Changes approved. PO updated.</Text>
                    </Flex>

                    <Flex align="center" gap="3" style={{ backgroundColor: 'var(--color-background)', padding: '12px', borderRadius: 'var(--radius-2)', border: '1px solid var(--gray-6)' }}>
                        <Flex align="center" justify="center" style={{ width: 40, height: 40, borderRadius: 'var(--radius-2)', backgroundColor: 'var(--color-background)', border: '1px solid var(--gray-6)' }}>
                            <FileTextIcon style={{ width: 20, height: 20, color: 'var(--red-9)' }} />
                        </Flex>
                        <Box flexGrow="1">
                            <Text size="2" weight="medium" style={{ display: 'block' }}>PO_Revised_Final.pdf</Text>
                            <Text size="1" color="gray">2.4 MB • Generated just now</Text>
                        </Box>
                        <IconButton variant="ghost" color="gray">
                            <DownloadIcon />
                        </IconButton>
                    </Flex>
                </Box>
            </Box>
        )
    }

    return (
        <Box p="3" style={{
            borderRadius: 'var(--radius-3)',
            backgroundColor: isRequesting ? 'var(--color-background)' : 'var(--green-3)',
            border: isRequesting ? '1px solid var(--blue-8)' : '1px solid var(--green-6)',
            boxShadow: isRequesting ? '0 0 0 1px var(--blue-8)' : 'none',
            transition: 'all 0.3s ease'
        }}>
            {!isRequesting ? (
                <>
                    <Flex justify="between" align="center" mb="1">
                        <Text size="2" weight="bold" style={{ color: 'var(--green-11)' }}>{msg.sender}</Text>
                        <Text size="1" color="gray">{msg.time}</Text>
                    </Flex>
                    <Flex align="center" gap="2" mb="2">
                        <Badge color="green" variant="outline">Success</Badge>
                    </Flex>
                    <Text size="2" mb="2" style={{ color: 'var(--gray-12)' }}>{msg.content}</Text>

                    <Box mt="3">
                        <Flex direction="column" gap="3">
                            <Flex align="center" gap="3" style={{ backgroundColor: 'var(--color-background)', padding: '12px', borderRadius: 'var(--radius-2)', border: '1px solid var(--gray-6)' }}>
                                <Flex align="center" justify="center" style={{ width: 40, height: 40, borderRadius: 'var(--radius-2)', backgroundColor: 'var(--red-3)', border: '1px solid var(--red-6)' }}>
                                    <FileTextIcon style={{ width: 20, height: 20, color: 'var(--red-9)' }} />
                                </Flex>
                                <Box flexGrow="1">
                                    <Text size="2" weight="medium" style={{ display: 'block' }}>PO_ORD-2055_Final.pdf</Text>
                                    <Text size="1" color="gray">2.4 MB • Generated just now</Text>
                                </Box>
                                <IconButton variant="ghost" color="gray">
                                    <DownloadIcon />
                                </IconButton>
                            </Flex>

                            <Box style={{ padding: '8px 0 8px 16px', borderLeft: '4px solid var(--amber-9)' }}>
                                <Flex gap="3">
                                    <ExclamationTriangleIcon style={{ width: 16, height: 16, color: 'var(--amber-9)', marginTop: 2 }} />
                                    <Box>
                                        <Text size="2" weight="bold" style={{ color: 'var(--gray-12)', display: 'block' }}>Attention Needed</Text>
                                        <Text size="2" style={{ color: 'var(--gray-11)' }}>Discrepancy detected for <Text weight="bold" style={{ color: 'var(--gray-12)' }}>SKU-OFF-2025-003</Text>:</Text>
                                        <Flex mt="2" gap="4" align="center">
                                            <Flex align="center" gap="2">
                                                <Text size="1" weight="medium" style={{ color: 'var(--gray-10)', textTransform: 'uppercase' }}>Warehouse</Text>
                                                <Badge variant="soft" color="gray" style={{ fontFamily: 'monospace' }}>42</Badge>
                                            </Flex>
                                            <Box style={{ width: 1, height: 16, backgroundColor: 'var(--gray-6)' }} />
                                            <Flex align="center" gap="2">
                                                <Text size="1" weight="medium" style={{ color: 'var(--gray-10)', textTransform: 'uppercase' }}>Local</Text>
                                                <Badge variant="soft" color="gray" style={{ fontFamily: 'monospace' }}>35</Badge>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>

                            <Flex align="center" gap="3" style={{ paddingTop: '8px' }}>
                                <Button size="1" variant="solid" color="gray" highContrast style={{ cursor: 'pointer' }}>Sync Database</Button>
                                <Button size="1" variant="outline" color="gray" style={{ cursor: 'pointer', backgroundColor: 'var(--color-background)' }}>Resolve Manually</Button>
                                <Button
                                    size="1"
                                    variant="ghost"
                                    color="gray"
                                    style={{ cursor: 'pointer', marginLeft: 'auto' }}
                                    onClick={() => setIsRequesting(true)}
                                >
                                    <Pencil1Icon style={{ marginRight: 4 }} /> Request Changes
                                </Button>
                            </Flex>

                            <Box style={{ backgroundColor: 'var(--color-background)', padding: '12px', borderRadius: 'var(--radius-2)', border: '1px solid var(--green-6)' }}>
                                <Text size="1" weight="bold" color="gray" style={{ marginBottom: 8, textTransform: 'uppercase' }}>AI Summary</Text>
                                <Flex direction="column" gap="1">
                                    <Flex gap="2" align="start">
                                        <CheckIcon color="var(--green-9)" style={{ marginTop: '2px' }} />
                                        <Text size="1" color="gray">Updated SKU-OFF-2025-003 stock count to 42</Text>
                                    </Flex>
                                    <Flex gap="2" align="start">
                                        <CheckIcon color="var(--green-9)" style={{ marginTop: '2px' }} />
                                        <Text size="1" color="gray">Applied 5% bulk discount for &gt;500 units</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </>
            ) : (
                <Flex direction="column" gap="3" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <Flex justify="between" align="center">
                        <Text size="2" weight="bold">Describe required changes:</Text>
                        <IconButton size="1" variant="ghost" color="gray" onClick={() => setIsRequesting(false)}>
                            <Cross2Icon />
                        </IconButton>
                    </Flex>
                    <textarea
                        className="rt-TextArea rt-r-size-2 rt-variant-surface"
                        style={{
                            width: '100%',
                            minHeight: '80px',
                            padding: '8px',
                            borderRadius: 'var(--radius-2)',
                            fontSize: 'var(--font-size-2)',
                            resize: 'vertical',
                            border: '1px solid var(--gray-6)',
                            backgroundColor: 'var(--gray-2)'
                        }}
                        placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                        autoFocus
                        value={requestText}
                        onChange={(e) => setRequestText(e.target.value)}
                    />
                    <Flex justify="between" align="center">
                        <Button size="1" variant="ghost" color="gray">
                            <Link2Icon style={{ marginRight: 4 }} /> Attach File
                        </Button>
                        <Flex gap="2">
                            <Button size="1" variant="soft" color="gray" onClick={() => setIsRequesting(false)}>Cancel</Button>
                            <Button size="1" onClick={handleSubmit}>Submit Request</Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Box>
    )
}

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true,
        aiSuggestions: true
    })
    const [isAiOpen, setIsAiOpen] = useState(false)
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isPOModalOpen, setIsPOModalOpen] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const [isAppsOpen, setIsAppsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "System",
            avatar: "",
            content: "Order #ORD-2055 has been flagged for manual review due to stock discrepancy.",
            time: "2 hours ago",
            type: "system",
        },
        {
            id: 2,
            sender: "AI Assistant",
            avatar: "AI",
            content: <DiscrepancyResolutionFlow />,
            time: "2 hours ago",
            type: "ai",
        },
        {
            id: 3,
            sender: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "@InventoryManager I'm verifying the physical stock in Zone B. Will update shortly.",
            time: "1 hour ago",
            type: "user",
        },
        {
            id: 4,
            sender: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "I've contacted the client. They want to proceed with the available items. I've updated the order line items accordingly.",
            time: "15 mins ago",
            type: "user",
        },
        {
            id: 5,
            sender: "System",
            avatar: "",
            content: "Sarah Chen triggered context action: Process Quote",
            time: "Just now",
            type: "system",
        },
        {
            id: 6,
            sender: "AI Assistant",
            avatar: "AI",
            content: "Quote processing initiated.",
            time: "Just now",
            type: "action_processing",
        },
        {
            id: 7,
            sender: "AI Assistant",
            avatar: "AI",
            content: "Analysis complete. I've generated the revised Purchase Order, but found stock discrepancies that require attention.",
            time: "Just now",
            type: "action_success",
        }
    ])

    return (
        <Flex direction="column" style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
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
                .hover-scale:hover { transform: scale(1.05); }
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
                        <NavItem icon={<HomeIcon width="16" height="16" />} label="Overview" active />
                        <NavItem icon={<CubeIcon width="16" height="16" />} label="Inventory" />
                        <NavItem icon={<BarChartIcon width="16" height="16" />} label="Production" />
                        <NavItem icon={<ClipboardIcon width="16" height="16" />} label="Orders" />
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
                                            <Flex key={i} direction="column" align="center" gap="3" p="3" style={{ cursor: 'pointer', borderRadius: '16px', transition: 'all 0.2s' }} className="hover-bg hover-scale">
                                                <Flex justify="center" align="center" style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: app.bg, color: app.color, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                                    {app.icon}
                                                </Flex>
                                                <Text size="2" weight="medium" color="gray">{app.label}</Text>
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
            </Box>

            {/* Page Header (Retained but spacer added) */}
            <Flex align="center" justify="between" px="5" style={{ height: '64px', marginTop: '100px', borderBottom: '1px solid var(--gray-5)' }}>
                <Flex align="center" gap="2">
                    <IconButton variant="ghost" onClick={onBack}>
                        <ChevronRightIcon style={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                    <Text size="2" color="gray">Dashboard</Text>
                    <ChevronRightIcon color="gray" width="12" />
                    <Text size="2" color="gray">Inventory</Text>
                    <ChevronRightIcon color="gray" width="12" />
                    <Text size="2" weight="medium">Seating Category</Text>
                </Flex>
                <Flex gap="3" align="center">
                    <Button variant="outline" color="gray">
                        <Share1Icon /> Filter
                    </Button>
                    <Button variant="outline" color="gray">
                        <DownloadIcon /> Export
                    </Button>
                    <Button variant="solid" color="gray" style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }}>
                        <PlusIcon /> Add New Item
                    </Button>
                </Flex>
            </Flex>

            {/* Main Content */}
            <Flex direction="column" gap="5" style={{ flex: 1 }}>
                {/* Collapsible Summary */}
                <Box mb="6" px="6" pt="6">
                    {isSummaryExpanded ? (
                        <>
                            <Flex justify="end" mb="2">
                                <Button
                                    variant="ghost"
                                    color="gray"
                                    onClick={() => setIsSummaryExpanded(false)}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    Hide Details <ChevronUpIcon />
                                </Button>
                            </Flex>
                            <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '5' }} gap="4">
                                <Card size="2">
                                    <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>TOTAL SKUs</Text>
                                    <Text as="div" size="6" weight="bold">450</Text>
                                </Card>
                                <Card size="2">
                                    <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>IN PRODUCTION</Text>
                                    <Text as="div" size="6" weight="bold">50</Text>
                                </Card>
                                <Card size="2">
                                    <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>AVAILABLE</Text>
                                    <Text as="div" size="6" weight="bold">400</Text>
                                </Card>
                                <Card size="2">
                                    <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>LOW STOCK</Text>
                                    <Text as="div" size="6" weight="bold">15</Text>
                                </Card>
                                <Card size="2">
                                    <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>OUT OF STOCK</Text>
                                    <Text as="div" size="6" weight="bold" color="red">8</Text>
                                </Card>
                            </Grid>

                            {/* Integrated Stepper */}
                            <Box style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--gray-5)' }}>
                                <Box style={{ position: 'relative', paddingBottom: '8px' }}>
                                    <Box style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '2px', backgroundColor: 'var(--gray-4)', zIndex: 0 }} />
                                    <Flex justify="between" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
                                        {[
                                            { name: 'Category Selected', status: 'completed' },
                                            { name: 'Item List Viewing', status: 'current' },
                                            { name: 'Details Pending', status: 'pending' },
                                            { name: 'Edit Pending', status: 'pending' },
                                            { name: 'Complete Pending', status: 'pending' }
                                        ].map((step, i) => (
                                            <Flex key={i} direction="column" align="center" gap="2" style={{ cursor: 'default' }}>
                                                <Flex
                                                    align="center"
                                                    justify="center"
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        backgroundColor: step.status === 'completed' ? 'var(--gray-12)' : step.status === 'current' ? 'var(--color-panel-solid)' : 'var(--gray-3)',
                                                        color: step.status === 'completed' ? 'var(--gray-1)' : step.status === 'current' ? 'var(--gray-12)' : 'var(--gray-8)',
                                                        border: step.status === 'current' ? '2px solid var(--gray-12)' : '4px solid var(--color-page-background)',
                                                        boxShadow: step.status === 'current' ? '0 0 0 4px var(--color-page-background)' : 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    {step.status === 'completed' ? <CheckCircledIcon width="16" height="16" /> :
                                                        step.status === 'current' ? <Box style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'currentColor' }} /> :
                                                            <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }} />}
                                                </Flex>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Text size="2" weight="bold" color={step.status === 'completed' || step.status === 'current' ? 'gray' : 'gray'} style={{ color: step.status === 'pending' ? 'var(--gray-8)' : 'var(--gray-12)' }}>
                                                        {step.name.split(' ')[0]}
                                                    </Text>
                                                    <Text as="div" size="1" color="gray" style={{ marginTop: '2px' }}>
                                                        {step.name.split(' ').slice(1).join(' ')}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Card size="2">
                            <Flex align="center" justify="between" width="100%">
                                <Flex align="center" gap="6" style={{ overflowX: 'auto', flex: 1, paddingBottom: 0 }}>
                                    {[
                                        { label: 'TOTAL SKUs', value: '450' },
                                        { label: 'AVAILABLE', value: '400' },
                                        { label: 'LOW STOCK', value: '15', color: 'var(--orange-9)' },
                                        { label: 'OUT OF STOCK', value: '8', color: 'var(--red-9)' },
                                    ].map((stat, i) => (
                                        <Flex key={i} align="center" gap="2" style={{ minWidth: 'max-content' }}>
                                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase' }}>{stat.label}:</Text>
                                            <Text size="4" weight="bold" style={{ lineHeight: 1, color: stat.color }}>{stat.value}</Text>
                                            {i < 3 && <Separator orientation="vertical" style={{ height: '24px', margin: '0 12px' }} />}
                                        </Flex>
                                    ))}
                                </Flex>

                                <Flex align="center" gap="3" style={{ marginLeft: 'auto', marginRight: '16px' }} display={{ initial: 'none', sm: 'flex' }}>
                                    <Flex direction="column" align="end" gap="0">
                                        <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase' }}>Current Phase</Text>
                                        <Text size="2" weight="bold">Item List Viewing</Text>
                                    </Flex>
                                    <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--gray-12)', backgroundColor: 'var(--color-background)' }}>
                                        <Box style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--gray-12)' }} />
                                    </Flex>
                                </Flex>

                                <Separator orientation="vertical" style={{ height: '32px', margin: '0 16px', display: 'block' }} />
                                <Button
                                    variant="ghost"
                                    color="gray"
                                    onClick={() => setIsSummaryExpanded(true)}
                                    style={{ height: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer' }}
                                >
                                    <ChevronDownIcon />
                                    <Text size="1" weight="medium">Show Details</Text>
                                </Button>
                            </Flex>
                        </Card>
                    )}
                </Box>

                <Tabs.Root defaultValue="order-info" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Box mb="4" px="6">
                        <Tabs.List>
                            <Tabs.Trigger value="order-info" style={{ fontSize: '16px', fontWeight: 500 }}>Order Info</Tabs.Trigger>
                            <Tabs.Trigger value="activity" style={{ fontSize: '16px', fontWeight: 500 }}>Activity Stream</Tabs.Trigger>
                        </Tabs.List>
                    </Box>



                    <Tabs.Content value="order-info" style={{ flexDirection: "column" }}>
                        {/* Split View */}
                        <Grid columns="12" gap="6" style={{ padding: '24px' }}>
                            {/* Left Panel: List */}
                            <Box style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column' }}>
                                <Card size="3" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                                    <Flex align="center" justify="between" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <Flex gap="3" style={{ flex: 1 }}>
                                            <TextField.Root placeholder="Search SKU, Product Name...">
                                                <TextField.Slot><MagnifyingGlassIcon height="16" width="16" /></TextField.Slot>
                                            </TextField.Root>
                                        </Flex>
                                        <Flex gap="2">
                                            <Button variant="soft" color="gray">All Materials <ChevronDownIcon /></Button>
                                            <Button variant="soft" color="gray">Stock Status <ChevronDownIcon /></Button>
                                        </Flex>
                                    </Flex>

                                    <Box style={{}}>
                                        <Table.Root>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeaderCell width="32px"><Checkbox /></Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>SKU ID</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>IMAGE</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>PRODUCT NAME</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>PROPERTIES</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>STOCK LEVEL</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>STATUS</Table.ColumnHeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {items.map((item) => (
                                                    <Table.Row
                                                        key={item.id}
                                                        style={{
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            backgroundColor: selectedItem.id === item.id ? 'var(--accent-4)' : 'transparent',
                                                            boxShadow: selectedItem.id === item.id ? 'inset 3px 0 0 0 var(--accent-9)' : 'none'
                                                        }}
                                                        className="hover:bg-gray-2"
                                                        onClick={() => setSelectedItem(item)}
                                                    >
                                                        <Table.Cell><Checkbox /></Table.Cell>
                                                        <Table.Cell><Text weight="medium" size="1">{item.id}</Text></Table.Cell>
                                                        <Table.Cell>
                                                            <Box style={{ width: '32px', height: '32px', backgroundColor: 'var(--gray-4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <ComponentPlaceholderIcon color="gray" />
                                                            </Box>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Box>
                                                                <Flex align="center" gap="2">
                                                                    <Text as="div" weight="bold" size="2">{item.name}</Text>
                                                                    {(item as any).aiStatus && (
                                                                        <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: (item as any).aiStatus === 'warning' ? 'var(--orange-9)' : 'var(--blue-9)', boxShadow: `0 0 0 2px ${(item as any).aiStatus === 'warning' ? 'var(--orange-5)' : 'var(--blue-5)'}` }} />
                                                                    )}
                                                                </Flex>
                                                                <Text as="div" size="1" color="gray">{item.category}</Text>
                                                            </Box>
                                                        </Table.Cell>
                                                        <Table.Cell><Text size="2">{item.properties}</Text></Table.Cell>
                                                        <Table.Cell>
                                                            <Flex align="center" gap="2">
                                                                <Progress.Root value={(item.stock / 600) * 100} style={{ width: '60px', height: '4px', backgroundColor: 'var(--gray-4)', borderRadius: '999px', overflow: 'hidden' }}>
                                                                    <Progress.Indicator style={{ width: '100%', height: '100%', backgroundColor: 'var(--gray-12)', transform: `translateX(-${100 - ((item.stock / 600) * 100)}%)` }} />
                                                                </Progress.Root>
                                                                <Text size="1">{Math.floor((item.stock / 600) * 100)}%</Text>
                                                            </Flex>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Badge color={item.statusColor} variant="solid" radius="full">{item.status}</Badge>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table.Root>
                                    </Box>
                                </Card>
                            </Box>

                            {/* Right Panel: Details */}
                            <Box style={{ gridColumn: 'span 4' }}>
                                <Card size="3" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                                    <Box style={{}}>
                                        <Box p="4" style={{}}>
                                            <Flex justify="between" align="center" mb="4" pb="4" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                                                <Heading size="3">Item Details</Heading>
                                                <Flex align="center" gap="1">
                                                    <IconButton variant="ghost" color="gray" style={{ cursor: 'pointer' }} onClick={() => setIsDocumentModalOpen(true)}><Pencil1Icon /></IconButton>
                                                    <Button size="1" variant="ghost" color="gray"><DownloadIcon /></Button>
                                                    <Button size="1" variant="ghost" color="gray"><PaperPlaneIcon /></Button>
                                                    <Button size="1" variant="ghost" style={{ color: 'var(--purple-9)', position: 'relative' }} onClick={() => setIsAiOpen(true)}>
                                                        <MagicWandIcon />
                                                        <Box style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--purple-9)', border: '1px solid var(--color-background)' }} />
                                                    </Button>
                                                    <Separator orientation="vertical" style={{ height: '16px', margin: '0 4px' }} />
                                                    <Button size="1" variant="ghost" color="gray"><DotsHorizontalIcon /></Button>
                                                </Flex>
                                            </Flex>

                                            <Flex direction="column" gap="5">
                                                {/* AI Side Panel Section */}
                                                {(selectedItem as any).aiStatus && (
                                                    <Box>
                                                        <Flex
                                                            align="center"
                                                            justify="between"
                                                            mb="2"
                                                            style={{ cursor: 'pointer', userSelect: 'none' }}
                                                            onClick={() => toggleSection('aiSuggestions')}
                                                        >
                                                            <Flex align="center" gap="2">
                                                                <MagicWandIcon style={{ color: 'var(--purple-9)' }} />
                                                                <Text size="1" weight="bold" style={{ color: 'var(--gray-12)' }}>AI Suggestions</Text>
                                                                <Box style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                                                                    <Box style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--purple-9)', opacity: 0.75, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                                                                    <Box style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--purple-9)' }} />
                                                                </Box>
                                                            </Flex>
                                                            <ChevronDownIcon style={{ transform: sections.aiSuggestions ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                                                        </Flex>

                                                        {sections.aiSuggestions && (
                                                            <>
                                                                {(selectedItem as any).aiStatus === 'info' ? (
                                                                    <Card variant="surface" style={{ backgroundColor: 'var(--blue-3)', borderColor: 'var(--blue-6)' }}>
                                                                        <Text size="2" weight="bold" style={{ color: 'var(--blue-11)', marginBottom: '8px', display: 'block' }}>Optimization Opportunity</Text>
                                                                        <Flex direction="column" gap="2">

                                                                            {/* Option 1 */}
                                                                            <Box style={{ padding: '8px', backgroundColor: 'var(--color-background)', border: '1px solid var(--gray-6)', borderRadius: '4px', cursor: 'pointer' }}>
                                                                                <Flex gap="2">
                                                                                    <Box style={{ marginTop: '2px', width: '12px', height: '12px', borderRadius: '50%', border: '1px solid var(--gray-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <Box style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'transparent' }} />
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Text as="div" size="2" weight="medium">Standard {selectedItem.name}</Text>
                                                                                        <Text as="div" size="1" color="gray">Listed Price</Text>
                                                                                    </Box>
                                                                                </Flex>
                                                                            </Box>

                                                                            {/* Option 2 */}
                                                                            <Box style={{ padding: '8px', backgroundColor: 'var(--color-background)', border: '1px solid var(--green-8)', borderRadius: '4px', cursor: 'pointer' }}>
                                                                                <Flex gap="2">
                                                                                    <Box style={{ marginTop: '2px', width: '12px', height: '12px', borderRadius: '50%', border: '1px solid var(--green-9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <Box style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--green-9)' }} />
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Text as="div" size="2" weight="medium" style={{ color: 'var(--green-11)' }}>Eco-Friendly {selectedItem.name}</Text>
                                                                                        <Text as="div" size="1" color="gray">-15% Carbon Footprint</Text>
                                                                                    </Box>
                                                                                </Flex>
                                                                            </Box>

                                                                            {/* Option 3 */}
                                                                            <Box style={{ padding: '8px', backgroundColor: 'var(--color-background)', border: '1px solid var(--gray-6)', borderRadius: '4px', cursor: 'pointer' }}>
                                                                                <Flex gap="2">
                                                                                    <Box style={{ marginTop: '2px', width: '12px', height: '12px', borderRadius: '50%', border: '1px solid var(--gray-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                                    <Box>
                                                                                        <Text as="div" size="2" weight="medium" style={{ color: 'var(--purple-11)' }}>Premium {selectedItem.name}</Text>
                                                                                        <Text as="div" size="1" color="gray">+ High Durability Finish</Text>
                                                                                    </Box>
                                                                                </Flex>
                                                                            </Box>

                                                                            <Button style={{ width: '100%', marginTop: '4px', backgroundColor: 'var(--blue-9)', color: 'white', cursor: 'pointer' }}>Apply Selection</Button>
                                                                        </Flex>
                                                                    </Card>
                                                                ) : (
                                                                    /* Data Fix / Warning */
                                                                    <Card variant="surface" style={{ backgroundColor: 'var(--orange-3)', borderColor: 'var(--orange-6)' }}>
                                                                        <Flex gap="3">
                                                                            <ExclamationTriangleIcon style={{ color: 'var(--orange-9)', width: '20px', height: '20px', flexShrink: 0 }} />
                                                                            <Box style={{ width: '100%' }}>
                                                                                <Flex justify="between" align="start">
                                                                                    <Box>
                                                                                        <Text as="div" size="2" weight="bold" style={{ color: 'var(--orange-11)' }}>Database Discrepancy</Text>
                                                                                        <Text as="div" size="1" style={{ color: 'var(--orange-10)', marginTop: '4px' }}>Stock count mismatch detected.</Text>
                                                                                    </Box>
                                                                                    {!isManualFixMode && (
                                                                                        <Button
                                                                                            size="1"
                                                                                            variant="ghost"
                                                                                            style={{ color: 'var(--orange-11)', textDecoration: 'underline', cursor: 'pointer' }}
                                                                                            onClick={() => setIsManualFixMode(true)}
                                                                                        >
                                                                                            Resolve Manually
                                                                                        </Button>
                                                                                    )}
                                                                                </Flex>

                                                                                {!isManualFixMode ? (
                                                                                    <>
                                                                                        <Flex align="center" justify="between" mt="2" mb="3" px="2" style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '4px', padding: '8px' }}>
                                                                                            <Box style={{ textAlign: 'center' }}>
                                                                                                <Text as="div" size="1" color="gray" style={{ textTransform: 'uppercase' }}>Local</Text>
                                                                                                <Text as="div" size="3" weight="bold">{selectedItem.stock}</Text>
                                                                                            </Box>
                                                                                            <UpdateIcon style={{ color: 'var(--gray-8)' }} />
                                                                                            <Box style={{ textAlign: 'center' }}>
                                                                                                <Text as="div" size="1" color="gray" style={{ textTransform: 'uppercase' }}>Remote</Text>
                                                                                                <Text as="div" size="3" weight="bold" style={{ color: 'var(--orange-11)' }}>{(selectedItem.stock || 0) + 5}</Text>
                                                                                            </Box>
                                                                                        </Flex>

                                                                                        <Button style={{ width: '100%', backgroundColor: 'var(--orange-9)', color: 'white', cursor: 'pointer' }}>Auto-Sync to Warehouse</Button>
                                                                                    </>
                                                                                ) : (
                                                                                    <Box mt="3">
                                                                                        <RadioGroup.Root value={resolutionMethod} onValueChange={(val: any) => setResolutionMethod(val)}>
                                                                                            <Flex direction="column" gap="2">
                                                                                                <Box style={{ padding: '8px', backgroundColor: resolutionMethod === 'local' ? 'var(--color-background)' : 'transparent', border: resolutionMethod === 'local' ? '1px solid var(--orange-9)' : '1px solid transparent', borderRadius: '4px' }}>
                                                                                                    <RadioGroup.Item value="local" style={{ cursor: 'pointer' }}>
                                                                                                        <Box ml="2">
                                                                                                            <Text size="2" weight="bold">Keep Local Value</Text>
                                                                                                            <Text as="div" size="1" color="gray">{selectedItem.stock} items</Text>
                                                                                                        </Box>
                                                                                                    </RadioGroup.Item>
                                                                                                </Box>
                                                                                                <Box style={{ padding: '8px', backgroundColor: resolutionMethod === 'remote' ? 'var(--color-background)' : 'transparent', border: resolutionMethod === 'remote' ? '1px solid var(--orange-9)' : '1px solid transparent', borderRadius: '4px' }}>
                                                                                                    <RadioGroup.Item value="remote" style={{ cursor: 'pointer' }}>
                                                                                                        <Box ml="2">
                                                                                                            <Text size="2" weight="bold">Accept Warehouse Value</Text>
                                                                                                            <Text as="div" size="1" color="gray">{(selectedItem.stock || 0) + 5} items</Text>
                                                                                                        </Box>
                                                                                                    </RadioGroup.Item>
                                                                                                </Box>
                                                                                                <Box style={{ padding: '8px', backgroundColor: resolutionMethod === 'custom' ? 'var(--color-background)' : 'transparent', border: resolutionMethod === 'custom' ? '1px solid var(--orange-9)' : '1px solid transparent', borderRadius: '4px' }}>
                                                                                                    <RadioGroup.Item value="custom" style={{ cursor: 'pointer' }}>
                                                                                                        <Box ml="2">
                                                                                                            <Text size="2" weight="bold">Custom Value</Text>
                                                                                                            {resolutionMethod === 'custom' && (
                                                                                                                <TextField.Root
                                                                                                                    size="1"
                                                                                                                    placeholder="#"
                                                                                                                    style={{ marginTop: '4px', width: '80px' }}
                                                                                                                    value={customValue}
                                                                                                                    onChange={(e) => setCustomValue(e.target.value)}
                                                                                                                />
                                                                                                            )}
                                                                                                        </Box>
                                                                                                    </RadioGroup.Item>
                                                                                                </Box>
                                                                                            </Flex>
                                                                                        </RadioGroup.Root>

                                                                                        <Flex gap="2" mt="3">
                                                                                            <Button variant="soft" color="gray" style={{ flex: 1, cursor: 'pointer' }} onClick={() => setIsManualFixMode(false)}>Cancel</Button>
                                                                                            <Button
                                                                                                style={{ flex: 1, backgroundColor: 'var(--orange-9)', color: 'white', cursor: 'pointer' }}
                                                                                                onClick={() => {
                                                                                                    alert(`Fixed with: ${resolutionMethod === 'custom' ? customValue : (resolutionMethod === 'remote' ? (selectedItem.stock + 5) : selectedItem.stock)}`)
                                                                                                    setIsManualFixMode(false)
                                                                                                }}
                                                                                            >
                                                                                                Confirm Fix
                                                                                            </Button>
                                                                                        </Flex>
                                                                                    </Box>
                                                                                )}
                                                                            </Box>
                                                                        </Flex>
                                                                    </Card>
                                                                )}
                                                            </>
                                                        )}
                                                    </Box>
                                                )}

                                                {/* Product Overview */}
                                                <Flex direction="column" gap="2">
                                                    <Flex
                                                        justify="between"
                                                        align="center"
                                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                                        onClick={() => toggleSection('productOverview')}
                                                    >
                                                        <Text size="2" weight="medium">Product Overview</Text>
                                                        <ChevronDownIcon style={{ transform: sections.productOverview ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                                                    </Flex>
                                                    {sections.productOverview && (
                                                        <>
                                                            <Box style={{ aspectRatio: '16/9', backgroundColor: 'var(--gray-4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <ComponentPlaceholderIcon width="48" height="48" color="gray" />
                                                            </Box>
                                                            <Box>
                                                                <Heading size="3">{selectedItem.name}</Heading>
                                                                <Text size="1" color="gray">{selectedItem.id}</Text>
                                                                <Flex gap="2" mt="2">
                                                                    <Badge variant="soft" color={selectedItem.statusColor}>{selectedItem.status}</Badge>
                                                                    <Badge variant="outline" color="gray">Premium</Badge>
                                                                </Flex>
                                                            </Box>
                                                        </>
                                                    )}
                                                </Flex>

                                                <Separator size="4" />

                                                {/* Lifecycle */}
                                                <Flex direction="column" gap="2">
                                                    <Flex
                                                        justify="between"
                                                        align="center"
                                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                                        onClick={() => toggleSection('lifecycle')}
                                                    >
                                                        <Text size="2" weight="medium">Lifecycle Status</Text>
                                                        <ChevronDownIcon style={{ transform: sections.lifecycle ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                                                    </Flex>
                                                    {sections.lifecycle && (
                                                        <Box style={{ paddingLeft: '16px', borderLeft: '1px solid var(--gray-4)' }}>
                                                            {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                                                <Box key={i} position="relative" pb="4">
                                                                    <Box style={{ position: 'absolute', left: '-20.5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gray-12)' }} />
                                                                    <Text as="div" size="2" weight="medium">{step}</Text>
                                                                    <Text as="div" size="1" color="gray">Completed Jan {5 + i * 5}, 2025</Text>
                                                                </Box>
                                                            ))}
                                                            <Box position="relative" pb="4">
                                                                <Box style={{ position: 'absolute', left: '-22.5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid var(--gray-12)', backgroundColor: 'white' }} />
                                                                <Text as="div" size="2" weight="medium">Warehouse Storage</Text>
                                                                <Text as="div" size="1" color="gray">In Progress</Text>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Flex>

                                                <Separator size="4" />

                                                {/* Action Required */}
                                                <Flex direction="column" gap="2">
                                                    <Text size="2" weight="medium">Action Required</Text>
                                                    <Box style={{ paddingLeft: '16px', borderLeft: '1px solid var(--gray-4)' }}>
                                                        <Flex direction="column" gap="2">
                                                            <Button
                                                                style={{ width: '100%', backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)', cursor: 'pointer' }}
                                                                onClick={() => setIsPOModalOpen(true)}
                                                            >
                                                                Create Purchase Order
                                                            </Button>
                                                            <Button variant="outline" color="gray" style={{ width: '100%', cursor: 'pointer' }}>
                                                                Send Acknowledgment
                                                            </Button>
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    </Tabs.Content>

                    <Tabs.Content value="activity" style={{ display: 'flex', flexDirection: "column", minHeight: '800px' }}>
                        <Flex style={{ flexDirection: 'row', flex: 1 }}>
                            {/* Chat Area */}
                            <Flex direction="column" style={{ flex: 1, borderRight: '1px solid var(--gray-5)' }}>
                                {/* Header */}
                                <Box p="4" style={{ backgroundColor: 'var(--gray-2)', borderBottom: '1px solid var(--gray-5)', flexShrink: 0 }}>
                                    <Flex justify="between" align="center">
                                        <Box>
                                            <Flex gap="2" align="center">
                                                <Heading size="3" mb="1" color="gray">Activity Stream</Heading>
                                                <Badge variant="soft" color="gray" radius="full">#ORD-2055</Badge>
                                            </Flex>
                                            <Text size="1" color="gray">Real-time updates and collaboration</Text>
                                        </Box>
                                        <Flex gap="3" align="center">
                                            <Flex gap="1" style={{ marginLeft: '-8px' }}>
                                                {collaborators.map((c, i) => (
                                                    <Avatar
                                                        key={i}
                                                        size="1"
                                                        variant="solid"
                                                        radius="full"
                                                        src={c.avatar === 'AI' ? undefined : c.avatar}
                                                        fallback={c.avatar === 'AI' ? <MagicWandIcon /> : c.name[0]}
                                                        style={{
                                                            border: '2px solid var(--color-background)',
                                                            marginLeft: '-8px',
                                                            backgroundColor: c.avatar === 'AI' ? 'var(--purple-9)' : undefined,
                                                            color: 'white'
                                                        }}
                                                    />
                                                ))}
                                            </Flex>
                                            <IconButton size="1" variant="ghost" radius="full" style={{ border: '1px solid var(--gray-6)' }}>
                                                <PlusIcon width="14" height="14" />
                                            </IconButton>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <Box p="4" style={{}}>
                                    <Flex direction="column" gap="4">
                                        <Flex justify="center">
                                            <Badge variant="surface" color="gray" radius="full">
                                                Today, 9:23 AM
                                            </Badge>
                                        </Flex>
                                        {/* Assuming messages array is defined here or above */}
                                        {/* Example messages array structure (for context, not part of the actual code document)
                                        const messages = [
                                            { id: 1, sender: "System", content: "System updated order status to 'Pending Review'", time: "9:23 AM", type: "system" },
                                            { id: 2, sender: "John Doe", avatar: "/user-avatar.png", content: "Can someone confirm the stock for SKU-OFF-2025-003?", time: "9:25 AM", type: "user" },
                                            { id: 3, sender: "AI Assistant", avatar: "AI", content: "The current stock for SKU-OFF-2025-003 is 37 units. There's a discrepancy with the warehouse log showing 42 units. Would you like me to reconcile?", time: "9:26 AM", type: "ai" },
                                            { id: 4, sender: "John Doe", avatar: "/user-avatar.png", content: "Yes, please reconcile and generate a new purchase order if needed.", time: "9:27 AM", type: "user" },
                                            { id: 5, sender: "AI Assistant", avatar: "AI", content: "Reconciling stock and preparing purchase order. This may take a moment.", time: "9:28 AM", type: "ai" },
                                            {
                                                id: 6,
                                                sender: "AI Assistant",
                                                content: "Processing stock reconciliation and purchase order generation.",
                                                time: "Just now",
                                                type: "action_processing",
                                            },
                                            {
                                                id: 7,
                                                sender: "AI Assistant",
                                                avatar: "AI",
                                                content: "Analysis complete. I've generated the revised Purchase Order and updated the stock database.",
                                                time: "Just now",
                                                type: "action_success",
                                            }
                                        ]
                                        */}

                                        {messages.map((msg) => (
                                            <Flex key={msg.id} gap="3" justify={msg.type === 'user' ? 'end' : 'start'}>
                                                {msg.type !== 'user' && (
                                                    msg.type === 'system' ? (
                                                        <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--gray-4)' }}>
                                                            <UpdateIcon />
                                                        </Flex>
                                                    ) : msg.type === 'action_processing' ? (
                                                        <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--blue-3)', border: '1px solid var(--blue-6)' }}>
                                                            <FileTextIcon color="var(--blue-11)" />
                                                        </Flex>
                                                    ) : msg.type === 'action_success' ? (
                                                        <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--green-3)', border: '1px solid var(--green-6)' }}>
                                                            <CheckIcon color="var(--green-11)" />
                                                        </Flex>
                                                    ) : (
                                                        <Avatar
                                                            size="2"
                                                            fallback={msg.type === 'ai' ? <MagicWandIcon /> : <PersonIcon />}
                                                            radius="full"
                                                            style={msg.type === 'ai' ? { backgroundColor: 'var(--purple-9)', color: 'white' } : {}}
                                                            src={msg.avatar}
                                                        />
                                                    )
                                                )}

                                                <Box style={{ maxWidth: '85%' }}>
                                                    {msg.type === 'system' ? (
                                                        <Text size="2" color="gray">
                                                            <Text weight="bold">{msg.sender}</Text> {typeof msg.content === 'string' ? msg.content.replace('System ', '') : msg.content}
                                                        </Text>
                                                    ) : msg.type === 'action_processing' ? (
                                                        <Card size="1" style={{ backgroundColor: 'var(--blue-2)', borderColor: 'var(--blue-6)' }}>
                                                            <Flex justify="between" align="center" mb="1">
                                                                <Text size="2" weight="bold" style={{ color: 'var(--blue-11)' }}>{msg.sender}</Text>
                                                                <Text size="1" color="gray">{msg.time}</Text>
                                                            </Flex>
                                                            <Flex align="center" gap="2" mb="2">
                                                                <Badge variant="outline" color="blue" radius="full">Action</Badge>
                                                            </Flex>
                                                            <Text size="2" style={{ color: 'var(--gray-12)' }}>{msg.content}</Text>
                                                            <Flex align="center" gap="2" mt="3" style={{ padding: '8px', backgroundColor: 'var(--color-background)', borderRadius: '6px', border: '1px solid var(--blue-4)' }}>
                                                                <UpdateIcon style={{ animation: 'spin 1s linear infinite' }} color="var(--blue-9)" />
                                                                <Text size="1" weight="medium" style={{ color: 'var(--blue-9)' }}>Processing request...</Text>
                                                            </Flex>
                                                        </Card>
                                                    ) : msg.type === 'action_success' ? (
                                                        <DiscrepancyActionCard msg={msg} />
                                                    ) : (
                                                        <Card size="1" style={{ backgroundColor: msg.type === 'user' ? 'var(--gray-4)' : msg.type === 'ai' ? 'var(--purple-3)' : 'var(--card-background-color)' }}>
                                                            <Flex justify="between" align="center" mb="1">
                                                                <Text size="2" weight="bold" style={{ display: 'block', color: msg.type === 'ai' ? 'var(--purple-11)' : 'inherit' }}>
                                                                    {msg.sender}
                                                                </Text>
                                                                <Text size="1" color="gray">{msg.time}</Text>
                                                            </Flex>
                                                            <Text size="2" style={{ color: 'var(--gray-12)' }}>
                                                                {msg.content}
                                                            </Text>
                                                            {msg.type === 'ai' && (
                                                                <Flex gap="2" mt="2">
                                                                    <Button size="1" variant="soft" color="purple">Create Task</Button>
                                                                    <Button size="1" variant="ghost" color="purple">Dismiss</Button>
                                                                </Flex>
                                                            )}
                                                        </Card>
                                                    )}
                                                </Box>

                                                {msg.type === 'user' && (
                                                    <Avatar
                                                        size="2"
                                                        fallback="JD"
                                                        radius="full"
                                                        color="indigo"
                                                        src="/user-avatar.png"
                                                    />
                                                )}
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>

                                {/* Input Area */}
                                <Box p="4" style={{ position: 'sticky', bottom: '16px', margin: '0 16px', borderRadius: '16px', backgroundColor: 'var(--gray-2)', border: '1px solid var(--gray-5)', boxShadow: 'var(--shadow-4)', zIndex: 10, flexShrink: 0 }}>
                                    <Flex gap="3">
                                        <Box style={{ position: 'relative', flex: 1 }}>
                                            <TextField.Root placeholder="Type a message or use @ to mention..." variant="soft" radius="large" size="3">
                                                <TextField.Slot></TextField.Slot>
                                                <TextField.Slot>
                                                    <IconButton variant="ghost" color="gray" radius="full" size="1">
                                                        <Link2Icon width="16" height="16" />
                                                    </IconButton>
                                                </TextField.Slot>
                                            </TextField.Root>
                                        </Box>
                                        <IconButton size="3" variant="solid" color="gray" radius="large">
                                            <PaperPlaneIcon width="18" height="18" />
                                        </IconButton>
                                    </Flex>
                                </Box>
                            </Flex>

                            {/* Contextual Quick Actions Sidebar */}
                            <Flex direction="column" style={{ width: '300px', borderLeft: '1px solid var(--gray-5)', backgroundColor: 'var(--gray-2)', height: '100%', animation: 'slideIn 0.5s ease-out' }}>
                                <Box p="4" style={{ backgroundColor: 'var(--gray-3)', borderBottom: '1px solid var(--gray-5)' }}>
                                    <Flex justify="between" align="center" mb="2">
                                        <Text size="1" weight="bold" style={{ color: 'var(--gray-11)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Context</Text>
                                        <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--orange-9)', boxShadow: '0 0 0 2px var(--orange-4)' }} />
                                    </Flex>
                                    <Flex align="center" gap="3">
                                        <Flex align="center" justify="center" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--orange-3)', border: '1px solid var(--orange-5)' }}>
                                            <UpdateIcon color="var(--orange-11)" width="20" height="20" />
                                        </Flex>
                                        <Box>
                                            <Text as="div" size="2" weight="bold" style={{ color: 'var(--gray-12)' }}>Pending Review</Text>
                                            <Text as="div" size="1" color="gray">Waiting for Final Approval (2/3)</Text>
                                        </Box>
                                    </Flex>
                                </Box>

                                <Box p="4" style={{ flex: 1, overflowY: 'auto' }}>
                                    <Box mb="6">
                                        <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                                            Suggested Actions
                                        </Text>

                                        <Flex direction="column" gap="3">
                                            <Button variant="outline" style={{ height: 'auto', padding: '12px', justifyContent: 'flex-start', backgroundColor: 'var(--card-background-color)', borderColor: 'var(--gray-6)', cursor: 'pointer' }} className="hover:border-blue-8 hover:shadow-sm transition-all">
                                                <Flex gap="3" align="start" style={{ width: '100%' }}>
                                                    <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--blue-3)', flexShrink: 0 }}>
                                                        <FileTextIcon color="var(--blue-11)" width="16" height="16" />
                                                    </Flex>
                                                    <Box style={{ textAlign: 'left' }}>
                                                        <Text as="div" size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>Process Quote</Text>
                                                        <Text as="div" size="1" color="gray">Analyze PDF & Extract Data</Text>
                                                    </Box>
                                                </Flex>
                                            </Button>

                                            <Button variant="outline" style={{ height: 'auto', padding: '12px', justifyContent: 'flex-start', backgroundColor: 'var(--card-background-color)', borderColor: 'var(--gray-6)', cursor: 'pointer' }} className="hover:border-green-8 hover:shadow-sm transition-all">
                                                <Flex gap="3" align="start" style={{ width: '100%' }}>
                                                    <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--green-3)', flexShrink: 0 }}>
                                                        <CheckIcon color="var(--green-11)" width="16" height="16" />
                                                    </Flex>
                                                    <Box style={{ textAlign: 'left' }}>
                                                        <Text as="div" size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>Approve Order</Text>
                                                        <Text as="div" size="1" color="gray">Move to Production</Text>
                                                    </Box>
                                                </Flex>
                                            </Button>

                                            <Button variant="outline" style={{ height: 'auto', padding: '12px', justifyContent: 'flex-start', backgroundColor: 'var(--card-background-color)', borderColor: 'var(--gray-6)', cursor: 'pointer' }} className="hover:border-orange-8 hover:shadow-sm transition-all">
                                                <Flex gap="3" align="start" style={{ width: '100%' }}>
                                                    <Flex align="center" justify="center" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--orange-3)', flexShrink: 0 }}>
                                                        <Pencil1Icon color="var(--orange-11)" width="16" height="16" />
                                                    </Flex>
                                                    <Box style={{ textAlign: 'left' }}>
                                                        <Text as="div" size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>Request Changes</Text>
                                                        <Text as="div" size="1" color="gray">Send feedback to vendor</Text>
                                                    </Box>
                                                </Flex>
                                            </Button>
                                        </Flex>
                                    </Box>

                                    <Box>
                                        <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                                            Live Updates
                                        </Text>
                                        <Box p="3" style={{ backgroundColor: 'var(--blue-3)', borderRadius: '12px', border: '1px solid var(--blue-5)' }}>
                                            <Flex gap="2">
                                                <Flex align="center" justify="center" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--blue-4)', flexShrink: 0, position: 'relative' }}>
                                                    <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--blue-11)', position: 'relative', zIndex: 1 }} />
                                                    <Box style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--blue-9)', opacity: 0.3, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                                                </Flex>
                                                <Box>
                                                    <Text as="div" size="1" weight="medium" style={{ color: 'var(--blue-11)' }}>AI Assistant is processing...</Text>
                                                    <Text as="div" size="1" style={{ color: 'var(--blue-10)', fontSize: '10px' }}>Estimated completion: 30s</Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box p="4" style={{ borderTop: '1px solid var(--gray-5)', backgroundColor: 'var(--gray-3)' }}>
                                    <Button variant="ghost" color="gray" style={{ width: '100%', justifyContent: 'center' }}>
                                        View Activity Log <ArrowRightIcon style={{ marginLeft: '4px' }} />
                                    </Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </Tabs.Content>
                </Tabs.Root>
            </Flex >

            <Dialog.Root open={isAiOpen} onOpenChange={setIsAiOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>
                        <Flex align="center" gap="2">
                            <MagicWandIcon color="var(--purple-9)" />
                            AI Diagnosis & Suggestions
                        </Flex>
                    </Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Review AI-detected improvements for this item.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        {/* Informative Suggestion */}
                        <Box style={{ backgroundColor: 'var(--blue-3)', border: '1px solid var(--blue-6)', borderRadius: 'var(--radius-3)', padding: '12px' }}>
                            <Flex gap="3">
                                <InfoCircledIcon color="var(--blue-9)" width="20" height="20" />
                                <Box>
                                    <Text weight="bold" size="2" color="blue">Category Ambiguity</Text>
                                    <Text size="1" color="blue" mt="1">
                                        The item '{selectedItem.name}' matches patterns for both 'Office' and 'Home' categories. Please verify classification.
                                    </Text>
                                    <Flex gap="2" mt="2">
                                        <Button size="1" variant="soft" color="blue">Keep 'Office'</Button>
                                        <Button size="1" variant="soft" color="blue">Move to 'Home'</Button>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>

                        {/* Data Fix Suggestion */}
                        <Box style={{ backgroundColor: 'var(--orange-3)', border: '1px solid var(--orange-6)', borderRadius: 'var(--radius-3)', padding: '12px' }}>
                            <Flex gap="3">
                                <ExclamationTriangleIcon color="var(--orange-9)" width="20" height="20" />
                                <Box>
                                    <Text weight="bold" size="2" color="orange">Stock Sync Required</Text>
                                    <Text size="1" color="orange" mt="1">
                                        Local stock count ({selectedItem.stock}) differs from Warehouse Log ({(selectedItem.stock || 0) + 5}).
                                    </Text>
                                    <Button size="1" color="orange" mt="2">Synchronize Database</Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Dismiss
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

            <Dialog.Root open={isPOModalOpen} onOpenChange={setIsPOModalOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Create Purchase Order</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Review and confirm the purchase order details.
                    </Dialog.Description>
                    <Flex direction="column" gap="3">
                        <Box style={{ padding: '12px', border: '1px solid var(--gray-6)', borderRadius: '4px', backgroundColor: 'var(--gray-2)' }}>
                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase' }}>Order Summary</Text>
                            <Flex justify="between" mt="2">
                                <Text size="2" weight="medium">{selectedItem.name}</Text>
                                <Text size="2">x 50 Units</Text>
                            </Flex>
                            <Flex justify="between" mt="1">
                                <Text size="1" color="gray">SKU: {selectedItem.id}</Text>
                                <Text size="1" color="gray">@ $45.00/unit</Text>
                            </Flex>
                        </Box>
                        <Flex justify="between" style={{ paddingTop: '8px', borderTop: '1px solid var(--gray-6)' }}>
                            <Text size="2" weight="medium">Total Cost</Text>
                            <Text size="5" weight="bold">$2,250.00</Text>
                        </Flex>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }} onClick={() => { setIsPOModalOpen(false); alert('Purchase Order Created!') }}>Confirm Order</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
            <Dialog.Root open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
                <Dialog.Content style={{ maxWidth: 800 }}>
                    <Dialog.Title>Order Document Preview</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Previewing Purchase Order #PO-2025-001
                    </Dialog.Description>

                    <Box style={{ backgroundColor: 'white', color: 'black', padding: '40px', borderRadius: '4px', height: '600px', overflow: 'auto', border: '1px solid var(--gray-4)' }}>
                        <Flex justify="between" align="end" mb="6" style={{ borderBottom: '2px solid black', paddingBottom: '16px' }}>
                            <Heading size="6">PURCHASE ORDER</Heading>
                            <Box style={{ textAlign: 'right' }}>
                                <Text weight="bold" size="4" as="div">STRATA INC.</Text>
                                <Text size="1" as="div">123 Innovation Dr., Tech City</Text>
                            </Box>
                        </Flex>

                        <Flex justify="between" mb="8">
                            <Box>
                                <Text size="1" weight="bold" color="gray" mb="1" as="div">VENDOR</Text>
                                <Text weight="bold" as="div">OfficeSupplies Co.</Text>
                                <Text size="2" as="div">555 Supplier Lane</Text>
                            </Box>
                            <Box style={{ textAlign: 'right' }}>
                                <Flex justify="between" style={{ width: '200px', marginBottom: '4px' }}>
                                    <Text size="2" weight="bold" color="gray">PO #:</Text>
                                    <Text size="2" weight="bold">PO-2025-001</Text>
                                </Flex>
                                <Flex justify="between" style={{ width: '200px' }}>
                                    <Text size="2" weight="bold" color="gray">DATE:</Text>
                                    <Text size="2">Jan 12, 2026</Text>
                                </Flex>
                            </Box>
                        </Flex>

                        <Box style={{ marginBottom: '32px' }}>
                            <Flex style={{ backgroundColor: '#f0f0f0', padding: '8px', fontWeight: 'bold' }}>
                                <Box style={{ flex: 2 }}>ITEM</Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>QTY</Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>UNIT PRICE</Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>TOTAL</Box>
                            </Flex>
                            <Flex style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                <Box style={{ flex: 2 }}>
                                    <Text weight="bold" as="div">{selectedItem.name}</Text>
                                    <Text size="1" color="gray" as="div">{selectedItem.id}</Text>
                                </Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>50</Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>$45.00</Box>
                                <Box style={{ flex: 1, textAlign: 'right' }}>$2,250.00</Box>
                            </Flex>
                        </Box>

                        <Flex justify="end">
                            <Box style={{ width: '250px' }}>
                                <Flex justify="between" mb="2">
                                    <Text size="2" color="gray">Subtotal:</Text>
                                    <Text size="2" weight="bold">$2,250.00</Text>
                                </Flex>
                                <Flex justify="between" align="center" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                                    <Text size="3" weight="bold">TOTAL:</Text>
                                    <Text size="5" weight="bold" style={{ color: 'var(--blue-9)' }}>$2,250.00</Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">Close</Button>
                        </Dialog.Close>
                        <Button style={{ backgroundColor: 'var(--blue-9)', color: 'white' }}>Download PDF</Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

        </Flex >
    )
}

function NavItem({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <Button
            className={`nav-item ${active ? 'active' : ''}`}
            variant="ghost"
            color={active ? 'indigo' : 'gray'}
            radius="full"
            style={{
                height: '36px',
                padding: '0 16px',
                backgroundColor: active ? 'var(--accent-a3)' : 'transparent',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </Box>
            <span className="nav-item-label" style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
        </Button>
    )
}
