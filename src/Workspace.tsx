import { useState, useRef, useEffect } from 'react'
import {
    Box, Flex, Text, TextField, Button, IconButton, Avatar, Card, ScrollArea, Separator, Heading, Badge,
    Dialog, Table, TextArea
} from '@radix-ui/themes'
import {
    PaperPlaneIcon, MagicWandIcon, ReloadIcon, FileTextIcon, ExclamationTriangleIcon,
    RocketIcon, ActivityLogIcon, SymbolIcon, ArchiveIcon, ReaderIcon,
    ChevronDownIcon, ChevronUpIcon, CrossCircledIcon, PersonIcon, BarChartIcon, CodeIcon,
    CheckCircledIcon, ClockIcon, DownloadIcon, ChevronLeftIcon, BackpackIcon, Pencil1Icon, Link2Icon
} from '@radix-ui/react-icons'
import Navbar from './components/Navbar'

// --- Components ---

interface Order {
    id: string;
    client: string;
    amount: string;
    status: 'pending' | 'urgent';
    details: string;
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
                        <ReloadIcon /> Sync & Report
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
                    <ReloadIcon className="animate-spin" color="blue" />
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

const PendingOrders = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 'ORD-5001', client: 'Alpha Corp', amount: '$12,500', status: 'urgent', details: 'Requires immediate approval for expedited shipping due to stock delay.' },
        { id: 'ORD-5002', client: 'Beta Ltd', amount: '$4,200', status: 'pending', details: 'Standard restock. Verify discount application.' },
        { id: 'ORD-5003', client: 'Gamma Inc', amount: '$8,900', status: 'pending', details: 'New client account. Credit check passed.' },
    ])
    const [expanded, setExpanded] = useState<string | null>(null)
    const [processed, setProcessed] = useState<string[]>([])

    const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id)

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setProcessed(prev => [...prev, id])
        console.log(`Order ${id} ${action}d`)
    }

    const activeOrders = orders.filter(o => !processed.includes(o.id))

    if (activeOrders.length === 0) {
        return (
            <Card style={{ backgroundColor: 'var(--green-3)', padding: '12px' }}>
                <Flex align="center" gap="2">
                    <CheckCircledIcon color="var(--green-11)" />
                    <Text color="green" weight="medium">All pending orders processed!</Text>
                </Flex>
            </Card>
        )
    }

    return (
        <Flex direction="column" gap="2" style={{ width: '100%', maxWidth: '450px' }}>
            <Text size="2" color="gray" weight="bold">Pending Review ({activeOrders.length})</Text>
            {activeOrders.map(order => (
                <Card key={order.id} style={{ padding: 0, overflow: 'hidden' }}>
                    <Box
                        onClick={() => toggleExpand(order.id)}
                        style={{ padding: '12px', cursor: 'pointer', backgroundColor: 'var(--gray-2)' }}
                    >
                        <Flex align="center" justify="between">
                            <Flex align="center" gap="3">
                                <Badge color={order.status === 'urgent' ? 'red' : 'gray'}>{order.status}</Badge>
                                <Box>
                                    <Text size="2" weight="medium" style={{ display: 'block' }}>{order.id} - {order.client}</Text>
                                    <Text size="1" color="gray">{order.amount}</Text>
                                </Box>
                            </Flex>
                            {expanded === order.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Flex>
                    </Box>

                    {expanded === order.id && (
                        <Box style={{ padding: '12px', borderTop: '1px solid var(--gray-5)' }}>
                            <Text size="2" style={{ marginBottom: '12px', display: 'block' }}>{order.details}</Text>
                            <Flex gap="2" justify="end">
                                <Button
                                    size="1" variant="outline" color="red"
                                    onClick={() => handleAction(order.id, 'reject')}
                                >
                                    <CrossCircledIcon /> Request Changes
                                </Button>
                                <Button
                                    size="1" color="green"
                                    onClick={() => handleAction(order.id, 'approve')}
                                >
                                    <CheckCircledIcon /> Approve
                                </Button>
                            </Flex>
                        </Box>
                    )}
                </Card>
            ))}
        </Flex>
    )
}

interface WorkspaceProps {
    onBack: () => void;
    onLogout: () => void;
    onNavigateToWorkspace: () => void;
}

