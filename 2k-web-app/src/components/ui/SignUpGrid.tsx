"use client";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";

export default function SignUpGrid({ isSigned }: { isSigned: boolean }) {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const signUpForm = useForm({
    initialValues: {
      username: "",
      password: "",
      reEnterPassword: "",
    },
    validate: {
      username: (value) =>
        value.length < 8
          ? "The username must be at least 8 characters long"
          : null,
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
          ? null
          : "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      reEnterPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const [debouncedUsername] = useDebouncedValue(
    signUpForm.values.username,
    500
  );

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (registerSuccess) {
      open();
      timer = setTimeout(async () => {
        // await signIn("Credentials"); // Redirect to login page after 5 seconds
        router.push("/Shop");
      }, 5000);
    }

    return () => clearTimeout(timer); // Cleanup timeout
  }, [registerSuccess]);

  useEffect(() => {
    if (debouncedUsername.length >= 8) {
      checkUsernameExists(debouncedUsername);
    } else {
      setUsernameExists(false);
      signUpForm.setFieldError("username", null);
    }
  }, [debouncedUsername]);

  async function checkUsernameExists(username: string) {
    try {
      const response = await fetch("api/usernameExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const { exists } = await response.json();
      setUsernameExists(exists);
      signUpForm.setFieldError(
        "username",
        exists ? "Username is already taken" : null
      );
    } catch (error) {
      console.error("Failed to check username:", error);
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Sign Up Successful"
        centered
      >
        <Text>
          Your account has been successfully created. Please log in to continue.
          You will be redirect to the login page in 5 seconds.
        </Text>
        <Center>
          <Button fullWidth onClick={close}>
            Close
          </Button>
        </Center>
      </Modal>
      <form
        onSubmit={signUpForm.onSubmit(async (values) => {
          if (usernameExists) {
            // This line is optional as the form won't submit if there are errors
            signUpForm.setFieldError("username", "Username is already taken");
            return;
          }
          const formValid = signUpForm.validate();

          if (!formValid.hasErrors) {
            try {
              const apiResponse = await fetch("api/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              if (!apiResponse.ok) {
                throw new Error("API response was not ok.");
              }

              const responseData = await apiResponse.json();
              console.log("Response data:", responseData);
              if (responseData.statusCode === "registerSuccess") {
                setRegisterSuccess(true);
                // open();
              }
            } catch (error) {
              console.error("Error during sign up:", error);
              // open(); // Ensure this is called
            }

            // API call to register the user
            // console.log("Submitting form", values);
          }
        })}
      >
        <SimpleGrid mt={"5vh"} cols={{ base: 1, xs: 2 }}>
          <Card withBorder radius="md" shadow="sm">
            <Stack align="left">
              <Text fw={700} size="2rem" pl="lg">
                Hello!
              </Text>
              <Text pl="lg" c="dimmed">
                Please signup to continue
              </Text>
              <TextInput
                p="lg"
                variant="unstyled"
                label="Username"
                description="Username of Account"
                placeholder="jasonbourne"
                {...signUpForm.getInputProps("username")}
              />

              <TextInput
                p="lg"
                variant="unstyled"
                label="Password"
                description="Credential of Account"
                placeholder="Your secret password"
                {...signUpForm.getInputProps("password")}
              />

              <TextInput
                p="lg"
                variant="unstyled"
                label="Confirm Password"
                description="Re-enter your password"
                placeholder="Your secret password again"
                {...signUpForm.getInputProps("reEnterPassword")}
              />

              <Button color="#c8d3eb" variant="filled" type="submit">
                Sign Up
              </Button>
            </Stack>
          </Card>
          <Skeleton h={"100%"} visibleFrom="xs" />
        </SimpleGrid>
      </form>
    </>
  );
}
