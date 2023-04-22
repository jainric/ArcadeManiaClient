import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
} from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  gamesPlayed: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/getAllUsers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [users, editingUserId]);
  const exportToCsv = () => {
        const csvData = [
          ['User ID', 'Name', 'Email', 'Active'],
          ...users.map((user) => [user.id, user.name, user.email, user.isActive ? 'Yes' : 'No'])
        ];
        const csv = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h1" size="xl" mb={4}>
        Admin Dashboard
      </Heading>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Active</Th>
                <Th>Delete</Th>
                <Th>Update</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>Yes</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        fetch(
                          `http://localhost:8080/api/v1/auth/deleteUser/${user.email}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            
                          }
                        )
                          .then((response) => {
                            if (response.ok) {
                              // update local state with the new list of users (excluding the deleted user)
                              const newUsers = users.filter(
                                (u) => u.email !== user.email
                              );
                              alert("User Deleted!");
                              setUsers(newUsers);
                            } else {
                              console.error("Error deleting user");
                            }
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        const data = { id: (user.id), name: (user.name), email: (user.email) };

                        navigate("/profile/myProfile2", { state: data });
                      }}
                     
                    >
                      Update
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="blue" onClick={exportToCsv}>
            Export to CSV
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;