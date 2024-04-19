//src/components/ui/SignUpGrid.tsx
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";

export default function SignUpGrid() {
  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <Container w="70%">
            <Stack align="left">
              <Text fw={700} size="2rem">
                Hello!
              </Text>
              <Text c="dimmed">Please signup to continue</Text>
              <TextInput
                p="lg"
                variant="unstyled"
                label="Username"
                description="Username of Account"
                placeholder="jasonbourne"
              />
              <TextInput
                p="lg"
                variant="unstyled"
                label="Password"
                description="Credential of Account"
                placeholder="Your secret password"
              />
              <TextInput
                p="lg"
                variant="unstyled"
                label="Confirm Password"
                description="Re-enter your password"
                placeholder="Your secret password again"
              />
              <Button color="#c8d3eb" variant="filled">
                Sign Up
              </Button>

              <Divider label="OR" labelPosition="center"></Divider>
              <Stack align="center">
                <Text c="dimmed">SignUp with</Text>
                <Group>
                  <TbBrandFacebook scale="2rem" />
                  <TbBrandTwitter scale={2} />
                </Group>
              </Stack>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={6}>test</Grid.Col>
      </Grid>
    </>
  );
}
