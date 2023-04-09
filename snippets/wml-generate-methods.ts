// @ts-nocheck
generateFileUploadFormField=(
  labelValue:string,
  fieldFormControlName,
  fieldParentForm,
  errorMsgs?:WmlLabelParams["errorMsgs"],
  selfType?:WMLField["self"]["type"],
  fileUploadParams?:WMLFileUploadParams
  )=>{
  let wmlField
  wmlField = new WMLField({
    type: "custom",
    custom: {

      selfType: selfType ?? "standalone",
      fieldParentForm,
      fieldFormControlName,
      labelValue,
      errorMsgs:errorMsgs??{
        required:"global.errorRequired"
      },
      fieldCustomCpnt:WmlFileUploadComponent,
      fieldCustomMeta:fileUploadParams ?? new WMLFileUploadParams({

      })
    }
  })
  return this.generateFormField(wmlField)
}


generateWmlTab(wmlTabHeaderText:string,wmlTabHeaderIconIsPresent:boolean=false){
  let tab = new WMLTab({})
  tab.header.wmlTabHeader.text = wmlTabHeaderText
  tab.header.wmlTabHeader.icon.isPresent = wmlTabHeaderIconIsPresent
  return tab
}
