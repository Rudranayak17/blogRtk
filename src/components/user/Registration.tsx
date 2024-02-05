import React, { useEffect, useState, FormEvent, useRef } from "react";
import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assert/profile.jpg";
import { useRegistrationMutation } from "../../actions/Api";
import { useAppDispatch } from "../../hook";
import { registrationSuccess } from "../../reducers/userReducer";

const Registration = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const disptach=useAppDispatch()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [registration, { data, isError, error, isSuccess }] =
    useRegistrationMutation();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fullName: string = `${firstName} ${lastName}`;
    const myForm = new FormData();
    myForm.append("name", fullName);
    myForm.append("email", email);
    myForm.append("password", password);
    if (image !== null) {
      myForm.append("avatar", image);
      console.log(image);
      
    } else {
      // Handle the case where image is null, e.g., provide a default image
      myForm.append("avatar", profile);
    }
    
    
    registration(myForm);
  };

  console.log(data);
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isError) {
      const typeError = error as MyError;
      if (typeError.data?.message==="Cannot read properties of undefined (reading 'path')") {
        toast({
          title: "plz create your Profile image",
          status: "warning",
          duration: 3000,
  
          isClosable: true,
        });
      }else{

        toast({
          title: typeError.data?.message,
          status: "error",
          duration: 3000,
          
          isClosable: true,
        });
      }
    }

    if (data) {
      console.log(data);
      if (isSuccess) {
        toast({
          position:"top",
          title: "account created successfully",
          description: `Welcome  ${data?.user.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        disptach(registrationSuccess({user: data.user,token:data.token}))
          navigate("/");
        
      }
    }
  }, [error, isError, toast, isSuccess, data, navigate,disptach]);
  return (
    <Container
      boxShadow={"dark-lg"}
      padding={"10"}
      minH={"500px"}
      marginTop={"14"}
    >
      <Heading textAlign={"center"}>Registration</Heading>

      <form onSubmit={handleSubmit}>
        <HStack marginTop={"3"} padding={"4"} fontSize={"2xl"}>
          {image ? (
            <Avatar size={"lg"} src={URL.createObjectURL(image)} />
          ) : (
            <Avatar size={"lg"} src={profile} />
          )}
          <Button
            marginLeft={"4rem"}
            colorScheme="twitter"
            onClick={handleFileButtonClick}
          >
            Set Profile Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            name="avatar"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </HStack>
        <HStack marginTop={"3"} padding={"4"} fontSize={"5xl"}>
          <AiOutlineUser />
          <Input
            required
            marginLeft={"3"}
            variant={"flushed"}
            type="text"
            size={"lg"}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            required
            marginLeft={"3"}
            variant={"flushed"}
            type="text"
            size={"lg"}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </HStack>
        <HStack marginTop={"3"} padding={"4"} fontSize={"2xl"}>
          <AiOutlineMail />
          <Input
            required
            marginLeft={"3"}
            variant={"flushed"}
            type="email"
            size={"lg"}
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </HStack>

        <Button
          type="submit"
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
        Already have an account?{" "}
        <span style={{ marginLeft: "1rem", color: "#00A9FF" }}>
          <Link to={"/login"}>Sign In</Link>
        </span>
      </Text>
    </Container>
  );
};

export default Registration;
