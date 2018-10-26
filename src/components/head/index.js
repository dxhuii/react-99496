import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signOut } from '../../actions/user';
import { getUserInfo } from '../../reducers/user';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'

@connect(
  (state, props) => ({
    userinfo: getUserInfo(state)
  }),
  dispatch => ({
    signOut: bindActionCreators(signOut, dispatch)
  })
)
@CSSModules(styles)
export default class Head extends Component {

  static propTypes = {
    userinfo: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    let [err, success] = await this.props.signOut();
    if (success) {
      // 退出成功跳转到首页
      window.location.href = '/';
    } else {
      alert('退出失败');
    }
  }

  render() {

    const { userinfo } = this.props

    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <NavLink className="navbar-brand" exact to="/"><Navbar.Brand>React同构脚手架</Navbar.Brand></NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
              <NavLink className="nav-link" exact to="/topics">Topics</NavLink>
              <NavLink className="nav-link" exact to="/week">week</NavLink>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav>
              <Nav.Item><Nav.Link>{userinfo.nickname}</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="javascript:;" onClick={this.signOut}>退出</Nav.Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>



    // <header>
    //     <nav className="navbar fixed-top navbar-expand-md navbar-expand-lg navbar-dark bg-dark bd-navbar" styleName="test">

    //     <NavLink className="navbar-brand" exact to="/">React同构脚手架</NavLink>

    //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarText">

    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <NavLink className="nav-link" exact to="/">Home</NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" exact to="/topics">Topics</NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" exact to="/week">week</NavLink>
    //         </li>
    //       </ul>

    //       <span className="mt-2 mt-md-0">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item">
    //             <span className="nav-link">{userinfo.nickname}</span>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link" href="javascript:void(0)" onClick={this.signOut}>退出</a>
    //           </li>
    //         </ul>
    //       </span>

    //     </div>
    //   </nav>
    // </header>
    )

  }

}
