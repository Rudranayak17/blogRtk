import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  post: {
    _id: string;
    username: string;
    title: string;
    content: string;
    views: number;
    blogImg: {
      public_id: string;
      url: string;
    };
    likes: number;
    comment: string[];
    tags: string;

    avatar: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const {
    _id,
    username,
    title,
    content,
    views,
    blogImg,
    likes,
    comment,

    avatar,
  } = post;

  return (
    <Card maxW="xl" marginTop="3" boxShadow="dark-lg">
      <CardHeader>
        <Flex letterSpacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={username} src={avatar} />
            <Box>
              <Heading size="sm">{username}</Heading>
              <Text>Views {views}</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <Link to={`blog/${_id}`}>
        <CardBody>
          <Heading margin="1.5" size="md">
            {title}
          </Heading>
          <Text>{content}</Text>
        </CardBody>
        <Image
          objectFit="cover"
          margin={"auto"}
          src={blogImg.url}
          alt={blogImg.public_id}
        />
        <CardFooter
          justify="space-evenly"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "40px",
            },
          }}
        >
          <Button flex="1" size="lg" variant="ghost" leftIcon={<BiLike />}>
            {likes} Like
          </Button>
          <Button flex="1" size="lg" variant="ghost" leftIcon={<BiChat />}>
            {comment.length} Comment
          </Button>
          <Button flex="1" size="lg" variant="ghost" leftIcon={<BsBookmark />}>
            Save
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogCard;
