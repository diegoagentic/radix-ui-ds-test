import { Box, Button, Card, Flex, Heading, Text, TextField, Callout, Select } from '@radix-ui/themes';
import { EyeOpenIcon, ExclamationTriangleIcon, LockClosedIcon, PersonIcon, CubeIcon } from '@radix-ui/react-icons';

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    return (
        <Box style={{ minHeight: '100vh', backgroundColor: 'var(--gray-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <Card size="3" style={{ width: '100%', maxWidth: '480px' }}>
                <Flex direction="column" gap="4" pb="2">
                    <Flex justify="center" align="center" style={{ height: '64px', backgroundColor: 'var(--gray-4)', width: '128px', margin: '0 auto' }}>
                        <Text size="1" color="gray" weight="bold" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Client Logo</Text>
                    </Flex>
                    <Flex direction="column" align="center" gap="1">
                        <Heading size="6" weight="regular">Sign In</Heading>
                        <Text size="2" color="gray">Access your workspace</Text>
                    </Flex>
                </Flex>

                <Flex direction="column" gap="5" mt="4">
                    <Callout.Root color="red" variant="soft">
                        <Callout.Icon>
                            <ExclamationTriangleIcon />
                        </Callout.Icon>
                        <Callout.Text size="2" weight="bold">
                            Authentication Failed for selected Organization
                            <Text as="div" size="1" weight="regular" color="gray">Please check your credentials and organization selection</Text>
                        </Callout.Text>
                    </Callout.Root>

                    <Flex direction="column" gap="4">
                        <Flex direction="column" gap="2">
                            <Text as="label" size="2" weight="medium">Select Organization</Text>
                            <Select.Root defaultValue="hq">
                                <Select.Trigger style={{ height: '40px' }} />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="hq">
                                            <Flex align="center" gap="3">
                                                <CubeIcon />
                                                <Flex direction="column">
                                                    <Text size="2" weight="medium">Strata Manufacturing HQ</Text>
                                                    <Text size="1" color="gray">Primary workspace • 245 users</Text>
                                                </Flex>
                                            </Flex>
                                        </Select.Item>
                                        <Select.Item value="west">
                                            <Flex align="center" gap="3">
                                                <CubeIcon />
                                                <Flex direction="column">
                                                    <Text size="2" weight="medium">Strata West Coast Division</Text>
                                                    <Text size="1" color="gray">Regional office • 89 users</Text>
                                                </Flex>
                                            </Flex>
                                        </Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>

                        <Flex direction="column" gap="2">
                            <Text as="label" size="2" weight="medium">Work Email</Text>
                            <TextField.Root defaultValue="maria.gonzalez@estrata.com" size="3">
                                <TextField.Slot>
                                    <PersonIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </Flex>

                        <Flex direction="column" gap="2">
                            <Text as="label" size="2" weight="medium">Password</Text>
                            <TextField.Root defaultValue="SecurePass2025!" type="password" size="3">
                                <TextField.Slot>
                                    <LockClosedIcon height="16" width="16" />
                                </TextField.Slot>
                                <TextField.Slot side="right">
                                    <EyeOpenIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </Flex>

                        <Card variant="surface" style={{ backgroundColor: 'var(--gray-2)' }}>
                            <Flex gap="2" align="center" mb="2">
                                <ExclamationTriangleIcon width="12" height="12" />
                                <Text size="1" weight="medium" color="gray">Password must contain:</Text>
                            </Flex>
                            <Flex direction="column" gap="1" style={{ paddingLeft: '4px' }}>
                                <Text size="1" color="gray">• Minimum 8 characters</Text>
                                <Text size="1" color="gray">• At least one uppercase letter</Text>
                                <Text size="1" color="gray">• At least one number</Text>
                                <Text size="1" color="gray">• At least one special character (!@#$%)</Text>
                            </Flex>
                        </Card>
                    </Flex>

                    <Flex direction="column" gap="4" mt="2">
                        <Button onClick={onLoginSuccess} size="3" variant="solid" color="gray" style={{ width: '100%', backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }}>
                            Log In
                        </Button>
                        <Flex justify="center">
                            <Text size="2" color="gray" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Forgot Password?</Text>
                        </Flex>

                        <Flex justify="between" align="center" pt="4" style={{ borderTop: '1px solid var(--gray-4)' }}>
                            <Flex gap="3">
                                <Text size="1" color="gray">Need access?</Text>
                                <Text size="1" color="gray">Contact Admin</Text>
                            </Flex>
                            <Flex align="center" gap="1">
                                <LockClosedIcon width="12" height="12" color="var(--gray-8)" />
                                <Text size="1" color="gray">Secure Login</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Box>
    );
}
