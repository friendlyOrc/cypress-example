import clientCommon from './clientConfigCommon';
import functionData from '../../fixtures/function.json';

class functionCommon {

   // Function to open All Functions tab
   openAllFunctions(){
      cy.get(this.allFunctionOpt).then($btn => {
         if($btn.is(':visible')){
            cy.get(this.allFunctionOpt).click()
         }else{
            clientCommon.clickAllButton();
            cy.get(this.allFunctionOpt).click()
         }
      })
   }

   // Function to verify the labels in the Add Function screen
   verifyAddFunctionLabel(){
      cy.get(this.informationLbl).should('be.visible')
      cy.get(this.SCNLbl).should('be.visible')
      cy.get(this.TCCLbl).should('be.visible')
      cy.get(this.subareaLbl).should('be.visible')
      cy.get(this.descriptionLbl).should('be.visible')
   }

   // Function to verify the hover text of labels in the Add Function screen
   verifyAddFunctionHoverTextLabels(){
      this.verifyAddFunctionLabel()
      clientCommon.validateExactText(this.informationLink, functionData.showInformation)
      clientCommon.validateLabelHoverText(this.SCNLbl, functionData.SCNLabel)
      clientCommon.validateLabelHoverText(this.TCCLbl, functionData.TCCLabel)
      clientCommon.validateLabelHoverText(this.descriptionLbl, functionData.descriptionLabel)
   }
   
   // Validate field values in View
   verifyFunctionFieldValues() {
      clientCommon.validateFieldValue(this.subAreaInput + "> input", functionData.subareaValGW);
      clientCommon.validateFieldValue(this.SCNInput + "> input", functionData.SCNValGW);
      clientCommon.validateFieldValue(this.TCCInput + "> input", functionData.TCCValGW);
      clientCommon.validateFieldValue(this.descriptionInput, functionData.descriptionValGW);
   }

   // Function to verify All Functions tab display
   verifyAllFunctionsTab(){ 
      clientCommon.validateContainedText(clientCommon.firstTab, functionData.allFunctionTitle)
      clientCommon.validateContainedText(clientCommon.firstHeader, functionData.allFunctionHeader)

      clientCommon.checkToolbarOptionsGrid()
   }

   // Function to verify the labels in  the All Function screen
   verifyAllFunctionsLabels(){
      clientCommon.validateContainedText(clientCommon.clearFiltersOption, functionData.clearFilterLabel)
      clientCommon.validateContainedText(clientCommon.exportOption, functionData.exportLabel)
      clientCommon.validateContainedText(clientCommon.columnsDropdownOption, functionData.columnLabel)
      clientCommon.validateContainedText(clientCommon.addBtn, functionData.addLabel)
      clientCommon.validateContainedText(clientCommon.viewBtn, functionData.viewsLabel)
      clientCommon.validateContainedText(clientCommon.deleteOptionGrid, functionData.deleteLabel)

      clientCommon.validateContainedText(this.SCNHeader, functionData.colSCNLabel)
      clientCommon.validateContainedText(this.subHeader, functionData.colSubAreaLabel)
      clientCommon.validateContainedText(this.TCCHeader, functionData.colTCCLabel)
      clientCommon.validateContainedText(this.subGroupHeader, functionData.colSubGroupLabel)
      clientCommon.validateContainedText(this.descriptionHeader, functionData.colDescriptionLabel)
   }

   //Function to toggle column in Function
   toggleFunctionColumn(selector){
      cy.get(clientCommon.columnsDropdownOption).click()
      cy.get(selector).click();
      cy.get('.cdk-overlay-backdrop').last().click()
   }

   //Function to get Toast message
   getToast(){
      return cy.get(clientCommon.toastNotification).invoke('text')
   }

   // Function to verify inputs are readonly
   verifyFunctionFieldsReadOnly(){
      clientCommon.checkInputFieldReadOnly(this.SCNInput)
      clientCommon.checkInputFieldReadOnly(this.subAreaInput)
      clientCommon.checkInputFieldReadOnly(this.subGroupInput)
      clientCommon.checkInputFieldReadOnly(this.TCCInput)
      clientCommon.checkInputFieldReadOnly(this.descriptionInput)
   }

   // Function to close the duplicate pop up
   duplicateOkBtn(){
      cy.get(clientCommon.recordExistTitle).should('exist')
      clientCommon.validateContainedText(clientCommon.recordExistTitle, functionData.duplicateMsg)
      cy.get(clientCommon.okBtn).click()
   }

   // Function to open View Function
   viewViaBtn(SCN){
      cy.get(this.SCNCell).contains(SCN).should('be.visible')
      cy.get(this.SCNCell).contains(SCN).click()
      cy.get(clientCommon.viewBtn).click()
   }

   viewViaRightClick(SCN){
      cy.get(this.SCNCell).contains(SCN).should('be.visible')
      cy.get(this.SCNCell).contains(SCN).rightclick()
      cy.get(clientCommon.viewContextMenuBtn).click()
   }

   //Function to verify pop up
   verifyPopup(title, msg){
      cy.window().then((win) => {
         assert(win.eval(`document.querySelector('${clientCommon.editSessionTitle}').innerHTML`), title)
         assert(win.eval(`document.querySelector('${clientCommon.editSessionMsg}').innerHTML`), msg)
      })
   }

