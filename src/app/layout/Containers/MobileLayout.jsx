import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Menu,
  Responsive,
  Sidebar,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SignedInMenu from "../../../features/nav/SignedInMenu";
import SignedOutMenu from "../../../features/nav/SignedOutMenu";
export default function MobileLayout({ children }) {
  const { authenticated } = useSelector((state) => state.auth);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { currentUserProfile } = useSelector((state) => state.profile);

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          vertical
          visible={sidebarOpened}
        >
          {/* <Menu.Item
            name="News"
            as={NavLink}
            to="/news"
            onClick={() => setSidebarOpened(false)}
          >
            News
          </Menu.Item> */}

          <Menu.Item
            name="Events"
            as={NavLink}
            to="/events"
            onClick={() => setSidebarOpened(false)}
          >
            Events
          </Menu.Item>

          <Menu.Item name="About Us" as={NavLink} to="/about">
            About Us
          </Menu.Item>

          <Dropdown text="More Information" pointing="right" className="link item">
            <Dropdown.Menu>
              <Dropdown.Item
                text="Board Members"
                as={Link}
                to="/board-members"
              />
              <Dropdown.Item
                text="General Information"
                as={Link}
                to="/general-info"
              />
            </Dropdown.Menu>
          </Dropdown>

          {authenticated && currentUserProfile?.admin && (
            <Menu.Item
              as={NavLink}
              to="/createEvent"
              onClick={() => setSidebarOpened(false)}
            >
              <Button positive inverted content="Create Event" />
            </Menu.Item>
          )}

          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
        </Sidebar>

        <Sidebar.Pusher
          dimmed={sidebarOpened}
          onClick={() => (sidebarOpened ? setSidebarOpened(false) : null)}
          style={{ minHeight: "100vh" }}
        >
          <Container>
            <Menu inverted fixed="top">
              <Menu.Item onClick={() => setSidebarOpened(!sidebarOpened)}>
                <Icon name="sidebar" />
                MENU
              </Menu.Item>
              <Menu.Item as={Link} to="/">
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                  style={{ marginRight: "15px" }}
                />
                NTNUi Padel
              </Menu.Item>
            </Menu>
          </Container>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Responsive>
  );
}
