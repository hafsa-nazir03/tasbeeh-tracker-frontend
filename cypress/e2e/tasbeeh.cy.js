describe("Tasbeeh Tracker E2E Test", () => {

    it("should create a new tasbeeh and display it", () => {

        cy.visit("http://127.0.0.1:5500/index.html");

        cy.get("#name").type("E2E Tasbeeh");

        cy.get("#target").type("100");

        cy.get("#drop-down").select("Daily");

        cy.get("#tasbeeh-form").submit();

        cy.contains("E2E Tasbeeh", { timeout: 5000 })
            .should("be.visible");

    });

});