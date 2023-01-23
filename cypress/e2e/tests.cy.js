/// <reference types = "cypress" />

import "../support/commands.js";
let amounts = [];

describe("Test case", () => {
  it("(1) Login test by adding username and password And Amount sorted or not checking", () => {
    cy.visit("https://sakshingp.github.io/assignment/login.html");
    cy.get("#username").type("Adarsh");
    cy.get("#password").type("1234");
    cy.get("#log-in").click();

    // Click on Amount

    cy.get("#amount").click();

    cy.get("#transactionsTable")
      .children()
      .then((ele) => {
        const tabledata = ele[1];
        const rows = tabledata.children;

        for (let i = 0; i < rows.length; i++) {
          let k = rows[i]
            .querySelectorAll("td")[4]
            .querySelector("span").innerText;
          cy.convertInNumber(k).then((val) => amounts.push(val));
        }
      })
      .then(() => {
        //Checking if amounts are sorted
        for (let i = 1; i < amounts.length; i++) {
          cy.wrap(amounts[i]).should("be.greaterThan", amounts[i - 1]);
        }
      });
  });
});
