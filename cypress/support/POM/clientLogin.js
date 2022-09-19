class clientLogin{

    fillUsername(userName){
        cy.get('#username').type(userName);
    }

    fillPassword(password){
        cy.get('#password').type(password);
    }

    submit(){
        cy.get('.its-button').click();
    }


    login(){
        cy.log('Logging into the client system');
        cy.visit(Cypress.env('login'));
        cy.fixture('login.json').then((user)=>{
          this.fillUsername(user.username);
          this.fillPassword(user.password);
          this.submit();
        });
        cy.get('.its-application__header-title').should('be.visible');
        cy.log("User logged in succesfully");
    }



}

const loginPO= new clientLogin();


export default loginPO;