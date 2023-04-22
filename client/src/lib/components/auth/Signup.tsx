/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Stack,
    useDisclosure,
  } from "@chakra-ui/react";
  import { Formik, Field } from "formik";
  import React, { useState } from "react";
  import { FiEye, FiEyeOff } from "react-icons/fi";
  import { MdVpnKey } from "react-icons/md";
  import { useDispatch } from "react-redux";
  
  import { setAxiosAuthHeader } from "../../../lib/config/axios.config";
  import { createUser } from "../../../lib/services/auth-service";
  import { setAccessToken } from "../../../lib/store/slices/authSlice";
  import type { SignUpUserType } from "../../../lib/types/components/auth.types";
  import { raiseError, showSuccess } from "../../../lib/utils/toastUtils";
  import { setSessionStorageToken } from "../../../lib/utils/tokenUtils";
  // import passwordValidator from '../../../../../server/src/config/validators';
  import passwordValidator from 'password-validator';
  /**
   * This component is used to create and render the signUp Form in a drawer
   * @returns SignUp Form in a drawer with drawer trigger button
   */
  const SignupDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handlePassClick = () => setShowConfirmPassword(!showConfirmPassword);
    let password = "";
    const dispatch = useDispatch();
  
    /**
     * This function is used to create a user and update the login status, it takes 1 parameter
     * @param values obtainer from the signup form
     */
    // const userSignUp = async (values: SignUpUserType) => {
    //   const jsonValues = {
    //     name: `${values.firstName} ${values.lastName}`,
    //     email: values.email,
    //     username: values.username,
    //     password: values.password,
    //   };
    //   const accessTokenObj = await createUser(
    //     JSON.parse(JSON.stringify(jsonValues))
    //   );
    //   if (accessTokenObj.status === 200) {
    //     const body = await accessTokenObj.json();
    //     if (body.accessToken !== null) {
    //       setAxiosAuthHeader(body.accessToken);
    //       setSessionStorageToken(body.accessToken);
    //       dispatch(setAccessToken({ token: body.accessToken }));
    //     }
    //     showSuccess("User created Successfully");
    //   } else {
    //     raiseError("User already exists");
    //   }
    //   onClose();
    // };


    const userSignUp = async (values: SignUpUserType) => {
      const jsonValues = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      const passwordError = validatePassword(values.password);
      const confirmPasswordError = validateConfirmPassword(values.confirmpassword);
      const usernameError = validateUsername(values.username);
      const emailError = validateEmail(values.email);
      const lastNameError = validateLastName(values.lastName);
    
      if (
        passwordError ||
        confirmPasswordError ||
        usernameError ||
        emailError ||
        lastNameError
      ) {
        raiseError("Password must be on length 8 and contain at least one uppercase, one lowercase, one special character and one number");
        return;
      }
    
      const accessTokenObj = await createUser(
        JSON.parse(JSON.stringify(jsonValues))
      );
      if (accessTokenObj.status === 200) {
        const body = await accessTokenObj.json();
        if (body.accessToken !== null) {
          setAxiosAuthHeader(body.accessToken);
          setSessionStorageToken(body.accessToken);
          dispatch(setAccessToken({ token: body.accessToken }));
        }
        showSuccess("User created Successfully");
      } else {
        raiseError("User already exists");
      }
      onClose();
    };
    
    /**
     * This method is used to set the password value which is used later to validate
     * @param value password field value
     */
    const setPassword = (value: string) => {
      password = value;
    };
    
    /**
     * This method is used to validate the password value
     * @param value password field value
     * @returns error if value doesn't meet the basic validations
     */
    const validatePassword = (value: string) => {
      const schema = new passwordValidator();
    
      schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase(1)                             // Must have uppercase letters
        .has().lowercase(1)                             // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().symbols()
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist
    
      let error;
      if (!value) {
        error = "Password is required";
      } else if (!schema.validate(value)) {
        error = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, two digits, one symbol and must not be a common password.";
      }
    
      if (!error) {
        setPassword(value);
      }
    
      return error;
    };
    
    /**
     * This method is used to validate the confirm password value with saved password value
     * @param value confirm password field value
     * @returns error if value doesn't meet the basic validations
     */
    const validateConfirmPassword = (value: string) => {
      let error;
      if (!(value === password)) {
        error = "Password doesn't match with password field";
      }
      return error;
    };
    
    /**
     * This method is used to validate the username value
     * @param value username field value
     * @returns error if value doesn't meet the basic validations
     */
    const validateUsername = (value: string) => {
      let error;
      if (!value) {
        error = "UserName is required";
      }
      return error;
    };
    
    /**
     * This method is used to validate the email value
     * @param value email field value
     * @returns error if value doesn't meet the basic validations
     */
    const validateEmail = (value: string) => {
      let error;
      if (!value) {
        error = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Invalid email address";
      }
      return error;
    };
    
    /**
     * This method is used to validate the lastname value
     * @param value lastname field value
     * @returns error if value is empty
     */
    const validateLastName = (value: string) => {
      let error;
      if (!value) {
        error = "Last Name is required";
      }
      return error;
    };
    
  
    /**
     * returning the main signup form in a drawer with trigger button
     */
    return (
      <>
        <Button
          variant="outline"
          display="inline-flex"
          color="white"
          bg="blue.400"
          _hover={{
            bg: "blue.300",
          }}
          onClick={onOpen}
        >
          Sign Up
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new account
            </DrawerHeader>
            <DrawerBody>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  username: "",
                  password: "",
                  confirmpassword: "",
                }}
                onSubmit={(values) => {
                  userSignUp(JSON.parse(JSON.stringify(values)));
                }}
              >
                {({ handleSubmit }) => (
                  <form id="signup-form" onSubmit={handleSubmit}>
                    <Stack spacing="24px">
                      <FormControl>
                        <Flex>
                          <Field name="firstName">
                            {({ field }: any) => (
                              <FormControl mr={3}>
                                <FormLabel htmlFor="firstName" pl={1}>
                                  First Name
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="firstName"
                                  placeholder="First name"
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Field name="lastName" validate={validateLastName}>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.lastName && form.touched.lastName
                                }
                              >
                                <FormLabel htmlFor="LastName" pl={1}>
                                  Last Name
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="lastName"
                                  placeholder="Last name"
                                  required
                                />
                                <FormErrorMessage display="block">
                                  {form.errors.lastName}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                        <Box>
                          <Field name="email" validate={validateEmail}>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.email && form.touched.email
                                }
                              >
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <InputGroup>
                                  <Input
                                    {...field}
                                    id="email"
                                    placeholder="Please enter email"
                                    type="email"
                                  />
                                </InputGroup>
                                <FormErrorMessage>
                                  {form.errors.email}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                        <Box>
                          <Field name="username" validate={validateUsername}>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.username && form.touched.username
                                }
                              >
                                <FormLabel htmlFor="username">UserName</FormLabel>
                                <Input
                                  {...field}
                                  id="username"
                                  placeholder="Please enter user name"
                                />
                                <FormErrorMessage>
                                  {form.errors.username}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
  
                        <Box>
                          <Field name="password" validate={validatePassword}>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.password && form.touched.password
                                }
                              >
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup size="md">
                                  <InputLeftAddon
                                    backgroundColor="white"
                                    color="gray.500"
                                  >
                                    <Box as={MdVpnKey} />
                                  </InputLeftAddon>
                                  <Input
                                    {...field}
                                    pr="4.5rem"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                  />
                                  <InputRightElement width="4.5rem">
                                    <Button
                                      h="1.75rem"
                                      size="sm"
                                      onClick={handleClick}
                                    >
                                      {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                  {form.errors.password}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                        <Box>
                          <Field
                            name="confirmpassword"
                            validate={validateConfirmPassword}
                          >
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.confirmpassword &&
                                  form.touched.confirmpassword
                                }
                              >
                                <FormLabel htmlFor="confirmpassword">
                                  Confirm Password
                                </FormLabel>
                                <InputGroup size="md">
                                  <InputLeftAddon
                                    backgroundColor="white"
                                    color="gray.500"
                                  >
                                    <Box as={MdVpnKey} />
                                  </InputLeftAddon>
                                  <Input
                                    {...field}
                                    pr="4.5rem"
                                    id="confirmpassword"
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    placeholder="Confirm password"
                                  />
                                  <InputRightElement width="4.5rem">
                                    <Button
                                      h="1.75rem"
                                      size="sm"
                                      onClick={handlePassClick}
                                    >
                                      {showConfirmPassword ? (
                                        <FiEyeOff />
                                      ) : (
                                        <FiEye />
                                      )}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                  {form.errors.confirmpassword}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      </FormControl>
                    </Stack>
                  </form>
                )}
              </Formik>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" form="signup-form" colorScheme="blue">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default SignupDrawer;
  

