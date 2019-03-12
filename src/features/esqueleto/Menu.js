import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuToggle } from './redux/actions';
import { limpiarUsuario } from '../acceder/redux/actions';
import logo from '../../images/logo_digitalizarame.png';
import { dropToken } from '../../common/tokenManager';

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
import history from '../../common/history';

const deslogar = limpiarUsuario => {
  limpiarUsuario();
  dropToken();
  history.push('/');
};

const MenuDeslogado = ({ isOpen }) => (
  <Collapse isOpen={isOpen} navbar>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink className="text-primary" href="/acceder">
          Acceder
        </NavLink>
      </NavItem>
    </Nav>
  </Collapse>
);

const MenuLogado = ({ persona, isOpen, limpiarUsuario }) => (
  <Collapse isOpen={isOpen} navbar>
    <Nav className="mr-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Presupuestos
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavItem>
              <NavLink href="#pendientes">Pendientes</NavLink>
            </NavItem>
          </DropdownItem>
          <DropdownItem>
            <NavItem>
              <NavLink href="#aprobados">Aprobados</NavLink>
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
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {persona.c_nombre.toUpperCase()}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavItem>
              <NavLink href="#config">Configuraciones</NavLink>
            </NavItem>
          </DropdownItem>
          <DropdownItem>
            <NavItem>
              <NavLink href="#deslogar" onClick={() => deslogar(limpiarUsuario)}>
                Salir
              </NavLink>
            </NavItem>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Collapse>
);

export class Menu extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { isOpen } = this.props.esqueleto;
    const { persona } = this.props.usuario;
    const { menuToggle, limpiarUsuario } = this.props.actions;

    return (
      <div className="esqueleto-menu">
        <Navbar color="light" light className="bg-dark" expand="md">
          <NavbarBrand href="/">
            <img src={logo} className="img-responsive pull-left logo" alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={menuToggle} />
          {persona ? (
            <MenuLogado persona={persona} isOpen={isOpen} limpiarUsuario={limpiarUsuario} />
          ) : (
            <MenuDeslogado isOpen={isOpen} />
          )}
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
    actions: bindActionCreators({ menuToggle, limpiarUsuario }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
