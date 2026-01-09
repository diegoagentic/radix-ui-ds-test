import { useState, useMemo } from 'react'
import { Button, Card, Flex, Grid, Heading, Text, TextField, Avatar, Badge, Table, IconButton, Separator, Box, Popover, Checkbox, DropdownMenu, Dialog } from '@radix-ui/themes'
import { MagnifyingGlassIcon, BellIcon, CalendarIcon, PlusIcon, CopyIcon, FileTextIcon, PaperPlaneIcon, ReaderIcon, DotsHorizontalIcon, ArrowRightIcon, PersonIcon, TargetIcon, RocketIcon, ViewGridIcon, ListBulletIcon, SunIcon, MoonIcon, ExitIcon, ChevronDownIcon, ChevronRightIcon, EyeOpenIcon, Pencil1Icon, TrashIcon, EnvelopeClosedIcon, CheckCircledIcon, ClockIcon, SewingPinIcon, Cross2Icon, HomeIcon, CubeIcon, BarChartIcon, ClipboardIcon } from '@radix-ui/react-icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { useTheme } from './ThemeContext';

function ThemeToggle() {
    const { appearance, toggleTheme } = useTheme();
    return (
        <IconButton variant="ghost" color="gray" onClick={toggleTheme} style={{ borderRadius: '9999px' }}>
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
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { appearance } = useTheme();

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
        <Flex direction="column" style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
            <style>{`
                .nav-glass {
                    background-color: var(--color-panel-translucent);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--gray-a4);
                    box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);
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
                    margin-left: 8px;
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
                }}
                className="nav-glass"
            >
                <Flex align="center" gap="2" p="2" style={{ paddingLeft: '16px', paddingRight: '8px' }}>
                    {/* Logo */}
                    <Box pr="2">
                        <style>{`
                            .dashboard-logo-light { display: block; }
                            .dashboard-logo-dark { display: none; }
                            .dark .dashboard-logo-light, [data-theme='dark'] .dashboard-logo-light { display: none; }
                            .dark .dashboard-logo-dark, [data-theme='dark'] .dashboard-logo-dark { display: block; }
                        `}</style>
                        <img className="dashboard-logo-light" src="/logo-on-light.jpg" alt="Strata" style={{ height: '20px', width: 'auto' }} />
                        <img className="dashboard-logo-dark" src="/logo-on-dark.jpg" alt="Strata" style={{ height: '20px', width: 'auto' }} />
                    </Box>

                    <Separator orientation="vertical" size="2" style={{ height: '24px' }} />

                    {/* Nav Items */}
                    <Flex gap="1">
                        <NavItem icon={<HomeIcon />} label="Overview" active />
                        <NavItem icon={<CubeIcon />} label="Inventory" />
                        <NavItem icon={<BarChartIcon />} label="Production" />
                        <NavItem icon={<ClipboardIcon />} label="Orders" />
                    </Flex>

                    <Separator orientation="vertical" size="2" style={{ height: '24px' }} />

                    {/* Tools */}
                    <Flex gap="2" align="center">
                        <ThemeToggle />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="ghost" radius="full" style={{ padding: '0 4px', height: '32px' }}>
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

            {/* Main Content Area */}
            <Box style={{ paddingTop: '100px', paddingBottom: '40px', paddingInline: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                {/* Header Section */}
                <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" align={{ initial: 'start', sm: 'center' }} gap="4" mb="8">
                    <Box>
                        <Heading size="6" weight="medium" style={{ background: 'linear-gradient(to right, var(--gray-12), var(--gray-10))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Operational Overview
                        </Heading>
                        <Text size="2" color="gray" mt="1">Jan 1 - Jan 31, 2025</Text>
                    </Box>
                    <Flex gap="3" align="center">
                        <TextField.Root placeholder="Search everything..." style={{ minWidth: '240px', borderRadius: '8px' }}>
                            <TextField.Slot><MagnifyingGlassIcon height="16" width="16" /></TextField.Slot>
                        </TextField.Root>
                        <IconButton variant="outline" color="gray" style={{ borderRadius: '8px' }}>
                            <BellIcon width="18" height="18" />
                        </IconButton>
                    </Flex>
                </Flex>

                {/* KPI Cards */}
                <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="5" mb="8">
                    <KPICard title="Total Inventory" value="$1.2M" trend="+0.2% vs last month" trendUp icon={<CubeIcon />} />
                    <KPICard title="Efficiency" value="88%" trend="+3.5% vs last month" trendUp icon={<BarChartIcon />} />
                    <KPICard title="Pending Orders" value="142" trend="-12 vs yesterday" icon={<ClipboardIcon />} />
                    <KPICard title="Low Stock" value="15" trend="Requires attention" trendAlert icon={<TargetIcon />} />
                </Grid>

                {/* Quick Actions */}
                <Box mb="8" style={{ overflowX: 'auto' }}>
                    <Flex align="center" gap="6" style={{ minWidth: 'max-content' }}>
                        <Text size="3" weight="medium" color="gray">Quick Actions</Text>
                        <Flex gap="4">
                            {[
                                { icon: <PlusIcon width="18" height="18" />, label: "New Order" },
                                { icon: <CopyIcon width="18" height="18" />, label: "Duplicate" },
                                { icon: <FileTextIcon width="18" height="18" />, label: "Export PDF" },
                                { icon: <PaperPlaneIcon width="18" height="18" />, label: "Send Email" },
                                { icon: <ReaderIcon width="18" height="18" />, label: "Templates" },
                            ].map((action, i) => (
                                <Flex key={i} direction="column" align="center" gap="2" style={{ cursor: 'pointer' }} className="group">
                                    <Flex
                                        align="center" justify="center"
                                        style={{
                                            width: '48px', height: '48px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--color-panel-solid)',
                                            border: '1px dashed var(--gray-8)',
                                            color: 'var(--gray-11)',
                                            transition: 'all 0.2s ease',
                                        }}
                                        className="action-icon"
                                    >
                                        {action.icon}
                                    </Flex>
                                    <Text size="1" weight="medium" color="gray" style={{ transition: 'color 0.2s ease' }}>{action.label}</Text>
                                    <style>{`
                                        .group:hover .action-icon {
                                            border-color: var(--accent-9);
                                            background-color: var(--accent-3);
                                            color: var(--accent-9);
                                        }
                                        .group:hover span {
                                            color: var(--gray-12);
                                        }
                                    `}</style>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Box>

                {/* Main Content Grid */}
                <Grid columns={{ initial: '1', lg: '3' }} gap="6">
                    {/* Orders Table */}
                    <Box style={{ gridColumn: 'span 3' }}>
                        <Card size="3" style={{ borderRadius: '16px' }}>
                            <Flex justify="between" align="center" mb="5">
                                <Flex align="center" gap="3">
                                    <Heading size="3">Recent Orders</Heading>
                                    <Badge variant="soft" color="gray" radius="full">Active</Badge>
                                </Flex>
                                <Flex gap="3" align="center">
                                    <Flex gap="0" style={{ backgroundColor: 'var(--gray-3)', padding: '2px', borderRadius: '8px' }}>
                                        <IconButton
                                            variant={viewMode === 'list' ? 'surface' : 'ghost'}
                                            color="gray"
                                            size="1"
                                            onClick={() => setViewMode('list')}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            <ListBulletIcon />
                                        </IconButton>
                                        <IconButton
                                            variant={viewMode === 'grid' ? 'surface' : 'ghost'}
                                            color="gray"
                                            size="1"
                                            onClick={() => setViewMode('grid')}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            <ViewGridIcon />
                                        </IconButton>
                                    </Flex>
                                    <Popover.Root>
                                        <Popover.Trigger>
                                            <Button variant="outline" color="gray" radius="large" size="1">
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
                                                <Button variant="ghost" size="1" onClick={() => setSelectedStatuses([])}>Clear Filter</Button>
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
                                            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell align="right">Actions</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredOrders.map((order) => (
                                            <>
                                                <Table.Row
                                                    key={order.id}
                                                    style={{ cursor: 'pointer', backgroundColor: expandedIds.has(order.id) ? 'var(--accent-2)' : undefined }}
                                                    className="hover-row"
                                                    onClick={() => toggleExpand(order.id)}
                                                >
                                                    <Table.RowHeaderCell>
                                                        <Flex align="center" gap="2">
                                                            {expandedIds.has(order.id) ? <ChevronDownIcon color="var(--accent-9)" /> : <ChevronRightIcon color="var(--gray-8)" />}
                                                            <Text weight="medium">{order.id}</Text>
                                                        </Flex>
                                                    </Table.RowHeaderCell>
                                                    <Table.Cell>
                                                        <Flex align="center" gap="2">
                                                            <Avatar fallback={order.avatar} size="1" radius="full" color="gray" variant="soft" /> {order.customer}
                                                        </Flex>
                                                    </Table.Cell>
                                                    <Table.Cell>{order.amount}</Table.Cell>
                                                    <Table.Cell><Badge color={order.statusColor} variant="soft" radius="full">{order.status}</Badge></Table.Cell>
                                                    <Table.Cell color="gray">{order.date}</Table.Cell>
                                                    <Table.Cell align="right" onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu.Root>
                                                            <DropdownMenu.Trigger><IconButton variant="ghost" color="gray" size="1"><DotsHorizontalIcon /></IconButton></DropdownMenu.Trigger>
                                                            <DropdownMenu.Content>
                                                                <DropdownMenu.Item onClick={onNavigateToDetail}><EyeOpenIcon /> View Details</DropdownMenu.Item>
                                                                <DropdownMenu.Item><Pencil1Icon /> Edit</DropdownMenu.Item>
                                                                <DropdownMenu.Item><TrashIcon /> Delete</DropdownMenu.Item>
                                                                <DropdownMenu.Item><EnvelopeClosedIcon /> Contact</DropdownMenu.Item>
                                                            </DropdownMenu.Content>
                                                        </DropdownMenu.Root>
                                                    </Table.Cell>
                                                </Table.Row>
                                                {/* Details Row */}
                                                {expandedIds.has(order.id) && (
                                                    <Table.Row style={{ backgroundColor: 'var(--gray-2)' }}>
                                                        <Table.Cell colSpan={6} style={{ padding: 0 }}>
                                                            <Box p="5">
                                                                <Flex gap="6" direction={{ initial: 'column', md: 'row' }}>
                                                                    <Flex direction="column" gap="4" style={{ flex: 1 }}>
                                                                        <Flex align="center" gap="3">
                                                                            <Avatar size="3" fallback={<PersonIcon />} radius="full" color="gray" variant="soft" />
                                                                            <Box>
                                                                                <Text as="div" size="2" weight="medium">Sarah Johnson</Text>
                                                                                <Text as="div" size="1" color="gray">Project Manager</Text>
                                                                            </Box>
                                                                        </Flex>
                                                                        <Separator size="4" />
                                                                        <Box style={{ position: 'relative', paddingBlock: '10px' }}>
                                                                            <Box style={{ position: 'absolute', top: '16px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--gray-5)', zIndex: 0 }} />
                                                                            <Flex justify="between" style={{ position: 'relative', zIndex: 1 }}>
                                                                                {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                                    <Flex key={i} direction="column" align="center" gap="2" style={{ backgroundColor: 'var(--gray-2)', paddingInline: '8px' }}>
                                                                                        <Flex
                                                                                            align="center" justify="center"
                                                                                            style={{
                                                                                                width: '24px', height: '24px', borderRadius: '50%',
                                                                                                backgroundColor: i <= 1 ? 'var(--heading)' : 'var(--color-panel-solid)',
                                                                                                border: `1px solid ${i <= 1 ? 'var(--heading)' : 'var(--gray-6)'}`,
                                                                                                color: i <= 1 ? 'var(--color-background)' : 'var(--gray-8)'
                                                                                            }}
                                                                                        >
                                                                                            {i < 1 ? <CheckCircledIcon /> : <Box style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }} />}
                                                                                        </Flex>
                                                                                        <Text size="1" color={i <= 1 ? 'gray' : 'gray'}>{step}</Text>
                                                                                    </Flex>
                                                                                ))}
                                                                            </Flex>
                                                                        </Box>
                                                                    </Flex>
                                                                    <Box style={{ width: '300px' }}>
                                                                        <Card size="1">
                                                                            <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Alert</Text>
                                                                            <Flex gap="3">
                                                                                <RocketIcon width="18" height="18" color="var(--orange-9)" />
                                                                                <Box>
                                                                                    <Text as="div" size="2" weight="medium" color="orange">Customs Delay</Text>
                                                                                    <Text as="div" size="1" color="gray">Held at port. ETA +24h.</Text>
                                                                                    <Text as="div" size="1" color="blue" style={{ marginTop: '8px', cursor: 'pointer' }} onClick={() => setTrackingOrder(order)}>Track Shipment</Text>
                                                                                </Box>
                                                                            </Flex>
                                                                        </Card>
                                                                    </Box>
                                                                </Flex>
                                                            </Box>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )}
                                            </>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            ) : (
                                <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4" p="4">
                                    {filteredOrders.map((order) => (
                                        <Card
                                            key={order.id}
                                            variant="surface"
                                            style={{
                                                cursor: 'pointer',
                                                borderColor: expandedIds.has(order.id) ? 'var(--accent-9)' : undefined,
                                                boxShadow: expandedIds.has(order.id) ? '0 0 0 1px var(--accent-9)' : undefined
                                            }}
                                            onClick={() => toggleExpand(order.id)}
                                        >
                                            <Flex justify="between" mb="3">
                                                <Flex align="center" gap="3">
                                                    <Avatar fallback={order.avatar} radius="full" size="2" color="indigo" variant="soft" />
                                                    <Box>
                                                        <Text as="div" weight="bold" size="2">{order.customer}</Text>
                                                        <Text as="div" size="1" color="gray">{order.id}</Text>
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                            <Flex direction="column" gap="2">
                                                <Flex justify="between" style={{ borderBottom: '1px solid var(--gray-4)', paddingBottom: '4px' }}>
                                                    <Text size="1" color="gray">Amount</Text>
                                                    <Text size="2" weight="medium">{order.amount}</Text>
                                                </Flex>
                                                <Flex justify="between" style={{ borderBottom: '1px solid var(--gray-4)', paddingBottom: '4px' }}>
                                                    <Text size="1" color="gray">Date</Text>
                                                    <Text size="2">{order.date}</Text>
                                                </Flex>
                                                <Flex justify="between" pt="1">
                                                    <Badge color={order.statusColor} radius="full">{order.status}</Badge>
                                                </Flex>
                                            </Flex>
                                            {expandedIds.has(order.id) && (
                                                <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-4)' }}>
                                                    <Button size="1" variant="solid" style={{ width: '100%' }} onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}>Track Order</Button>
                                                </Box>
                                            )}
                                        </Card>
                                    ))}
                                </Grid>
                            )}
                        </Card>
                    </Box>

                    {/* Charts */}
                    <Box style={{ gridColumn: 'span 2' }}>
                        <Card size="3" style={{ borderRadius: '16px' }}>
                            <Heading size="3" mb="4">Revenue Trend</Heading>
                            <Box height="300px">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-6)" vertical={false} />
                                        <XAxis dataKey="name" stroke="var(--gray-9)" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="var(--gray-9)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: 'var(--color-panel-solid)', borderColor: 'var(--gray-6)', borderRadius: '8px', color: 'var(--gray-12)' }}
                                            itemStyle={{ color: 'var(--gray-12)' }}
                                        />
                                        <Line type="monotone" dataKey="sales" stroke="var(--accent-9)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-panel-solid)', strokeWidth: 2 }} />
                                        <Line type="monotone" dataKey="costs" stroke="var(--gray-8)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </Card>
                    </Box>

                    <Box style={{ gridColumn: 'span 1' }}>
                        <Card size="3" style={{ borderRadius: '16px' }}>
                            <Heading size="3" mb="4">Inventory Breakdown</Heading>
                            <Box height="300px">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inventoryData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-6)" vertical={false} />
                                        <XAxis dataKey="name" stroke="var(--gray-9)" fontSize={12} tickLine={false} axisLine={false} />
                                        {/* <YAxis stroke="var(--gray-9)" fontSize={12} tickLine={false} axisLine={false} /> */}
                                        <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--color-panel-solid)', borderColor: 'var(--gray-6)', borderRadius: '8px', color: 'var(--gray-12)' }} />
                                        <Bar dataKey="value" fill="var(--indigo-9)" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Box>

            {/* Modal - Track Order */}
            <Dialog.Root open={!!trackingOrder} onOpenChange={(open) => !open && setTrackingOrder(null)}>
                <Dialog.Content style={{ maxWidth: 700, borderRadius: '16px' }}>
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
                                                    backgroundColor: step.completed ? (appearance === 'dark' ? 'white' : 'black') : 'var(--gray-6)',
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
                            <Flex
                                align="center"
                                justify="center"
                                style={{
                                    backgroundColor: 'var(--gray-3)',
                                    borderRadius: '12px',
                                    height: '160px',
                                    border: '1px solid var(--gray-6)'
                                }}
                            >
                                <Box style={{ textAlign: 'center' }}>
                                    <SewingPinIcon width="24" height="24" color="var(--gray-8)" style={{ display: 'block', margin: '0 auto 8px' }} />
                                    <Text size="1" color="gray">Map Preview Unavailable</Text>
                                </Box>
                            </Flex>

                            <Box style={{ backgroundColor: 'var(--gray-3)', padding: '12px', borderRadius: '12px', border: '1px solid var(--gray-6)' }}>
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

function NavItem({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <Button
            className={`nav-item ${active ? 'active' : ''}`}
            variant="ghost"
            color={active ? 'indigo' : 'gray'}
            radius="full"
            style={{
                height: '40px',
                padding: '0 12px',
                backgroundColor: active ? 'var(--accent-a3)' : 'transparent',
                transition: 'all 0.3s ease'
            }}
        >
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </Box>
            <span className="nav-item-label" style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
        </Button>
    )
}

// KPI Card Component
function KPICard({ title, value, trend, trendUp, trendAlert, icon }: any) {
    return (
        <Card size="2" style={{ borderRadius: '16px' }}>
            <Flex justify="between" align="start">
                <Box>
                    <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase' }}>{title}</Text>
                    <Text size="6" weight="regular" style={{ marginTop: '4px' }}>{value}</Text>
                </Box>
                <Box style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--gray-3)', color: 'var(--gray-11)' }}>
                    {icon}
                </Box>
            </Flex>
            <Flex align="center" gap="1" mt="3">
                {trendAlert ? (
                    <Text size="1" color="red" weight="medium">{trend}</Text>
                ) : (
                    <>
                        {trendUp ? <RocketIcon style={{ transform: 'rotate(0deg)', color: 'var(--teal-9)' }} width="12" /> : <Text size="1" color="gray">-</Text>}
                        <Text size="1" color={trendUp ? 'teal' : 'gray'} weight="medium">{trend}</Text>
                    </>
                )}
            </Flex>
        </Card>
    )
}
