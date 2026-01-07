import { useState, useMemo } from 'react'
import { Button, Card, Flex, Grid, Heading, Text, TextField, Avatar, Badge, Table, IconButton, Separator, Box, Popover, Checkbox, DropdownMenu, Dialog } from '@radix-ui/themes'
import { MagnifyingGlassIcon, BellIcon, CalendarIcon, PlusIcon, CopyIcon, FileTextIcon, PaperPlaneIcon, ReaderIcon, DotsHorizontalIcon, ArrowRightIcon, PersonIcon, TargetIcon, RocketIcon, ViewGridIcon, ListBulletIcon, SunIcon, MoonIcon, ExitIcon, ChevronDownIcon, ChevronRightIcon, EyeOpenIcon, Pencil1Icon, TrashIcon, EnvelopeClosedIcon, CheckCircledIcon, ClockIcon, SewingPinIcon, Cross2Icon } from '@radix-ui/react-icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useTheme } from './ThemeContext';

function ThemeToggle() {
    const { appearance, toggleTheme } = useTheme();
    return (
        <IconButton variant="ghost" color="gray" onClick={toggleTheme}>
            {appearance === 'dark' ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
        </IconButton>
    )
}

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", avatar: "AC", statusColor: 'gray' as const },
    { id: "#ORD-2054", customer: "TechDealer Solutions", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", avatar: "TS", statusColor: 'blue' as const },
    { id: "#ORD-2053", customer: "Urban Living Inc.", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", avatar: "UL", statusColor: 'green' as const },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [isMainOpen, setIsMainOpen] = useState(true)
    const [isOperationsOpen, setIsOperationsOpen] = useState(true)

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [trackingOrder, setTrackingOrder] = useState<any>(null)

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, selectedStatuses])

    return (
        <Flex style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
            {/* Sidebar */}
            <Flex direction="column" style={{ width: '250px', backgroundColor: 'var(--color-panel-solid)', borderRight: '1px solid var(--gray-5)' }} display={{ initial: 'none', md: 'flex' }}>
                <Flex align="center" px="4" style={{ height: '64px', borderBottom: '1px solid var(--gray-4)' }}>
                    <Flex align="center" justify="center" style={{ width: '96px', height: '32px', backgroundColor: 'var(--gray-4)', borderRadius: '4px' }}>
                        <Text size="1" weight="bold" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-9)' }}>Tenant Logo</Text>
                    </Flex>
                </Flex>
                <Flex direction="column" p="3" gap="3" style={{ flex: 1, overflowY: 'auto' }}>
                    {/* Main Category */}
                    <Box>
                        <Button
                            variant="ghost"
                            color="gray"
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                height: 'auto',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                color: 'var(--gray-9)',
                                letterSpacing: '0.05em',
                                fontWeight: 'bold',
                                fontSize: '10px'
                            }}
                            onClick={() => setIsMainOpen(!isMainOpen)}
                        >
                            Main
                            {isMainOpen ? <ChevronDownIcon width="12" height="12" /> : <ChevronRightIcon width="12" height="12" />}
                        </Button>
                        {isMainOpen && (
                            <Flex direction="column" gap="1" mt="1" px="2">
                                <Button variant="soft" color="gray" style={{ justifyContent: 'start', gap: '12px' }}>
                                    <ReaderIcon /> Overview
                                </Button>
                            </Flex>
                        )}
                    </Box>

                    {/* Operations Category */}
                    <Box>
                        <Button
                            variant="ghost"
                            color="gray"
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                height: 'auto',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                color: 'var(--gray-9)',
                                letterSpacing: '0.05em',
                                fontWeight: 'bold',
                                fontSize: '10px'
                            }}
                            onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                        >
                            Operations
                            {isOperationsOpen ? <ChevronDownIcon width="12" height="12" /> : <ChevronRightIcon width="12" height="12" />}
                        </Button>
                        {isOperationsOpen && (
                            <Flex direction="column" gap="1" mt="1" px="2">
                                <Button variant="ghost" color="gray" style={{ justifyContent: 'start', gap: '12px' }}>
                                    <TargetIcon /> Inventory
                                </Button>
                                <Button variant="ghost" color="gray" style={{ justifyContent: 'start', gap: '12px' }}>
                                    <RocketIcon /> Production
                                </Button>
                                <Button variant="ghost" color="gray" style={{ justifyContent: 'start', gap: '12px' }}>
                                    <FileTextIcon /> Orders
                                </Button>
                            </Flex>
                        )}
                    </Box>
                </Flex>
                <Flex p="4" gap="3" align="center" style={{ borderTop: '1px solid var(--gray-4)' }}>
                    <Avatar fallback="JD" radius="full" size="2" />
                    <Box style={{ flex: 1 }}>
                        <Text as="div" size="2" weight="medium">Jhon Doe</Text>
                        <Text as="div" size="1" color="gray">Admin</Text>
                    </Box>
                    <IconButton variant="ghost" color="gray" onClick={onLogout}>
                        <ExitIcon />
                    </IconButton>
                </Flex>
            </Flex>

            {/* Main Content */}
            <Flex direction="column" style={{ flex: 1, overflow: 'hidden' }}>
                {/* Header */}
                <Flex align="center" justify="between" px="5" style={{ height: '64px', backgroundColor: 'var(--color-panel-solid)', borderBottom: '1px solid var(--gray-5)' }}>
                    <Flex align="center" gap="2">
                        <Text size="2" color="gray">Dashboard</Text>
                        <ArrowRightIcon color="gray" width="12" />
                        <Text size="2" weight="medium">Operational Overview</Text>
                    </Flex>
                    <Flex gap="3" align="center">
                        <TextField.Root placeholder="Search..." style={{ minWidth: '240px' }}>
                            <TextField.Slot><MagnifyingGlassIcon height="16" width="16" /></TextField.Slot>
                        </TextField.Root>
                        <Button variant="outline" color="gray">
                            <CalendarIcon /> Jan 1 - Jan 31, 2025
                            Jan 1 - Jan 31, 2025
                        </Button>
                        <IconButton variant="ghost" color="gray">
                            <BellIcon width="18" height="18" />
                        </IconButton>
                        <ThemeToggle />
                    </Flex>
                </Flex>

                {/* Scrollable Area */}
                <Box style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
                    <Flex direction="column" gap="6">

                        {/* KPI Cards */}
                        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4">
                            <Card>
                                <Flex direction="column" gap="1">
                                    <Text size="1" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--gray-9)' }}>Total Inventory Value</Text>
                                    <Text size="6" weight="regular">$1.2M</Text>
                                    <Text size="1" color="green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <ArrowRightIcon style={{ transform: 'rotate(-45deg)' }} /> +0.2% vs last month
                                    </Text>
                                </Flex>
                            </Card>
                            <Card>
                                <Flex direction="column" gap="1">
                                    <Text size="1" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--gray-9)' }}>Production Efficiency</Text>
                                    <Text size="6" weight="regular">88%</Text>
                                    <Text size="1" color="green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <ArrowRightIcon style={{ transform: 'rotate(-45deg)' }} /> +3.5% vs last month
                                    </Text>
                                </Flex>
                            </Card>
                            <Card>
                                <Flex direction="column" gap="1">
                                    <Text size="1" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--gray-9)' }}>Pending Orders</Text>
                                    <Text size="6" weight="regular">142</Text>
                                    <Text size="1" color="gray">
                                        -12 vs yesterday
                                    </Text>
                                </Flex>
                            </Card>
                            <Card>
                                <Flex direction="column" gap="1">
                                    <Text size="1" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--gray-9)' }}>Low Stock Alerts</Text>
                                    <Text size="6" weight="regular">15</Text>
                                    <Text size="1" color="red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        Requires attention
                                    </Text>
                                </Flex>
                            </Card>
                        </Grid>

                        {/* Quick Actions */}
                        <Flex direction="column" gap="3">
                            <Heading size="3" color="gray" weight="medium">Quick Actions</Heading>
                            <Grid columns={{ initial: '2', md: '5' }} gap="4">
                                <Button variant="outline" color="gray" style={{ height: '96px', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-panel-solid)', color: 'var(--gray-12)' }}>
                                    <Box style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)', padding: '6px', borderRadius: '6px', display: 'flex' }}><PlusIcon width="20" height="20" /></Box>
                                    <Text size="2" weight="medium">New Order</Text>
                                </Button>
                                <Button variant="outline" color="gray" style={{ height: '96px', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-panel-solid)', color: 'var(--gray-12)' }}>
                                    <Box style={{ backgroundColor: 'var(--gray-3)', color: 'var(--gray-11)', padding: '6px', borderRadius: '6px', display: 'flex' }}><CopyIcon width="20" height="20" /></Box>
                                    <Text size="2" weight="medium">Duplicate</Text>
                                </Button>
                                <Button variant="outline" color="gray" style={{ height: '96px', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-panel-solid)', color: 'var(--gray-12)' }}>
                                    <Box style={{ backgroundColor: 'var(--gray-3)', color: 'var(--gray-11)', padding: '6px', borderRadius: '6px', display: 'flex' }}><FileTextIcon width="20" height="20" /></Box>
                                    <Text size="2" weight="medium">Export PDF</Text>
                                </Button>
                                <Button variant="outline" color="gray" style={{ height: '96px', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-panel-solid)', color: 'var(--gray-12)' }}>
                                    <Box style={{ backgroundColor: 'var(--gray-3)', color: 'var(--gray-11)', padding: '6px', borderRadius: '6px', display: 'flex' }}><PaperPlaneIcon width="20" height="20" /></Box>
                                    <Text size="2" weight="medium">Send Email</Text>
                                </Button>
                                <Button variant="outline" color="gray" style={{ height: '96px', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-panel-solid)', color: 'var(--gray-12)' }}>
                                    <Box style={{ backgroundColor: 'var(--gray-3)', color: 'var(--gray-11)', padding: '6px', borderRadius: '6px', display: 'flex' }}><ReaderIcon width="20" height="20" /></Box>
                                    <Text size="2" weight="medium">Templates</Text>
                                </Button>
                            </Grid>
                        </Flex>

                        {/* Main Grid */}
                        <Grid columns={{ initial: '1', lg: '3' }} gap="6">
                            {/* Orders Table - Spans 3 columns */}
                            <Box style={{ gridColumn: 'span 3' }}>
                                <Card size="3">
                                    <Flex justify="between" align="center" mb="4">
                                        <Heading size="3">Recent Orders</Heading>
                                        <Flex gap="3" align="center">
                                            <TextField.Root placeholder="Search orders..." style={{ minWidth: '200px' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                                                <TextField.Slot><MagnifyingGlassIcon height="16" width="16" /></TextField.Slot>
                                            </TextField.Root>
                                            <Flex gap="0" style={{ backgroundColor: 'var(--gray-3)', padding: '2px', borderRadius: '6px' }}>
                                                <IconButton
                                                    variant={viewMode === 'list' ? 'surface' : 'ghost'}
                                                    color="gray"
                                                    style={{ width: '28px', height: '28px' }}
                                                    onClick={() => setViewMode('list')}
                                                >
                                                    <ListBulletIcon />
                                                </IconButton>
                                                <IconButton
                                                    variant={viewMode === 'grid' ? 'surface' : 'ghost'}
                                                    color="gray"
                                                    style={{ width: '28px', height: '28px' }}
                                                    onClick={() => setViewMode('grid')}
                                                >
                                                    <ViewGridIcon />
                                                </IconButton>
                                            </Flex>

                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <Button variant="soft" color="gray">
                                                        Status <ChevronDownIcon />
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content style={{ width: '200px' }}>
                                                    <Flex direction="column" gap="2">
                                                        {['Pending Review', 'In Production', 'Shipped'].map((status) => (
                                                            <Text as="label" size="2" key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                                <Checkbox
                                                                    checked={selectedStatuses.includes(status)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            setSelectedStatuses([...selectedStatuses, status])
                                                                        } else {
                                                                            setSelectedStatuses(selectedStatuses.filter(s => s !== status))
                                                                        }
                                                                    }}
                                                                /> {status}
                                                            </Text>
                                                        ))}
                                                        <Separator size="4" />
                                                        <Button variant="ghost" color="gray" onClick={() => setSelectedStatuses([])}>Clear Filter</Button>
                                                    </Flex>
                                                </Popover.Content>
                                            </Popover.Root>
                                        </Flex>
                                    </Flex>
                                    {viewMode === 'list' ? (
                                        <Table.Root>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell align="right">Actions</Table.ColumnHeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {filteredOrders.map((order) => (
                                                    <>
                                                        <Table.Row
                                                            key={order.id}
                                                            style={{ cursor: 'pointer', backgroundColor: expandedIds.has(order.id) ? 'var(--gray-3)' : undefined }}
                                                            className="hover:bg-gray-200 dark:hover:bg-gray-800"
                                                            onClick={() => toggleExpand(order.id)}
                                                        >
                                                            <Table.RowHeaderCell>
                                                                <Flex align="center" gap="2">
                                                                    {expandedIds.has(order.id) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                                                    {order.id}
                                                                </Flex>
                                                            </Table.RowHeaderCell>
                                                            <Table.Cell>
                                                                <Flex align="center" gap="2">
                                                                    <Avatar fallback={order.avatar} size="1" radius="full" /> {order.customer}
                                                                </Flex>
                                                            </Table.Cell>
                                                            <Table.Cell>{order.amount}</Table.Cell>
                                                            <Table.Cell><Badge color={order.statusColor}>{order.status}</Badge></Table.Cell>
                                                            <Table.Cell>{order.date}</Table.Cell>
                                                            <Table.Cell align="right" onClick={(e) => e.stopPropagation()}>
                                                                <DropdownMenu.Root>
                                                                    <DropdownMenu.Trigger><IconButton variant="ghost"><DotsHorizontalIcon /></IconButton></DropdownMenu.Trigger>
                                                                    <DropdownMenu.Content>
                                                                        <DropdownMenu.Item onClick={onNavigateToDetail}>
                                                                            <EyeOpenIcon /> View Details
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Item>
                                                                            <Pencil1Icon /> Edit
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Item>
                                                                            <TrashIcon /> Delete
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Item>
                                                                            <EnvelopeClosedIcon /> Contact
                                                                        </DropdownMenu.Item>
                                                                    </DropdownMenu.Content>
                                                                </DropdownMenu.Root>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        {expandedIds.has(order.id) && (
                                                            <Table.Row style={{ backgroundColor: 'var(--gray-2)' }}>
                                                                <Table.Cell colSpan={6} style={{ padding: 0 }}>
                                                                    <Box p="5">
                                                                        <Flex direction="column" gap="5">
                                                                            <Flex justify="between" align="start">
                                                                                <Flex gap="3" align="center">
                                                                                    <Avatar size="3" fallback={<PersonIcon />} radius="full" color="gray" variant="soft" />
                                                                                    <Box>
                                                                                        <Text as="div" size="2" weight="medium">Sarah Johnson</Text>
                                                                                        <Text as="div" size="1" color="gray">Project Manager</Text>
                                                                                    </Box>
                                                                                </Flex>
                                                                                <Grid columns="2" gap="5" width="300px">
                                                                                    <Box>
                                                                                        <Text as="div" size="1" color="gray" weight="medium" style={{ textTransform: 'uppercase', marginBottom: '4px' }}>Location</Text>
                                                                                        <Flex align="center" gap="2">
                                                                                            <SewingPinIcon color="var(--gray-10)" />
                                                                                            <Text size="2">NY, USA</Text>
                                                                                        </Flex>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Text as="div" size="1" color="gray" weight="medium" style={{ textTransform: 'uppercase', marginBottom: '4px' }}>Project ID</Text>
                                                                                        <Text size="2">PRJ-24-87</Text>
                                                                                    </Box>
                                                                                </Grid>
                                                                            </Flex>

                                                                            <Box style={{ position: 'relative', paddingBlock: '10px' }}>
                                                                                <Box style={{ position: 'absolute', top: '24px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--gray-5)', zIndex: 0 }} />
                                                                                <Flex justify="between" style={{ position: 'relative', zIndex: 1 }}>
                                                                                    {['Order Placed', 'Manufacturing', 'Quality', 'Shipping'].map((step, i) => (
                                                                                        <Flex key={i} direction="column" align="center" gap="2" style={{ backgroundColor: 'var(--gray-2)', paddingInline: '8px' }}>
                                                                                            <Flex
                                                                                                align="center"
                                                                                                justify="center"
                                                                                                style={{
                                                                                                    width: '32px',
                                                                                                    height: '32px',
                                                                                                    borderRadius: '50%',
                                                                                                    backgroundColor: i <= 1 ? 'var(--gray-12)' : 'var(--color-panel-solid)',
                                                                                                    border: `1px solid ${i <= 1 ? 'var(--gray-12)' : 'var(--gray-6)'}`,
                                                                                                    color: i <= 1 ? 'var(--gray-1)' : 'var(--gray-8)'
                                                                                                }}
                                                                                            >
                                                                                                {i < 1 ? <CheckCircledIcon /> : i === 1 ? <ClockIcon /> : <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gray-8)' }} />}
                                                                                            </Flex>
                                                                                            <Text size="1" weight={i <= 1 ? 'medium' : 'regular'} color={i <= 1 ? 'gray' : 'gray'}>{step}</Text>
                                                                                        </Flex>
                                                                                    ))}
                                                                                </Flex>
                                                                            </Box>

                                                                            <Flex align="center" gap="3" p="3" style={{ border: '1px solid var(--gray-5)', borderRadius: '6px', backgroundColor: 'var(--color-panel-solid)' }}>
                                                                                <RocketIcon width="18" height="18" color="var(--gray-10)" />
                                                                                <Box style={{ flex: 1 }}>
                                                                                    <Text as="div" size="2" weight="medium">Truck delayed at Customs - New ETA +24h</Text>
                                                                                    <Text as="div" size="1" color="gray">The delivery truck has been delayed at the export checkpoint. Estimated arrival updated.</Text>
                                                                                </Box>
                                                                                <Button size="1" variant="soft" color="gray" onClick={() => setTrackingOrder(order)}>Track</Button>
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Box>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        )}
                                                    </>
                                                ))}
                                                {filteredOrders.length === 0 && (
                                                    <Table.Row>
                                                        <Table.Cell colSpan={6} align="center" style={{ color: 'var(--gray-9)', padding: '24px' }}>
                                                            No orders found matching your criteria.
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )}
                                            </Table.Body>
                                        </Table.Root>
                                    ) : (
                                        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                                            {filteredOrders.map((order) => (
                                                <Card
                                                    key={order.id}
                                                    variant={expandedIds.has(order.id) ? "classic" : "surface"}
                                                    style={{
                                                        cursor: 'pointer',
                                                        borderColor: expandedIds.has(order.id) ? 'var(--gray-8)' : undefined
                                                    }}
                                                    onClick={() => toggleExpand(order.id)}
                                                >
                                                    <Flex justify="between" align="start" mb="3">
                                                        <Box>
                                                            <Flex align="center" gap="2">
                                                                <Text as="div" weight="bold" size="2">{order.id}</Text>
                                                                {expandedIds.has(order.id) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                                            </Flex>
                                                            <Text as="div" size="1" color="gray">{order.customer}</Text>
                                                        </Box>
                                                        <Box onClick={(e) => e.stopPropagation()}>
                                                            <DropdownMenu.Root>
                                                                <DropdownMenu.Trigger><IconButton variant="ghost" color="gray"><DotsHorizontalIcon /></IconButton></DropdownMenu.Trigger>
                                                                <DropdownMenu.Content>
                                                                    <DropdownMenu.Item onClick={onNavigateToDetail}>
                                                                        <EyeOpenIcon /> View Details
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item>
                                                                        <Pencil1Icon /> Edit
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item>
                                                                        <TrashIcon /> Delete
                                                                    </DropdownMenu.Item>
                                                                    <DropdownMenu.Item>
                                                                        <EnvelopeClosedIcon /> Contact
                                                                    </DropdownMenu.Item>
                                                                </DropdownMenu.Content>
                                                            </DropdownMenu.Root>
                                                        </Box>
                                                    </Flex>
                                                    <Separator size="4" mb="3" />
                                                    <Flex direction="column" gap="2">
                                                        <Flex justify="between">
                                                            <Text size="2" color="gray">Amount</Text>
                                                            <Text size="2" weight="medium">{order.amount}</Text>
                                                        </Flex>
                                                        <Flex justify="between">
                                                            <Text size="2" color="gray">Due Date</Text>
                                                            <Text size="2">{order.date}</Text>
                                                        </Flex>
                                                        <Flex justify="between" align="center" mt="1">
                                                            <Badge color={order.statusColor}>{order.status}</Badge>
                                                            <Avatar fallback={order.avatar} size="1" radius="full" />
                                                        </Flex>
                                                    </Flex>

                                                    {expandedIds.has(order.id) && (
                                                        <Box pt="4" mt="4" style={{ borderTop: '1px solid var(--gray-4)' }} onClick={(e) => e.stopPropagation()}>
                                                            <Flex direction="column" gap="4">
                                                                <Flex align="center" gap="3">
                                                                    <Avatar size="2" fallback={<PersonIcon />} radius="full" color="gray" variant="soft" />
                                                                    <Box>
                                                                        <Text as="div" size="2" weight="medium">Sarah Johnson</Text>
                                                                        <Text as="div" size="1" color="gray">Project Manager</Text>
                                                                    </Box>
                                                                </Flex>

                                                                <Grid columns="2" gap="4">
                                                                    <Box>
                                                                        <Text as="div" size="1" color="gray" weight="medium" style={{ textTransform: 'uppercase', marginBottom: '2px' }}>Location</Text>
                                                                        <Flex align="center" gap="1">
                                                                            <SewingPinIcon color="var(--gray-10)" width="12" height="12" />
                                                                            <Text size="2">NY, USA</Text>
                                                                        </Flex>
                                                                    </Box>
                                                                    <Box>
                                                                        <Text as="div" size="1" color="gray" weight="medium" style={{ textTransform: 'uppercase', marginBottom: '2px' }}>Project ID</Text>
                                                                        <Text size="2">PRJ-24-87</Text>
                                                                    </Box>
                                                                </Grid>

                                                                <Box style={{ backgroundColor: 'var(--gray-3)', padding: '12px', borderRadius: '6px' }}>
                                                                    {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                        <Flex key={i} align="center" gap="2" mb="1">
                                                                            <Box style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i <= 1 ? 'var(--gray-12)' : 'var(--gray-8)' }} />
                                                                            <Text size="1" color={i <= 1 ? 'gray' : 'gray'}>{step}</Text>
                                                                        </Flex>
                                                                    ))}
                                                                </Box>

                                                                <Flex align="center" gap="2" p="2" style={{ border: '1px solid var(--gray-5)', borderRadius: '6px', backgroundColor: 'var(--color-panel-solid)' }}>
                                                                    <RocketIcon width="12" height="12" color="var(--gray-10)" style={{ marginTop: '2px' }} />
                                                                    <Box style={{ flex: 1 }}>
                                                                        <Text as="div" size="1" weight="medium">Delay: Customs</Text>
                                                                        <Text as="div" size="1" color="gray">+24h ETA</Text>
                                                                    </Box>
                                                                    <Button size="1" variant="soft" color="gray" style={{ height: '24px', fontSize: '10px' }} onClick={() => setTrackingOrder(order)}>Track</Button>
                                                                </Flex>
                                                            </Flex>
                                                        </Box>
                                                    )}
                                                </Card>
                                            ))}
                                            {filteredOrders.length === 0 && (
                                                <Box style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px', color: 'var(--gray-9)' }}>
                                                    No orders found matching your criteria.
                                                </Box>
                                            )}
                                        </Grid>
                                    )}
                                </Card>
                            </Box>

                            {/* Metrics */}
                            <Box style={{ gridColumn: 'span 3' }}>
                                <Grid columns={{ initial: '1', md: '3' }} gap="4">
                                    <Card>
                                        <Flex justify="between" align="center">
                                            <Box>
                                                <Text as="div" size="2" color="gray">Total Revenue</Text>
                                                <Text as="div" size="5" weight="bold">$2,847,500</Text>
                                            </Box>
                                            <RocketIcon color="gray" />
                                        </Flex>
                                    </Card>
                                    <Card>
                                        <Flex justify="between" align="center">
                                            <Box>
                                                <Text as="div" size="2" color="gray">Operational Costs</Text>
                                                <Text as="div" size="5" weight="bold">$1,625,000</Text>
                                            </Box>
                                            <TargetIcon color="gray" />
                                        </Flex>
                                    </Card>
                                    <Card>
                                        <Flex justify="between" align="center">
                                            <Box>
                                                <Text as="div" size="2" color="gray">Net Profit</Text>
                                                <Text as="div" size="5" weight="bold">$1,222,500</Text>
                                            </Box>
                                            <PersonIcon color="gray" />
                                        </Flex>
                                    </Card>
                                </Grid>
                            </Box>

                            {/* Charts */}
                            <Box style={{ gridColumn: 'span 2' }}>
                                <Card size="3">
                                    <Heading size="3" mb="4">Inventory Turnover by Category</Heading>
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <BarChart data={inventoryData}>
                                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                                <RechartsTooltip />
                                                <Bar dataKey="value" fill="var(--gray-12)" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </Box>

                            <Box style={{ gridColumn: 'span 1' }}>
                                <Card size="3">
                                    <Heading size="3" mb="4">Sales vs Costs</Heading>
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <LineChart data={salesData}>
                                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                <RechartsTooltip />
                                                <Line type="monotone" dataKey="sales" stroke="var(--accent-9)" strokeWidth={2} dot={false} />
                                                <Line type="monotone" dataKey="costs" stroke="var(--gray-9)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </Box>

                        </Grid>
                    </Flex>
                </Box>
            </Flex>
            <Dialog.Root open={!!trackingOrder} onOpenChange={(open) => !open && setTrackingOrder(null)}>
                <Dialog.Content style={{ maxWidth: 700 }}>
                    <Dialog.Title>
                        <Flex justify="between" align="center">
                            <Text>Tracking Details - {trackingOrder?.id}</Text>
                            <Dialog.Close>
                                <IconButton variant="ghost" color="gray" onClick={() => setTrackingOrder(null)}>
                                    <Cross2Icon />
                                </IconButton>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Title>

                    <Grid columns={{ initial: '1', md: '2' }} gap="6" mt="4">
                        {/* Left Col: Timeline */}
                        <Box>
                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>Shipment Progress</Text>
                            <Box style={{ paddingLeft: '8px', borderLeft: '1px solid var(--gray-6)', marginLeft: '8px' }}>
                                <Flex direction="column" gap="5">
                                    {trackingSteps.map((step, idx) => (
                                        <Box key={idx} style={{ position: 'relative', paddingLeft: '24px' }}>
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    left: '-5px',
                                                    top: '4px',
                                                    width: '9px',
                                                    height: '9px',
                                                    borderRadius: '50%',
                                                    backgroundColor: step.completed ? 'var(--gray-12)' : 'var(--gray-6)',
                                                    border: '2px solid var(--color-bg)',
                                                    boxSizing: 'content-box',
                                                    ...(step.alert ? { backgroundColor: 'var(--ruby-9)' } : {})
                                                }}
                                            />
                                            <Text as="div" size="2" weight="medium">{step.status}</Text>
                                            <Text as="div" size="1" color="gray">{step.date} · {step.location}</Text>
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        </Box>

                        {/* Right Col: Georeference & Actions */}
                        <Flex direction="column" gap="4">
                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', display: 'block' }}>Delivery Location</Text>

                            {/* Map Placeholder */}
                            <Flex
                                align="center"
                                justify="center"
                                style={{
                                    backgroundColor: 'var(--gray-3)',
                                    borderRadius: '6px',
                                    height: '160px',
                                    border: '1px solid var(--gray-6)'
                                }}
                            >
                                <Box style={{ textAlign: 'center' }}>
                                    <SewingPinIcon width="24" height="24" color="var(--gray-8)" style={{ display: 'block', margin: '0 auto 8px' }} />
                                    <Text size="1" color="gray">Map Preview Unavailable</Text>
                                </Box>
                            </Flex>

                            <Box style={{ backgroundColor: 'var(--gray-3)', padding: '12px', borderRadius: '6px', border: '1px solid var(--gray-6)' }}>
                                <Text as="div" size="2" weight="medium">Distribution Center NY-05</Text>
                                <Text as="div" size="1" color="gray">45 Industrial Park Dr, Brooklyn, NY 11201</Text>
                            </Box>

                            <Box style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--gray-6)' }}>
                                <Button style={{ width: '100%' }} variant="solid" onClick={() => console.log('Contact')}>
                                    <EnvelopeClosedIcon /> Contact Support
                                </Button>
                            </Box>
                        </Flex>
                    </Grid>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    )
}
