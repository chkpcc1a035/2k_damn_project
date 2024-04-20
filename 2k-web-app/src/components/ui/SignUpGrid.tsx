"use client";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandMeta, IconBrandX } from "@tabler/icons-react";
import { sign } from "crypto";
import { TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";

export default function SignUpGrid({ isSigned }: { isSigned: boolean }) {
  const signUpForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      reEnterPassword: "",
    },

    validate: {
      username: (value) =>
        /.{8,}/.test(value)
          ? null
          : "The username must be at least 8 characters long",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
          ? null
          : "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      reEnterPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });
  return (
    <form
      onSubmit={signUpForm.onSubmit(async (values) => {
        const apiResponse = await fetch("api/signup", {
          method: "POST", // Assuming you're sending a POST request
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(values), // Stringify the values to send as JSON
        });
        // ... handle the response
      })}
    >
      <SimpleGrid mt={"5vh"} cols={{ base: 1, xs: 2 }}>
        <Card withBorder>
          <Stack align="left">
            <Text fw={700} size="2rem">
              Hello!
            </Text>
            <Text c="dimmed">Please signup to continue</Text>
            <TextInput
              key="username"
              p="lg"
              variant="unstyled"
              label="Username"
              description="Username of Account"
              placeholder="jasonbourne"
              {...signUpForm.getInputProps("username")}
            />
            <TextInput
              p="lg"
              key="password"
              variant="unstyled"
              label="Password"
              description="Credential of Account"
              placeholder="Your secret password"
              {...signUpForm.getInputProps("password")}
            />
            <TextInput
              key="reEnterPassword"
              p="lg"
              variant="unstyled"
              label="Confirm Password"
              description="Re-enter your password"
              placeholder="Your secret password again"
              {...signUpForm.getInputProps("reEnterPassword")}
            />
            <Button
              color="#c8d3eb"
              variant="filled"
              type="submit"
              onClick={() => {
                console.log("Sign Up button clicked");
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Card>
        <Skeleton h={"100%"} visibleFrom="xs" />
      </SimpleGrid>
    </form>
  );
}
