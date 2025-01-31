// cypress/e2e/testProducts.spec.js

describe('Bazaar Product Tests', () => {
    beforeEach(() => {
      // Replace this with the actual URL of your Bazaar app
      cy.visit('https://mern-practice-0lqg.onrender.com/');
    });
  
    it('should display product boxes on the homepage', () => {
      cy.intercept('GET', '/api/session').as('getSession');
      
      // Ensure product boxes exist by checking their CSS class or HTML tag
      cy.get('.product-box').should('exist'); // Adjust the selector to match your product box class or element
    });
  
    it('should have multiple product boxes visible', () => {
      // Verify that there are multiple product boxes
      cy.get('.product-box').should('have.length.greaterThan', 0); // Update selector if needed
    });
    // cypress/e2e/testSessionIntercept.spec.js


  it('should receive 401 Unauthorized for /api/session before login', () => {
    // Intercept the API request to /api/session
    cy.intercept('GET', '/api/session').as('getSession');

    // Trigger the request (e.g., by visiting the page or performing an action)
    cy.reload(); // Reload the page if the request is made on load

    // Wait for the request and assert the response
    cy.wait('@getSession').then((interception) => {
      // Assert that the status code is 401
      expect(interception.response.statusCode).to.eq(401);
    });
  });
});


  