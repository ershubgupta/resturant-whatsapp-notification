import React from "react";
import { NavLink } from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

export default function SidebarNav() {
  const [visible, setVisible] = React.useState(false);
  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
    // <Navbar bg="dark" variant="dark">
    //   <Container>
    //     <NavLink to="/" className="navbar-brand">
    //       Resurant
    //     </NavLink>
    //     <Nav className="ml-auto">
    //       <NavLink to="/additem" className="nav-link">
    //         Add Item
    //       </NavLink>
    //       <NavLink to="/itemlist" className="nav-link">
    //         List Item
    //       </NavLink>
    //       <NavLink to="/placeorder" className="nav-link">
    //         Place Order
    //       </NavLink>
    //       <NavLink to="/orderhistory" className="nav-link">
    //         Order History
    //       </NavLink>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
}
