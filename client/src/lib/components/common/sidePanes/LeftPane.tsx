import {
    Divider,
    Flex,
    IconButton,
    Button,
    Icon,
    Text,
    MenuList,
    MenuItem,
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom'
  import { useState } from "react";
  import { FaRandom } from "react-icons/fa";
  import { FiMenu, FiHome, FiStar } from "react-icons/fi";
  import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
  
  import type { GameInfo, NavItemProps } from "../../../types/components/common";
  import { getGameInfo } from "../../../../lib/components/games";
  import { getFavourites } from "../../../../lib/store/slices/favouritesSlice";
  import { useSelector } from "../../../../lib/store/store";
  
  import { NavItemMenu } from "./NavItems";
import React from "react";
  
  type GameNavbarProps = NavItemProps & {
    games: GameInfo[];
  };
  
  /**
   * Nav Item that is rendered in the Left Side Menu.
   *
   * @param NavItemProps props
   * @returns NavItem
   */
  const NavItem: React.FC<NavItemProps> = ({
    navSize,
    active,
    title,
    icon,
    onClick,
  }) => {
    return (
      <Flex
        mt={5}
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        title={title}
      >
        <Button
          variant="ghost"
          size="lg"
          h="100%"
          w="100%"
          backgroundColor={active ? "AEC8CA" : "none"}
          p={navSize === "small" ? "23px" : "5px"}
          borderRadius={8}
          _hover={{ textDecor: "none", background: "#AEC8CA" }}
          onClick={onClick}
          title={title}
        >
          <Flex>
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
            <Text
              ml={5}
              display={navSize === "small" ? "none" : "flex"}
              transition="0.5s ease-out"
            >
              {title}
            </Text>
          </Flex>
        </Button>
      </Flex>
    );
  };
  
  /**
   * Component to render favourite games in the side panel.
   *
   * @param GameNavbarProps props.
   * @returns FavouriteGames Component.
   */
  const FavouriteGames: React.FC<GameNavbarProps> = ({
    games,
    active,
    navSize,
    icon,
  }) => {
    const navigate = useNavigate();
    const allGames = getGameInfo();
    const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
    return games.length === 0 ? (
      <>
        {active ? null : (
          <>
            <Text mt={2} textAlign="center">
              No Favourites yet!
            </Text>
            <Text textAlign="center">Play a random game meanwhile! &darr;</Text>
          </>
        )}
        <NavItem
          key={randomGame.id}
          active={active}
          icon={FaRandom}
          title={randomGame.name}
          navSize={navSize}
          onClick={() => {
            navigate(`/game/${randomGame.id}`);
          }}
  
        />
      </>
    ) : (
      <>
        {games.map((game:any) => (
          <NavItem
            key={game.id}
            active={active}
            icon={game.icon || icon}
            title={game.name}
            navSize={navSize}
            onClick={() => {
              navigate(`/game/${game.id}`, { state: { game } });
            }}
          />
        ))}
      </>
    );
  };
  
  /**
   * Component to render Favourites Menu in the Side bar for closed menu usage
   *
   * @param GameInfo[] props
   * @returns Favourites
   */
  const Favourites: React.FC<{ games: GameInfo[] }> = ({ games }) => {
    const navigate = useNavigate();
    const clickHandler = (gameId: number) => {
      navigate(`/game/${gameId}`);
    };
    return games.length === 0 ? (
      <div />
    ) : (
      <MenuList>
        {games.map((game:any) => (
          <MenuItem
            justifyContent="center"
            key={game.id}
            onClick={() => {
              clickHandler(game.id);
            }}
          >
            {game.name}
          </MenuItem>
        ))}
      </MenuList>
    );
  };
  
  /**
   * Left SideBar.
   *
   * @returns LeftPane
   */
  const LeftPane = () => {
    const navigate = useNavigate();
    const [navSize, changeNavSize] = useState("small");
    const [isOpen, setOpenState] = useState(true);
    const { favourites } = useSelector(getFavourites);
    const games = getGameInfo(favourites.map((e: any) => e.gameId).slice(0, 4));
  
    return (
      <Flex
        pos="sticky"
        margin-top="2.5"
        h="100%"
        w={navSize === "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        display="inline-block"
        transition="0.1s ease-out"
      >
        <Flex
          p="5%"
          pos="sticky"
          margin-top="2.5"
          h="full"
          w={navSize === "small" ? "75px" : "200px"}
          flexDir="column"
          align-items={navSize === "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            aria-label=""
            icon={<FiMenu />}
            onClick={() => {
              if (navSize === "small") {
                changeNavSize("large");
                setOpenState(false);
              } else {
                changeNavSize("small");
                setOpenState(true);
              }
            }}
          />
  
          <NavItem
            navSize={navSize}
            active={isOpen}
            icon={FiHome}
            title="Dashboard"
            onClick={() => {
              navigate(`/`);
            }}
          />
          <NavItemMenu
            navSize={navSize}
            title="Favourites"
            icon={FiStar}
            active={isOpen}
          >
            <Favourites games={games} />
          </NavItemMenu>
          <Divider display={navSize === "small" ? "none" : "flex"} />
          <FavouriteGames
            games={games}
            navSize={navSize}
            active={isOpen}
            icon={GiPerspectiveDiceSixFacesRandom}
            title="Favourite Games"
          />
        </Flex>
      </Flex>
    );
  };
  
  export default LeftPane;