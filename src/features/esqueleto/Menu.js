import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuToggle } from './redux/actions';
import logo from '../../images/logo_digitalizarame.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export class Menu extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { isOpen } = this.props.esqueleto;
    const { persona } = this.props.usuario;
    const { menuToggle } = this.props.actions;

    return (
      <div className="esqueleto-menu">
        <Navbar color="light" light className='bg-dark' expand="md">
          <NavbarBrand href="/">
            <img src={logo} className="img-responsive pull-left logo" alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={menuToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Presupuestos
                </DropdownToggle>
                <DropdownMenu  right >
                  <DropdownItem >
                    <NavItem >
                      <NavLink href="https://github.com/reactstrap/reactstrap">Pendientes</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">Aprobados</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Catastro
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/personas">Personas</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/servicios-grupo">Servicios grupo</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {persona?<Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className='text-primary' href="https://github.com/reactstrap/reactstrap">{persona.c_nombre.toUpperCase()}</NavLink>
              </NavItem>
            </Nav>:null}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
    usuario: state.acceder.usuario,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ menuToggle }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
