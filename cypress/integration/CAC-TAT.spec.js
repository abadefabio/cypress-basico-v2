/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")          
    })

    it('preenche os campos obrigatorios e envia o formulario', function(){
        const textoLongo = "Preenchendo campos cypress,Preenchendo campos cypress,Preenchendo campos cypress,Preenchendo campos cypress,Preenchendo campos cypress"
        
        cy.get('#firstName').type("Fabio")
        cy.get('#lastName').type("Ricardo")
        cy.get('#email').type("fr@ig.com.br")
        cy.get('#open-text-area').type(textoLongo, {delay: 0})
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()

        cy.get('.success').should("be.visible")
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function(){
        cy.get('#firstName').type("Fabio")
        cy.get('#lastName').type("Ricardo")
        cy.get('#email').type("fr.ig.com.br")
        cy.get('#open-text-area').type('email ionvalido')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should("be.visible")
    })

    it("validar que, se um valor não-numérico for digitado, seu valor continuará vazio.", function(){
        cy.get("#phone").type("abcdefg")
        .should('have.value', '')
    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function(){
        cy.get('#firstName').type("Fabio")
        cy.get('#lastName').type("Ricardo")
        cy.get('#email').type("fr@ig.com.br")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('email telefone')
        cy.contains('button', 'Enviar').click()    

        cy.get('.error').should("be.visible")
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){
        cy.get('#firstName').type("Fabio").should('have.value','Fabio')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .type("Ricardo")
        .should('have.value','Ricardo')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type("fr@ig.com.br")
        .should('have.value','fr@ig.com.br')
        .clear()
        .should('have.value','')        
       
        cy.get('#phone')
        .type("12345678")
        .should('have.value','12345678')
        .clear()
        .should('have.value','')       
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios",function(){
        cy.contains('button', 'Enviar').click()      

        cy.get('.error').should("be.visible")
    })

    it("envia o formuário com sucesso usando um comando customizado", function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should("be.visible")
    })

    it("seleciona um produto (YouTube) por seu texto", function(){
        cy.get('#product').select('YouTube')
        .should('have.value','youtube')
    })

    it("seleciona um produto (Mentoria) por seu valor (value)", function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    
    it("seleciona um produto (Blog) por seu índice",function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it("marca o tipo de atendimento 'Feedback'", function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it("marca cada tipo de atendimento", function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it("marca ambos checkboxes, depois desmarca o último", function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
    })
    it("seleciona um arquivo da pasta fixtures", function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it("seleciona um arquivo simulando um drag-and-drop", function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: "drag-drop" })
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('exemploArquivo')
        cy.get('input[type="file"]')
        .selectFile('@exemploArquivo')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target', '_blank')  //atributo
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target').click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

  })
  