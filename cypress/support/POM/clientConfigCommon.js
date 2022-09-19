class clientCommon {

   clickAllButton() {
      cy.get(this.treeItemAll).eq(0).should('exist').click({ force: true });
   }

   verifySideElementPresentunderAll() {
      cy.get(this.treeItemJunction).should('exist');
      cy.get(this.treeItemPelican).should('exist');
      cy.get(this.treeItemRemoteRequest).should('exist');
      cy.get(this.treeItemSpecialFacilities).should('exist');
      cy.get(this.treeItemSubArea).should('exist');
      cy.get(this.treeItemTrafficController).should('exist');
      cy.get(this.treeItemUtmcOutstation).should('exist');
   }

   clickAddBtn() {
      cy.get(this.addBtn).click();
   }

   editSessionPreparedOkBtn() {
      cy.get(this.editSessionTitle).should('have.text', 'Editing Session Prepared')
      cy.get(this.okBtn).click({ force: true });
   }

   clearEditSessionModeIfExist() {
      cy.get('app-open-draft-edit-overview-dialog-button').then(($btn) => {
         if ($btn.find(this.reviewSessionBtn).length) {
            this.abondonEditSession();
         }
      });
   }

   validateEditSession() {
      cy.get(this.reviewSessionBtn).click();
      cy.get(this.editReviewSession).should('exist');
      this.validateExactText(this.validationRequiredMessage, " There are unvalidated changes or changes have errors. ");
      this.validateContainedText(this.validateBtn, " Validate ");
      cy.get(this.validateBtn).click();
      this.validateExactText(this.validationMessage, " Validating changes, please wait... ");
      cy.wait(2000);
      this.validateExactText(this.editDialog, "Validating Session Edits");
      this.validateContainedText(this.validationWarningMessage, " The session edits have no errors ");
      cy.get(this.goToValidationResultBtn).should('exist');
      cy.get(this.backToReviewBtn).click();
      this.validateExactText(this.changesValidatedMessage, " All changes are validated with no errors. ");
      this.validateExactText(this.validateBtn, " Revalidate ");
      cy.get(this.sessionCloseBtn).click();
   }

   submitEditSession() {
      cy.get(this.reviewSessionBtn).click();
      cy.get(this.editReviewSession).should('exist');
      cy.get(this.submitSessionEditBtn).click();
      this.validateExactText(this.validationMessage, " Submitting session edits, please wait... ");
      cy.wait(3000);
      this.validateExactText(this.editDialog, "Submitting Session Edits");
      this.validateExactText(this.syncMessage, " Sync completed succesfully. " );
      this.validateContainedText(this.validateSessionMessage, " The session edits have no errors but ");
      this.validateExactText(this.submissionMessage, " Session edits saved into system succesfully. ");
      this.validateContainedText(this.validateMainlineMessage, " The system has no errors but ");
      this.validateExactText(this.sumbissionSuccessMessage, " Your submission has completed successfully. Your edit session has ended and you are now viewing the system configuration. ");
      cy.get(this.goToValidationResultBtn).should('exist');
      cy.get(this.sessionCloseBtn).click();
      cy.get(this.reviewSessionBtn).should('not.exist');
   } 

   abondonEditSession() {
      cy.get(this.reviewSessionBtn).click();
      //cy.get(this.editReviewSession).should('exist');
      cy.get(this.abondonSessionBtn).click();
      cy.get(this.yesBtn).click();
      cy.get(this.okBtn).click();
      cy.wait(1000);
   }

   cancelFormwithNoOption() {
      cy.get(this.cancelBtn).click();
      cy.get(this.unsavedPopup).should('contain', 'Unsaved Changes')
         .and('contain', ' Are you sure you want to exit editing? All unsaved changes will be lost.')
      cy.get(this.unsavedPopupFooter).should('contain', 'Yes')
         .and('contain', 'No');

      //Click on No button
      cy.get(this.noBtn).click();
   }

   // Cancelling the form
   cancelFormwithYesOption() {
      cy.get(this.cancelBtn).click();
      cy.get(this.unsavedPopup).should('contain', 'Unsaved Changes')
         .and('contain', ' Are you sure you want to exit editing? All unsaved changes will be lost.')
      cy.get(this.unsavedPopupFooter).should('contain', 'Yes')
         .and('contain', 'No');

      //Click on yes button
      cy.get(this.yesBtn).click();
   }

   // Below function is to close the form from the tab
   closeFormwithNoOption(objButton) {
      cy.get(objButton).click();
      cy.get(this.unsavedPopup).should('contain', 'Unsaved Changes')
         .and('contain', ' Are you sure you want to exit editing? All unsaved changes will be lost.')
      cy.get(this.unsavedPopupFooter).should('contain', 'Yes')
         .and('contain', 'No');

      //Click on No button
      cy.get(this.noBtn).click();
   }

   closeFormwithYesOption(objButton) {
      cy.get(objButton).click();
      cy.get(this.unsavedPopup).should('contain', 'Unsaved Changes')
         .and('contain', ' Are you sure you want to exit editing? All unsaved changes will be lost.')
      cy.get(this.unsavedPopupFooter).should('contain', 'Yes')
         .and('contain', 'No');

      //Click on Yes button
      cy.get(this.yesBtn).click();
   }

   //To check the Input field is read-only
   checkInputFieldReadOnly(fieldName) {
      cy.get(fieldName).should('have.attr', 'readonly', 'readonly');
   }

   //To check the Input field is enabled
   checkInputFieldEnabled(fieldName) {
      cy.get(fieldName).should('not.be.disabled');

   }

   //To check button is disabled
   checkInputFieldDisabled(objButton) {
      cy.get(objButton).should('have.class', 'its-toolbar__button--disabled')
   }

   //Validate the header Section
   validatetheHeaderSectionText(objSectionHeader, sectionHeaderName) {
      let splittedValue = this.splitTheHeader(objSectionHeader);
      splittedValue.then((result) => {
         //  cy.get(accordionLink).should('contain', result);
         expect(sectionHeaderName).to.equal(result)

      });
   }

   //Split the form header value(split the text and the count)
   splitTheHeader(objSectionHeader) {
      return cy.get(objSectionHeader).then($input => $input[0].innerText.split('(')[0].trim())

   }

   //Verify the section Count and Header Count{rowSelector: selector of the labels ,totalCountSelector: selector of the total count in the scetion}
   verifyTheSectionAndHeaderCount(rowSelector, totalCountSelector) {
      cy.get(rowSelector)
         .then((list) => {
            let count = list.length;
            cy.get(totalCountSelector).then((headerElement) => {
               let rowCount = headerElement[0].innerText.match(/\d+/)[0];
               expect(parseInt(rowCount)).to.equal(count);
            });
         });
   }

   //Verify the section header count
   VerifySectionHeaderCount(totalCountSelector, countValue) {
      cy.get(totalCountSelector).then((headerElement) => {
         let rowCount = headerElement[0].innerText;
         expect(rowCount).to.equal(countValue);
      });
   }

   //Verify the Outstation configuration labels
   verifyOutstationConfigGridLabels(objGrid) {
      cy.get(objGrid).should('contain', 'Function').and('contain', 'Control')
         .and('contain', 'Reply');
   }

   //Function to validate the toolbar option for View form invoked from grid
   checkToolbarOptionsViewFromGrid() {
      cy.get(this.gridToolBar).should('exist');
      cy.get(this.backBtn).should('exist');
      cy.get(this.editBtn).should('exist');
      cy.get(this.deleteBtnViewForm).should('exist');
   }

   //Function to validate the toolbar option for View form when not invoked from grid
   checkToolbarOptionsFromSearch() {
      cy.get(this.gridToolBar).should('exist');
      cy.get(this.editBtn).should('exist');
      cy.get(this.deleteBtnViewForm).should('exist');
      cy.get(this.backBtn).should('not.exist');
   }

   //Function to Search for a SCN
   searchForSCN(searchSCN) {
      cy.get(this.searchSCNInput).clear();
      cy.get(this.searchSCNInput).type(searchSCN);
      cy.get(this.goBtn).click();
   }

   //Function to filter for a SCN on grid
   filterSCNonGrid(filterSCN) {
      cy.get(this.gridSCNFilterBtn).click();
      cy.get(this.gridFilterTxtbox).clear();
      cy.get(this.gridFilterTxtbox).type(filterSCN);
      cy.get(this.gridFilter2Txtbox).click();
      cy.wait(500);
      cy.get(this.frmHeader).click();
   }

   //Function to validate field value
   validateFieldValue(FieldName, Value) {
      cy.get(FieldName).should('have.value', Value);
   }

   //Function to validate hover text
   validateLabelHoverText(FieldName, ValidateHoverText) {
      cy.get(FieldName).invoke('attr', 'title').should('eq', ValidateHoverText);
   }

   //Function to validate contained text
   validateContainedText(FieldName, ValidateText) {
      cy.get(FieldName).should('contains.text', ValidateText);
   }

   //Function to validate exact text
   validateExactText(FieldName, ValidateText) {
      cy.get(FieldName).should('have.text', ValidateText);
   }

   //Function to select the Context menu from Grid for the filtered record
   selectGridContextMenu(RecordSelect, ContextOptionSelect) {
      cy.get(this.frmList).contains(RecordSelect).should('exist').click();
      cy.get(this.frmList).contains(RecordSelect).rightclick();
      cy.get(ContextOptionSelect).click();
   }

   //Function to validate the toolbar option for View form invoked from grid
   checkToolbarOptionsGrid() {
      cy.get(this.gridToolBar).should('exist');
      cy.get(this.clearFiltersOption).should('exist');
      cy.get(this.exportOption).should('exist');
      cy.get(this.columnsDropdownOption).should('exist');
      cy.get(this.addBtn).should('exist');
      cy.get(this.viewBtn).should('exist');
      cy.get(this.deleteOptionGrid).should('exist');
   }

   //Function to access the form from tree list
   selectEquipmentTypeFromTree(viewFormName, TCCDesc, selectSubArea, formName) {

      let treeViewListTCC = `[data-auto-id="${TCCDesc}-tree-item"]`,
         treeViewListSubarea = `[data-auto-id="${TCCDesc}_${selectSubArea}-tree-item"]`,
         treeViewListRemoteRequest = `[data-auto-id="${TCCDesc}_${selectSubArea}_Remote_Requests-tree-item`,
         treeViewListRemoteFormName = `[data-auto-id="${TCCDesc}_${selectSubArea}_Remote_Requests_${formName}-tree-item"]`,
         treeViewListFormName = `[data-auto-id="${TCCDesc}_${selectSubArea}_${formName}-tree-item`;

      switch (viewFormName) {
         //Junction,Pelican,UTMC Outstation,Special Facilities
         case 'AllForm':
            cy.get(treeViewListTCC).click();
            cy.get(treeViewListSubarea).click();
            cy.get(treeViewListFormName).click();
            break;

         //Example for Form name :User_Defined or Remote_Plan
         case "Remote Requests":
            cy.get(treeViewListTCC).click();
            cy.get(treeViewListSubarea).click();
            cy.get(treeViewListRemoteRequest).click();
            cy.get(treeViewListRemoteFormName).click({ force: true });
            break;

         default:
            console.log(`Cannot find the Form Name`);
      }

   }

   //This function used to add the input values to the field
   addValuetoInputFields(fieldSelector, fieldInput) {
      cy.get(fieldSelector).type(fieldInput);
   }

   //This Function is to check the checkBox
   checkTheCheckBox(checkboxSelector) {
      cy.get(checkboxSelector).check({ force: true });
   }

   //This function is to uncheck the cehckbox
   uncheckTheCheckBox(checkboxSelector) {
      cy.get(checkboxSelector).uncheck({ force: true });
   }

   //Function to select the Outstation configuration in the form
   selectOutstationForForm(outstationInput) {
      let outstationSelector = `[data-auto-id="option-${outstationInput}"]`;
      cy.get(this.selectOutstationBtn).click();
      cy.get(this.selectOutstationTitle).should('have.text', 'Select Outstation');
      //verify the statements and button present
      cy.get(this.outstationWarningText).should('have.text', ' Select an outstation using the search field below: ');
      cy.get(this.outstationSubmitBtn).should('exist');
      cy.get(this.outstationCancelBtn).should('exist');
      //Add the outstation Input and select
      cy.get(this.outstationSearchInput).type(`${outstationInput}{enter}`);
      cy.get(outstationSelector).click({ force: true });
      cy.get(this.outstationSubmitBtn).click({ force: true });

   }

   //Function to select the options from the dropdown fields.
   selectOptionFromDropDown(dropDownSelector, optionIndex, valueInput) {
      cy.get(dropDownSelector).click({ force: true });
      cy.get(this.dropDownOption).eq(optionIndex).click({ force: true });
      cy.get(dropDownSelector).should('have.text', valueInput)

   }

   //Function to verify char limit
   verifyCharacterLimit(inputFieldselector, extraCharLimitInput, exactCharLimit) {
      cy.get(inputFieldselector).type(extraCharLimitInput);
      cy.get(inputFieldselector).should(($input) => {
         const val = $input.val()
         expect(val).to.equal(exactCharLimit);
      });
   }

   //This function is to check the Radio Button
   checkTheRadioButton(radioBtnSelector) {
      cy.get(radioBtnSelector).check({ force: true });
   }

   //This function is to uncheck the Radio Button
   uncheckTheRadioButton(radioBtnSelector) {
      cy.get(radioBtnSelector).uncheck({ force: true });
   }

   //This function is to Add values for fields using increase value button or decrease value button
   addValueWithSpinboxBtn(valueSelector, inputValue) {
      for (let i = 0; i <= inputValue; i++) {
         cy.get(valueSelector).click({ force: true });
      }
   }
   
   //This function is to validate the delete confirm dialog appears and select the desired option to confirm delete 
   // objSelectOption can be set to Yes/No
   deleteRecord(objDelete, objSelectOption) {
      cy.get(objDelete).click();
      cy.get(this.deleteConfirmDialog).should('exist');
      cy.get(objSelectOption).click();
   }

   //This function is to validate the existence/non existence of the element passed as a parameter to function
   validateExistence(ObjToCheck, CheckExist) {
      switch (CheckExist) {
         //Validate the element(ObjToCheck) should exist if the parameter is passed as Yes
         case 'Yes':
            cy.get(ObjToCheck).should('exist');
            break;

         //Validate the element(ObjToCheck) should not exist if the parameter is passed as No
         case "No":
            cy.get(ObjToCheck).should('not.exist');
            break;

         default:
            cy.log(`Incorrect parameter passed to function`);
      }
   }

   //This function is to select the map layer if not selected already
   selectLayer(overlaySelector) {
      cy.get(overlaySelector).parent().parent().children().invoke('is', ':checked').then((result) => {
         if (!result) {
            cy.get(overlaySelector).click({ force: true })
         }
      });
   }

   //This function is to unselect the map layer if selected already
   unSelectLayer(overlaySelector) {
      cy.get(overlaySelector).parent().parent().children().invoke('is', ':checked').then((result) => {
         if (result) {
            cy.get(overlaySelector).click({ force: true })
         }
      });
   }

   //This function is to check the visibility of the equipment icon in the main map
   checkEquipmentVisibility(overlaySelector, inputSCN) {
      this.selectLayer(overlaySelector);
      //  cy.get('its-map-icon[data-auto-id="icon-marker-'+ inputSCN +'"]').should('be.visible')
      cy.get(`its-map-icon[data-auto-id="icon-marker-${inputSCN}"]`).should('be.visible')

   }

   verifySaveForm() {
      cy.log(' Save the form ');
      cy.get(this.saveBtn).click();
      cy.contains('Enter a description for the changes you have just made').should('exist')
      this.validateExactText(this.commentOkBtn, ' OK ');
      this.validateExactText(this.commentCancelBtn, ' Cancel ');
      cy.get(this.commentOkBtn).click();
   }

   //Function to close the first tab if open
   closeFirstTabIfOpen(){
      cy.get('its-tabs').then(($btn) => {
         if ($btn.find(this.closeFirstTabBtn).length) {
               cy.get(this.closeFirstTabBtn).click({force:true});
         }
      });
   }

   //Function to close the second tab if open
   closeSecondTabIfOpen(){
      cy.get('its-tabs').then(($btn) => {
         if ($btn.find(this.closeSecondTabBtn).length) {
               cy.get(this.closeSecondTabBtn).click({force:true});
         }
      });
   }

   //Function to close all tabs if open
   closeAllTabIfOpen(){
      cy.get('its-tabs').then(($btn) => {
         if ($btn.find(this.closeTabBtn).length) {
               cy.get(this.closeTabBtn).click({force:true, multiple: true});
         }
      });
   }
   
   treeItemAll = '[data-auto-id="All-tree-item"]';
   treeItemJunction = '[data-auto-id="All_Junctions-tree-item"]';
   treeItemPelican = '[data-auto-id="All_Pelicans-tree-item"]';
   treeItemRemoteRequest = '[data-auto-id="All_Remote_Requests-tree-item"]';
   treeItemRemotePlan = '[data-auto-id="All_Remote_Requests_Remote_Plan-tree-item"]';
   treeItemUserDefined = '[data-auto-id="All_Remote_Requests_User_Defined_Activity-tree-item"]';
   treeItemRemoteRequestFunction = '[data-auto-id="All_Remote_Requests_Function-tree-item"]';
   treeItemRemoteRequestOther = '[data-auto-id="All_Remote_Requests_Other-tree-item"]';
   treeItemSpecialFacilities = '[data-auto-id="All_Special_Facilities-tree-item"]';
   treeItemSubArea = '[data-auto-id="All_Sub-areas-tree-item"]';
   treeItemTrafficController = '[data-auto-id="All_Traffic_Computers-tree-item"]';
   treeItemUtmcOutstation = '[data-auto-id="All_UTMC_Outstations-tree-item"]';

   addBtn = '[data-auto-id="add-item"]';
   gridFirstRow = '.ag-center-cols-container div[row-index="0"]';
   reviewSessionBtn = '[data-auto-id="open-edit-overview-dialog"]';
   editReviewSession = '[data-auto-id="review-edit-session"]'
   unsavedPopup = '.its-dialog__content';
   unsavedPopupFooter = '.its-dialog__footer';
   abondonSessionBtn = '[data-auto-id="abandon-draft-changes"]';
   frmHeader = '.text-heading-small';
   overviewHeader = '.its-form__group-header.box-border'
   okBtn = '[data-auto-id="Ok"]';
   recordExistTitle = '[data-auto-id="message-dialog-title"]';
   editSessionTitle = '[data-auto-id="message-dialog-title"]';
   editSessionMsg = '[data-auto-id="message-dialog-message"]'
   scnNumberLbl = '[title="System Code Number - the user equipment reference"]';
   descriptionLbl = '[title="Description or location for this equipment"]';
   cancelBtn = '[data-auto-id="editor-cancel-button"]';
   saveBtn = '[data-auto-id="editor-save-button"]';
   closeTabBtn = '[data-auto-id="close-tab-button"]';
   closeFirstTabBtn = '[data-auto-id="tab-0"] [data-auto-id="close-tab-button"]'; 
   closeSecondTabBtn = '[data-auto-id="tab-1"] [data-auto-id="close-tab-button"]';
   commentOkBtn = '[data-auto-id="input-dialog-ok-button"]';
   commentCancelBtn = '[data-auto-id="input-dialog-cancel-button"]';
   backBtn = '[data-auto-id="editor-back-button"]';
   viewBtn = '[data-auto-id="view-button"]';
   editBtn = '[data-auto-id="edit-mode-button"]';
   frmList = '.ag-center-cols-viewport';
   frmListTbl = '.ag-root-wrapper.ag-layout-normal.ag-ltr';
   mapImg = '.leaflet-tile-container.leaflet-zoom-animated';
   yesBtn = '[data-auto-id="Yes"]';
   noBtn = '[data-auto-id="No"]';
   treeSideMenu = '.sidebar-container.ng-star-inserted';
   gridToolBar = '.its-toolbar.its-toolbar--multiline';
   viewContextMenuBtn = '[data-auto-id="View"]';
   outstationConfigGrid0 = '[data-auto-id="outstation-config-grid-0"]';
   outstationConfigBit1 = '[aria-rowindex="1"]>[col-id="bit1"] .ag-header-cell-label [ref="eText"]';
   goBtn = '[data-auto-id= "scn-search-control-go-button"]';
   searchSCNInput = '[data-auto-id="scn-search-autocomplete-control-input"]';
   deleteBtnViewForm = '[data-auto-id="delete-button"]';
   deleteOptionContextMenu = '[data-auto-id="Delete"]'
   gridSCNFilterBtn = 'div [col-id="systemCodeNumber"] > div > span > span';
   gridFilterTxtbox = 'div:nth-child(2) > div > div.ag-text-field-input-wrapper > input';
   gridFilter2Txtbox = 'div:nth-child(5) > div > div.ag-text-field-input-wrapper > input';
   firstTab = '[data-auto-id="userdata-split-area"] [data-auto-id="tab-0"] > span';
   secondTab = '[data-auto-id="userdata-split-area"] [data-auto-id="tab-1"] > span';  
   firstHeader = '[data-auto-id="title-0"]'; 
   secondHeader = '[data-auto-id="title-1"]';
   clearFiltersOption = '[data-auto-id="clear-filters"]';
   exportOption = '[data-auto-id="csv-export"]';
   columnsDropdownOption = '[data-auto-id="column-visibility-dropdown"]';
   deleteOptionGrid = '[data-auto-id="delete-item"]';
   selectOutstationBtn = '[data-auto-id="open-change-outstation"]';
   selectOutstationTitle = '.its-dialog__title';
   outstationWarningText = '.warning';
   outstationSubmitBtn = '[data-auto-id="new-outstation-dialog-submit"]';
   outstationCancelBtn = '[data-auto-id="outstation-dialog-cancel"]';
   outstationSearchInput = '[data-auto-id="outstation-dialog-search"]';
   dropDownOption = '.cdk-overlay-pane > div > div > its-select-option';
   deleteConfirmDialog = '[data-auto-id="delete-confirmation-dialog"]';
   outstationBitSearchInput = '[data-auto-id="undefined-search"] input';
   outstationBitdropDownOption = 'div.scrollable-content > its-select-option';
   secondTab = '[data-auto-id="userdata-split-area"] [data-auto-id="tab-1"] > span';
   toastNotification = '#toast-container' 
   
}

const clientCommonPO = new clientCommon();
export default clientCommonPO;