import React from 'react';
import { Button, Container, HStack, Spinner, Stack } from '@chakra-ui/react';

import { useGetAllBlogsQuery } from '../actions/Api';
import BlogCard from './blogCard/BlogCard';

const Home: React.FC = () => {
  const { isLoading, data } = useGetAllBlogsQuery("");
console.log(data);


  return (
    <>
    <HStack display={'flex'} justifyContent={'center'} marginTop={"10px"} marginRight={"20px"}>
      <Button size={"lg"} >mostViews</Button>
      <Button  size={"lg"} >mostLikes</Button>
      <Button  size={"lg"} >trending Within Month</Button>
    </HStack>
      <Container maxW="550px" marginTop="4">
        {isLoading ? (
          <Stack display={"flex"} minHeight={'500'} justifyContent={'center'} alignItems={"center"} >
          <Spinner  size={"xl"}  />
            </Stack>
        ) : (
          data?.allPost.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))
 
        )}
      </Container>
    </>
  );
};

export default Home;