export default function Workspace({ onBack, onLogout, onNavigateToWorkspace }: WorkspaceProps) {
    const [activeTab, setActiveTab] = useState('board')
    const [searchQuery, setSearchQuery] = useState('')

    // --- State ---
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI Copilot. I can help you analyze orders, sync data, or generate reports based on your preferences. How can I assist you today?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Activity Log State
    const [appActivities, setAppActivities] = useState([
        { id: 1, app: 'Inventory', text: "Assets updated in Inventory App (Order #ORD-2054)", time: "10:45 AM", icon: ArchiveIcon },
        { id: 2, app: 'Analytics', text: "Data extracted for Analytics Report", time: "10:15 AM", icon: BarChartIcon },
        { id: 3, app: 'CRM', text: "Client record updated 'TechDealer'", time: "09:30 AM", icon: PersonIcon },
        { id: 4, app: 'Analytics', text: "Report created from Analytics", time: "09:00 AM", icon: FileTextIcon },
    ])

    const [systemLogs, setSystemLogs] = useState([
        { id: 1, text: "System check completed", time: "09:00 AM", type: "system" },
        { id: 2, text: "Inventory data synced", time: "10:15 AM", type: "success" },
        { id: 3, text: "User 'Sarah' logged in", time: "10:30 AM", type: "info" },
    ])

    const [isLogsOpen, setIsLogsOpen] = useState(false)

    // --- Effects ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    // --- Handlers ---
    const addSystemLog = (text: string, type: 'info' | 'success' | 'warning' | 'error' | 'system' = 'info') => {
        const newLog = {
            id: Date.now(),
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type
        }
        setSystemLogs(prev => [newLog, ...prev])
    }

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return

        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        }

        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setInputValue('')
        setIsTyping(true)

        const lowerText = text.toLowerCase()

        if (lowerText.includes('discrep') || lowerText.includes('sync')) {
            simulateDiscrepancyFlow()
        } else if (lowerText.includes('summarize') || lowerText.includes('activity')) {
            simulateSummaryFlow()
        } else if (lowerText.includes('pending') || lowerText.includes('urgent')) {
            simulatePendingOrdersFlow()
        } else {
            setTimeout(() => {
                const responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "I'm tuned to help with specific operational tasks right now. Try asking me to analyze order discrepancies or summarize recent activity.",
                    timestamp: new Date()
                }
                // @ts-ignore
                setMessages(prev => [...prev, responseMsg])
                setIsTyping(false)
            }, 1000)
        }
    }

    const simulatePendingOrdersFlow = () => {
        addSystemLog("Retrieving pending orders", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: `pending-${Date.now()}`,
                role: 'assistant',
                content: <PendingOrders />,
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 1200)
    }

    const simulateSummaryFlow = () => {
        setIsTyping(true)
        setTimeout(() => {
            addSystemLog("Analyzing recent activity...", "system")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-1',
                role: 'assistant',
                content: "I've analyzed the recent activity. There are 3 pending orders and 1 discrepancies found.",
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 1500)
    }

    const simulateDiscrepancyFlow = () => {
        addSystemLog("Started discrepancy analysis", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-1',
                role: 'assistant',
                content: (
                    <Flex align="center" gap="2">
                        <ReloadIcon className="animate-spin" />
                        <Text>Scanning recent orders for "TechDealer Solutions"...</Text>
                        <style>{`
                            @keyframes spin { 100% { transform: rotate(360deg); } }
                            .animate-spin { animation: spin 1s linear infinite; }
                         `}</style>
                    </Flex>
                ),
                timestamp: new Date()
            }])
        }, 1500)

        setTimeout(() => {
            addSystemLog("Found 3 discrepancies", "warning")


            addSystemLog("Started activity summary", "system")
            setTimeout(() => {
                // @ts-ignore
                setMessages(prev => [...prev, {
                    id: 'summary-step-1',
                    role: 'assistant',
                    content: (
                        <Flex align="center" gap="2">
                            <MagicWandIcon className="animate-pulse" color="blue" />
                            <Text>Analyzing recent activity for "TechDealer Solutions"...</Text>
                        </Flex>
                    ),
                    timestamp: new Date()
                }])
            }, 1500)

            setTimeout(() => {
                addSystemLog("Analysis complete: 3 orders found", "success")
                // @ts-ignore
                setMessages(prev => {
                    return [...prev, {
                        id: 'summary-step-2',
                        role: 'assistant',
                        content: (
                            <Flex direction="column" gap="3">
                                <Flex align="center" gap="2">
                                    <FileTextIcon />
                                    <Text weight="bold">Analysis Complete. Found 3 orders under $1M.</Text>
                                </Flex>
                                <Box pl="4">
                                    <Flex direction="column" gap="1">
                                        <Flex align="center" gap="2">
                                            <ExclamationTriangleIcon color="orange" />
                                            <Text size="2" color="gray">Order #ORD-2054: $850k - <Text color="orange" weight="bold">Missing Logistics Provider</Text></Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <ClockIcon />
                                            <Text size="2" color="gray">Order #ORD-2051: $420k - In Transit</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <CheckCircledIcon color="green" />
                                            <Text size="2" color="gray">Order #ORD-2048: $120k - Delivered</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <Text>Order #ORD-2054 needs immediate attention. Shall I assign the default logistics provider and dispatch?</Text>
                            </Flex>
                        ),
                        timestamp: new Date()
                    }]
                })
            }, 3500)
        }, 2000)
    }

    const handleSyncAndReport = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Yes, sync them and generate the report.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Initiated DB Sync", "info")

        setTimeout(() => {
            addSystemLog("Report generated", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-3',
                role: 'assistant',
                content: (
                    <Flex direction="column" gap="3" width="100%">
                        <Flex align="center" gap="2" style={{ color: 'var(--green-9)' }}>
                            <CheckCircledIcon />
                            <Text>Syncing 3 records to Central DB... Done.</Text>
                        </Flex>
                        <Flex align="center" gap="2" style={{ color: 'var(--blue-9)' }}>
                            <FileTextIcon />
                            <Text>Generating Reconciliation Report... Done.</Text>
                        </Flex>

                        <Card style={{ width: '100%', cursor: 'pointer' }}>
                            <Flex align="center" justify="between" gap="3">
                                <Flex align="center" gap="3">
                                    <Flex align="center" justify="center" style={{ width: 40, height: 40, background: 'var(--red-3)', color: 'var(--red-9)', borderRadius: 8 }}>
                                        <FileTextIcon width="20" height="20" />
                                    </Flex>
                                    <Box>
                                        <Text size="2" weight="bold">Reconciliation_Report.pdf</Text>
                                        <Text size="1" color="gray" as="div">1.2 MB • Generated just now</Text>
                                    </Box>
                                </Flex>
                                <Button variant="ghost" size="1">
                                    <DownloadIcon /> Download
                                </Button>
                            </Flex>
                        </Card>
                    </Flex>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    const handleAssignAndDispatch = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Assign provider and dispatch.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Dispatch sequence started", "info")

        setTimeout(() => {
            addSystemLog("Logistics provider assigned", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-step-3',
                role: 'assistant',
                content: (
                    <Flex direction="column" gap="3" width="100%">
                        <Flex align="center" gap="2" style={{ color: 'var(--green-9)' }}>
                            <RocketIcon />
                            <Text>Logistics Provider "FastTrack" assigned.</Text>
                        </Flex>
                        <Flex align="center" gap="2" style={{ color: 'var(--blue-9)' }}>
                            <PaperPlaneIcon />
                            <Text>Dispatch signal sent to warehouse. Order is now processing.</Text>
                        </Flex>
                    </Flex>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    return (
        <Flex direction="column" style={{ height: '100vh', background: 'var(--gray-2)', overflow: 'hidden' }}>
            <Dialog.Root open={isLogsOpen} onOpenChange={setIsLogsOpen}>
                <Dialog.Content style={{ maxWidth: 500 }}>
                    <Dialog.Title>System Logs</Dialog.Title>
                    <Dialog.Description size="2" mb="4" color="gray">
                        Real-time internal system events and background processes.
                    </Dialog.Description>

                    <ScrollArea type="auto" scrollbars="vertical" style={{ maxHeight: 300, paddingRight: 10 }}>
                        <Flex direction="column" gap="2">
                            {systemLogs.map((log) => (
                                <Flex key={log.id} gap="3" align="start" p="2" style={{ borderRadius: 6 }} className="hover:bg-[var(--gray-3)]">
                                    <Box style={{
                                        width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                                        background: log.type === 'success' ? 'var(--green-9)' :
                                            log.type === 'warning' ? 'var(--orange-9)' :
                                                log.type === 'error' ? 'var(--red-9)' : 'var(--blue-9)'
                                    }} />
                                    <Box>
                                        <Text size="2" style={{ fontFamily: 'monospace' }}>{log.text}</Text>
                                        <Text size="1" color="gray">{log.time}</Text>
                                    </Box>
                                </Flex>
                            ))}
                        </Flex>
                    </ScrollArea>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">Close</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

            <Navbar onLogout={() => { }} onNavigateToWorkspace={() => { }} activeTab="Overview" />

            {/* Main Content Container - shifted down for navbar */}
            <Flex direction="column" style={{ flex: 1, paddingTop: 72, height: '100%' }}>

                {/* Horizontal Quick Actions Panel & Status */}
                {/* Horizontal Quick Actions Panel & Status */}
                <Flex align="center" justify="between" px="4" py="3" style={{ borderBottom: '1px solid var(--gray-5)', background: 'var(--color-background)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
                    <Flex align="center" gap="4">
                        <IconButton variant="ghost" color="gray" onClick={onBack}>
                            <ChevronLeftIcon width="20" height="20" />
                        </IconButton>
                        <Heading size="3" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <BackpackIcon color="blue" />
                            My Work Space
                        </Heading>
                    </Flex>

                    <Flex align="center" gap="5">
                        {/* Frequent Actions */}
                        <Flex align="center" gap="3">
                            <Text size="1" color="gray" weight="medium" style={{ display: 'none', '@media (min-width: 1024px)': { display: 'block' } }}>Frequent Actions:</Text>
                            <Flex align="center" gap="2">
                                <Button variant="ghost" color="gray" onClick={() => handleSendMessage("Analyze orders for TechDealer Solutions with discrepancies")}>
                                    <ExclamationTriangleIcon /> Analyze
                                </Button>
                                <Button variant="ghost" color="gray" onClick={() => handleSendMessage("Summarize recent activity")}>
                                    <MagicWandIcon /> Summarize
                                </Button>
                                <Button variant="ghost" color="gray" onClick={() => handleSendMessage("Check inventory levels")}>
                                    <ArchiveIcon /> Inventory
                                </Button>
                            </Flex>
                        </Flex>

                        <Separator orientation="vertical" size="2" style={{ height: 24 }} />

                        {/* Status Buttons */}
                        <Flex align="center" gap="2">
                            <Button variant="solid" color="orange" onClick={() => handleSendMessage("Show pending orders")}>
                                <ExclamationTriangleIcon /> 3 Pending
                            </Button>
                            <Button variant="solid" color="red" onClick={() => handleSendMessage("Show pending orders")}>
                                <ExclamationTriangleIcon /> 1 Urgent
                            </Button>
                            <Separator orientation="vertical" size="2" style={{ height: 24 }} />
                            <IconButton variant="ghost" color="gray" onClick={() => setIsLogsOpen(true)}>
                                <CodeIcon />
                            </IconButton>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex style={{ flex: 1, overflow: 'hidden' }}>
                    {/* Activity Sidebar (Left) */}
                    <Flex direction="column" style={{ width: 260, borderRight: '1px solid var(--gray-5)', background: 'var(--gray-1)' }} display={{ initial: 'none', md: 'flex' }}>
                        <Box p="4" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <ActivityLogIcon /> Recent Activity
                            </Text>
                        </Box>
                        <ScrollArea type="auto" scrollbars="vertical" style={{ height: '100%' }}>
                            <Box p="4">
                                <Flex direction="column" gap="4">
                                    {appActivities.map((activity, i) => (
                                        <Box key={activity.id} p="2" style={{ borderRadius: 8, transition: 'background 0.2s' }} className="hover:bg-[var(--gray-3)]">
                                            <Flex align="center" gap="3" mb="1">
                                                <Flex justify="center" align="center" style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--blue-3)', color: 'var(--blue-9)' }}>
                                                    <activity.icon width="14" height="14" />
                                                </Flex>
                                                <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>{activity.app}</Text>
                                            </Flex>
                                            <Text size="2" weight="medium" style={{ lineHeight: 1.3 }}>{activity.text}</Text>
                                            <Text size="1" color="gray" style={{ fontFamily: 'monospace', marginTop: 4 }}>{activity.time}</Text>
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        </ScrollArea>
                    </Flex>

                    {/* Chat Area */}
                    <Flex direction="column" style={{ flex: 1, position: 'relative', background: 'var(--color-panel-solid)' }}>
                        {/* Messages */}
                        <ScrollArea type="auto" scrollbars="vertical" style={{ flex: 1, padding: 24 }}>
                            <Flex direction="column" gap="4" pb="4">
                                {messages.map((msg) => (
                                    <Flex key={msg.id} justify={msg.role === 'user' ? 'end' : 'start'}>
                                        <Card style={{
                                            maxWidth: '75%',
                                            background: msg.role === 'user' ? 'var(--accent-9)' : 'var(--gray-3)',
                                            color: msg.role === 'user' ? 'white' : 'var(--gray-12)',
                                            borderRadius: 16,
                                            borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                                            borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16
                                        }}>
                                            {msg.role === 'assistant' && (
                                                <Flex align="center" gap="2" mb="2">
                                                    <MagicWandIcon />
                                                    <Text size="1" weight="bold">AI Copilot</Text>
                                                </Flex>
                                            )}
                                            <Text size="2" style={{ lineHeight: 1.5 }}>
                                                {typeof msg.content === 'string' ? msg.content : msg.content}
                                            </Text>

                                            {/* Action Buttons for specific messages */}
                                            {/* @ts-ignore */}
                                            {msg.role === 'assistant' && msg.id === 'step-2' && (
                                                <Flex mt="3">
                                                    <Button size="1" variant="solid" onClick={handleSyncAndReport}>
                                                        <SymbolIcon /> Sync & Report
                                                    </Button>
                                                </Flex>
                                            )}
                                            {/* @ts-ignore */}
                                            {msg.role === 'assistant' && msg.id === 'summary-step-2' && (
                                                <Flex mt="3">
                                                    <Button size="1" variant="solid" onClick={handleAssignAndDispatch}>
                                                        <RocketIcon /> Assign & Execute
                                                    </Button>
                                                </Flex>
                                            )}
                                        </Card>
                                    </Flex>
                                ))}
                                {isTyping && (
                                    <Flex justify="start">
                                        <Card style={{ borderRadius: 16, borderBottomLeftRadius: 4, padding: 12 }}>
                                            <Flex gap="1">
                                                <Box style={{ width: 6, height: 6, background: 'var(--gray-8)', borderRadius: '50%' }} className="animate-bounce" />
                                                <Box style={{ width: 6, height: 6, background: 'var(--gray-8)', borderRadius: '50%' }} className="animate-bounce delay-75" />
                                                <Box style={{ width: 6, height: 6, background: 'var(--gray-8)', borderRadius: '50%' }} className="animate-bounce delay-150" />
                                            </Flex>
                                        </Card>
                                    </Flex>
                                )}
                                <div ref={messagesEndRef} />
                            </Flex>
                        </ScrollArea>

                        {/* Input Area */}
                        <Box p="4" style={{ background: 'var(--color-panel-translucent)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--gray-5)' }}>
                            <Box style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
                                <TextField.Root size="3" radius="full" placeholder="Ask copilot..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}>
                                    <TextField.Slot paddingLeft="4">
                                        <MagicWandIcon />
                                    </TextField.Slot>
                                </TextField.Root>
                                <Box style={{ position: 'absolute', right: 4, top: 4 }}>
                                    <IconButton
                                        size="2"
                                        variant="ghost"
                                        radius="full"
                                        onClick={() => handleSendMessage(inputValue)}
                                        disabled={!inputValue.trim()}
                                        style={{ opacity: inputValue.trim() ? 1 : 0.5 }}
                                    >
                                        <PaperPlaneIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
