import React from 'react';
import './Header.css';
import logo from '../../assets/jewelry-4-logo.webp';
import { Container, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi"; 
import { SlHeart } from "react-icons/sl";   
import { HiOutlineShoppingBag } from "react-icons/hi2"; 
import { BiSupport } from "react-icons/bi"; 
import { VscHome } from "react-icons/vsc"; 

const Header = () => {
  return (
    <>
      {/* TOP BAR */}
      <div className="border-bottom py-2">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="JELWO" style={{ height: '35px' }} />
            <div className="vr d-none d-md-block text-muted" style={{ height: '24px' }}></div>
            <span className="text-secondary small d-none d-sm-block">Free UK standard delivery on all orders.</span>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <FormControl type="search" placeholder="Search product..." className="rounded-pill bg-light pe-5 custom-search" />
              <IoIosSearch className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary fs-5" />
            </div>
            <div className="d-flex align-items-center gap-3 text-dark small">
              <FiUserPlus className="fs-5 cursor-pointer" />
              <div className="cursor-pointer"><SlHeart className="fs-5 me-1" />(0)</div>
              <div className="cursor-pointer"><HiOutlineShoppingBag className="fs-5 me-1" />(0)</div>
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN NAVBAR */}
      <Navbar expand="lg" className="border-bottom py-2">
        <Container>
          <div className="d-flex align-items-center gap-2 text-dark small fw-medium">
            <BiSupport className="fs-5 text-gold" />
            <span>(220) 123 456 7890</span>
          </div>
          
          <Navbar.Toggle aria-controls="nav-menu" />
          <Navbar.Collapse id="nav-menu">
            <Nav className="mx-auto custom-nav-links">
              {['HOME', 'SHOP', 'PRODUCTS'].map(title => (
                <NavDropdown title={title} key={title} id={`${title}-drop`}>
                  <NavDropdown.Item href="#">Option</NavDropdown.Item>
                </NavDropdown>
              ))}
              <Nav.Link href="#blog" className="fw-semibold px-3 text-dark">BLOG</Nav.Link>
              <NavDropdown title="PAGES" id="pages-drop">
                <NavDropdown.Item href="#">About Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="d-flex align-items-center gap-2 fw-semibold small cursor-pointer text-dark">
              <VscHome className="fs-5 text-gold" />
              <span>FREE TRY AT HOME</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;