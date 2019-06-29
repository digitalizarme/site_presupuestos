import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuToggle } from './redux/actions';
import { limpiarUsuario } from '../acceder/redux/actions';
import { traerConfiguracion } from '../configuraciones/redux/actions';
import logo from '../../images/logo_digitalizarame.png';
import { dropToken } from '../../common/tokenManager';
import { Router, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const deslogar = (limpiarUsuario, history) => {
  limpiarUsuario();
  dropToken();
  history.push('/');
};

const MenuDeslogado = ({ isOpen }) => (
  <Collapse isOpen={isOpen} navbar>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link className="text-primary" to="/acceder">
          Acceder
        </Link>
      </NavItem>
    </Nav>
  </Collapse>
);

const MenuLogado = ({ usuario, isOpen, limpiarUsuario, history }) => (
  <Collapse isOpen={isOpen} navbar>
    <Nav className="mr-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Presupuestos
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavItem>
              <Link className="nav-link" to="/presupuestos/nuevo">
                Nuevo
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/presupuestos/pendientes">
                Pendientes
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/presupuestos/aprobados">
                Aprobados
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/presupuestos/concluidos">
                Concluidos
              </Link>
            </NavItem>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Catastro
        </DropdownToggle>
        <DropdownMenu left="true">
          <DropdownItem>
            <NavItem>
              <Link className="nav-link" to="/personas">
                Personas
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/mercaderias">
                Mercaderias
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </NavItem>
            <DropdownItem divider />
            <NavItem>
              <Link className="nav-link" to="/mercaderias-marcas">
                Mercaderias marcas
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/mercaderias-grupos">
                Mercaderias grupos
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/mercaderias-sub-grupos">
                Mercaderias sub-grupos
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/servicios-grupos">
                Servicios grupos
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/fletes">
                Fletes
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/seguros">
                Seguros
              </Link>
            </NavItem>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {usuario.b_administrador ? (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Administración
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavItem>
                <Link className="nav-link" to="/configuraciones">
                  Configuraciones
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/cotizaciones">
                  Cotizaciones
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/usuarios">
                  Usuários
                </Link>
              </NavItem>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </Nav>
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret title={usuario.persona.c_nombre.toUpperCase()}>
          {usuario.t_avatar ? (
            <img
              src={usuario.t_avatar}
              className="avatar pull-left"
              alt={usuario.persona.c_nombre.toUpperCase()}
            />
          ) : (
            usuario.persona.c_nombre.toUpperCase()
          )}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavItem>
              <Link
                className="nav-link"
                to="#deslogar"
                onClick={() => deslogar(limpiarUsuario, history)}
              >
                Salir
              </Link>
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

  componentDidMount = () => {
    const { traerConfiguracion } = this.props.actions;
    traerConfiguracion();
  };

  render() {
    const { isOpen } = this.props.esqueleto;
    const { usuario, configuracion, history } = this.props;
    const { menuToggle, limpiarUsuario } = this.props.actions;

    return (
      <div className="esqueleto-menu">
        <Router history={this.props.history}>
          <Navbar color="dark" dark expand="md">
              <Link to="/">
                <img
                  src={configuracion.t_logo ? configuracion.t_logo : logo}
                  className="img-responsive pull-left logo"
                  alt="Logo"
                  style={{ maxWidth: '50px' }}
                />
              </Link>
            <NavbarToggler color="success" onClick={menuToggle} />
            {usuario.persona ? (
              <MenuLogado
                usuario={usuario}
                isOpen={isOpen}
                limpiarUsuario={limpiarUsuario}
                history={history}
              />
            ) : (
              <MenuDeslogado isOpen={isOpen} />
            )}
          </Navbar>
        </Router>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
    usuario: state.acceder.usuario,
    configuracion: state.configuraciones.configuracion,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ menuToggle, limpiarUsuario, traerConfiguracion }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
