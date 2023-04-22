import type { PlacementWithLogical } from "@chakra-ui/react";
import type { AnyFunction } from "@chakra-ui/utils";
import type { IconType } from "react-icons";

import type { ReactChildrenProps } from "../globals";

/**
 * Game Info Props.
 */
export interface GameInfoProps extends ReactChildrenProps {
  id: number;
}

/**
 * Slider Game Props.
 */
export interface SliderGameProps {
  id: number;
  maxH: number | string;
  maxW: number | string;
  popoverPlacement: PlacementWithLogical;
}

/**
 * Game Info Component Props.
 */
export type GameInfoComponentProps = ReactChildrenProps & {
  game: GameInfoComponent;
};

/**
 * Props for navigation bar items in side pane
 */
export interface NavItemProps extends ReactChildrenProps {
  navSize: string;
  title: string;
  icon: IconType;
  active: boolean;
  onClick?: () => void;
}

/**
 * type for header in game dashboard
 */
export type GameHeaderProps = {
  gameInfo: GameInfoComponent;
  helpContent: string;
};

/**
 * Game Info Collection type.
 */
export type GameInfoCollection = {
  [id: number]: GameInfoComponent;
};

/**
 * Game Info.
 */
export type GameInfo = {
  id: number;
  name: string;
  image?: string;
  altImage?: string;
  description?: string;
  isFavourite?: boolean;
  icon?: IconType;
};

/**
 * Game Favourites.
 */
export type GameFavourites = {
  gameId: number;
};

/**
 * Favourites State.
 */
export type FavouritesState = {
  favourites: GameFavourites[];
};

/**
 * type for help popover in game header
 */
export type GameHelp = {
  helpContent: string;
};

/**
 * Game Info Component.
 */
export type GameInfoComponent = GameInfo &
  GameHelp & {
    component: React.ReactNode;
  };

/**
 * type for help userId
 */
export type UserId = {
  userId: string;
};

/**
 * type for help username
 */
export type UserName = {
  UserName: string;
};

/**
 * type for userinfo along with userId
 */
export type UserInfo = UserId & {
  name: string;
  icon?: string;
};

export type UserPreference = {
  theme: "light" | "dark";
  recentlyPlayed: number[];
};

/**
 * User Info Props
 */
export type UserInfoProps = UserInfo & {
  size?: "sm" | "md" | "lg";
};

/**
 * token type as part of Auth info
 */
export type AuthInfo = {
  token: string;
};

/**
 * props specific to Modal
 */
export type ModalDataProps = {
  modalHeader: string;
  modalCotent: string;
  actionButtonText: string;
  buttonAction: AnyFunction;
};

/**
 * props popover component
 */
export type PopOverProps = {
  popOverHeader: string;
  popOverCotent: string;
  triggerButtonText: string;
};

/**
 * props for Toastmessage component
 */
export type ToastMessageProps = {
  messageTitle: string;
  messageDesc: string;
};
