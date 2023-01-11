import {
  Box,
  Flex,
  Skeleton,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Divider,
  Text,
  Spacer,
  Tooltip,
  Button,
  Image,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import logoWhite from "../assets/images/mtvr-white.svg";
import { Link } from "@reach/router";
import { useContext } from "react";
import { NearContext } from "../providers/NearProvider";

{
  /* Function to make the sidebar buttons */
}
const SidebarButton = (props) => {
  return (
    <Button
      variant="sidebarBtn"
      getProps={({ isCurrent }) => {
        if (!isCurrent) {
          return {};
        }
        return { "data-active": isCurrent };
      }}
      {...props}
    />
  );
};

{
  /* Build sidebar content for Dashboard */
}
const DashboardSidebarContent = ({ onLogoutClick }) => {
  const { accountNearBalance } = useContext(NearContext);

  return (
    <Flex direction="column" align="stretch" height="100%">
      {/* MTVRS Logo */}
      <VStack align="center" px={4}>
        <Image src={logoWhite} height={43} mb={4} px={8} />
      </VStack>

      {/* NEAR Balance */}
      <VStack mt={8} align="flex-start" color="white" spacing={0} px={5}>
        <Text fontSize="sm">NEAR Balance</Text>
        <Skeleton height="20px" isLoaded={accountNearBalance != null}>
          <Text fontSize="lg">{accountNearBalance ?? "00.00"} NEAR</Text>
        </Skeleton>
      </VStack>

      {/* Buttons */}
      <VStack mt={8} align="stretch" px={4}>
        <SidebarButton justifyContent="flex-start" px={4} isActive="isActive">
          My World
        </SidebarButton>
        {/* <SidebarButton justifyContent="flex-start" px={3}> */}
        {/* Buy NEAR */}
        {/* </SidebarButton> */}
      </VStack>

      {/* Add space to show Logout at the very bottom */}
      <Spacer />

      {/* Logout button */}
      <SidebarButton
        justifyContent="flex-start"
        mx={4}
        px={4}
        onClick={onLogoutClick}
      >
        Logout
      </SidebarButton>
    </Flex>
  );
};

{
  /* Build sidebar content for Gamepage */
}
const GameSidebarContent = ({ gameId, onLogoutClick }) => {
  return (
    <Flex direction="column" align="stretch" height="100%">
      {/* MTVRS Logo */}
      <VStack align="center" px={4}>
        <Image src={logoWhite} height={43} mb={4} px={8} />
      </VStack>

      {/* Buttons */}
      <VStack align="stretch" px={4}>
        <SidebarButton
          as={Link}
          to="/dashboard"
          justifyContent="flex-start"
          leftIcon={<ArrowBackIcon />}
          px={4}
          my={4}
        >
          Back
        </SidebarButton>
        <SidebarButton
          as={Link}
          to={`/games/${gameId}`}
          justifyContent="flex-start"
          px={4}
        >
          Story
        </SidebarButton>
        <SidebarButton
          as={Link}
          to={`/games/${gameId}/marketplace`}
          justifyContent="flex-start"
          px={4}
        >
          Marketplace
        </SidebarButton>
        <SidebarButton
          as={Link}
          to={`/games/${gameId}/collectables`}
          justifyContent="flex-start"
          px={4}
        >
          My collectables
        </SidebarButton>
        <Tooltip label="Coming soon" placement="right">
          <Button
            variant="sidebarBtnComingSoon"
            justifyContent="flex-start"
            px={4}
          >
            Leaderboard
          </Button>
        </Tooltip>
        <Tooltip label="Coming soon" placement="right">
          <Button
            variant="sidebarBtnComingSoon"
            justifyContent="flex-start"
            px={4}
          >
            Creator profile
          </Button>
        </Tooltip>
      </VStack>

      {/* Battle button */}
      <Tooltip label="Coming soon" placement="right">
        <Button variant="filled" mt={12} mx={4}>
          Battle
        </Button>
      </Tooltip>
    </Flex>
  );
};

{
  /* Build left sidebar */
}
const Sidebar = ({ isOpen, variant, onClose, gameId }) => {
  const { logout } = useContext(NearContext);

  return variant === "sidebar" ? (
    <Box
      bg="primary.900"
      position="fixed"
      top={0}
      left={0}
      pt={8}
      pb={4}
      w="240px"
      h="100%"
    >
      {gameId != null && gameId !== "" ? (
        <GameSidebarContent gameId={gameId} onLogoutClick={logout} />
      ) : (
        <DashboardSidebarContent onClick={onClose} onLogoutClick={logout} />
      )}
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <DashboardSidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
