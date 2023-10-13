export default {
  userNotLoggedIn: {
    createAccount: "Crie uma conta gratuitamente",
    haveRegistration: "Já possuo cadastro",
  },
  about: {
    header: 'Sobre o Projeto',
    title: 'Quem somos nós',
    about: 'Em desenvolvimento...',
    namesTitle: 'Nomes dos envolvidos',
    footer: 'Realização'
  },
  header: {
    title: 'Recomendação Diária'
  },
  properties: {
    grouds: 'Número de Solos',
    bombs: 'Número de Motobombas',
    systems: 'Número de Sistemas de irrigação',
    button: 'Detalhes'
  },
  signup: {
    title: 'Dados Pessoais',
    inputs: {
      name: {
        label: 'Nome',
        placeholder: 'Insira seu nome'
      },
      email: {
        label: 'Email',
        placeholder: 'Insira seu email'
      },
      phone1: {
        label: 'Telefone',
        placeholder: 'Insira seu número de telefone'
      },
      phone2: {
        label: 'Telefone 2',
        placeholder: 'Insira seu número de telefone'
      },
      cel: {
        label: 'Celular',
        placeholder: 'Insira seu número de celular'
      },
      password: {
        label: 'Senha',
        placeholder: 'Insira sua senha'
      },
      passwordConfirm: {
        label: 'Confirme sua senha',
        placeholder: 'Insira sua senha novamente'
      },
      cep: {
        label: 'CEP',
        placeholder: 'Insira o CEP'
      },
      street: {
        label: 'Logradouro',
        placeholder: 'Insira o logradouro'
      },
      number: {
        label: 'Número',
        placeholder: 'Insira o número'
      },
      neighbor: {
        label: 'Bairro',
        placeholder: 'Insira o bairro'
      },
      complement: {
        label: 'Complemento',
        placeholder: 'Insira o complemento'
      },
      city: {
        label: 'Cidade',
        placeholder: 'Insira a cidade'
      },
      state: {
        label: 'Estado',
        placeholder: 'Insira o estado'
      },
    }
  },
  homeLogged: {
    noProperty: 'Você ainda não possui nenhuma cultura cadastrada.',
    addPropertyText1: 'Para calcular a irrigação diária para sua produção agrícola,',
    addPropertyText2: ' cadastre sua propriedade',
    addButton: {
      addCulture: 'Adicionar Cultura',
      addProperty: 'Nova Propriedade'
    },
    info: 'Para esse calculo de irrigação é necessário o dado de precipitação na sua propriedade. Quanto maior a precisão nos dados, maior a assertividade no manejo de irrigação.'
  },
  modal: {
    title: 'Bem-Vindo!',
    button: 'Boa Irrigação!',
    onboarding1: {
      text1: ' Olá! Seja bem-vindo ao',
      text2: 'App de Manejo de Irrigação.',
      text3: 'Estamos aqui para ajudá-lo a otimizar o uso da água na irrigação de suas culturas.'
    },
    onboarding2: 'Através deste aplicativo, você pode cadastrar as informações sobre as culturas que precisa irrigar com mais eficiência.',
    onboarding3: 'Além disso, você poderá controlar e monitorar seu sistema de irrigação para obter o melhor desempenho para sua produção.',
    onboarding4: 'Estamos aqui para ajudá-lo a ter sucesso com suas culturas! Comece agora para ter acesso a todas as ferramentas e informações.'
  },
  preciptationModal: {
    title: 'Precipitação Diária',
    text: 'Para calcular a irrigação diária, precisamos saber a precipitação do dia anterior na sua propriedade.',
    inputs: {
      property: {
        label: 'Nome da Propriedade',
        placeholder: 'Ex. 0 mm'
      },
      property2: {
        label: 'Nome da Propriedade 2',
        placeholder: 'Ex. 0 mm'
      }
    },
    button: 'Salvar'
  },
  newProperty: {
    header: {
      title: 'Nova Propriedade',
    },
    title: 'Dados da Propriedade',
    insertButton: {
      label: 'Localização da Propriedade',
      text: 'Inserir Manualmente'
    },
    gpsButton: {
      text: 'Detectar via GPS'
    },
    success:'Propriedade cadastrada com sucesso',
    error:'Erro ao cadastrar a propriedade',
    inputs: {
      name: {
        label: 'Nome da Propriedade',
        placeholder: 'Nome da Propriedade...'
      },
      latidude: {
        label: 'Latitude',
        placeholder: 'Ex: 15,23456'
      },
      longitude: {
        label: 'Longitude',
        placeholder: 'Ex: -30,67890.'
      },
      street: {
        label: 'Logradouro',
        placeholder: 'Rua, Travessa, Estrada...'
      },
      number: {
        label: 'Número',
        placeholder: 'Número...'
      },
      complement: {
        label: 'Complemento',
        placeholder: 'Complemento...'
      },
      city: {
        label: 'Cidade',
        placeholder: 'Rua, Travessa, Estrada...'
      },
      state: {
        label: 'Estado',
        placeholder: 'Selecione...'
      },
      cep: {
        label: 'CEP',
        placeholder: 'Ex: 00000-000'
      },
      area: {
        label: 'Área da Propriedade (ha)',
        placeholder: 'Ex: 10'
      },
    }
  },
  groundInfo: {
    title: 'Dados do Solo',
    addButtonn: 'Adicionar Solo',
    success:'Solo cadastrado com sucesso',
    error:'Erro ao cadastrar a solo',
    inputs: {
      groundType: {
        label: 'Tipo do Solo',
        placeholder: 'Selecione...'
      },
      capacity: {
        label: 'Capacidade de Campo (%)',
        placeholder: 'Ex: 95'
      },
      point: {
        label: 'Ponto de Murcha (%)',
        placeholder: 'Ex: 10'
      },
      density: {
        label: 'Densidade (g/m³)',
        placeholder: 'Ex: 100'
      },
    }
  },
  bombInfo: {
    title: 'Dados da Motobomba',
    addButtonn: 'Adicionar Motobomba',
    success:'Motobomba cadastrada com sucesso',
    error:'Erro ao cadastrar a motobomba',
    inputs: {
      manufacturer: {
        label: 'Fabricante',
        placeholder: 'Fabricante...'
      },
      model: {
        label: 'Modelo',
        placeholder: 'Modelo...'
      },
      power: {
        label: 'Potência (w)',
        placeholder: 'Ex: 500'
      },
      flowRate: {
        label: 'Vazão Máxima (m³/ha)',
        placeholder: 'Ex: 500 '
      },
      consumption: {
        label: 'Consumo da Bomba (kw/h)',
        placeholder: 'Ex: 500'
      },
      value: {
        label: 'Valor do Kw (R$)',
        placeholder: 'Ex: R$ 00,00'
      },
    }
  },
  SystemInfo: {
    title: 'Sistema de Irrigação',
    addButtonn: 'Adicionar Sistema de Irrigação',
    success:'Sistema cadastrada com sucesso',
    error:'Erro ao cadastrar a sistema',
    inputs: {
      name: {
        label: 'Nome do Sistema',
        placeholder: 'Nome do sistema...'
      },
      efficiency: {
        label: 'Eficiência de Irrigação (%)',
        placeholder: 'Ex: 95'
      },
      area: {
        label: 'Área total do Plantio (m²)',
        placeholder: 'Ex: 1000'
      },
      sectorQuantity: {
        label: 'Quantidade de Setores',
        placeholder: 'Ex: 1'
      },
      irrigationType: {
        label: 'Tipo de Irrigação',
        placeholder: 'Selecione...'
      },
      sectorName: {
        label: 'Nome do Setor',
        placeholder: 'Digite'
      },
      irrigatedArea: {
        label: 'Área Irrigada (m²)',
        placeholder: 'Ex: 300'
      },
      sprinklerFlow: {
        label: 'Vazão do Aspersor (L/H)',
        placeholder: 'Ex: 2.000'
      },
      sprinklerSpace: {
        label: 'Espaçamento entre Aspersores (m)',
        placeholder: 'Ex: 10'
      },
      linesSpace: {
        label: 'Espaçamento entre Linhas (m)',
        placeholder: 'Ex: 10'
      },
      CUC: {
        label: 'Coeficiente de Uniformidade CUC (%)',
        placeholder: 'Ex: 10'
      },
      efficiencySystem: {
        label: 'Eficiência do Sistema (%)',
        placeholder: 'Ex: 95'
      },
      issuerFlow: {
        label: 'Vazão do emissor (L/h)',
        placeholder: 'Ex: 2.000'
      },
      issuerSpace: {
        label: 'Espaçamento entre emissores (m)',
        placeholder: 'Ex: 10'
      },
      wetAreaPercentage: {
        label: 'Percentual de área molhada (%)',
        placeholder: 'Ex: 95'
      },
      shadedAreaPercentage: {
        label: 'Percentual de área sombreada (%)',
        placeholder: 'Ex: 95'
      },
    }
  },
  propertyRegistered: {
    title: 'Cadastro concluído',
    subTitle: 'Propriedade Cadastrada',
    regiterCulture: 'Quero cadastrar uma cultura!',
    goBack: 'Voltar para o início',
    content: {
      text1: 'Parabéns, você cadastrou sua propriedade! ',
      text2: 'Tudo agora está pronto para você começar a usar o ',
      text3: 'Manejo de Irrigação ',
      text4: 'e aproveitar as vantagens para sua produção! ',
      text5: 'Para começar, é fácil! Basta ',
      text6: 'cadastrar uma cultura ',
      text7: 'e você terá acesso aos números de irrigação diários para cada cultura em sua propriedade! ',
    }
  },
  CultureInfo: {
    title: 'Nova Cultura',
    subTitle: 'Selecione a cultura',
    button: 'Concluir',
    cultureFinished: 'Cadastro concluído',
    cultureRegistered: 'Cultura Cadastrada',
    gobackButton: 'Voltar para o Início',
    text1: 'Parabéns, você cadastrou uma cultura!',
    text2: 'Volte para o Início e veja os seus números diários de irrigação.',
    category: {
      hotalicas: 'Hortaliças',
      frutíferas: 'Frutíferas',
      forrageiras: 'Forrageiras',
      grãosecereais: 'Grãos e Cereais',
      raiz: 'Raiz',
      pastagem: 'Pastagem',
      capineira: 'Capineira',
    },
    inputs: {
      search: {
        label: 'Pesquisar',
        placeholder: 'Digite...'
      },
      culture: {
        label: 'Cultura',
        placeholder: ''
      },
      cultureName: {
        label: 'Identificação da Área',
        placeholder: 'Ex: Caturra, da Terra...'
      },
      date: {
        label: 'Data do Plantio',
        placeholder: 'Ex: dd/mm/aaaa'
      },
      area: {
        label: 'Área do Plantio (ha)',
        placeholder: 'Ex: 1'
      },
      sector: {
        label: 'Setores',
        placeholder: 'Ex: 0'
      },
      stage: {
        label: 'Estágio Atual da Cultura',
        placeholder: 'Automático'
      },
      property: {
        label: 'Propriedade',
        placeholder: 'Selecione...'
      },
      groundType: {
        label: 'Tipo de Solo',
        placeholder: 'Selecione...'
      },
      bomb: {
        label: 'Motobomba',
        placeholder: 'Selecione...'
      },
      irrigationSystem: {
        label: 'Sistema de Irrigação',
        placeholder: 'Selecione...'
      },
    },
  },
  menu: {
    recomendations: 'Recomendação Diária',
    myProperties: 'Minhas Propriedades',
    profile: 'Meu Perfil',
    about: 'Sobre o Projeto',
    close: 'Sair do Aplicativo'
  }
};
