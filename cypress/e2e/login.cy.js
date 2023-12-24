/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains(/^Sign in$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Sign in$/).click();
 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    // mengisi username
    cy.get('input[placeholder="email"]').type('test123@gmail.com');
 
    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Sign in$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when email and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="email"]').type('test123@gmail.com');
 
    // mengisi password yang salah
    cy.get('input[placeholder="password"]').type('wrong_password');
 
    // menekan tombol Login
    cy.get('button').contains(/^Sign in$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should display homepage when email and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="email"]').type('test123@gmail.com');
 
    // mengisi password
    cy.get('input[placeholder="password"]').type('test123');
 
    // menekan tombol Login
    cy.get('button').contains(/^Sign in$/).click();
 
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').contains(/^Thread App$/).should('be.visible');
    cy.get('button').contains('Log Out').should('be.visible');
  });

});