   // Function to drag and drop element
   dragNDrop(el1, el2){
      cy.get(el1).click()
      cy.get(el1).drag(el2)
      cy.get(el2).click()
   }
   
   // Function to verify export data
   verifyDownload(){
      const downloadspath = 'cypress/downloads'
      cy.task('downloads', downloadspath).then(before => {

         cy.get(clientCommon.exportOption).click();
         cy.task('downloads', downloadspath).then(after => {
           expect(after.length).to.be.eq(before.length +1)  
           const newFile = after.filter(file => !before.includes(file))[0]
           cy.verifyDownload(newFile);

           //Check if the downloaded file contains newly added function

           cy.readFile(downloadspath + "/" + newFile).should('contains', functionData.SCNValGW)
           cy.task('clearFolder', downloadspath) 
         })
       })
   };

   // Function to click on the Back button
   clickOnBackBtn(){
      cy.get(clientCommon.backBtn).click()
      cy.get(clientCommon.addBtn)
   }

   // Function to click on the Cancel button
   clickOnCancelBtn(){
      cy.get(clientCommon.cancelBtn).click()
   }

   // Function to verify the content of the Information paragraphs
   validateInformationPara(){
      cy.get(this.informationPanel).eq(0).invoke('text').should('contains', functionData.informationP1)
      cy.get(this.informationPanel).eq(1).invoke('text').should('contains', functionData.informationP2)
      cy.get(this.informationPanel).eq(2).invoke('text').should('contains', functionData.informationP3)
   }

   // Function to verify the limitation of inputs
   verifyCharacterLimitForFields(){
      clientCommon.verifyCharacterLimit(this.SCNInput, functionData.charLimit10, functionData.charLimit9)
      clientCommon.verifyCharacterLimit(this.subAreaInput, functionData.charLimit10, functionData.charLimit9)
      clientCommon.verifyCharacterLimit(this.subGroupInput, functionData.charLimit10, functionData.charLimit9)
      clientCommon.verifyCharacterLimit(this.descriptionInput, functionData.charLimit81, functionData.charLimit80)
   }

   // Function to fill only mandatory fields
   addInputToMandatoryFields(scnInput, subArea, subGroup) {
      cy.get(this.SCNInput).type(scnInput);
      cy.get(this.subAreaInput).type(subArea);
      cy.get(this.subGroupInput).type(subGroup);
   }

   // Function to fill all fields
   addInputToAllFields(scnInput, subArea, subGroup, description) {
      cy.get(this.SCNInput).type(scnInput);
      cy.get(this.subAreaInput).type(subArea);
      cy.get(this.subGroupInput).type(subGroup);
      cy.get(this.descriptionInput).type(description);
   }

   // Function elements
   allFunctionOpt = '[data-auto-id="All_Functions-tree-item"]'
   addNewGreenWaveOpt = '[data-auto-id="Add New Green Wave..."]'

   informationLbl = '[data-auto-id="client.information-label"]'
   SCNLbl = '[data-auto-id="client.systemCodeNumber-label"]'
   subareaLbl = '[data-auto-id="client.subArea-label"]'
   TCCLbl = '[data-auto-id="client.system-label"]'
   descriptionLbl = '[data-auto-id="client.description-label"]'

   informationLink = '[data-auto-id="expand-help"] > a'
   informationPanel = '[data-auto-id="expand-help"] > p'
   SCNInput = '[data-auto-id="client.systemCodeNumber"]'
   subAreaInput = '[data-auto-id="client.subArea"]'
   subGroupInput = '[data-auto-id="client.subGroup"]'
   TCCInput = '[data-auto-id="client.system"]'
   descriptionInput = '[data-auto-id="client.description"]'
   errordMsg = '[data-auto-id="Issue-Overlay-Message-1"] '
   
   history = '[data-auto-id="history"]'
   historyExpander = '[data-auto-id="history-expander"]'
   historyPanel = '[data-auto-id="history"] > div:nth-child(2)'

   SCNCell = '[role="gridcell"][col-id="systemCodeNumber"]'
   TCCCell = '[role="gridcell"][col-id="system"]'
   subAreaCell = '[role="gridcell"][col-id="subArea"]'
   descriptionCell = '[role="gridcell"][col-id="description"]'

   row = '[role="rowgroup"] > [role="row"]'

   SCNHeader = 'div [role="columnheader"][col-id="systemCodeNumber"]'
   subHeader = 'div [role="columnheader"][col-id="subArea"]'
   TCCHeader = 'div [role="columnheader"][col-id="system"]'
   subGroupHeader = 'div [role="columnheader"][col-id="subGroup"]'
   descriptionHeader = 'div [role="columnheader"][col-id="description"]'
   
   checkboxColumnDisplaySubArea = '[data-auto-id="toolbar-filter-checkbox-Sub-area"]';

   SCNTableCell = '[col-id="systemCodeNumber"]';
   gridFirstColumnValue = '.ag-center-cols-viewport > div > [row-index="0"] > [col-id="systemCodeNumber"]> div span';
   gridFirstDescriptionValue = '.ag-center-cols-viewport > div > [row-index="0"] > [col-id="description"]'
}

const functionCommonPO = new functionCommon();
export default functionCommonPO;