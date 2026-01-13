import { Box, Button, Flex, Heading, Text, TextField, Separator, Theme, DropdownMenu } from '@radix-ui/themes';
import { EyeOpenIcon, EyeNoneIcon, LockClosedIcon, PersonIcon, ArrowRightIcon, ComponentInstanceIcon, ChevronDownIcon, CheckCircledIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const organizations = [
    { name: 'Strata Manufacturing HQ', users: 245, type: 'Primary workspace' },
    { name: 'Strata Sales Division', users: 120, type: 'Regional hub' },
    { name: 'Strata Logistics Link', users: 85, type: 'Distribution center' }
]

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(organizations[0]);

    const handleAction = () => {
        onLoginSuccess();
    };

    const glassStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
    };

    return (
        <Flex style={{ minHeight: '100vh', flexDirection: 'row', flexWrap: 'wrap', fontFamily: 'sans-serif', backgroundColor: 'var(--color-background)' }}>
            {/* Left Side - Branding (Responsive via Radix Colors) */}
            <Box style={{ flex: '1 1 50%', minHeight: '100vh', backgroundColor: 'var(--gray-2)', position: 'relative', overflow: 'hidden', padding: 'var(--space-9)' }}>
                {/* Decorative background */}
                <Box style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, var(--gray-3), transparent)', zIndex: 0 }} />

                <Flex direction="column" justify="center" style={{ position: 'relative', zIndex: 1, height: '100%', maxWidth: '500px', margin: '0 auto' }} gap="6">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <style>{`
                            .logo-light { display: block; }
                            .logo-dark { display: none; }
                            .dark .logo-light, [data-theme='dark'] .logo-light { display: none; }
                            .dark .logo-dark, [data-theme='dark'] .logo-dark { display: block; }
                        `}</style>
                        <img className="logo-light" src="/logo-on-light.jpg?v=2" alt="Strata" style={{ height: '32px' }} />
                        <img className="logo-dark" src="/logo-on-dark.jpg?v=2" alt="Strata" style={{ height: '32px' }} />
                    </div>

                    <Heading size="9" style={{ color: 'var(--gray-12)', lineHeight: '1.2' }}>
                        Transform your workflow with Strata
                    </Heading>

                    <Text size="4" style={{ color: 'var(--gray-11)', lineHeight: '1.6' }}>
                        At Strata, we provide comprehensive solutions for contract dealers and manufacturers, combining sales enablement, financial services, and expert consulting with cutting-edge technology to optimize operations and drive business growth.
                    </Text>

                    <Flex gap="4" pt="4">
                        <Button
                            size="4"
                            style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)', borderRadius: '9999px', paddingLeft: '24px', paddingRight: '24px' }}
                        >
                            Talk to an Expert <ArrowRightIcon />
                        </Button>
                        <Button
                            size="4"
                            variant="outline"
                            style={{ color: 'var(--gray-12)', borderColor: 'var(--gray-8)', borderRadius: '9999px', paddingLeft: '24px', paddingRight: '24px' }}
                        >
                            Browse all Services
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            {/* Right Side - Form */}
            <Theme appearance="dark" style={{ flex: '1 1 50%', display: 'flex' }}>
                <Flex style={{ flex: 1, minHeight: '100vh', backgroundImage: 'url(/login-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }} align="center" justify="center" p="4">
                    {/* Dark Overlay */}
                    <Box style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', zIndex: 0 }} />

                    <Flex direction="column" style={{ width: '100%', maxWidth: '460px', zIndex: 1, ...glassStyle }} gap="5">

                        <Flex direction="column" gap="2">
                            <Heading size="7" weight="bold" style={{ color: 'white' }}>
                                {isRegistering ? 'Create Account' : 'Welcome Back!'}
                            </Heading>
                            <Flex gap="1" align="center">
                                <Text size="2" style={{ color: '#a1a1aa' }}>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</Text>
                                <Text
                                    size="2"
                                    weight="bold"
                                    style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {isRegistering ? 'Login now' : 'Create a new account now,'}
                                </Text>
                                {!isRegistering && <Text size="2" style={{ color: '#71717a' }}>it's FREE!</Text>}
                            </Flex>
                        </Flex>

                        <Flex direction="column" gap="4">
                            {!isRegistering && (
                                <>
                                    <Button
                                        size="3"
                                        variant="outline"
                                        style={{ width: '100%', height: '48px', justifyContent: 'center', gap: '8px', color: 'white', borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        onClick={handleAction}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z" /><path fill="#7fba00" d="M11 1h9v9h-9z" /><path fill="#00a4ef" d="M1 11h9v9H1z" /><path fill="#ffb900" d="M11 11h9v9h-9z" /></svg>
                                        Login with Microsoft
                                    </Button>

                                    <Flex align="center" gap="2">
                                        <Separator size="4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                                        <Text size="1" style={{ textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#71717a' }}> Or login with email </Text>
                                        <Separator size="4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                                    </Flex>
                                </>
                            )}

                            <Flex direction="column" gap="3">
                                {isRegistering && (
                                    <Box>
                                        <Text size="2" mb="1" style={{ color: '#a1a1aa' }}>Select Organization</Text>
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger>
                                                <Flex
                                                    align="center"
                                                    gap="3"
                                                    style={{
                                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '12px',
                                                        padding: '12px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Flex align="center" justify="center" style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                                        <ComponentInstanceIcon color="white" width="18" height="18" />
                                                    </Flex>
                                                    <Box style={{ flex: 1 }}>
                                                        <Flex align="center" gap="2">
                                                            <Text size="2" weight="bold" style={{ color: 'white' }}>{selectedOrg.name}</Text>
                                                            <Box style={{ width: 8, height: 8, backgroundColor: '#10b981', borderRadius: '50%' }} />
                                                        </Flex>
                                                        <Text size="1" style={{ color: '#a1a1aa' }}>{selectedOrg.type} • {selectedOrg.users} users</Text>
                                                    </Box>
                                                    <ChevronDownIcon color="gray" width="20" height="20" />
                                                </Flex>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content variant="soft" color="gray">
                                                {organizations.map((org, index) => (
                                                    <DropdownMenu.Item key={index} onSelect={() => setSelectedOrg(org)}>
                                                        <Flex gap="2" align="center">
                                                            <ComponentInstanceIcon />
                                                            <Box>
                                                                <Text size="2" weight="bold">{org.name}</Text>
                                                                <Text size="1" color="gray">{org.type}</Text>
                                                            </Box>
                                                        </Flex>
                                                    </DropdownMenu.Item>
                                                ))}
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </Box>
                                )}

                                <Box>
                                    <Text size="2" mb="1" style={{ color: '#a1a1aa' }}>{isRegistering ? 'Work Email' : 'Email'}</Text>
                                    <TextField.Root size="3" placeholder="name@example.com" defaultValue="hisalim.ux@gmail.com" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}>
                                        <TextField.Slot>
                                            <PersonIcon height="16" width="16" color="gray" />
                                        </TextField.Slot>
                                    </TextField.Root>
                                </Box>

                                <Box>
                                    <Text size="2" mb="1" style={{ color: '#a1a1aa' }}>Password</Text>
                                    <TextField.Root size="3" type={showPassword ? 'text' : 'password'} placeholder="Password" defaultValue="Password123!" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}>
                                        <TextField.Slot>
                                            <LockClosedIcon height="16" width="16" color="gray" />
                                        </TextField.Slot>
                                        <TextField.Slot side="right" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeNoneIcon height="16" width="16" color="gray" /> : <EyeOpenIcon height="16" width="16" color="gray" />}
                                        </TextField.Slot>
                                    </TextField.Root>
                                </Box>

                                {isRegistering && (
                                    <Box style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                        <Flex gap="2" align="start">
                                            <CheckCircledIcon color="#4ade80" width="16" height="16" style={{ marginTop: 2 }} />
                                            <Box>
                                                <Text size="2" weight="medium" style={{ color: '#bbf7d0', display: 'block', marginBottom: '4px' }}>Password requirements met:</Text>
                                                <Flex direction="column" gap="1">
                                                    <Flex align="center" gap="2">
                                                        <CheckIcon color="#4ade80" width="14" height="14" />
                                                        <Text size="1" style={{ color: '#86efac' }}>Minimum 8 characters</Text>
                                                    </Flex>
                                                    <Flex align="center" gap="2">
                                                        <CheckIcon color="#4ade80" width="14" height="14" />
                                                        <Text size="1" style={{ color: '#86efac' }}>At least one uppercase letter</Text>
                                                    </Flex>
                                                    <Flex align="center" gap="2">
                                                        <CheckIcon color="#4ade80" width="14" height="14" />
                                                        <Text size="1" style={{ color: '#86efac' }}>At least one number</Text>
                                                    </Flex>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Box>
                                )}
                            </Flex>

                            <Button size="4" style={{ width: '100%', backgroundColor: 'white', color: 'black', marginTop: '8px' }} onClick={handleAction}>
                                {isRegistering ? 'Create Account' : 'Login Now'}
                            </Button>

                            {!isRegistering && (
                                <Flex justify="center">
                                    <Text size="2" style={{ color: '#71717a' }}>
                                        Forget password <Text style={{ textDecoration: 'underline', color: '#d4d4d8', cursor: 'pointer' }}>Click here</Text>
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Theme>
        </Flex>
    );
}
