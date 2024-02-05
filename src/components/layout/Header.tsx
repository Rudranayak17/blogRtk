
import { HStack, Image, Input, Button, useToast } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import icon from '../assert/icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook'; // Import your authentication state
import { logoutSuccess } from '../../reducers/userReducer';
import { useLogoutQuery } from '../../actions/Api';

const Header = () => {
  const { data, isError, isSuccess, error } = useLogoutQuery("");
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <HStack shadow={'md'} justifyContent={'space between'} padding={'1rem 2rem'}>
      <Link style={{ width: '3.6rem', marginLeft: '2rem' }} to={'/'}>
        <Image borderRadius={'full'} src={icon} maxW={'50px'} alt="Dan Abramov" />
      </Link>
      <HStack marginX={'auto'}>
        <HStack marginLeft={'2.5'} shadow="lg" borderWidth="1px">
          <Input
            size={'lg'}
            margin={'0px 20px'}
            width={'xs'}
            variant={'unstyled'}
            type="text"
            placeholder="Search..."
          />
          <Button>
            <AiOutlineSearch />{' '}
          </Button>
        </HStack>
      </HStack>
      <HStack>
        {isAuthenticated ? (
          <>
            <Button
              variant={'solid'}
              _hover={{ textDecor: 'underline' }}
              onClick={() => {
                if (isError) {
                  const typeError = error as MyError;
                  toast({
                    title: typeError.data?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                }
                if (isSuccess) {
                  if (data && data.message) {
                    toast({
                      title: data.message,
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                    dispatch(logoutSuccess({ message: data.message }));
                    localStorage.removeItem("token");
                    navigate('/');
                  } else {
                    // Handle the case where data or user is undefined
                    // You can show an error message or take appropriate action
                  }
                }
              }}
            >
              Logout
            </Button>
            <Button
              colorScheme="facebook"
              variant={'outline'}
              onClick={() => {
                navigate('/profile');
              }}
            >
              Profile
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={'solid'}
              _hover={{ textDecor: 'underline' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              Log in
            </Button>
            <Button
              colorScheme="facebook"
              variant={'outline'}
              onClick={() => {
                navigate('/signup');
              }}
            >
              Create account
            </Button>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
