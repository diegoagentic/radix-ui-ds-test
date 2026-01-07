import { Button, Card, Flex, Grid, Heading, Text, TextField, Badge, Table, IconButton, Separator, Box, Checkbox, Dialog } from '@radix-ui/themes'
import {
    MagnifyingGlassIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    Share1Icon,
    DownloadIcon,
    PlusIcon,
    CopyIcon,
    FileTextIcon,
    PaperPlaneIcon,
    CheckCircledIcon,
    Cross2Icon,
    InfoCircledIcon,
    ExclamationTriangleIcon,
    ComponentPlaceholderIcon,
    SunIcon,
    MoonIcon
} from '@radix-ui/react-icons'
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
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock" as const, statusColor: 'orange' as const },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock" as const, statusColor: 'red' as const },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock" as const, statusColor: 'gray' as const },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock" as const, statusColor: 'orange' as const },
]

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true
    })

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <Flex direction="column" style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)' }}>
            {/* Header */}
            <Flex align="center" justify="between" px="5" style={{ height: '64px', backgroundColor: 'var(--color-panel-solid)', borderBottom: '1px solid var(--gray-5)' }}>
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
                    <ThemeToggle />
                </Flex>
            </Flex>

            {/* Main Content */}
            <Flex direction="column" p="5" gap="5" style={{ flex: 1 }}>
                <Heading size="6">Category Analysis: Office Seating</Heading>

                {/* KPI Cards */}
                <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '5' }} gap="4">
                    <Card size="2">
                        <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>TOTAL SKUs</Text>
                        <Text as="div" size="6" weight="bold">450</Text>
                    </Card>
                    <Card size="2">
                        <Text size="1" weight="medium" color="gray" style={{ textTransform: 'uppercase' }}>AP PRODUCTION</Text>
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

                {/* Stepper */}
                <Box position="relative" my="4">
                    <Box style={{ position: 'absolute', top: '15px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--gray-6)', zIndex: 0 }} />
                    <Flex justify="between" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                        {['Category Selected', 'Item List Viewing', 'Details Pending', 'Edit Pending', 'Complete Pending'].map((step, i) => (
                            <Flex key={i} direction="column" align="center" gap="2" style={{ backgroundColor: 'var(--gray-2)', padding: '0 8px' }}>
                                <Flex align="center" justify="center" style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    backgroundColor: i <= 1 ? 'var(--gray-12)' : 'var(--gray-3)',
                                    color: i <= 1 ? 'var(--gray-1)' : 'var(--gray-8)',
                                    border: i <= 1 ? 'none' : '1px solid var(--gray-8)',
                                    transition: 'background-color 0.2s, color 0.2s'
                                }}>
                                    {i < 1 ? <CheckCircledIcon /> : i === 1 ? <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gray-1)' }} /> : <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gray-8)' }} />}
                                </Flex>
                                <Text size="1" weight={i <= 1 ? 'bold' : 'regular'} style={{ color: i <= 1 ? 'var(--gray-12)' : 'var(--gray-10)', transition: 'color 0.2s' }}>
                                    {step.split(' ')[0]}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>

                {/* Split View */}
                <Grid columns="12" gap="6" style={{ flex: 1, minHeight: 0 }}>
                    {/* Left Panel: List */}
                    <Box style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Card size="3" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
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

                            <Box style={{ flex: 1, overflow: 'auto' }}>
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
                                                style={{ cursor: 'pointer', backgroundColor: selectedItem.id === item.id ? 'var(--gray-3)' : undefined }}
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
                                                        <Text as="div" weight="bold" size="2">{item.name}</Text>
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
                    <Box style={{ gridColumn: 'span 4', height: '100%' }}>
                        <Card size="3" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Flex justify="between" align="center" mb="4">
                                <Heading size="3">Item Details</Heading>
                                <IconButton variant="ghost" color="gray"><Cross2Icon /></IconButton>
                            </Flex>

                            <Flex direction="column" gap="5" style={{ overflow: 'auto' }}>
                                {/* Quick Actions */}
                                <Flex direction="column" gap="2">
                                    <Flex
                                        justify="between"
                                        align="center"
                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                        onClick={() => toggleSection('quickActions')}
                                    >
                                        <Text size="2" weight="medium">Quick Actions</Text>
                                        <ChevronDownIcon style={{ transform: sections.quickActions ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                                    </Flex>
                                    {sections.quickActions && (
                                        <Grid columns="2" gap="2">
                                            <Button variant="soft" color="gray" style={{ height: '64px', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }}>
                                                <FileTextIcon /> Edit Details
                                            </Button>
                                            <Button variant="outline" color="gray" style={{ height: '64px', flexDirection: 'column', gap: '4px' }}>
                                                <CopyIcon /> Duplicate
                                            </Button>
                                            <Button variant="outline" color="gray" style={{ height: '64px', flexDirection: 'column', gap: '4px' }}>
                                                <DownloadIcon /> Export PDF
                                            </Button>
                                            <Button variant="outline" color="gray" style={{ height: '64px', flexDirection: 'column', gap: '4px' }}>
                                                <PaperPlaneIcon /> Ship Now
                                            </Button>
                                        </Grid>
                                    )}
                                </Flex>

                                <Separator size="4" />

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

                                {/* AI */}
                                <Card variant="surface" style={{ backgroundColor: 'var(--gray-2)' }}>
                                    <Flex align="center" gap="2" mb="2">
                                        <InfoCircledIcon /> <Text size="1" weight="bold">AI Recommendations</Text>
                                    </Flex>
                                    <Card variant="classic" style={{ backgroundColor: 'var(--gray-3)' }}>
                                        <Flex gap="2">
                                            <ExclamationTriangleIcon />
                                            <Box>
                                                <Text as="div" size="1" weight="bold">Reorder Recommendation</Text>
                                                <Text as="div" size="1" color="gray">Stock projected to reach reorder point in 10 days.</Text>
                                                <Flex gap="2" mt="2">
                                                    <Dialog.Root>
                                                        <Dialog.Trigger>
                                                            <Button size="1" variant="solid" color="gray" style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)', cursor: 'pointer' }}>Create PO</Button>
                                                        </Dialog.Trigger>
                                                        <Dialog.Content style={{ maxWidth: 450 }}>
                                                            <Dialog.Title>Create Purchase Order</Dialog.Title>
                                                            <Dialog.Description size="2" mb="4">
                                                                Review order details before confirming.
                                                            </Dialog.Description>

                                                            <Flex direction="column" gap="3">
                                                                <Box p="3" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
                                                                    <Text size="1" weight="bold" color="gray" style={{ textTransform: 'uppercase' }}>Order Summary</Text>
                                                                    <Flex justify="between" mt="2">
                                                                        <Text weight="bold">{selectedItem.name}</Text>
                                                                        <Text>x 50 Units</Text>
                                                                    </Flex>
                                                                    <Flex justify="between">
                                                                        <Text size="1" color="gray">SKU: {selectedItem.id}</Text>
                                                                        <Text size="1" color="gray">@ $45.00/unit</Text>
                                                                    </Flex>
                                                                </Box>

                                                                <Flex justify="between" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
                                                                    <Text weight="medium">Total Cost</Text>
                                                                    <Text size="5" weight="bold">$2,250.00</Text>
                                                                </Flex>
                                                            </Flex>

                                                            <Flex gap="3" mt="4" justify="end">
                                                                <Dialog.Close>
                                                                    <Button variant="soft" color="gray">Cancel</Button>
                                                                </Dialog.Close>
                                                                <Dialog.Close>
                                                                    <Button onClick={() => alert("Purchase Order Created!")}>Confirm Order</Button>
                                                                </Dialog.Close>
                                                            </Flex>
                                                        </Dialog.Content>
                                                    </Dialog.Root>
                                                    <Button size="1" variant="outline" color="gray" style={{ cursor: 'pointer' }}>Dismiss</Button>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Card>

                            </Flex>
                        </Card>
                    </Box>
                </Grid>
            </Flex>
        </Flex>
    )
}
