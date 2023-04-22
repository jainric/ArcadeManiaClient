import {
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    Menu,
    useColorModeValue,
    Text,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom'
  import React from "react";
  import { useState, useEffect } from "react";
  import { FiChevronDown } from "react-icons/fi";
  
  import SignInDrawer from "../../auth/SignIn";
  import SignupDrawer from "../../auth/Signup";
  import { setAxiosAuthHeader } from "../../../../lib/config/axios.config";
  import { getUser } from "../../../../lib/services/user-service";
  import { getAuthState, setAccessToken } from "../../../../lib/store/slices/authSlice";
  import { clearFavourite } from "../../../../lib/store/slices/favouritesSlice";
  import { setUserPreferenceRecentlyPlayed } from "../../../../lib/store/slices/userPreferencesSlice";
  import { useDispatch, useSelector } from "../../../../lib/store/store";
  import type { AuthState } from "../../../../lib/types/components/auth.types";
  import { showSuccess } from "../../../../lib/utils/toastUtils";
  import { setSessionStorageToken } from "../../../../lib/utils/tokenUtils";
  
  /**
   * This component creates and renders the menu of loggedin user with myprofile, favourites and signout options
   * @returns LoggedInMenu Component
   */
  const LoggedInMenu: React.FC<AuthState> = ({ token }) => {
    const [username, setUserName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * This method is used to remove the accesstoken from the local storage and navigates the user to dashboard page
     */
    const signOut = () => {
      setAxiosAuthHeader("");
      setSessionStorageToken("");
      dispatch(setAccessToken({ token: "" }));
      dispatch(setUserPreferenceRecentlyPlayed([]));
      dispatch(clearFavourite([]));
      navigate('/');
      showSuccess("User logged out successfully");
    };
  
    /**
     * This method is used to get the user details from the jwt token and set the username
     */
    useEffect(() => {
      getUser(token)
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        });
    }, [token]);
  
    return (
      <Flex alignItems="center" zIndex={1001}>
        <Menu>
          <MenuButton
            width="max-content"
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar size="sm" src="/images/profile.png" />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{username}</Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            zIndex={1000}
          >
            <MenuItem
              onClick={() =>
                navigate('/profile/myProfile')}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate('/profile/favourites')}
            >
              Favourites
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };
  
  /**
   * This component creates and renders the authmodule
   * @returns AuthMenu Component with signin and signup buttons
   */
  const SignInMenu = () => {
    return (
      <HStack
        flex={{ base: 1, md: 0 }}
        justify="flex-end"
        direction="row"
        spacing={4}
      >
        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={4}
        >
          <SignupDrawer />
          <SignInDrawer />
        </Stack>
      </HStack>
    );
  };
  
  /**
   * This main component creates and renders either the authmodule or loggedIn module based on the accesstoken availability
   * @returns menuItems
   */
  const MenuItems = () => {
    const { token } = useSelector(getAuthState);
  
    if (token && token !== "") {
      return <LoggedInMenu token={token} />;
    }
    return <SignInMenu />;
  };
  
  // exporting the main component
  export default MenuItems;