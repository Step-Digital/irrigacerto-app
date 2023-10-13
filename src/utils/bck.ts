const onSubmit = (values, errors, isValid, dirty) => {
  console.log(values.tipo_irrigacao)
  console.log('errors', errors)
  console.log('isValid', isValid)
  console.log('irrigationType', irrigationType)
  setIrrigationType(values.tipo_irrigacao)
  
  if (errors.eficiencia_irrigacao || values.eficiencia_irrigacao === 0) return Alert.alert(RULES.EIFICENCIA_IRRIGACAO.VALID)
  if (errors.area_total_plantio || values.area_total_plantio === 0) return Alert.alert(RULES.AREA_TOTAL_PLANTIO.VALID)
  if (errors.quantidade_setores || values.quantidade_setores === 0) return Alert.alert(RULES.QUANTIADADE_SETORES.VALID)
  if (errors.area_irrigada || values.area_irrigada === 0) return Alert.alert(RULES.AREA_IRRIGADA.VALID)
  if (errors.coeficiente_uniformidade || values.coeficiente_uniformidade === 0) return Alert.alert(RULES.COEFICIENTE_UNIFORMIDADE.VALID)
  if (errors.eficiencia_sistema || values.eficiencia_sistema === 0) return Alert.alert(RULES.EIFICIENCIA_SISTEMA.VALID)
  if (isValid === false || !dirty) return Alert.alert('Preencha todos os campos!')

  if (values.tipo_irrigacao.includes('Aspersão Convencional') && isValid === true) {
    setSystems([
      ...systems,
      {
        id: Math.random(),
        nome: values.nome,
        eficiencia_irrigacao: values.eficiencia_irrigacao,
        area_total_plantio: values.area_total_plantio,
        quantidade_setores: values.quantidade_setores,
        tipo_irrigacao: values.tipo_irrigacao,
        nome_setor: values.nome_setor,
        area_irrigada: values.area_irrigada,
        vazao_aspressor: values.vazao_aspressor,
        espacamento_aspressor: values.espacamento_aspressor,
        espacamento_linha: values.espacamento_linha,
        coeficiente_uniformidade: values.coeficiente_uniformidade,
        eficiencia_sistema: values.eficiencia_sistema,
      }]
    )
  }

  // if (values.irrigationType === 'teste' || isValid === true) {
  //   setSystems([
  //     ...systems,
  //     {
  //       id: Math.random(),
  //       nome: values.nome,
  //       eficiencia_irrigacao: values.eficiencia_irrigacao,
  //       area_total_plantio: values.area_total_plantio,
  //       quantidade_setores: values.quantidade_setores,
  //       tipo_irrigacao: values.tipo_irrigacao,
  //       nome_setor: values.nome_setor,
  //       area_irrigada: values.area_irrigada,
  //       vazao_aspressor: values.vazao_aspressor,
  //       espacamento_aspressor: values.espacamento_aspressor,
  //       espacamento_linha: values.espacamento_linha,
  //       coeficiente_uniformidade: values.coeficiente_uniformidade,
  //       eficiencia_sistema: values.eficiencia_sistema,
  //     }]
  //   )
  // }
}
