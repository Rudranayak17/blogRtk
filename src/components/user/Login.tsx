import { useState, FormEvent, useEffect } from "react";
import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../actions/Api";

import { useAppDispatch } from "../../hook";
import { loginSuccess } from "../../reducers/userReducer";
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const disptach=useAppDispatch()
  const [login, { data, isError, error, isSuccess,isLoading }] = useLoginMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  console.log(data);

  // Step 3: Define a function to handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    login(credentials)
      .unwrap()
      .then((result) => {
        console.log("Login successful:", result);
        // Redirect or perform other actions as needed
        localStorage.setItem("token", result.token);
      })
      .catch((error) => {
        console.error("Login error:", error.data.message);
        // Handle login failure, display an error message, or take other actions
      });

    // You can access the email and password values here for further processing
  };
  const redirect=location.pathname?location.pathname:"/profile"
  useEffect(() => {
    if (isError) {
      const typeError = error as MyError;
      toast({
        title: typeError.data?.message,
        status: "error",
        duration: 3000,

        isClosable: true,
      });
    }

    if (isSuccess) {
      if (data && data.user) {
        toast({
          title: `Welcome back ${data.user.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        disptach(loginSuccess({ user: data.user,token:data.token }));
        navigate("/");
      } else {
        // Handle the case where data or user is undefined
        // You can show an error message or take appropriate action
      }
    }
    
  }, [error, isError, toast, isSuccess, data, navigate,disptach,redirect]);

  return (
    <Container
      boxShadow={"dark-lg"}
      padding={"10"}
      minH={"500px"}
      marginTop={"28"}
    >
      <Heading textAlign={"center"}>Welcome Back</Heading>

      <form onSubmit={handleSubmit}>
        {" "}
        {/* Step 4: Create a form */}
        <HStack marginTop={""} padding={"4"} fontSize={"2xl"}>
          <AiOutlineMail />
          <Input
            required
            marginLeft={"3"}
            variant={"flushed"}
            type="email"
            size={"lg"}
            placeholder="Email..."
            // Step 4: Associate input with state
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </HStack>
        <HStack marginTop={"3"} padding={"4"} fontSize={"2xl"}>
          <RiLockPasswordLine />
          <Input
            required
            marginLeft={"3"}
            variant={"flushed"}
            type="password"
            size={"lg"}
            placeholder="Password"
            // Step 4: Associate input with state
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </HStack>
        <Link to={"/forgetpassword"}>
          <Text
            fontSize={"sm"}
            textDecorationLine={"underline"}
            textAlign={"end"}
          >
            Forget Password?
          </Text>
        </Link>
        <Button
         isLoading={isLoading}
          type="submit" // Step 5: Create a submit button
          borderRadius={"full"}
          margin={"2rem 2.6rem"}
          padding={"6"}
          width={"sm"}
          colorScheme="teal"
        >
          Log In
        </Button>
      </form>

      <Text textAlign={"center"}>
        Don't have an account?
        <span style={{ marginLeft: "1rem", color: "#00A9FF" }}>
          <Link to={"/signup"}>Sign Up Now</Link>
        </span>
      </Text>
    </Container>
  );
};

export default Login;
