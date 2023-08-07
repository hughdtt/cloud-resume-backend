describe('API Tests', () => {
    it('should retrieve view count', () => {
      cy.request(Cypress.env('api_url')).then((response) => {
        const bodyObject = JSON.parse(response.body);
        expect(response.status).to.eq(200);
        expect(bodyObject).to.have.property('viewCount');
      });
    });
  });