import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container, Button, Offcanvas } from 'react-bootstrap';

const navigationItems = [
  { title: "Home", href: "/" },
  {
    title: "About Us", href: "/about",
    children: [
      { title: "Overview", href: "/Overview" },
      { title: "Need of PAFDA LABs", href: "/NeedofPafda" },
      { title: "Our DG's", href: "/OurDG", description: "Message from DG" },
      { title: "PAFDA Board", href: "/Pafdaboard" },
      { title: "PAFDA Act", href: "/Pafdaact" },
      { title: "Core PAFDA Team", href: "/PAFDAcorteam" },

    ],
  },
  {
    title: "Services",
    children: [
      { title: "Agriculture Lab", href: "/agriculture", description: "Testing pesticides and fertilizers" },
      { title: "Food Lab", href: "/food", description: "Testing raw and processed food" },
      { title: "Drug Lab", href: "/drug", description: "Testing medicines and pharmaceuticals" },
    ],
  },
  { title: "Useful Tools", href: "/tools" },
  {
    title: "News & Highlights",
    href: "/news",
    children: [
      { title: "All News", href: "/news" },
      { title: "Videos", href: "/videos" }
    ]
  },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  // Add this style object at the top of your component file, after the imports
  const navDropdownHoverStyles = `
  .navbar-nav {
    align-items: center;
  }
  
  .navbar-nav .nav-link {
    font-weight: 600;
    color: #2c3e50;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .dropdown-menu {
    border: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 0.5rem 0;
    min-width: 200px;
    margin-top: 0;
  }

  .dropdown-item {
    padding: 0.5rem 1.5rem;
    font-weight: 400;
    color: #2c3e50;
  }

  /* Hover effects */
  .nav-item:hover .dropdown-menu {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-menu {
    display: block;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  /* Ensure proper spacing for dropdown toggle */
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.5em;
    vertical-align: 0.15em;
  }
`;

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <style>{navDropdownHoverStyles}</style>
      <Container>
        <BootstrapNavbar.Brand as={Link} href="/" className="py-0">
          <div className="d-flex align-items-center">
            <div style={{ maxHeight: '50px', width: '250px' }}>
                <img 
                  src="/pafda1.png" 
                  alt="PAFDA Logo" 
                  style={{ height: '50px', width: '250px' }}
                  className="img-fluid"
                />
            </div>
          </div>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border-0"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </BootstrapNavbar.Toggle>


        {/* Desktop Navigation */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="align-items-center">
        {navigationItems.map((item) => (
          item.children ? (
            <NavDropdown
              key={item.href}
              title={
                <span className="d-flex align-items-center fw-bold">
                  {item.title}
                  <ChevronDown size={16} className="ms-1" />
                </span>
              }
              id={`nav-dropdown-${item.title}`}
              className="nav-item"
            >
              {item.children.map((child) => (
                <NavDropdown.Item
                  key={child.href}
                  as={Link}
                  href={child.href}
                  className="dropdown-item"
                >
                  {child.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ) : (
            <Nav.Link
              key={item.href}
              as={Link}
              href={item.href}
              className={`fw-bold ${location === item.href ? 'active' : ''}`}
            >
              {item.title}
            </Nav.Link>
          )
        ))}
      </Nav>
    </BootstrapNavbar.Collapse>

        {/* Mobile Toggle */}
        <Button
          variant="outline-secondary"
          className="d-lg-none"
          onClick={() => setMobileOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu size={24} />
        </Button>

        {/* Mobile Offcanvas */}
        <Offcanvas show={mobileOpen} onHide={() => setMobileOpen(false)} placement="end">
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              {navigationItems.flatMap((item) => [
                <div key={`mobile-${item.href || item.title}`} className="border-bottom">
                  <Nav.Link
                    as={Link}
                    href={item.href || '#'}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 fw-bold ${location === item.href ? 'text-primary' : 'text-dark'
                      }`}
                  >
                    {item.title}
                  </Nav.Link>
                  {item.children && (
                    <div className="bg-light">
                      {item.children.map((child) => (
                        <Nav.Link
                          key={`mobile-child-${child.href}`}
                          as={Link}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 ps-5 text-muted"
                        >
                          {child.title}
                        </Nav.Link>
                      ))}
                    </div>
                  )}
                </div>
              ])}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

      </Container>
    </BootstrapNavbar>
  );
}