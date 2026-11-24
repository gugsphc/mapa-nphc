/* Conteúdo do mapa: zonas de Poliakov, analisadores, unidades de Luria, áreas de Brodmann.
   Fontes: P71 = Poliakov, On the Neuronal Organization of the Brain (Mir, 1971);
           HCF = Luria, Higher Cortical Functions in Man, 2ª ed. (1980) — Parte I, cap. 2 escrito por Poliakov;
           FN  = Luria, Fundamentos de neuropsicologia (LTC/Edusp, 1981; orig. 1973). */
window.POL = (() => {
const ZN = {
  P: {
    nome: 'Campos primários', sub: 'centrais · de projeção', ru: 'первичные (проекционные) поля', cor: '#b3121d',
    campos: 'Posteriores: 17 (visual), 41 (auditivo), 3 (cutâneo-cinestésico). Anterior: 4 (motor).',
    def: 'O centro da “zona nuclear” de cada analisador (no sentido de Pavlov). São os campos ligados aos órgãos dos sentidos e ao aparelho motor pelo menor número de relés subcorticais, por meio dos núcleos de relé do tálamo e dos corpos geniculados (P71, p. 143–144; HCF, p. 42–45).',
    con: 'Predomina o sistema de conexões de projeção (córtico-subcorticais) pela via mais curta e direta. Neuronografia: a excitação gerada aqui tem difusão limitada e fica restrita à própria zona nuclear (HCF, p. 48).',
    org: 'Projeção somatotópica “ponto a ponto”, que não é geométrica, e sim funcional: a mácula, a mão e a face ocupam territórios desproporcionais à sua extensão periférica. Essa projeção também é dinâmica: o mesmo ponto do campo 4 pode produzir flexão ou extensão, dependendo do estado anterior (Foerster; Sherrington) (HCF, p. 45–46).',
    cito: 'Koniocórtex nos campos sensoriais: camada IV com muitos grânulos, que retransmitem as fibras de projeção aos piramidais de III e V. No campo 17, IV se divide em três subcamadas e há grandes estrelados em IV e piramidais gigantes em V (células de Meynert e Cajal), que projetam aos centros oculomotores do mesencéfalo. No campo 4, inversamente, o córtex é agranular: sem IV identificável e com as células gigantes de Betz em V. Poliakov descreve a estrutura neuronal desses campos como “grosseira”, adaptada para receber e devolver fluxos intensos e concentrados de excitação (HCF, p. 43–44, 52, 61).',
    func: 'Decomposição máxima e detalhada de estímulos isolados: o substrato das sensações finamente diferenciadas. Pelos “reflexos locais” de cada analisador, também ajustam o órgão receptor para a percepção ótima (P71, p. 143; HCF, p. 45).',
    clin: 'Lesão: queda da percepção direta e da discriminação fina na modalidade (escotomas, hemianopsia, cegueira cortical; paresias no campo 4). Estimulação elétrica (Penfield e Jasper): sensações isoladas de luz, cor, som ou toque (HCF, p. 42–43; P71, p. 148).',
    gen: 'São os primeiros a se diferenciar na filogênese e na ontogênese. Suas vias são as primeiras a mielinizar (Flechsig; Vogt) (HCF, p. 58).',
    layers: 'Psens'
  },
  S: {
    nome: 'Campos secundários', sub: 'periféricos · de projeção-associação · zona de associação modal', ru: 'вторичные (проекционно-ассоциативные) поля', cor: '#d4881a',
    campos: 'Posteriores: 18 e 19 (visual), 42 e 22 (auditivo), 1 e 2 (cutâneo-cinestésico). Anteriores: 6 e 8 (pré-motor), com os setores motor-verbais 44 e 45.',
    def: 'São os segmentos periféricos das zonas nucleares. Continuam modalmente específicos, mas ligam-se à superfície receptora por relés suplementares nos núcleos associativos do tálamo (P71, p. 144; HCF, p. 46–48).',
    con: 'Sistema de conexões de projeção-associação. O sinal chega ao córtex já submetido a alguma integração subcortical. Aqui não vale o princípio “ponto a ponto”: um ponto receptor alcança vários pontos corticais, e vários pontos receptores convergem num só. A excitação iniciada aqui tende a se espalhar para fora da zona nuclear (P71, p. 145, 163; HCF, p. 48).',
    org: 'Correlação de combinações de estímulos, dentro da própria zona e entre zonas de analisadores diferentes. As relações topográficas entre receptor e córtex são mais complexas que nos campos primários (P71, p. 145).',
    cito: 'Os grânulos de IV retransmitem para os grandes piramidais da porção inferior de III (subcamada III₃). Esse é o “complexo neuronal secundário de projeção-associação”, base do sistema associativo mais poderoso do córtex. Nos campos 6 e 8 não há células de Betz, e os grandes piramidais de III (sobretudo III₃) estão mais desenvolvidos (HCF, p. 47, 53). Em finura de estrutura, ficam a meio caminho entre primários e terciários (HCF, p. 62).',
    func: 'Percepção, impressão (imprinting) e correlação de complexos de estímulos. Também a integração dos traços isolados numa imagem do objeto, a percepção simultânea e a retenção de seus detalhes (Luria, citado por Poliakov) (P71, p. 144–145).',
    clin: 'Lesão: as sensações elementares ficam relativamente preservadas, mas se desorganiza o reflexo de grupos complexos de estímulos e das relações entre os componentes do objeto. Daí as agnosias (óptica, acústica, tátil), a afasia sensorial, a apraxia aferente e a desintegração das melodias cinéticas (pré-motor). Estimulação: alucinações complexas que se sucedem numa sequência espaço-temporal (HCF, p. 46–47; P71, p. 148).',
    gen: 'Desenvolvimento intensivo nas primeiras semanas e meses de vida. Só no homem, partes desses campos se diferenciam em setores de fala: 22 posterior, 44–45 e o campo visual de leitura (HCF, p. 58–60).',
    layers: 'S'
  },
  T: {
    nome: 'Campos terciários', sub: 'zonas de sobreposição · associação amodal (supramodal)', ru: 'третичные поля — зоны перекрытия корковых концов анализаторов', cor: '#0b4f8a',
    campos: 'Posteriores: região parietal superior (5, 7), região parietal inferior (40, 39), sub-região temporo-parieto-occipital (37) e sub-região temporal média (21). Anteriores: região frontal propriamente dita (9, 10, 46), que Poliakov inclui no grupo “por sua importância funcional” (P71, p. 146).',
    def: 'São formados na evolução pela expansão das zonas nucleares sobre a superfície do hemisfério, até se encontrarem e se sobreporem. Poliakov também as chama de zonas “interanalisadoras”: nelas se aproximam elementos de analisadores diferentes, em vez de se concentrarem elementos de uma só modalidade (P71, p. 146, 163–164).',
    con: 'Predominam as conexões de associação (córtico-corticais). A projeção é a mais indireta de todas, pelo maior número de relés sucessivos. Os núcleos associativos do tálamo, sobretudo o pulvinar (onde convergem recepções visuais e auditivas) e o LP, mantêm ligações bidirecionais com essas zonas. O frontal se liga ao núcleo medial dorsal. A estimulação periférica quase não se reflete na atividade desses neurônios (P71, p. 146, 157; HCF, p. 51).',
    org: 'São quase desprovidos de função analisadora específica: são os “elementos difusos” dos analisadores (Pavlov). Mas concentram a maior capacidade de interação entre analisadores (HCF, p. 48–50).',
    cito: 'Complexo associativo terciário: piramidais e estrelados das camadas e subcamadas mais altas, III₂, III₁ e II, as últimas a se diferenciarem na evolução dos mamíferos. É a estrutura neuronal mais fina de todo o córtex. A camada III, que envia, recebe e analisa a maior parte dos impulsos associativos, cresce mais rápido que as demais na ontogênese e ocupa cerca de um terço da espessura cortical no adulto. No frontal, IV é mais nítida que no córtex motor (HCF, p. 50–51, 55, 61).',
    func: 'As formas mais generalizadas de percepção e ação, as mais abstraídas dos estímulos concretos. Inclui os mecanismos cerebrais da fala, do trabalho, da imaginação criadora, do pensamento e da previsão. É o aparelho das operações lógicas: comparação por semelhança e diferença, classificação, juízo, dedução (P71, p. 146–148). No frontal: as formas mais integradas de atividade dirigida a fins (HCF, p. 56).',
    clin: 'Lesão: sem perda das funções específicas dos analisadores. Desorganizam-se as formas mais generalizadas: práxis construtiva, orientação espacial, leitura e escrita (Preobrazhenskaya), operações lógico-gramaticais, cálculo, esquema corporal. No frontal, a síndrome frontal (P71, p. 148; HCF, p. 48).',
    gen: 'Mal esboçados em carnívoros e ungulados, nítidos só nos primatas. No homem ocupam mais da metade da superfície cortical. São os últimos a amadurecer, nos primeiros anos de vida, e suas conexões são as últimas a completar o ciclo de desenvolvimento (HCF, p. 57–59).',
    layers: 'T'
  },
  M: {
    nome: 'Regiões mediobasais e marginais', sub: 'fora do esquema tripartite', ru: 'медиобазальные отделы коры', cor: '#8a7aa0',
    campos: 'Região límbica (23, 24, 25, 31, 32, 33), região insular (13), campos neocorticais basais e mediais funcionalmente ligados a elas (11, 47, 20, 38) e o córtex intermediário e arquicórtex adjacentes (27, 28, 29, 30, 34, 35, 36).',
    def: 'Poliakov não as inclui na tríade das zonas analisadoras. São as regiões “marginais” do neocórtex e as formações filogeneticamente antigas (paleo-, arqui- e córtex intermediário, na classificação de Filimonov). Na Fig. 46 de 1971 aparecem com hachura horizontal, mais densa quanto mais próximas do arquicórtex (P71, p. 142–143; HCF, p. 63–64).',
    con: 'Ligadas aos núcleos talâmicos antigos (anterior e parte do medial), ao hipotálamo e à formação reticular do tronco. É o “cérebro visceral”, que substituiu o antigo conceito de rinencéfalo (P71, p. 58–59; HCF, p. 65–66).',
    org: 'Estimulação: em vez de descargas rápidas do tipo “tudo ou nada”, ondas lentas que sobem e descem gradualmente e modificam o estado do tecido nervoso, e não reações musculares isoladas (HCF, p. 65).',
    cito: 'Córtex de transição: proisocórtex e periarquicórtex, com laminação menos nítida. A camada IV é pouco desenvolvida ou ausente nas porções agranulares (cíngulo anterior, ínsula anterior, 25). No entorrinal (28), a camada II tem ilhas de grandes células estreladas.',
    func: 'Integração dos componentes animais e vegetativos das reações vitalmente importantes, efeito do reforço positivo e negativo, regulação de estados, informação do meio interno (vísceras, paladar). Em Poliakov 1971, as formações antigas são o substrato da “auto-direção”, ou seja, as cadeias de reações inatas (P71, p. 80–81; HCF, p. 64–66).',
    clin: 'Luria: lesões mediais temporais e mediobasais frontais produzem distúrbios modalmente inespecíficos de memória, de estado de vigília e de afeto (HCF II.2G, p. 140; II.5C, p. 263).',
    gen: 'Filogeneticamente antigas. No neocórtex, são as áreas marginais diferenciadas mais cedo na evolução dos mamíferos (P71, p. 58–59).',
    layers: 'M'
  }
};

const AN = {
  vis: { nome: 'Analisador visual', cor: '#1d5fb8', desc: 'Retina, nervo e trato ópticos, corpo geniculado lateral e radiação óptica até a zona de projeção, o campo 17 (FN, p. 85–86). Associação modal: 18 e 19. Na Fig. 46 de Poliakov, a zona nuclear (17, 18, 19) é marcada por círculos.' },
  aud: { nome: 'Analisador auditivo', cor: '#14897a', desc: 'Cóclea, vias auditivas e corpo geniculado medial até a zona de projeção, o campo 41. Associação modal: 42 e 22. Na Fig. 46, a zona nuclear (41, 42, 22) é marcada por quadrados.' },
  som: { nome: 'Analisador cutâneo-cinestésico', cor: '#d08a10', desc: 'Receptores cutâneos e proprioceptivos, vias somestésicas e núcleos ventrais posteriores do tálamo até a zona de projeção, o campo 3. Associação modal: 1, 2 e 43. Na Fig. 46, losangos.' },
  mot: { nome: 'Zona motora', cor: '#b3121d', desc: 'Zona de projeção motora: campo 4, de onde partem as vias piramidais. Associação pré-motora: 6 e 8, com os setores motor-verbais 44 e 45. Na Fig. 46, triângulos.' },
  sob: { nome: 'Zonas de sobreposição posteriores', cor: '#6b3fa0', desc: 'Zonas de associação amodais: sobreposição das terminações corticais de vários analisadores (FN, p. 54, 57). Parietal superior, parietal inferior, temporal média e TPO; na Fig. 46, mistura dos símbolos vizinhos.' },
  fro: { nome: 'Região frontal propriamente dita', cor: '#c2557a', desc: 'Campos pré-frontais. Na Fig. 46, os mesmos triângulos da zona motora, porém mais espaçados.' },
  lim: { nome: 'Regiões límbica, insular e mediobasais', cor: '#8a8a8a', desc: 'Hachura horizontal na Fig. 46.' }
};

const UN = {
  1: { nome: '1ª unidade', tit: 'Regulação do tônus e da vigília', ru: 'блок регуляции тонуса и бодрствования', cor: '#8a7aa0',
    estr: 'Formação reticular ativadora (ascendente e descendente), núcleos inespecíficos do tálamo, hipotálamo, sistema límbico e córtex mediobasal dos lobos frontal e temporal.',
    trab: 'Não é modalmente específica. Funciona por mudanças graduais de estado, e não por descargas “tudo ou nada”, e mantém o tônus cortical ótimo para a atividade das outras duas unidades (FN, p. 28–49; “tudo ou nada”, p. 29).',
    pol: 'No mapa: tronco encefálico e formação reticular, hipotálamo, hipocampo, amígdala, núcleos antigos do tálamo e, no córtex, as regiões mediobasais e marginais. Em Poliakov, corresponde ao “cérebro visceral” e às conexões córtico-reticulares (HCF I.2E) e, num plano evolutivo mais amplo, ao mecanismo de coordenação (reticular) e às formações antigas da auto-direção (P71, cap. II).' },
  2: { nome: '2ª unidade', tit: 'Recepção, análise e armazenamento da informação', ru: 'блок приёма, переработки и хранения информации', cor: '#1d5fb8',
    estr: 'Córtex posterior ao sulco central: regiões occipital, temporal e parietal.',
    trab: 'Funciona por hierarquia ascendente: o primário decompõe, o secundário organiza em estruturas modais, o terciário sintetiza entre modalidades. Rege-se pelas leis da estrutura hierárquica, da especificidade decrescente e da lateralização progressiva (FN, p. 49–60; leis, p. 55–59).',
    pol: 'É exatamente a tríade de Poliakov na metade posterior: as zonas nucleares visual, auditiva e cutâneo-cinestésica (primário mais secundário) e as zonas de sobreposição posteriores (terciário).' },
  3: { nome: '3ª unidade', tit: 'Programação, regulação e verificação da atividade', ru: 'блок программирования, регуляции и контроля деятельности', cor: '#b3121d',
    estr: 'Lobos frontais: campo motor 4 (primário), campos pré-motores 6 e 8 (secundários) e região pré-frontal (terciária).',
    trab: 'A hierarquia corre no sentido inverso: o plano se forma no terciário pré-frontal, organiza-se como programa motor no pré-motor e desce ao campo 4. A verificação depende de retroaferência constante: comparar o programa “dado” com a execução real (HCF, p. 55; FN, p. 60–78, fluxo descendente p. 63).',
    pol: 'Poliakov aplica ao lobo frontal os mesmos três grupos de campos (HCF I.2C). Em 1971, chama a região frontal de base morfológica dos “organizadores superiores do comportamento” e a vincula à função de direção (P71, p. 89–91).' }
};

/* zona, analisador e região de Poliakov por campo */
const ZL = { P: [17, 41, 3, 4], S: [18, 19, 42, 22, 1, 2, 43, 6, 8, 44, 45], T: [5, 7, 39, 40, 37, 21, 9, 10, 46],
  M: [11, 47, 13, 20, 38, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] };
const AL = { vis: [17, 18, 19], aud: [41, 42, 22], som: [3, 1, 2, 43], mot: [4, 6, 8, 44, 45], sob: [5, 7, 39, 40, 37, 21], fro: [9, 10, 46],
  lim: [11, 47, 13, 20, 38, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] };
const UNA = { vis: 2, aud: 2, som: 2, sob: 2, mot: 3, fro: 3, lim: 1 };

const TH = {
  CGL: { nome: 'Corpo geniculado lateral', tipo: 'rel', d: 'Núcleo de relé visual, a via mais curta da retina ao campo 17. Mais da metade das fibras do CGL vai ao polo occipital (representação macular) (P71, p. 144).' },
  CGM: { nome: 'Corpo geniculado medial', tipo: 'rel', d: 'Núcleo de relé auditivo, projeta ao campo 41 (e 42).' },
  VPL: { nome: 'Ventral posterolateral', tipo: 'rel', d: 'Relé somatossensorial do corpo, projeta aos campos 3, 1 e 2. Somatotopia nítida nos primatas (P71, p. 144).' },
  VPM: { nome: 'Ventral posteromedial', tipo: 'rel', d: 'Relé somatossensorial da face e da gustação, projeta a 3 e ao opérculo (43).' },
  VL: { nome: 'Ventral lateral', tipo: 'rel', d: 'Relé motor: recebe do cerebelo, pelo núcleo rubro, e projeta aos campos 4 e 6 (HCF, p. 54–55).' },
  VA: { nome: 'Ventral anterior', tipo: 'rel', d: 'Recebe dos gânglios da base e projeta ao pré-motor (6, 8). Faz parte dos circuitos extrapiramidais córtex–gânglios–tálamo–córtex.' },
  Pulv: { nome: 'Pulvinar', tipo: 'ass', d: 'O mais importante complexo associativo do tálamo, onde convergem recepções visuais e auditivas. Tem ligações bidirecionais com as zonas de sobreposição posteriores e é o último núcleo a se diferenciar na evolução (P71, p. 157; HCF, p. 51).' },
  LP: { nome: 'Lateral posterior', tipo: 'ass', d: 'Núcleo associativo ligado ao parietal superior (5, 7) e aos campos secundários vizinhos.' },
  LD: { nome: 'Lateral dorsal', tipo: 'lim', d: 'Ligado ao cíngulo posterior, ao retroesplenial e ao parietal medial.' },
  MD: { nome: 'Medial dorsal', tipo: 'ass', d: 'Projeta à região pré-frontal (9, 10, 46, 11, 47). Segundo Luria, esses campos se ligam a núcleos sem relação direta com a periferia motora, ao contrário do campo 4 (HCF, p. 259).' },
  AN: { nome: 'Núcleos anteriores', tipo: 'lim', d: 'Parte do circuito límbico (corpos mamilares → anterior → cíngulo). Filogeneticamente antigos (HCF, p. 64).' },
  Mid: { nome: 'Núcleos da linha média', tipo: 'lim', d: 'Inespecíficos, ligados à formação reticular e ao tônus cortical (1ª unidade).' }
};
const THT = { rel: ['Núcleos de relé (específicos)', '#b3121d'], ass: ['Núcleos associativos', '#0b4f8a'], lim: ['Límbicos e inespecíficos', '#8a7aa0'] };

const AR = {
 17: { n: 'Córtex estriado (V1)', r: 'Região occipital · calcarina', t: ['CGL'],
   c: 'Koniocórtex típico. Camada IV muito espessa e tripartida (IVa, IVb com a estria de Gennari, IVc), com grandes estrelados em IV e piramidais gigantes de Meynert em V, que se projetam aos centros oculomotores do mesencéfalo. Estrelados de axônio curto muito densos, com plexos axonais finos (Shkolnik-Yarros). Por isso o impulso passa por mais relés que no córtex auditivo e os traços de excitação duram mais (P71, p. 138; HCF, p. 43–44).',
   f: 'Projeção retinotópica “ponto a ponto” do hemicampo contralateral, com a mácula superrepresentada. Discriminação fina de luz, cor e contorno. Estimulação: fotismos elementares.',
   k: 'Lesão: escotomas e hemianopsias. Destruição extensa bilateral: cegueira cortical (Preobrazhenskaya, in P71, p. 148).' },
 18: { n: 'Córtex paraestriado (V2)', r: 'Região occipital', t: ['CGL', 'Pulv'],
   c: 'Granular, porém com IV menos espessa que em 17 e sem a estria de Gennari. Grandes piramidais em III₃.',
   f: 'Integração dos traços isolados em imagens de objetos. Os campos receptivos simples quase desaparecem. Estimulação: imagens complexas (anéis coloridos, figuras de animais, rostos) (P71, p. 145; HCF, p. 46).',
   k: 'Agnosia visual de objetos e simultanagnosia (HCF II.3C, p. 157). No cão, a extirpação de 18–19 suprime a diferenciação entre octógono e círculo (Khananashvili, in P71, p. 144).' },
 19: { n: 'Córtex periestriado', r: 'Região occipital', t: ['Pulv', 'LP'],
   c: 'Secundário visual com grandes piramidais de III₃. É a transição para os campos parietais e temporais vizinhos.',
   f: 'A “esfera visual ampla” (Pötzl): síntese de complexos visuais, integração com os movimentos oculares e a atenção visual. A estimulação tem efeito difuso e extenso.',
   k: 'Agnosias ópticas. Com lesões bilaterais occipitoparietais, estreitamento do campo da percepção simultânea (HCF II.3C).' },
 41: { n: 'Giro transverso anterior (Heschl, A1)', r: 'Sub-região temporal superior', t: ['CGM'],
   c: 'Koniocórtex auditivo com IV densa. Os estrelados são menos numerosos que no córtex visual e seus axônios curtos se ramificam de modo mais esparso (Popova). Há menos relés intracorticais, por isso os processos são mais móveis e os traços mais breves (P71, p. 138–139).',
   f: 'Projeção tonotópica da cóclea, com representação bilateral de cada ouvido. No homem é muito mais extenso que no macaco e se subdivide em subcampos, o que Poliakov liga à fala (Blinkov, in HCF, p. 60).',
   k: 'Lesão unilateral: déficit sensorial discreto, por causa da representação bilateral. Lesão bilateral: surdez cortical.' },
 42: { n: 'Giro transverso posterior', r: 'Sub-região temporal superior', t: ['CGM', 'Pulv'],
   c: 'Secundário auditivo, com granulares de IV e grandes piramidais de III₃.',
   f: 'Análise de complexos sonoros sucessivos, ritmos e melodias. No hemisfério esquerdo, base da audição fonêmica.',
   k: 'Agnosia acústica. À direita, desorganização da percepção de ritmos e melodias (HCF II.2D, p. 117).' },
 22: { n: 'Giro temporal superior', r: 'Sub-região temporal superior · setor auditivo-verbal (Wernicke) no terço posterior', t: ['CGM', 'Pulv'],
   c: 'Secundário auditivo, com grandes piramidais de III₃. No homem, o terço posterior se especializa como setor auditivo-verbal (P71, Fig. 46; HCF, p. 59).',
   f: 'Análise e integração dos fonemas: a audição fonêmica da fala.',
   k: 'Hemisfério esquerdo: afasia sensorial (temporal acústica), com perda da diferenciação de fonemas próximos, alienação do sentido das palavras e distúrbios secundários de escrita (HCF II.2D, p. 117).' },
 3: { n: 'Giro pós-central (banco anterior, S1)', r: 'Região pós-central', t: ['VPL', 'VPM'],
   c: 'Koniocórtex (3b) com IV granular muito densa. 3a, no fundo do sulco central, faz a transição para o córtex motor.',
   f: 'Projeção somatotópica funcional (o “homúnculo” de Penfield): mão, lábios e língua desproporcionais. Discriminação cutânea e cinestésica elementar.',
   k: 'Hipoestesias contralaterais segundo a somatotopia.' },
 1: { n: 'Giro pós-central (crista)', r: 'Região pós-central', t: ['VPL', 'LP'],
   c: 'Secundário cutâneo-cinestésico. IV presente, piramidais de III mais desenvolvidas que em 3.',
   f: 'Integração de complexos táteis e cinestésicos, base aferente do movimento voluntário.',
   k: 'Apraxia aferente (cinestésica): a “mão-pá”, que perde a seleção dos impulsos motores. Agnosia tátil (HCF II.3D, p. 168; II.4C, p. 202).' },
 2: { n: 'Giro pós-central (banco posterior)', r: 'Região pós-central', t: ['VPL', 'LP'],
   c: 'Secundário cutâneo-cinestésico, transição para o parietal superior e o inferior.',
   f: 'Cinestesia articular e integração da forma tátil (estereognosia).',
   k: 'Astereognosia e apraxia aferente. Nos segmentos inferiores, que representam lábios, língua e laringe, afasia motora aferente (HCF II.4D, p. 207).' },
 43: { n: 'Área subcentral (opercular)', r: 'Opérculo fronto-parietal', t: ['VPM'],
   c: 'Disgranular, na transição com a ínsula. Poliakov não o classifica explicitamente; o enquadramento como secundário aqui é aproximado.',
   f: 'Gustação, mastigação, deglutição e salivação estão representadas na ínsula e no opérculo adjacente (Penfield e Jasper, in HCF, p. 66).',
   k: 'Distúrbios gustativos e orofaciais.' },
 5: { n: 'Lóbulo parietal superior (anterior)', r: 'Região parietal superior', t: ['LP'],
   c: 'Terciário segundo Poliakov (1971 inclui os campos 5 e 7). Grandes piramidais herdados do vizinho pós-central, combinados ao desenvolvimento das camadas associativas superiores.',
   f: 'Limita-se com a representação pós-central dos membros inferiores e do tronco. É o lugar da integração dos movimentos do corpo inteiro com a recepção visual e da formação do esquema corporal (HCF, p. 50).',
   k: 'Distúrbios da postura, da localização da direção do movimento e da posição das partes do corpo (P71, p. 148).' },
 7: { n: 'Lóbulo parietal superior e pré-cúneo', r: 'Região parietal superior', t: ['LP', 'Pulv'],
   c: 'Terciário: estrutura neuronal fina, com predomínio de II–III₁₋₂.',
   f: 'Sobreposição dos analisadores cutâneo-cinestésico e visual: esquema corporal e relações espaciais das partes do corpo (P71, p. 148).',
   k: 'Distúrbios do esquema corporal e da orientação do movimento no espaço sob controle visual.' },
 40: { n: 'Giro supramarginal', r: 'Região parietal inferior (anterior)', t: ['Pulv', 'LP'],
   c: 'Terciário. Na Fig. 20 do HCF, é o exemplo da estrutura neuronal mais fina da série posterior.',
   f: 'Limita-se com a representação pós-central do membro superior e da face. Integra estímulos generalizados e discretos, permite a discriminação precisa entre objetos e participa do ato de fala, tudo sob controle visual (HCF, p. 50).',
   k: 'Apraxias de organização espacial do gesto. No setor anterior, contígua ao pós-central inferior, contribui para a afasia motora aferente (HCF II.4D).' },
 39: { n: 'Giro angular', r: 'Região parietal inferior (posterior)', t: ['Pulv'],
   c: 'Terciário. Uma das formações corticais mais novas, que liga os aparelhos centrais dos analisadores cinestésico, vestibular e visual (HCF, p. 172).',
   f: 'Sínteses simultâneas, ou quase-espaciais: orientação no espaço, relações lógico-gramaticais, operações numéricas.',
   k: 'Apractognosia espacial e construtiva, afasia semântica (relações como “o irmão do pai” × “o pai do irmão”) e acalculia (HCF II.3E–G, p. 171–186).' },
 37: { n: 'Área occipitotemporal (fusiforme posterior)', r: 'Sub-região temporo-parieto-occipital (TPO)', t: ['Pulv'],
   c: 'Terciário na sobreposição auditivo-visual (P71, p. 146).',
   f: 'Integração mais complexa entre recepção auditiva e visual, sobretudo no aspecto semântico da linguagem oral e escrita. Penfield e Jasper produziram alucinações visuais e auditivas estimulando esta sub-região (HCF, p. 50). Hoje também é descrita como parte da via visual ventral, com regiões seletivas para rostos e para a forma escrita das palavras.',
   k: 'Dificuldade de evocar o nome dos objetos e distúrbios óptico-mnésicos (HCF II.2, II.3).' },
 21: { n: 'Giro temporal médio', r: 'Sub-região temporal média', t: ['Pulv', 'MD'],
   c: 'Sobreposição segundo P71 (p. 146). Recebe de núcleos talâmicos sem comunicação direta com a periferia (HCF, p. 129).',
   f: 'Sobreposição entre os analisadores auditivo e visual, mantendo ligações com o límbico, o hipocampo e a amígdala, relacionados ao tônus e ao afeto.',
   k: 'Hemisfério esquerdo: afasia acústico-mnésica, com perda da retenção de séries audioverbais sem perda da audição fonêmica (HCF II.2E, p. 128).' },
 4: { n: 'Giro pré-central (M1)', r: 'Região pré-central · campo motor', t: ['VL'],
   c: 'Agranular: não há IV identificável, e as células gigantes de Betz em V dão as fibras mais grossas do trato piramidal. As fibras aferentes de projeção conectam-se sobretudo aos piramidais eferentes de V, o que favorece o “rebote” rápido para a periferia motora (HCF, p. 52).',
   f: 'Representação extremamente diferenciada de grupos musculares isolados. A somatotopia é dinâmica.',
   k: 'Paresias contralaterais segundo a somatotopia.' },
 6: { n: 'Córtex pré-motor e área motora suplementar', r: 'Região pré-central · campos pré-motores', t: ['VL', 'VA'],
   c: 'Sem células de Betz. Grandes piramidais em III (sobretudo III₃). Agranular. Origem de projeções extrapiramidais que alcançam os centros motores por relés subcorticais (HCF, p. 53).',
   f: 'Execução e automatização de movimentos complexos que se desenrolam no tempo: as “melodias cinéticas”. No segmento posterior do giro frontal médio, junto à mão, ficam a programação de séries motoras e os hábitos motores (HCF, p. 60).',
   k: 'Desintegração das melodias cinéticas e perseverações elementares (HCF II.4E, p. 215).' },
 8: { n: 'Campo oculomotor frontal', r: 'Região pré-central · transição para a frontal', t: ['VA', 'MD'],
   c: 'Secundário do campo motor, mas com sinais de transição citoarquitetônica para o córtex frontal propriamente dito. Origem de um sistema extrapiramidal (HCF, p. 53).',
   f: 'Movimentos oculares coordenados durante a fixação da atenção e a manipulação de objetos sob controle visual. Tem conexões específicas com as áreas ópticas (HCF, p. 260).',
   k: 'Distúrbios dos movimentos oculares ativos e da exploração visual (HCF II.4E).' },
 44: { n: 'Pars opercularis (Broca)', r: 'Setor inferior pré-motor · motor-verbal', t: ['VL', 'VA'],
   c: 'Disgranular, na transição pré-motor/pré-frontal. Na Fig. 46 de Poliakov, é um setor motor-verbal marcado por símbolos modificados da zona motora.',
   f: 'Síntese dos sons isolados da fala em unidades sucessivas complexas (HCF, p. 60).',
   k: 'Afasia motora eferente (cinética): desintegração das transições entre articulemas e perseverações na fala (HCF II.4F, p. 226).' },
 45: { n: 'Pars triangularis (Broca)', r: 'Setor inferior pré-motor/frontal · motor-verbal', t: ['MD', 'VA'],
   c: 'Granularidade incipiente, transição para o pré-frontal. Poliakov o põe com o 44 no setor motor-verbal. Luria o lista entre os campos pré-frontais ligados a 22, 37 e 39 (HCF, p. 260).',
   f: 'Organização sintagmática da fala e passagem do plano do enunciado ao esquema linear da frase.',
   k: 'Com o córtex pré-frontal adjacente: afasia dinâmica (frontal), com perda da iniciativa e do esquema linear do enunciado (HCF II.4G, p. 237).' },
 9: { n: 'Pré-frontal dorsolateral', r: 'Região frontal propriamente dita', t: ['MD'],
   c: 'Sem células de Betz. As camadas II e III (associativas) são muito desenvolvidas, com neurônios mais finos que no campo 6. IV mais nítida que no córtex motor, o que sugere aferência talâmica compacta (HCF, p. 55, 258). As camadas associativas são as primeiras a atrofiar na doença de Pick.',
   f: 'Formação de intenções, planos e programas, regulação e verificação. Para Poliakov, o aparelho da “direção” voluntária. Recebe aferências de quase todas as partes do córtex posterior e as transmite, já selecionadas, ao sistema motor (HCF, p. 260).',
   k: 'Síndrome frontal: o programa é substituído por estereótipos e respostas ecopráxicas, e há falta de verificação dos resultados (HCF II.5D, p. 285; II.5G, p. 345).' },
 10: { n: 'Frontopolar', r: 'Região frontal propriamente dita', t: ['MD'],
   c: 'Terciário frontal, um dos campos mais novos da filogênese. Granular, com camadas superiores amplas.',
   f: 'Programas de comportamento de ordem mais elevada. Conexões aferentes e eferentes com 22, 37 e 39, o sistema das zonas de fala (HCF, p. 260).',
   k: 'Variantes da síndrome frontal: desorganização da atividade intelectual dirigida (HCF II.5G).' },
 46: { n: 'Pré-frontal dorsolateral (giro frontal médio)', r: 'Região frontal propriamente dita', t: ['MD'],
   c: 'Terciário frontal. A camada III cresce de forma acentuada na ontogênese pós-natal (HCF, Fig. 19).',
   f: 'Conectado a 22, 37 e 39 (HCF, p. 260): integra a informação analisada nas zonas posteriores à programação da ação.',
   k: 'Síndrome frontal, com distúrbios da regulação verbal do comportamento.' },
 11: { n: 'Córtex orbitofrontal', r: 'Superfície basal do lobo frontal', t: ['MD'],
   c: 'Campo neocortical ligado funcionalmente às regiões marginais (P71, p. 143; HCF, p. 64).',
   f: 'Estreita relação com o límbico e o hipotálamo. Regulação de estados de atividade e de afeto.',
   k: 'Variante basal (orbital) da síndrome frontal: desinibição, impulsividade, alterações afetivas (HCF II.5C, p. 263; II.5H, p. 360).' },
 47: { n: 'Pars orbitalis', r: 'Superfície basal do lobo frontal', t: ['MD'],
   c: 'Neocórtex basal relacionado às regiões marginais (P71, p. 143).',
   f: 'Interface entre a região frontal e os sistemas límbicos e de estado.',
   k: 'Participa das variantes mediobasais da síndrome frontal.' },
 13: { n: 'Ínsula', r: 'Região insular', t: ['VPM', 'Mid'],
   c: 'Região marginal do neocórtex. Agranular na porção anterior, disgranular e granular na posterior.',
   f: 'Gustação e representação visceral (Penfield e Jasper, in HCF, p. 66).',
   k: 'Distúrbios viscerais e gustativos.' },
 20: { n: 'Giro temporal inferior', r: 'Sub-região temporal basal', t: ['Pulv'],
   c: 'Neocórtex basal que Poliakov associa funcionalmente às regiões marginais (P71, p. 143).',
   f: 'Luria o descreve como sem relação com a análise auditiva (HCF, p. 107). Pesquisas posteriores o situam na via visual ventral, a do reconhecimento de objetos.',
   k: 'Hoje associado a distúrbios do reconhecimento visual de objetos.' },
 38: { n: 'Polo temporal', r: 'Polo temporal', t: ['MD'],
   c: 'Disgranular, transição para o límbico.',
   f: 'Estrutura especializada do polo, ligada à amígdala e ao córtex orbitário (HCF, p. 107).',
   k: '—' }
};
const LIM = {
 23: ['Cíngulo posterior (ventral)', 'Região límbica'], 24: ['Cíngulo anterior (ventral)', 'Região límbica'],
 25: ['Área subgenual', 'Região límbica'], 31: ['Cíngulo posterior (dorsal)', 'Região límbica'],
 32: ['Cíngulo anterior (dorsal, pré-genual)', 'Região límbica'], 33: ['Área pré-genual (junto ao corpo caloso)', 'Região límbica'],
 27: ['Pré-subículo', 'Formação hipocampal (córtex intermediário)'], 28: ['Córtex entorrinal', 'Região parahipocampal'],
 29: ['Retroesplenial granular', 'Região límbica'], 30: ['Retroesplenial agranular', 'Região límbica'],
 34: ['Entorrinal anterior (uncus)', 'Região parahipocampal'], 35: ['Perirrinal', 'Região parahipocampal'],
 36: ['Ectorrinal / parahipocampal', 'Região parahipocampal']
};
const LTH = { 23: ['AN', 'LD'], 24: ['AN', 'MD'], 25: ['Mid', 'MD'], 31: ['LD'], 32: ['MD', 'AN'], 33: ['AN'], 27: ['AN'], 28: ['Mid'], 29: ['AN', 'LD'], 30: ['AN', 'LD'], 34: ['Mid'], 35: ['Mid'], 36: ['Pulv', 'Mid'] };
for (const b in LIM) AR[b] = { n: LIM[b][0], r: LIM[b][1], t: LTH[b],
  c: 'Córtex de transição (proisocórtex ou periarquicórtex), com laminação menos nítida que no isocórtex.',
  f: 'Faz parte do “cérebro visceral”: estados, reforço, integração vegetativa e memória (formações parahipocampais).',
  k: 'Distúrbios modalmente inespecíficos de memória e de estado em lesões mediais (HCF II.2G, p. 140).' };
for (const z in ZL) for (const b of ZL[z]) AR[b].z = z;
for (const a in AL) for (const b of AL[a]) { AR[b].a = a; AR[b].u = UNA[a]; }
/* Leitura funcional de Luria (revisão técnica de H. Soto Hernández): onde difere da de Poliakov,
   a unidade e o grupo de campos seguem Luria; a zona de Poliakov continua no modo “Zonas de Poliakov”. */
const LURIA_Z = {
  20: { z: 'S', u: 2, n: 'Na leitura funcional de Luria, o giro temporal inferior é campo secundário da 2ª unidade: zona de associação modal visual, ligada ao fator óptico-mnéstico (com o 37). Poliakov o agrupa com as regiões marginais (P71, p. 143).' },
  21: { z: 'S', u: 2, n: 'Na leitura funcional de Luria, o giro temporal médio é campo secundário da 2ª unidade: zona de associação modal auditiva, sede do fator acústico-mnéstico (HCF II.2E). Poliakov o põe entre as zonas de sobreposição (P71, p. 146).' },
  47: { z: 'T', u: 3, n: 'Por analogia com a área 11: a pars orbitalis é a porção orbital do giro frontal inferior, e a lesão das zonas orbitárias, em Luria, dá desinibição e alterações afetivas, não queda de tônus (FN, p. 193–194). O mapa a trata, como a 11, como terciário da 3ª unidade em conexão com a 1ª, no fator de programação, regulação e controle. Luria, porém, não a lista nominalmente entre os terciários pré-frontais (9, 10, 11, 46; Luria, 1975–1979, p. 110). Poliakov a agrupa com as regiões marginais (P71, p. 143).' },
  11: { z: 'T', u: 3, n: 'Na leitura funcional de Luria, o córtex orbitofrontal é campo terciário da 3ª unidade, em estreita conexão com a 1ª, e entra no fator de programação, regulação e controle pela parte de regulação (inibição e modulação da ativação e do afeto; lesão: desinibição, FN, p. 193–194): Luria o inclui, com 9, 10 e 46, nas áreas terciárias pré-frontais (Luria, 1975–1979, p. 110), e as porções mediais e basais dos lobos frontais são as de ligação mais forte com a formação reticular (p. 111; FN, p. 65). Poliakov o agrupa com as regiões marginais (P71, p. 143).' } };
for (const b in AR) AR[b].zl = AR[b].z;
for (const b in LURIA_Z) Object.assign(AR[b], { zl: LURIA_Z[b].z, u: LURIA_Z[b].u, lnota: LURIA_Z[b].n });
/* ---------- encéfalo inteiro: mecanismos reflexos de Poliakov (P71, caps. I–II) ---------- */
const MEC = {
  coord: { nome: 'Mecanismo de coordenação', fun: 'auto-regulação', cor: '#6f7f3a',
    d: 'Ocupa a porção central de todo o eixo do SNC (medula e tronco). As conexões entre receptor, neurônio e efetor são relativamente imediatas: há “apenas os elementos necessários para um reflexo coordenado, e não mais”. É formado por neurônios motores e internunciais reticulares. Reúne os reflexos segmentares e vegetativos (centros respiratório e vasomotor) e se estende, pela substância cinzenta central, até o hipotálamo (P71, p. 15–17, 41–47).' },
  acoord: { nome: 'Mecanismo analisador-coordenador', fun: 'auto-controle', cor: '#14897a',
    d: 'Formações analisadoras do eixo que recobrem diretamente o mecanismo de coordenação: colículos (os “lobos ópticos” dos vertebrados inferiores), cerebelo, núcleos vestibulares e outros que distribuem o tônus muscular, e a substância gelatinosa da medula. Responde pelos reflexos de orientação e de ajuste dos próprios analisadores, pelos reflexos estáticos e locomotores e pelo equilíbrio. Funciona como “supervisor” do mecanismo de coordenação (P71, p. 23, 47–54).' },
  auto: { nome: 'Formações supra-axiais antigas', fun: 'auto-direção', cor: '#8a7aa0',
    d: 'Paleocórtex, arquicórtex (hipocampo) e córtex intermediário, junto com as partes contínuas dos gânglios subcorticais e do diencéfalo: amígdala, núcleos antigos do tálamo e núcleos hipotalâmicos. Nos mamíferos, incluem-se até certo ponto as regiões marginais e mediobasais do neocórtex. É o substrato das cadeias de reações inatas, instintivas, que no homem são “em alto grau involuntárias” (P71, p. 80–81).' },
  sub: { nome: 'Subcórtex superior dos sistemas analisadores', fun: 'a serviço da direção', cor: '#d4881a',
    d: 'Tálamo e corpos geniculados, na transição entre as partes axial e supra-axial, e os núcleos subcorticais dos hemisférios (P71, p. 55). Os núcleos de relé projetam-se nos campos centrais; os associativos, nos periféricos e nas zonas de sobreposição. A parte filogeneticamente jovem dos gânglios subcorticais (o estriado) tem estrutura neuronal semelhante à do córtex (P71, p. 135).' },
  neo: { nome: 'Neocórtex: extremidades superiores dos analisadores', fun: 'direção (voluntária e automatizada)', cor: '#b3121d',
    d: 'Formações do neocórtex plenamente desenvolvido. Nelas se elaboram, na vida individual, as coordenações “artificiais”: hábitos, habilidades e conhecimentos (P71, p. 54). A região frontal é a base dos “organizadores superiores do comportamento” (P71, p. 90). Regulação e controle têm, para Poliakov, significado auxiliar em relação à auto-direção e à direção (P71, p. 160–161).' }
};
const GR = {
  tronco: 'Tronco encefálico', reticular: 'Formação reticular (esquema)', cerebelo: 'Cerebelo', talamo: 'Tálamo',
  dienc: 'Hipotálamo e núcleos mesencefálicos', nb: 'Núcleos da base', limb: 'Hipocampo e amígdala', comiss: 'Corpo caloso e comissuras', vent: 'Ventrículos'
};
const THU = { CGL: 2, CGM: 2, VPL: 2, VPM: 2, Pulv: 2, LP: 2, VL: 3, VA: 3, MD: 3, AN: 1, Mid: 1, LD: 1 };
const DS = {
  mesencefalo: { n: 'Mesencéfalo', grp: 'tronco', mech: 'coord', u: 1, cor: '#b5a58a', areas: [],
    d: 'Contém o teto (colículos superiores e inferiores), que Poliakov põe no mecanismo analisador-coordenador: os lobos ópticos dos vertebrados inferiores e das aves correspondem aos colículos anteriores dos mamíferos (P71, p. 48). Contém também a substância cinzenta periaquedutal, de neurônios tipo reticular, que pertence ao mecanismo de coordenação como representação das auto-regulações vegetativas (P71, p. 46–47). Além disso, o núcleo rubro, a substância negra e os núcleos motores III e IV.',
    k: 'Luria: lesões da parte superior do tronco produzem inatividade primária, sonolência e estados oniroides. Essa inatividade não depende da dificuldade da tarefa, ao contrário da inatividade “frontal”, que aparece quando é preciso formar um plano (HCF II.6, p. 369–370).' },
  ponte: { n: 'Ponte', grp: 'tronco', mech: 'coord', u: 1, cor: '#a8987c', areas: [],
    d: 'Formação reticular e núcleos dos nervos V a VIII. Os núcleos pontinos são o relé das vias extrapiramidais que vão do neocórtex ao córtex cerebelar (Fig. 26), por isso essa porção pertence ao circuito analisador-coordenador. Os núcleos vestibulares, que distribuem o tônus nas diversas posturas, também fazem parte dele (P71, p. 48, 90).',
    k: 'Lesões tegmentares altas reduzem o tônus cortical (1ª unidade).' },
  bulbo: { n: 'Bulbo (medula oblonga)', grp: 'tronco', mech: 'coord', u: 1, cor: '#9a8b70', areas: [],
    d: 'Centros respiratório e vasomotor na formação reticular, representação central de auto-regulações vegetativas (Fig. 17; P71, p. 44–45). Núcleos dos nervos IX a XII. Oliva inferior, ligada ao cerebelo. Em peixes de fundo, os lobos gustativos do bulbo atingem tamanho imenso, têm estrutura de tipo cortical e são uma das divisões mais importantes do mecanismo analisador-coordenador (P71, p. 49, Plate I).',
    k: 'Funções vitais: lesões graves comprometem a respiração e a circulação.' },
  reticular: { n: 'Formação reticular', grp: 'reticular', mech: 'coord', u: 1, cor: '#5f6f2c', areas: [], esq: true,
    d: 'Neurônios internunciais do eixo, de dendritos longos e pouco ramificados, que unem os arcos segmentares. São o núcleo do mecanismo de coordenação e distribuem os impulsos aferentes para o cerebelo, o bulbo e o tálamo. Estende-se ao hipotálamo e à substância cinzenta central (Zhukova e Leontovich). A influência ascendente forma o sistema ativador difuso, inespecífico (Fig. 17; P71, p. 41–47). A via da sensibilidade protopática segue por setores da formação reticular até os núcleos antigos do tálamo e daí ao córtex límbico e mediobasal (P71, p. 58–59).',
    k: 'Para Luria, é a 1ª unidade por excelência: o trabalho do córtex depende dos impulsos que chegam do tronco pela formação reticular e modulam seu tônus (Moruzzi e Magoun) (HCF II.6, p. 366). Volume desenhado de modo esquemático: núcleo dorsal e profundo do tegmento, não um rótulo de atlas.' },
  cerebelo: { n: 'Cerebelo (hemisférios)', grp: 'cerebelo', mech: 'acoord', u: 0, cor: '#c9a46b', areas: [4, 6],
    d: 'É a formação mais desenvolvida do mecanismo analisador-coordenador nos vertebrados superiores. Pela organização neuronal, seu córtex pode ser considerado o protótipo do córtex cerebral, mas é uniforme, homogêneo, “monótono” em toda a extensão, sem regiões nem campos. Isso porque trabalha “num só plano”, analisando um único complexo geral de estímulos, e sua rede de conexões ficou pouco diferenciada (Fig. 48B; P71, p. 152–153). O circuito: aferências espinocerebelares e vestibulares chegam aos grânulos, cujas fibras paralelas contatam as células de Purkinje; estas projetam aos núcleos profundos e daí aos centros motores (Fig. 23).',
    k: 'Função: auto-controle (equilíbrio, tônus, coordenação estática e locomotora). No homem, as conexões frontocerebelares são especialmente desenvolvidas por causa da postura ereta (HCF, p. 55). Luria não inclui o cerebelo explicitamente nas três unidades. Liga-se à 3ª pelas vias fronto-ponto-cerebelares e, pelo VL, ao campo motor.' },
  vermis: { n: 'Vermis cerebelar', grp: 'cerebelo', mech: 'acoord', u: 0, cor: '#b8925a', areas: [],
    d: 'Porção mediana, ligada às vias vestibulares e espinocerebelares: tônus e equilíbrio do tronco, postura (P71, p. 48, Fig. 23).',
    k: 'Ataxia de tronco e da marcha.' },
  denteado: { n: 'Núcleo denteado', grp: 'cerebelo', mech: 'acoord', u: 0, cor: '#8f6a35', areas: [4, 6],
    d: 'Principal núcleo de saída dos hemisférios cerebelares. Projeta, pelo núcleo rubro e pelo tálamo (VL), ao córtex motor e pré-motor. É um elo da retroaferência que serve à verificação do movimento (HCF, p. 54–55, Fig. 13–14).',
    k: 'Dismetria, tremor de intenção.' },
  rubro: { n: 'Núcleo rubro', grp: 'dienc', mech: 'acoord', u: 3, cor: '#c0392b', areas: [4, 6],
    d: 'Relé das vias cerebelo → núcleo rubro → tálamo → córtex, que levam ao campo motor as aferências de retroação dos circuitos extrapiramidais (HCF, p. 54–55).',
    k: 'Tremor e distúrbios da coordenação.' },
  nigra: { n: 'Substância negra', grp: 'dienc', mech: 'sub', u: 3, cor: '#3b3b3b', areas: [6, 8], aprox: true,
    d: 'Parte dos sistemas extrapiramidais (na Fig. 13 do HCF, a conexão córtex → substância negra). A classificação no mecanismo é aproximada: Poliakov não a enquadra explicitamente.',
    k: 'Parkinsonismo: acinesia e rigidez.' },
  subtalamico: { n: 'Núcleo subtalâmico', grp: 'dienc', mech: 'sub', u: 3, cor: '#6d5a7a', areas: [6], aprox: true,
    d: 'Elo dos circuitos córtex → gânglios da base → tálamo → córtex. Enquadramento aproximado.',
    k: 'Hemibalismo.' },
  hipotalamo: { n: 'Hipotálamo', grp: 'dienc', mech: 'auto', u: 1, cor: '#d07fa0', areas: [25, 24, 11],
    d: 'Ocupa uma posição dupla em Poliakov. A formação reticular se estende até a região hipotalâmica, cujos núcleos, de neurônios tipo reticular, regulam processos tróficos, metabólicos e plásticos: nisso pertencem ao mecanismo de coordenação (P71, p. 44–47). Os núcleos hipotalâmicos também integram o substrato da auto-direção (P71, p. 81). É o centro dos sistemas autonômico e endócrino e está ligado ao límbico e ao orbitofrontal (HCF, p. 66).',
    k: 'Luria: tumores do 3º ventrículo que atingem o hipotálamo rebaixam o tônus cortical e produzem estados oniroides, desorientação e confabulação, com as funções corticais formais preservadas. Dão também memória modalmente inespecífica: traços instáveis, inibidos por interferência (HCF II.6, p. 367–369).' },
  mamilar: { n: 'Corpos mamilares', grp: 'dienc', mech: 'auto', u: 1, cor: '#e3a3be', areas: [23, 24],
    d: 'Elo do círculo de Papez: hipocampo → fórnix → corpos mamilares → núcleos anteriores do tálamo → cíngulo.',
    k: 'Lesões do círculo de Papez comprometem a comparação de traços e a memória (HCF, p. 369).' },
  caudado: { n: 'Núcleo caudado', grp: 'nb', mech: 'sub', u: 3, cor: '#5d8fc4', areas: [6, 8, 9, 46],
    d: 'Parte filogeneticamente jovem dos gânglios subcorticais (yg na Fig. 5 de P71), que tem semelhança estrutural com o córtex (P71, p. 135). Integra os circuitos extrapiramidais córtex → gânglios → tálamo → córtex (HCF, p. 54–55). O caudado está ligado sobretudo ao córtex frontal.',
    k: 'Lesões: perseverações, distúrbios da organização dinâmica dos atos.' },
  putamen: { n: 'Putâmen', grp: 'nb', mech: 'sub', u: 3, cor: '#4a7db5', areas: [4, 6],
    d: 'Estriado jovem, como o caudado. Circuitos motores extrapiramidais, ligados à automatização dos movimentos.',
    k: 'Distúrbios do tônus e dos automatismos motores.' },
  palido: { n: 'Globo pálido', grp: 'nb', mech: 'auto', u: 3, cor: '#9cb7d6', areas: [6],
    d: 'Parte filogeneticamente antiga dos gânglios subcorticais (og na Fig. 5 de P71). Nos vertebrados inferiores e nas aves, gânglios subcorticais hipertrofiados formam quase toda a massa dos hemisférios e sustentam a auto-direção (P71, p. 81).',
    k: 'Rigidez, pobreza de movimentos.' },
  accumbens: { n: 'Núcleo accumbens', grp: 'nb', mech: 'auto', u: 1, cor: '#a07cb8', areas: [25, 11],
    d: 'Estriado ventral, contínuo com as formações límbicas. Efeito do reforço sobre o comportamento (HCF, p. 65).',
    k: '—' },
  prosencefalo_basal: { n: 'Prosencéfalo basal', grp: 'nb', mech: 'auto', u: 1, cor: '#b49ac9', areas: [25, 32],
    d: 'Formações antigas da base do cérebro, contíguas ao córtex semi-separado de Filimonov (P71, p. 44). Hoje é descrito como sede do núcleo basal de Meynert, fonte colinérgica do córtex.',
    k: '—' },
  hipocampo: { n: 'Hipocampo', grp: 'limb', mech: 'auto', u: 1, cor: '#7d5ba6', areas: [27, 28, 30, 35, 36],
    d: 'Arquicórtex na classificação de Filimonov, citado nominalmente como substrato da auto-direção (P71, p. 81).',
    k: 'Luria: neurônios da região límbica participam da comparação de traços (Vinogradova). Lesões de hipocampo e hipotálamo produzem memória modalmente inespecífica, com inibição de traços por interferência que, nos casos graves, atinge até frases e narrativas. O paciente mantém a consciência do defeito, ao contrário do frontal (HCF II.6, p. 367–369).' },
  amigdala: { n: 'Amígdala', grp: 'limb', mech: 'auto', u: 1, cor: '#9b4f8f', areas: [38, 28, 34],
    d: 'Corpos amigdaloides, citados por Poliakov entre as formações subcorticais da auto-direção (P71, p. 81). Ligada ao temporal medial e basal, que regula o tônus e o afeto (HCF, p. 129).',
    k: 'Alterações afetivas e do comportamento emocional (Pribram, in P71, p. 81).' },
  ventriculo: { n: 'Ventrículo lateral', grp: 'vent', mech: null, u: null, cor: '#7ec8e3', areas: [],
    d: 'Referência anatômica.', k: '—' },
  ventriculo_3: { n: '3º ventrículo', grp: 'vent', mech: null, u: null, cor: '#6bbad8', areas: [],
    d: 'Referência anatômica. É cercado pelo hipotálamo e pela substância cinzenta central, que Poliakov atribui ao mecanismo de coordenação (P71, p. 46).', k: 'Tumores do 3º ventrículo: síndrome profunda de Luria (HCF II.6).' },
  ventriculo_4: { n: '4º ventrículo', grp: 'vent', mech: null, u: null, cor: '#6bbad8', areas: [],
    d: 'Referência anatômica. A substância cinzenta que reveste o 4º ventrículo e o aqueduto, e continua nos núcleos hipotalâmicos, pertence ao mecanismo de coordenação (P71, p. 46).', k: '—' }
};
DS.cc_ant = { n: 'Corpo caloso: joelho e rostro (anterior)', grp: 'comiss', mech: null, u: null, cor: '#e9d9b0', areas: [9, 10, 46, 6, 8],
  d: 'Une os setores simétricos do córtex frontal dos dois hemisférios (Khomskaya, p. 62). As fibras calosas unem todas as áreas homotípicas, exceto as primárias de projeção.',
  k: 'Secção da porção anterior: a perturbação da comunicação inter-hemisférica aparece sobretudo na esfera motora (Khomskaya, p. 298).' };
DS.cc_med = { n: 'Corpo caloso: tronco (médio)', grp: 'comiss', mech: null, u: null, cor: '#e2cf9c', areas: [1, 2, 5, 7, 40, 22],
  d: 'Une os setores simétricos das circunvoluções centrais e dos lobos parietal e temporal (Khomskaya, p. 62).',
  k: 'Secção da porção média: perturbação sobretudo tátil. Anomia tátil (não nomeia pelo tato com a mão esquerda o que nomeia vendo ou pela mão direita) e dificuldade de passar uma postura de uma mão para a outra (Khomskaya, p. 298).' };
DS.cc_post = { n: 'Corpo caloso: esplênio (posterior)', grp: 'comiss', mech: null, u: null, cor: '#d8c389', areas: [18, 19, 39, 7],
  d: 'Une o córtex occipital e parietal posterior dos dois hemisférios (Khomskaya, p. 62).',
  k: 'Secção posterior: perturbação sobretudo visual. Somada a uma hemianopsia direita, dá anomia visual. Aparece também discopia–disgrafia: escreve só com a direita e desenha só com a esquerda (Khomskaya, p. 298). É o quadro da paciente de Simernitskaya no HCF, que não lia “norte” mas dizia “algo frio” (p. 381).' };
DS.comissura_ant = { n: 'Comissura anterior', grp: 'comiss', mech: null, u: null, cor: '#cdb77a', areas: [38, 20, 11],
  d: 'Une os setores mediais anteriores do córtex temporal e o córtex frontal supra-rostral dos dois hemisférios (Khomskaya, p. 62). A comissura do fórnix (hipocampal) une as formações hipocampais e não aparece no mapa.',
  k: '—' };
const MIDLINE = ['mesencefalo', 'ponte', 'bulbo', 'reticular', 'vermis', 'ventriculo_3', 'ventriculo_4', 'cc_ant', 'cc_med', 'cc_post', 'comissura_ant'];

/* ---------- fatores neuropsicológicos: tipologia de Khomskaya (2003, cap. 20, p. 268–273) ---------- */
const FAT = {
  ativ: { def: "O nível de ativação que dá à atividade cortical força, estabilidade e seletividade. Tem duas formas: tônica, geral e duradoura (a vigília), e fásica, local e seletiva (a reação de orientação). É o fator da 1ª unidade de Luria e não depende da modalidade.", exame: "Observar a fadigabilidade e as oscilações ao longo do exame; tarefas de duração (subtração serial, contagem regressiva); comparar o rendimento no começo e no fim; ver se motivação ou fala em voz alta compensam (HCF II.6; Khomskaya, p. 194).", g: 2, nome: 'Nível de ativação cortical (ativação/inativação)', ru: 'фактор активации / инактивации', cor: '#8a7aa0', u: 1,
    areas: [24, 25, 32, 23, 31, 33, 13, 38, 27, 28, 29, 30, 34, 35, 36], pt: [24, 25, 32], deep: ['reticular', 'mesencefalo', 'ponte', 'bulbo', 'hipotalamo', 'th_Mid', 'th_AN', 'th_LD', 'mamilar', 'hipocampo', 'amigdala', 'accumbens', 'prosencefalo_basal'], nodes: [],
    sub: 'Sistema não específico em quatro níveis: tronco, diencéfalo, límbico e córtex ínfero-medial frontal e temporal. Os níveis baixos sustentam a ativação tônica, generalizada; os altos, a ativação fásica e seletiva. O córtex ínfero-medial frontal regula a ativação seletiva pela fala (Khomskaya, p. 45–46). No mapa, a cor da ativação cobre toda a 1ª unidade, córtex e estruturas profundas: para Luria, ela é um sistema não específico, que ele às vezes trata como um fator só, e as diferenças internas (níveis, memória modalmente inespecífica) ficam nas fichas. No córtex, a queda de tônus propriamente dita aparece nas lesões mediais (24, 25, 32); ínsula, cíngulo posterior, polo temporal e região para-hipocampal entram pelo pertencimento à unidade. O córtex orbital (11) é o nível que regula a ativação: por fibras descendentes ao tálamo e ao tronco, recruta e modula a formação reticular (FN, p. 41, 66); por isso foi posto no fator de programação, regulação e controle.',
    sind: 'Adinamia, flutuação do tônus, fadigabilidade, oscilações de produtividade, defeitos de atenção modalmente inespecíficos. Nas lesões do tronco alto, inatividade primária, que não depende da dificuldade da tarefa (HCF II.6, p. 366–370). A síndrome muda conforme o nível lesado (Khomskaya, p. 291–296).',
    sist: 'Todos os sistemas funcionais, de modo modalmente inespecífico. Afeta primeiro as formas de atividade mais complexas (HCF, p. 84).' },
  mem: { overlay: true, def: "Estabilidade dos traços de qualquer modalidade frente à interferência: imprimir, conservar e evocar, seja o material visual, auditivo ou motor. Por isso o defeito atinge todas as modalidades por igual, ao contrário dos fatores mnésticos específicos. Em Luria, é antes uma função da 1ª unidade, isto é, da ativação: a manutenção do tônus cortical é a condição fundamental para imprimir traços, e sua queda é o principal fator que perturba a memória geral, involuntária e modalmente inespecífica (FN, p. 252–253). Khomskaya a separa como fator próprio do grupo 2. No mapa, por isso, não tem cor própria: suas áreas e estruturas aparecem com a cor da ativação, e se acendem ao clicar neste fator.", exame: "Memorizar palavras, figuras ou movimentos e reproduzi-los após uma pausa vazia e após interferência homogênea (outra série) ou heterogênea (outra atividade); curva de aprendizagem; reter frases e histórias (HCF III.7B–D).", g: 2, nome: 'Memória modalmente inespecífica', ru: 'модально-неспецифическая память', cor: '#a9729c', u: 1,
    areas: [27, 28, 29, 30, 35, 36], deep: ['hipocampo', 'mamilar', 'th_AN'], nodes: [],
    sub: 'Hipocampo e círculo de Papez (fórnix, corpos mamilares, núcleos anteriores do tálamo, cíngulo).',
    sind: 'Traços instáveis, inibidos por interferência em qualquer modalidade, sobretudo na memória de curto prazo. Nos casos graves, até frases e narrativas. O paciente mantém a consciência do defeito (HCF II.6, p. 367–369). Lesões bilaterais do hipocampo chegam à síndrome de Korsakov. No nível cortical ínfero-medial frontal, o defeito passa a atingir a seletividade semântica, com contaminações e confabulações (Khomskaya, p. 294–296).',
    sist: 'Memória e aprendizagem em todas as modalidades. Contamina secundariamente a atividade intelectual.' },
  vis: { def: "Análise e síntese dos traços visuais num objeto reconhecível: reunir contorno, detalhes e textura numa imagem com significado. Não se confunde com a acuidade nem com o campo visual, que dependem do campo primário 17: é a integração dos traços, formada na experiência com os objetos.", exame: "Reconhecer objetos reais, desenhos realistas, silhuetas, figuras sobrepostas (Poppelreuter) e figuras incompletas ou com ruído; perceber várias figuras ao mesmo tempo (HCF III.6B).", g: 1, nome: 'Gnose visual de objetos', ru: 'зрительный (предметный) гнозис', cor: '#1d5fb8', u: 2,
    areas: [18, 19], deep: [], nodes: ['O2'],
    sub: 'Campos secundários occipitais 18 e 19 (O₂).',
    sind: 'Agnosia visual de objetos (O₂L). Em lesões occipitoparietais bilaterais, simultanagnosia: estreitamento do campo de percepção simultânea (HCF II.3C, p. 157).',
    sist: 'Reconhecimento de objetos e imagens, desenho de memória, leitura (alexia óptica literal).' },
  om: { def: "Ligação estável entre a imagem visual de um objeto e a palavra que o designa, nos dois sentidos: evocar o nome a partir da imagem e a imagem a partir do nome. Fica na transição entre os analisadores visual e auditivo.", exame: "Nomear objetos e desenhos; desenhar de memória um objeto nomeado (“desenhe um elefante”); reter séries de figuras; ver se a primeira sílaba dada como pista ajuda a achar o nome (HCF III.6B; III.9D).", g: 1, nome: 'Memória visual e visual-verbal (fator óptico-mnéstico)', ru: 'оптико-мнестический фактор', cor: '#3f8ccf', u: 2,
    areas: [37, 20], deep: ['th_Pulv'], nodes: ['OT3'],
    sub: 'Córtex occipitotemporal associativo (OT₃), na transição entre os analisadores visual e auditivo.',
    sind: 'Dificuldade de evocar o nome dos objetos e de evocar suas imagens visuais. Goldberg: o OT₃L (temporal médio posterior, junto à junção temporo-occipital) dá afasia anômica e “extinção do significado da palavra”, a incapacidade de desenhar de memória um objeto que o paciente nomeia. A afasia de Wernicke fica na junção T₂/OT₃ (Goldberg, p. 250–251).',
    sist: 'Nomeação, evocação de representações visuais, desenho por representação.' },
  fon: { def: "Discriminação dos traços sonoros que distinguem significados na língua, como sonoro × surdo (b/p, d/t) ou o ponto de articulação. Não é a acuidade auditiva, que depende do campo primário 41: é a categorização dos sons da fala pelo sistema fonológico da língua materna.", exame: "Repetir e diferenciar pares de sílabas opostas (ba–pa, da–ta); levantar a mão para um som e não para o outro; mostrar objetos cujos nomes diferem num só fonema; escrever sob ditado (HCF III.8B; III.10B).", g: 1, nome: 'Audição (gnose) fonêmica ou ouvido fonemático', ru: 'фонематический слух', cor: '#14897a', u: 2,
    areas: [22, 42], deep: ['th_CGM'], nodes: ['T2'],
    sub: 'Campos secundários auditivos do hemisfério esquerdo: 22 (terço posterior) e 42 (T₂L).',
    sind: 'Afasia sensorial (acústico-gnóstica): perda da diferenciação de fonemas próximos e alienação do sentido das palavras (HCF II.2D, p. 117). Goldberg: T₂L dá agnosia acústica e agnosia auditiva associativa semântica. À direita, a lesão temporal perturba a audição não verbal e musical (agnosia auditiva, amusia), os ritmos e a prosódia da fala (Khomskaya, p. 281–282).',
    sist: 'Compreensão oral, repetição, escrita sob ditado, nomeação. É um exemplo clássico de um fator comprometendo vários sistemas ao mesmo tempo.' },
  am: { def: "Retenção dos traços audioverbais: manter na memória imediata uma série de palavras ouvidas, na ordem certa, apesar da interferência entre elas. A percepção fonêmica fica intacta; o que falha é a estabilidade do traço.", exame: "Repetir séries de 3–4 palavras ou dígitos, logo e após pausa ou interferência; reter dois grupos de palavras; repetir frases longas; mostrar objetos numa ordem ditada (HCF III.7B–D; III.8C).", g: 1, nome: 'Memória audioverbal (fator acústico-mnéstico)', ru: 'акустико-мнестический фактор', cor: '#4fae9f', u: 2,
    areas: [21], deep: [], nodes: ['OT3'],
    sub: 'Giro temporal médio (21), na sobreposição auditivo-visual e ligado ao límbico.',
    sind: 'Afasia acústico-mnéstica: retenção de séries audioverbais reduzida, com a audição fonêmica preservada (HCF II.2E, p. 128). Khomskaya descreve dois mecanismos: inibição retro e proativa dos traços e “equalização da intensidade dos traços”, que baixa a probabilidade de evocar a palavra certa (p. 281).',
    sist: 'Compreensão de enunciados longos, memória verbal imediata, nomeação.' },
  cin: { def: "Aferentação cinestésica, isto é, de retorno, dos movimentos: a informação sobre a posição dos músculos e articulações que permite escolher os impulsos motores certos. Organiza a base de cada postura, tanto da mão quanto do aparelho articulatório.", exame: "Reproduzir posturas dos dedos, com e sem controle visual, e transferi-las de uma mão para a outra; praxias orais (lábios, língua); articular sons próximos (b–m–p); reconhecer objetos pelo tato (HCF III.3B–C; III.5).", g: 1, nome: 'Cinestésico (gnose tátil, somestesia)', ru: 'кинестетический фактор', cor: '#d08a10', u: 2,
    areas: [1, 2, 43, 5], deep: ['th_VPL', 'th_VPM'], nodes: ['P2'],
    sub: 'Campos secundários pós-centrais (1, 2) e opérculo (43). Em Goldberg, P₂ = 5 e 7.',
    sind: 'Apraxia aferente (cinestésica), com perda da seleção dos impulsos motores. Afasia motora aferente (procura dos articulemas). Agnosia tátil (HCF II.3D, p. 168; II.4C–D, p. 202–207). Goldberg: P₂L dá agnosia tátil.',
    sist: 'Práxis manual e oral, articulação, escrita (substituições de sons articulatoriamente próximos), estereognosia.' },
  esp: { def: "Reunir elementos que chegam em sucessão numa estrutura captada de uma vez, simultânea: é a “síntese simultânea” de Luria. Em sentido literal, as relações espaciais (direita/esquerda, acima/abaixo); em sentido quase-espacial, as relações lógico-gramaticais (“o irmão do pai”), as do número (o valor de posição) e as do relógio.", exame: "Orientação no mapa e no relógio; desenhar a planta do quarto; cubos de Kohs; compreender construções lógico-gramaticais (“o círculo sob a cruz”, “o irmão do pai” × “o pai do irmão”); compreender a estrutura do número e fazer contas com transporte (HCF III.6C–D; III.8E; III.11B).", g: 3, nome: 'Síntese simultânea quase-espacial', ru: 'пространственный / квазипространственный фактор', cor: '#6b3fa0', u: 2,
    areas: [39, 40, 7], deep: ['th_Pulv', 'th_LP'], nodes: ['PT3', 'OP3'],
    sub: 'Zonas de sobreposição parietal inferior e temporo-parieto-occipital (39, 40) e parietal superior (7). Khomskaya chama esse fator, ligado à área TPO, de fator “da organização simultânea dos processos psíquicos” (p. 270).',
    sind: 'Apractognosia espacial e construtiva, afasia semântica (relações lógico-gramaticais), acalculia (HCF II.3E–G, p. 171–186). Goldberg: PT₃L dá afasia semântica e acalculia de tipo espacial; OP₃L, apraxia ideatória e apractagnosia espacial. Luria situa a afasia semântica na região parieto-occipital, sem separar angular e supramarginal. A atribuição de Goldberg ao supramarginal é uma previsão do modelo gradiental, não um achado clínico (Goldberg, p. 243–244).',
    sist: 'Orientação espacial, desenho e construção, cálculo, compreensão de construções lógico-gramaticais, relógio e mapas.' },
  kin: { def: "Organização temporal dos movimentos: encadear os atos isolados numa sequência fluida, a “melodia cinética”, desligando cada elo a tempo de passar ao seguinte. Para Khomskaya, é o fator modalmente específico do analisador motor (p. 283).", exame: "Trocar de posição em série (punho–borda–palma); alternância recíproca das mãos; desenhar uma sequência de figuras alternadas; reproduzir ritmos; escrever uma palavra ou uma série de letras (HCF III.3D; III.4C).", g: 1, nome: 'Melodia cinética (fator cinético)', ru: 'кинетический фактор', cor: '#c2410c', u: 3,
    areas: [6, 8, 44], deep: ['caudado', 'putamen'], nodes: ['PM2', 'PM2V', 'A44'],
    sub: 'Campos pré-motores (6, 8) e opérculo frontal (44), com seus circuitos subcorticais. Para Khomskaya, é o fator modalmente específico do analisador motor: a organização temporal dos atos (p. 283).',
    sind: 'Desintegração das melodias cinéticas e perseverações elementares. Afasia motora eferente: transições entre articulemas e entre palavras (HCF II.4E–F, p. 215–237). Goldberg: PM₂ dá apraxias melocinética e cinética dos membros; PM₂L (6 inferior), apraxia da fala, isto é, a afasia eferente. Goldberg separa esse componente cinético do agramatismo do 44.',
    sist: 'Ações motoras em série, fala expressiva, escrita (perseverações de traços e letras), hábitos motores.' },
  prog: { def: "Formular um programa de ação a partir de uma intenção, regular sua execução e comparar o resultado com a intenção. É um fator terciário: integra os demais e se apoia na fala, externa e depois interna, que dá o esquema da ação.", exame: "Reação de escolha por instrução verbal (“uma batida, levante a mão; duas, não”); instruções em conflito com o sinal (“levante o punho quando eu mostrar o dedo”); problemas aritméticos com várias etapas; interpretação de figuras temáticas e provérbios; observar se o paciente verifica o resultado (HCF III.3D; III.12).", g: 3, nome: 'Planejamento, programação, regulação e controle da atividade', ru: 'программирование, регуляция и контроль', cor: '#b3121d', u: 3,
    areas: [9, 10, 46, 45, 47, 11], deep: ['th_MD'], nodes: ['PF3', 'A44', 'A45'],
    sub: 'Região pré-frontal (terciário frontal) e núcleo medial dorsal. O córtex orbital (11) entra pela parte de regulação: inibe e modula a ativação e o afeto, por sua ligação descendente com a formação reticular; sua lesão dá desinibição generalizada, impulsividade e alterações afetivas, com operações intelectuais potencialmente intactas mas fragmentadas (FN, p. 41, 66, 193–194).',
    sind: 'Síndrome frontal: o programa é substituído por estereótipos e respostas ecopráxicas, e falta a verificação. Afasia dinâmica, com perda do esquema linear do enunciado (HCF II.4G, p. 237; II.5, p. 246–365). Goldberg: PF₃ dá síndrome executiva; o 44, agramatismo (quebra da base predicativa); o 45, afasia dinâmica, que é a síndrome executiva restrita à fala.',
    sist: 'Toda atividade voluntária complexa: resolução de problemas, fala narrativa, regulação verbal do comportamento, memorização ativa.' },
  inerc: { pre: "Luria menciona a inércia dos processos de modo vago, e a nomenclatura é das mais amplas e genéricas da literatura. O fator tem caráter circunscrito de localização, mas aqui a localização é difusa (pré-motor, pré-frontal, caudado). Ponto em aberto.", def: "A facilidade com que um processo nervoso dá lugar a outro: passar de um movimento, de uma imagem ou de uma operação mental à seguinte, sem que a anterior persista. Ao contrário do fator cinético, não se restringe à motricidade: vale para todas as funções (Khomskaya, p. 269).", exame: "Trocar de um programa motor para outro; responder a sinais que mudam de valor; passar de uma classificação a outra; desenhar e escrever séries, observando perseverações (HCF III.3D).", g: 2, overlay: true, nome: 'Mobilidade/inércia dos processos nervosos', ru: 'фактор подвижности / инертности', cor: '#9a5b2e', u: 3,
    areas: [6, 8, 9, 46, 10], deep: ['caudado'], nodes: [],
    sub: 'Setores anteriores: pré-motor e pré-frontal. A cabeça do caudado dá perseverações motoras nítidas, e o corpo do caudado, mais fracas (Khomskaya, p. 283, 301–302).',
    sind: 'Perseverações na esfera motora, gnóstica e intelectual. Na lesão pré-motora, Khomskaya distingue o fator motor modalmente específico (organização temporal) deste fator inespecífico, que reduz a mobilidade de todas as funções (p. 269, 283).',
    sist: 'Qualquer sistema que exija passar de um elemento ou programa a outro: série motora, escrita, cálculo em série, raciocínio.' },
  espont: { pre: "A espontaneidade é proposta de Khomskaya, com menção vaga em Luria. Como a mobilidade/inércia, é das nomenclaturas mais amplas e genéricas da literatura; sua localização provável é alguma região pré-frontal. Ponto em aberto.", def: "A capacidade de iniciar a atividade por motivo próprio, sem estímulo externo ou instrução, e de sustentá-la como um todo. Seu polo oposto é a aspontaneidade frontal: a pessoa fica passiva ou age por clichês.", exame: "Observar a conduta na conversa preliminar e em situação livre; narrativa espontânea sobre um tema ou uma figura; tarefas sem instrução detalhada (HCF III.2; III.9E).", g: 2, overlay: true, nome: 'Espontaneidade/aspontaneidade', ru: 'фактор спонтанности / аспонтанности', cor: '#7a6a90', u: 3,
    areas: [11, 47, 24, 32, 10], deep: ['th_MD'], nodes: [],
    sub: 'Córtex pré-frontal, sobretudo nas porções ínfero-mediais, que são o elo cortical do sistema não específico (Khomskaya, p. 285).',
    sind: 'Os atos racionais são substituídos por clichês e estereótipos, com perda da iniciativa do comportamento integral. Khomskaya inclui este fator entre os inespecíficos com um “ao que parece” (p. 269, 285).',
    sist: 'Comportamento dirigido a fins como um todo, iniciativa de fala e de ação.' },
  hemi: { def: "Não é tratado aqui como fator. Luria fala de localização sistêmica dos fatores e de localização inter-hemisférica: os mesmos fatores se distribuem de modo diferente entre os hemisférios, e o fator, por ser circunscrito, é o que orienta a análise sindrômica (defeito primário e consequências sistêmicas). A dominância não vem do cérebro em si: começou com o trabalho e o destaque da mão direita, e é a mão que escreve que acaba lateralizando as funções; por isso o esquerdo é dominante nos destros e a dominância se apaga ou passa ao direito nos canhotos (Luria, 1975–1979, p. 113). Khomskaya trata o hemisfério inteiro como grupo de fatores (estilo abstrato, arbitrário e sucessivo à esquerda; concreto, automatizado e simultâneo à direita) (p. 270–271).", exame: "Comparar o mesmo sistema em material verbal e não verbal (palavras × melodias, letras × rostos); provas de lateralidade (mão, olho, pé; escuta dicótica); observar anosognosia e negligência (Khomskaya, p. 270–271).", g: 4, overlay: true, nome: 'Localização inter-hemisférica', ru: 'полушарные факторы', cor: '#2f6f8f', u: 0,
    areas: [], deep: [], nodes: [],
    sub: 'Cada hemisfério como um todo, e não uma região. São fatores integrativos, que descrevem a estratégia geral de trabalho de cada hemisfério (Khomskaya, p. 270).',
    sind: 'Quatro dicotomias com apoio neuropsicológico (em destros): o esquerdo opera de modo abstrato (lógico-verbal), arbitrário, consciente e sucessivo; o direito, de modo concreto (pictórico-figurativo), não arbitrário ou automatizado, menos consciente e simultâneo. Daí as lesões direitas darem anosognosia e negligência da metade esquerda, e as esquerdas, adinamia e perseverações (p. 270–271). Khomskaya avisa que não há classificação única aceita dessas estratégias e que outras dicotomias (tempo/espaço, análise/síntese, conhecido/desconhecido) não têm confirmação neuropsicológica exata (p. 271).',
    sist: 'Todos os sistemas, cada um com uma contribuição esquerda e outra direita: veja a seção “Os dois hemisférios” em cada sistema funcional.' },
  comm: { def: "A transferência e a coordenação de informação entre os dois hemisférios, pelo corpo caloso e pelas outras comissuras. É o que permite, por exemplo, nomear com o esquerdo o que a mão esquerda toca, informação que chega ao direito, e coordenar movimentos alternados das duas mãos.", exame: "Nomear objetos postos na mão esquerda sem vê-los; transferir posturas de uma mão à outra; desenhar e escrever com cada mão; movimentos recíprocos das duas mãos; apresentação de estímulos visuais a um só hemicampo (Khomskaya, p. 296–299; HCF, p. 381).", g: 5, overlay: true, nome: 'Comunicação inter-hemisférica', ru: 'факторы межполушарного взаимодействия', cor: '#5a8f6a', u: 0,
    areas: [], deep: ['cc_ant', 'cc_med', 'cc_post', 'comissura_ant'], nodes: [],
    sub: 'Corpo caloso e outras comissuras médias. O corpo caloso não é um órgão único: é um sistema diferenciado pelo princípio da especificidade modal (Khomskaya, p. 298–299).',
    sind: 'Na síndrome do “cérebro dividido”: anomia para o que chega ao hemisfério direito, discopia–disgrafia (desenha só com a esquerda, escreve só com a direita) e perturbação dos movimentos recíprocos das duas mãos. Nas secções parciais, o defeito aparece na esfera motora (porção anterior), tátil (média) ou visual (posterior). Os sintomas são dinâmicos e regridem; em crianças de 5 a 15 anos quase não aparecem, porque o corpo caloso amadurece tarde (p. 296–299).',
    sist: 'Coordenação bimanual, nomeação de estímulos do campo esquerdo, escrita e desenho, transferência tátil entre as mãos, escuta dicótica.' },
  geral: { def: "Condições que afetam o cérebro inteiro, não uma região: circulação, pressão do líquor, estado bioquímico. Khomskaya inclui também características do indivíduo, como o tipo de lateralidade, o sexo e a idade, que mudam a forma das síndromes locais.", exame: "Não há prova específica: o neuropsicólogo os infere pela distribuição difusa e flutuante dos sintomas, e os separa dos sintomas regionais na análise sindrômica (Khomskaya, p. 272–273).", g: 7, overlay: true, nome: 'Fatores cerebrais gerais', ru: 'общемозговые факторы', cor: '#8c8c8c', u: 0,
    areas: [], deep: ['ventriculo_3', 'ventriculo_4'], nodes: [],
    sub: 'Circulação sanguínea e liquórica, processos humorais e bioquímicos, e também o tipo de organização inter-hemisférica (destro, canhoto, ambidestro), o sexo e a idade (Khomskaya, p. 272–273).',
    sind: 'Perturbações sobretudo dinâmicas de todas as funções, que se somam às regionais. Na hipertensão liquórica grave pode surgir uma síndrome “frontal” secundária, cuja causa ainda não está clara (p. 272–273).',
    sist: 'Todos, de modo inespecífico. É o fundo contra o qual se lê qualquer síndrome local.' }
};
const FGRP = { 1: ['Fatores modalmente específicos', 'zonas nucleares (secundárias) dos analisadores, inclusive o motor; inclui memórias modais'],
  2: ['Fatores modalmente inespecíficos', 'estruturas médias não específicas'], 3: ['Fatores das áreas terciárias', 'complexos pré-frontal e TPO'],
  4: ['Fatores hemisféricos', 'em Khomskaya, cada hemisfério como um todo; aqui, localização inter-hemisférica (Luria), não fator'], 5: ['Fatores de comunicação inter-hemisférica', 'corpo caloso e comissuras'],
  6: ['Fatores das estruturas subcorticais profundas', 'núcleos da base, tálamo, hipocampo, amígdala, hipotálamo'], 7: ['Fatores cerebrais gerais', 'circulação, liquor, bioquímica, perfil de lateralidade'] };
const ELEM = { nome: 'Campos primários (zonas de projeção)', cor: '#5c5c5c',
  d: 'Lesões dos campos primários produzem déficits sensoriais ou motores elementares (escotomas, hipoestesias, paresias). Ponto em aberto: Luria não os chama de fatores; alguns continuadores, sim, e pelo próprio conceito de fator, o modo de trabalho altamente especializado de uma região, a zona de projeção também poderia ser contemplada como fator. Na prática, o neuropsicólogo é o especialista das zonas de associação; a avaliação fina das vias e zonas de projeção cabe sobretudo a outros profissionais (neurologia, oftalmologia, fonoaudiologia, fisioterapia). Ponto análogo vale para a 1ª unidade: Luria às vezes se refere a ela como um fator único, e não está claro nos textos clássicos se ela comporta vários fatores.' };
const FA = {}; for (const f in FAT) if (!FAT[f].overlay) for (const b of FAT[f].areas) FA[b] = f;
const FD = {}; for (const f in FAT) if (!FAT[f].overlay || f === 'comm') for (const k of FAT[f].deep) FD[k] = f;

/* ---------- gradientes de Goldberg (1990, cap. 12 de Contemporary Neuropsychology and the Legacy of Luria) ---------- */
const GN = {
  O1: { lab: 'O₁', lvl: 1, areas: [17], filt: 'pole', nome: 'Córtex visual primário', ga: '17', gp: 'p. 232',
    fn: 'Projeção estimulotópica (retinotópica), modalmente específica. É um dos três polos que definem os gradientes posteriores e é funcionalmente equivalente nos dois hemisférios.',
    pol: 'Coincide com o campo primário visual de Poliakov.', sind: 'Defeitos elementares de campo visual.', fat: [] },
  T1: { lab: 'T₁', lvl: 1, areas: [41, 42], filt: 'lat', nome: 'Córtex auditivo primário', ga: '41 e 42 (área de Heschl)', gp: 'p. 232',
    fn: 'Projeção tonotópica. É polo dos gradientes occipitotemporal e temporoparietal.',
    pol: 'Divergência: Goldberg inclui o 42 no primário, seguindo Carpenter (1976); Poliakov o põe na periferia secundária da zona nuclear auditiva.', sind: 'Déficits auditivos elementares (representação bilateral).', fat: [] },
  P1: { lab: 'P₁', lvl: 1, areas: [3, 1, 2], filt: 'dors', nome: 'Córtex somatossensorial primário', ga: '3, 1 e 2', gp: 'p. 232',
    fn: 'Projeção somatotópica. É polo dos gradientes occipitoparietal e temporoparietal.',
    pol: 'Divergência: Goldberg toma 3, 1 e 2 juntos como primários. Para Poliakov, só o 3 é central; 1 e 2 são secundários.', sind: 'Hipoestesias elementares.', fat: [] },
  O2: { lab: 'O₂', lvl: 2, areas: [18, 19], filt: 'lat', nome: 'Córtex visual secundário', ga: '19 e, em parte, 18', gp: 'p. 234–235',
    fn: 'Identificação categorial de percepções visuais: reconhecer o objeto como membro de uma categoria genérica. O paciente descreve e copia o objeto, mas não sabe o que ele é. A identificação volta pelo tato, pelo som ou pelo cheiro.',
    pol: 'Coincide com os campos secundários visuais de Poliakov.', sind: 'O₂L: agnosia visual de objetos (associativa), em geral por lesão esquerda.', fat: ['vis'] },
  T2: { lab: 'T₂', lvl: 2, areas: [22], filt: 'post', nome: 'Córtex auditivo secundário', ga: '22, terço posterior do giro temporal superior', gp: 'p. 236–238',
    fn: 'Reconhecimento categorial de padrões auditivos. Um mesmo mecanismo serve à audição fonêmica (classificar alofones em fonemas, segundo os traços distintivos de Jakobson) e à categorização de sons ambientais.',
    pol: 'Coincide com o secundário auditivo. O terço posterior do 22 é o setor auditivo-verbal da Fig. 46 de Poliakov.', sind: 'T₂L: agnosia acústica (o componente fonológico da afasia de Wernicke) e agnosia auditiva semântico-associativa, que Goldberg vê como duas faces de uma mesma falha de categorização auditiva.', fat: ['fon'] },
  P2: { lab: 'P₂', lvl: 2, areas: [5, 7], filt: 'dors', nome: 'Área somatossensorial secundária', ga: '5 e 7, lóbulo parietal superior', gp: 'p. 235–236',
    fn: 'Identificação categorial de percepções táteis e proprioceptivas. O argumento vem da astereognosia pura bilateral por lesão unilateral, sem déficit elementar e sem afasia.',
    pol: 'Ponto mais delicado do esquema. Luria (HCF, p. 168–171) liga a agnosia tátil às “divisões secundárias” do analisador cutâneo-cinestésico sem nomear campos; é Goldberg quem as identifica com 5 e 7. Poliakov, no próprio HCF (p. 50) e em 1971 (p. 146), põe 5 e 7 na zona de sobreposição parietal superior, isto é, nos terciários. Khomskaya mostra que a escola luriana não fechou a questão: no mesmo manual, põe parte do 5 na zona nuclear somatossensorial e o 7 na região parietal superior terciária (p. 47–48), e depois lista 5 e 7 entre os secundários (p. 276).', sind: 'P₂L: agnosia tátil (astereognosia pura).', fat: ['cin'] },
  OT3: { lab: 'OT₃', lvl: 3, areas: [21, 37], filt: 'post', nome: 'Associativo temporo-occipital', ga: 'parte posterior do giro temporal médio, junto à junção temporo-occipital', gp: 'p. 250–251',
    fn: 'Integração auditivo-visual no contexto linguístico: os aspectos das representações linguísticas que denotam o mundo visualmente representado (substantivos concretos e figuráveis).',
    pol: 'Corresponde à sub-região TPO (37) e à porção posterior do temporal médio (21) de Poliakov, ambas zonas de sobreposição. Na leitura luriana, une os fatores acústico-mnéstico (21) e óptico-mnéstico (37).', sind: 'OT₃L: afasia anômica, um déficit lexical mais puramente semântico, e “extinção do significado da palavra”, a incapacidade de evocar a imagem visual a partir do nome. A afasia de Wernicke corresponde à junção T₂/OT₃.', fat: ['om', 'am'] },
  PT3: { lab: 'PT₃', lvl: 3, areas: [40], filt: 'lat', nome: 'Associativo temporoparietal (supramarginal)', ga: '40, giro supramarginal', gp: 'p. 242–244',
    fn: 'Interface linguoespacial: a base espacial, ou “quase-espacial” no sentido de Luria, das representações linguísticas e numéricas.',
    pol: 'Coincide com a zona de sobreposição parietal inferior. Mas a atribuição ao supramarginal, e não ao angular, é uma previsão do modelo: as descrições clínicas falam só em “inferoparietal” ou “área do giro angular”, e Goldberg remete a verificação à neuroimagem (p. 243–244, 253).', sind: 'PT₃L: afasia semântica (construções relacionais reversíveis) e acalculia de tipo espacial, que Goldberg vê como manifestações de um mesmo déficit.', fat: ['esp'] },
  OP3: { lab: 'OP₃', lvl: 3, areas: [39], filt: 'lat', nome: 'Associativo occipitoparietal (angular)', ga: '39, giro angular', gp: 'p. 239–241',
    fn: 'Integração entre informação visual de alta ordem e informação somatossensorial e espacial de natureza simbólica: a síntese visuoespacial a serviço do processamento categorial.',
    pol: 'Coincide com a zona de sobreposição parietal inferior posterior.', sind: 'OP₃L: apraxias ideatória e ideomotora, e apractagnosia espacial, que inclui mapas, relógio sem números, letras e algarismos, alexia com agrafia e alexia para números. Goldberg as vê como duas formas de uma mesma desintegração.', fat: ['esp'] },
  M1: { lab: 'M₁', lvl: 1, areas: [4], filt: 'dors', nome: 'Córtex motor “primário” (porção dorsal)', ga: '4', gp: 'p. 254',
    fn: 'Controle motor. É origem do sistema piramidal e tem organização somatotópica paralela à pós-central.',
    pol: 'Coincide com o campo motor central.', sind: 'Paresias contralaterais.', fat: [] },
  M1V: { lab: 'M₁', lvl: 1, areas: [4], filt: 'vent', nome: 'Córtex motor “primário” (porção inferior)', ga: '4, porção inferior', gp: 'p. 259',
    fn: 'Controle motor do aparelho oral. É o polo do gradiente motor-pré-frontal inferior.',
    pol: 'Coincide com o campo motor central.', sind: 'Paresias faciais e oromotoras.', fat: [] },
  PM2: { lab: 'PM₂', lvl: 2, areas: [6, 8], filt: 'dors', nome: 'Córtex pré-motor “secundário”', ga: '6 e, em parte, 8', gp: 'p. 254–255',
    fn: 'Organização sequencial de movimentos discretos em padrões fluidos. A perseveração pode ser falha de transição ou de término do ato.',
    pol: 'Coincide com os campos pré-motores secundários de Poliakov.', sind: 'PM₂: apraxia melocinética (componentes “de fundo”, no sentido de Bernstein) e apraxia cinética dos membros (componentes “principais”).', fat: ['kin'] },
  PM2V: { lab: 'PM₂', lvl: 2, areas: [6], filt: 'vent', nome: 'Pré-motor inferior', ga: '6, porção inferior', gp: 'p. 258–259',
    fn: 'Organização sequencial dos padrões articulatórios, caso particular da função pré-motora.',
    pol: 'Na hipótese de Goldberg, é aqui (e não no 44) que fica o componente cinético da afasia de Broca, a afasia motora eferente de Luria.', sind: 'PM₂L: apraxia da fala (afasia motora eferente).', fat: ['kin'] },
  A44: { lab: 'PM₂–PF₃ 44', lvl: 2.5, areas: [44], filt: 'lat', nome: 'Opérculo frontal', ga: '44', onlyL: true, gp: 'p. 258–260',
    fn: 'Interface motor-linguística: a representação linguística das ações, isto é, o léxico de verbos e a base predicativa da linguagem. Goldberg retoma aqui a fala interior predicativa de Vigotski, via Luria.',
    pol: 'Na Fig. 46, Poliakov trata 44 e 45 como setor motor-verbal da zona motora. Goldberg trata o 44 como associativo, separando-o do 6 inferior. É uma hipótese de dupla dissociação que ele mesmo chama de minoritária (p. 259).', sind: 'Agramatismo sintático, entendido como quebra da estrutura predicativa e com perda especial de verbos.', fat: ['kin', 'prog'] },
  A45: { lab: 'PM₂–PF₃ 45', lvl: 2.5, areas: [45], filt: 'lat', nome: 'Pars triangularis', ga: '45, junção pré-motor/pré-frontal', onlyL: true, gp: 'p. 260',
    fn: 'Interface executivo-linguística: controle executivo sobre o comportamento verbal.',
    pol: 'Concorda com Luria, que lista o 45 entre os campos pré-frontais ligados a 22, 37 e 39 (HCF, p. 260).', sind: 'Afasia dinâmica (Kleist, Luria): as estruturas linguísticas estão intactas; o paciente perde a iniciativa, com perseveração temática e ecolalia. São os déficits executivos restritos à fala.', fat: ['prog'] },
  PF3: { lab: 'PF₃', lvl: 3, areas: [9, 10, 46], filt: 'lat', nome: 'Córtex pré-frontal dorsolateral', ga: '9, 10 e, em parte, 8', gp: 'p. 255–257',
    fn: 'Organização hierárquica e sequencial de qualquer comportamento: a coordenação ad hoc de rotinas cognitivas segundo o contexto. É extensão filo e ontogenética do pré-motor (Goldberg cita Kononova e Poliakov, 1966). Para Goldberg, o pré-frontal está acima do córtex TPO dentro do nível 3.',
    pol: 'Coincide com o terciário frontal (Poliakov inclui também o 46, colocado aqui no nó).', sind: 'PF₃: síndrome executiva. Perseveração difusa em todos os domínios e níveis, aspontaneidade (inércia de início e de término), comportamento dependente do campo, ecolalia e ecopraxia.', fat: ['prog'] }
};
for (const k in GN) GN[k].curto = {"O1": "defeitos de campo visual", "T1": "déficits auditivos elementares", "P1": "hipoestesias", "O2": "agnosia visual de objetos", "T2": "agnosia acústica e auditiva semântica", "P2": "agnosia tátil (astereognosia pura)", "OT3": "afasia anômica; extinção do significado da palavra (Wernicke na junção com T₂)", "PT3": "afasia semântica; acalculia espacial", "OP3": "apraxia ideatória; apractagnosia espacial", "M1": "paresias", "M1V": "paresias oromotoras", "PM2": "apraxias melocinética e cinética", "PM2V": "apraxia da fala (afasia eferente)", "A44": "agramatismo (base predicativa)", "A45": "afasia dinâmica", "PF3": "síndrome executiva"}[k];
const GE = { L: [['T1', 'T2'], ['T2', 'OT3'], ['OT3', 'O2'], ['O2', 'O1'], ['P1', 'P2'], ['P2', 'OP3'], ['OP3', 'O2'], ['T2', 'PT3'], ['PT3', 'P2'],
    ['PF3', 'PM2'], ['PM2', 'M1'], ['PF3', 'A45'], ['A45', 'A44'], ['A44', 'PM2V'], ['PM2V', 'M1V']],
  R: [['T1', 'T2'], ['T2', 'OT3'], ['OT3', 'O2'], ['O2', 'O1'], ['P1', 'P2'], ['P2', 'OP3'], ['OP3', 'O2'], ['T2', 'PT3'], ['PT3', 'P2'],
    ['PF3', 'PM2'], ['PM2', 'M1'], ['PF3', 'PM2V'], ['PM2V', 'M1V']] };
/* os gradientes como unidades (Goldberg, p. 231–232, 251–252, 260–263) */
const GRD = {
  ot: { nome: 'Occipitotemporal', base: 'visuo-auditivo', esq: 'linguovisual', cor: '#1d7fa8', pg: 'p. 250–252', seq: ['T1', 'T2', 'OT3', 'O2', 'O1'],
    d: 'Vai de T₁ a O₁. No hemisfério esquerdo é o eixo das representações linguísticas do mundo visual, ou seja, dos substantivos concretos. Corresponde ao sistema do “o quê” de Mishkin (p. 253). A travessia mostra a interpolação: do polo auditivo para o visual, o quadro desliza da agnosia acústica para a afasia de Wernicke (junção T₂/OT₃), depois para a anomia e a extinção do significado da palavra (OT₃) e, por fim, para a agnosia visual de objetos (O₂).' },
  op: { nome: 'Occipitoparietal', base: 'visuoespacial', esq: 'visuoespacial simbólico', cor: '#6b3fa0', pg: 'p. 239–242', seq: ['O1', 'O2', 'OP3', 'P2', 'P1'],
    d: 'Vai de O₁ a P₁. No hemisfério esquerdo processa estímulos simbólicos e representacionais, nos quais a assimetria espacial carrega o sentido (letras, algarismos, mapas, ponteiros). Corresponde ao sistema do “onde” de Mishkin (p. 253).' },
  tp: { nome: 'Temporoparietal', base: 'auditivo-espacial', esq: 'linguoespacial', cor: '#14897a', pg: 'p. 242–244', seq: ['T1', 'T2', 'PT3', 'P2', 'P1'],
    d: 'Vai de T₁ a P₁. No hemisfério esquerdo é a interface entre os sistemas linguísticos, de base auditiva, e os esquemas espaciais, de base somatossensorial. É a base “quase-espacial” das construções relacionais e do número, na leitura que Goldberg faz de Luria.' },
  mp: { nome: 'Motor-pré-frontal', base: 'motor-executivo', esq: 'motor-executivo (simétrico)', cor: '#b3121d', pg: 'p. 253–257', seq: ['M1', 'PM2', 'PF3'], parcial: true,
    d: 'É um gradiente parcial (1 → 2 → 3), porque o córtex anterior é um só lobo; os posteriores são dois gradientes parciais de lobos vizinhos voltados um para o outro. O contínuo vai do controle motor (M₁) à organização sequencial de padrões motores (PM₂) e daí à organização hierárquica e sequencial de qualquer comportamento (PF₃). É simétrico nos dois hemisférios.' },
  lmp: { nome: 'Motor-pré-frontal inferior', base: 'motor-pré-frontal inferior', esq: 'linguo-executivo', cor: '#c2410c', pg: 'p. 259–260', seq: ['M1V', 'PM2V', 'A44', 'A45', 'PF3'], parcial: true, onlyL: true,
    d: 'Elaboração do hemisfério esquerdo. Do controle oral (4 inferior) passa à sequência articulatória (6 inferior: afasia eferente), à base predicativa da linguagem (44: agramatismo) e ao controle executivo da fala (45: afasia dinâmica), até chegar ao pré-frontal dorsolateral.' },
  rmp: { nome: 'Motor-pré-frontal inferior (direito)', base: 'motor-pré-frontal inferior', esq: 'elaboração direita não descrita', cor: '#c2410c', pg: 'p. 261', seq: ['M1V', 'PM2V', 'PF3'], parcial: true, onlyR: true,
    d: 'Goldberg presume um padrão complementar de elaborações no hemisfério direito anterior, mas não o descreve (p. 261).' }
};
const CURTO = { ativ: 'Ativação', mem: 'Memória inespecífica', vis: 'Gnose visual', om: 'Óptico-mnéstico', fon: 'Ouvido fonemático',
  am: 'Acústico-mnéstico', cin: 'Cinestésico', esp: 'Simultâneo / espacial', kin: 'Cinético', prog: 'Programação e controle',
  inerc: 'Mobilidade/inércia', espont: 'Espontaneidade', hemi: 'Inter-hemisférica', comm: 'Inter-hemisférico', geral: 'Gerais' };
for (const f in CURTO) FAT[f].curto = CURTO[f];

/* ---------- sistemas funcionais complexos ----------
   Princípio (HCF, p. 78–79): a função superior pode ser perturbada pela lesão de qualquer elo do sistema,
   mas é perturbada de modo diferente conforme o elo lesado. etapas = elos sucessivos; elos na mesma etapa são simultâneos (rel sim) ou alternativos (rel alt); fundo = elos que atuam durante todo o curso; ciclo = retorno de controle. */
const SYS = {
  escrita: { hemE: "Componentes principais (codificadores), representados pelas consoantes. Lesões temporais e pós-centrais esquerdas produzem trocas, confluências e inversões de ordem de consoantes.", hemD: "Componentes de fundo, representados pelas vogais. Na rara agrafia por lesão temporoparietal direita, as vogais são omitidas ou trocadas (num caso, 35 de 67 erradas) e as consoantes ficam quase intactas (Simernitskaya; HCF, p. 380).", nome: 'Escrita', ru: 'письмо', ref: 'HCF, p. 78–81; III.10C, p. 537–543',
    def: 'Escrever sob ditado exige quatro passos: analisar acusticamente a composição sonora (com participação estreita da articulação), recodificar cada fonema num grafema com suas propriedades topológicas, recodificar o grafema numa série cinestésica de movimentos e organizá-la numa “melodia” cinética. Com a automatização, o peso de cada elo muda (HCF, p. 78–79).',
    etapas: [{ f: ['prog'], n: 'Tarefa e intenção (na escrita espontânea, o plano do texto)' }, { f: ['fon', 'cin'], rel: 'sim', n: 'Análise da composição sonora, com apoio articulatório' }, { f: ['esp', 'om'], rel: 'sim', n: 'Recodificação de cada fonema num grafema' }, { f: ['kin'], n: 'Melodia cinética do traçado' }],
    ciclo: { para: 0, n: 'O escrito é confrontado com a intenção. Sem esse controle, a frase inicial se repete (p. 543).' },
    tempo: 'As etapas são sucessivas: Luria as descreve como passos do processo (p. 78–79). Dentro das etapas 2 e 3, os elos trabalham juntos: a articulação sustenta a análise sonora, e a imagem da letra e sua topologia formam um só ato. Na escrita de palavras muito familiares, as etapas intermediárias se encurtam até uma melodia cinética única (p. 79).',
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da escrita.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'fon', papel: 'Análise da composição sonora da palavra ditada.', q: 'Omissões, substituições de sons acusticamente próximos e transposições, sobretudo no ditado e na escrita espontânea. A cópia e assinaturas automatizadas ficam preservadas (p. 539–541).' },
      { f: 'cin', papel: 'Articulação como apoio da análise sonora.', q: 'Substituições articulatoriamente próximas (d/n/l, m/b). A escrita piora se a articulação externa é proibida e melhora com controle visual da boca no espelho (p. 541–542).' },
      { f: 'esp', papel: 'Recodificação do fonema no grafema, com sua topologia e a disposição espacial de seus elementos.', q: 'Elementos da letra mal dispostos e letras em espelho, também na cópia. A análise fonêmica fica intacta (p. 542).' },
      { f: 'om', papel: 'Ligação óptico-acústica entre o som e a imagem da letra.', q: 'Agrafia óptica (Kaufman): o paciente sabe o som, mas não encontra o grafema. É forma rara (p. 542).' },
      { f: 'kin', papel: 'Melodia cinética: ordem e fluidez dos movimentos.', q: 'Letras isoladas sim, palavras não: a ordem se perde, com perseverações e inércia na passagem de um elemento a outro (p. 81, 542).' },
      { f: 'prog', papel: 'Plano e intenção do texto.', q: 'Defeito não específico. A frase inicial se repete (“quero lhe dizer que quero lhe dizer…”). A inércia e a fadiga produzem “escrita inicial” e micrografia (p. 543).' } ] },
  leitura: { hemE: "Leitura propriamente dita: percepção de letras, sílabas e palavras como códigos de linguagem (vantagem do campo visual direito).", hemD: "Percepção não verbal e sentido afetivo. Com só o hemisfério direito disponível, a paciente não lê “norte”, mas diz “algo frio”; não lê o nome da filha, mas diz “algo próximo de mim” (Simernitskaya; HCF, p. 381).", nome: 'Leitura', ru: 'чтение', ref: 'HCF III.10D, p. 543–552',
    def: 'Faz o caminho inverso da escrita: percepção e análise visual do grafema, recodificação dos grafemas em estruturas fonéticas e compreensão do sentido do que está escrito (p. 543–544).',
    etapas: [{ f: ['vis', 'esp'], rel: 'sim', n: 'Percepção dos grafemas e da estrutura visual da palavra' }, { f: ['fon', 'cin'], rel: 'sim', n: 'Recodificação em estrutura fonética (com articulação, na leitura em voz alta)' }, { f: ['kin'], n: 'Síntese sucessiva dos elementos lidos' }, { f: ['prog'], n: 'Compreensão controlada: confronto do sentido com o texto' }],
    tempo: 'Caminho inverso da escrita (p. 543–544). No leitor fluente, palavras familiares são reconhecidas de relance, saltando a etapa 2: é por isso que um paciente pode reconhecer “Moscou” sem conseguir lê-la em voz alta (p. 548).',
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da leitura.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'vis', papel: 'Percepção integrada dos grafemas e de seus traços distintivos.', q: 'Alexia óptica literal: as letras perdem o sentido ou são identificadas de modo instável (lesões occipitais).' },
      { f: 'esp', papel: 'Percepção simultânea da estrutura visual da palavra.', q: 'Estreitamento da percepção a uma ou duas letras, com leitura letra a letra. É sinal de lesão parieto-occipital (p. 545–547).' },
      { f: 'fon', papel: 'Recodificação dos grafemas em fonemas.', q: 'O paciente reconhece de relance palavras familiares (“Moscou”, “Pravda”), mas não consegue lê-las em voz alta nem analisar sua composição. A leitura em voz alta é a mais vulnerável (p. 548).' },
      { f: 'cin', papel: 'Base articulatória da leitura em voz alta.', q: 'Dificuldade de articular a palavra lida (afasia motora aferente).' },
      { f: 'kin', papel: 'Síntese sucessiva dos elementos lidos.', q: 'Quebra da síntese cinética: perseverações e perda da ordem na leitura (pré-motor).' },
      { f: 'prog', papel: 'Controle do sentido: confronto do lido com o esperado.', q: 'A leitura é substituída por conjecturas de sentido. Por isso se testa uma frase que contraria a expectativa (“minha perna dói muito”) (p. 546).' } ] },
  fala: { hemE: "Todos os códigos de linguagem: fonêmico, lexical, sintático e semântico. As afasias vêm de lesões esquerdas.", hemD: "Os códigos ficam preservados, mas a fala se torna superexpandida, se perde em detalhes e fica “raciocinada demais”, com a regulação prejudicada. Luria diz que a observação ainda era inédita (HCF, p. 378).", nome: 'Fala expressiva (narrativa)', ru: 'экспрессивная речь', ref: 'HCF III.9, p. 506–527; II.4D–G',
    def: 'Vai da intenção ao esquema linear do enunciado, depois à seleção das palavras, à articulação de cada som e à transição fluida entre sons e palavras.',
    etapas: [{ f: ['prog'], n: 'Intenção e esquema linear do enunciado (fala interna)' }, { f: ['am', 'om'], rel: 'sim', n: 'Seleção das palavras: evocação lexical e ligação palavra–imagem' }, { f: ['cin', 'kin', 'fon'], rel: 'sim', n: 'Realização: articulemas, transições e controle acústico' }],
    tempo: 'Do plano ao som, em sucessão. Na etapa final, a aferentação cinestésica de cada articulema, a melodia cinética que liga um ao outro e o controle auditivo operam juntos, palavra a palavra.',
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da fala.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'prog', papel: 'Plano do enunciado e seu esquema linear.', q: 'Afasia dinâmica: a fala narrativa empobrece com a articulação e a nomeação preservadas (II.4G, p. 237).' },
      { f: 'am', papel: 'Retenção e evocação das palavras do enunciado.', q: 'Afasia acústico-mnéstica: dificuldade de achar palavras e de sustentar séries (II.2E).' },
      { f: 'om', papel: 'Ligação entre palavra e imagem do objeto.', q: 'Afasia amnéstica ou anômica, com circunlóquios.' },
      { f: 'fon', papel: 'Controle acústico da forma sonora.', q: 'Parafasias literais e alienação do sentido da palavra (afasia sensorial, II.2D).' },
      { f: 'cin', papel: 'Seleção dos articulemas.', q: 'Afasia motora aferente: busca e substituição de articulemas próximos (II.4D, p. 207).' },
      { f: 'kin', papel: 'Transição de uma articulação a outra.', q: 'Afasia motora eferente: perseverações e desintegração da melodia da palavra (II.4F, p. 226).' } ] },
  compreensao: { hemE: "Discriminação fonêmica e decodificação verbal. Vantagem da orelha direita para sons da fala e consoantes.", hemD: "Componentes musicais da audição: melodias e tons (vantagem da orelha esquerda). Lesões direitas comprometem a identificação e a reprodução de melodias (HCF, p. 378–379). Khomskaya acrescenta a prosódia: a lesão temporal direita impede diferenciar a entonação, de valor emocional e lógico, e às vezes até vozes masculinas e femininas (p. 282).", nome: 'Compreensão da fala', ru: 'понимание речи', ref: 'HCF III.8, p. 486–505',
    def: 'Vai da discriminação fonêmica à compreensão de palavras, frases simples, estruturas lógico-gramaticais e, por fim, textos.',
    etapas: [{ f: ['fon'], n: 'Discriminação fonêmica e reconhecimento da palavra' }, { f: ['am'], n: 'Retenção da série sucessiva de palavras' }, { f: ['esp'], n: 'Conversão da série num esquema simultâneo de relações' }, { f: ['prog'], n: 'Busca ativa do sentido (frases complexas e textos)' }],
    fundo: [{ f: 'ativ', n: 'tônus da escuta' }],
    tempo: 'A fala chega como série sucessiva. Compreender uma construção lógico-gramatical exige convertê-la num esquema simultâneo, quase-espacial. Por isso a afasia acústico-mnéstica (perde a série) e a semântica (não faz a conversão) quebram o mesmo sistema em pontos vizinhos.',
    links: [
      { f: 'fon', papel: 'Discriminação de fonemas e reconhecimento da palavra.', q: 'Alienação do sentido das palavras: “ouve, mas não entende” (II.2D).' },
      { f: 'am', papel: 'Retenção de enunciados longos.', q: 'Perda de partes de frases longas e de séries de instruções (II.2E).' },
      { f: 'esp', papel: 'Síntese quase-espacial das relações lógico-gramaticais.', q: 'Afasia semântica: não distingue “o irmão do pai” de “o pai do irmão” nem compreende preposições de relação (II.3F, p. 177).' },
      { f: 'prog', papel: 'Busca ativa do sentido de textos complexos.', q: 'Compreensão impulsiva e fragmentária, com substituição por associações estereotipadas (II.5G).' },
      { f: 'ativ', papel: 'Tônus que sustenta a escuta.', q: 'Compreensão flutuante, que cai com a fadiga (II.6).' } ] },
  repeticao: { hemE: "Retenção dos componentes principais: as consoantes.", hemD: "Retenção dos componentes de fundo: depois da inativação do hemisfério direito, a discriminação e a retenção de vogais caem mais que após a do esquerdo (Traugott; Balonov e Deglin; HCF, p. 380).", nome: 'Repetição', ru: 'повторная речь', ref: 'HCF III.9C, p. 509–513',
    def: 'Discriminar o que se ouviu, reter a série e articulá-la em sequência.',
    etapas: [{ f: ['fon'], n: 'Discriminação do modelo ouvido' }, { f: ['am'], n: 'Retenção da série' }, { f: ['cin', 'kin'], rel: 'sim', n: 'Articulação: cada articulema e a passagem ao seguinte' }],
    fundo: [{ f: 'ativ', n: 'tônus' }, { f: 'prog', n: 'seletividade da resposta' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da repetição.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'fon', papel: 'Discriminação do modelo ouvido.', q: 'Repete sons opostos como iguais e produz parafasias literais.' },
      { f: 'am', papel: 'Retenção da série.', q: 'Repete uma ou duas palavras de uma série de três ou quatro, com perda e inversão da ordem.' },
      { f: 'cin', papel: 'Encontrar o articulema.', q: 'Busca articulatória e substituições.' },
      { f: 'kin', papel: 'Passagem de um elemento a outro.', q: 'Perseverações: repete o elemento anterior no lugar do seguinte.' },
      { f: 'prog', papel: 'Seletividade da resposta.', q: 'Ecolalia, ou repetição inerte de séries já dadas.' } ] },
  nomeacao: { hemE: "Nomear: ligar o objeto à palavra.", hemD: "Reconhecer e até classificar o objeto pela situação de uso (cigarro com cinzeiro, e não cigarro com lápis), mas sem nomeá-lo. São generalizações de outro nível, não verbais (Sperry; HCF, p. 381).", nome: 'Nomeação', ru: 'номинативная функция речи', ref: 'HCF III.9D, p. 513–518',
    def: 'Reconhecer o objeto, evocar sua imagem, encontrar a palavra entre as alternativas e realizá-la sonoramente.',
    etapas: [{ f: ['vis'], n: 'Reconhecimento do objeto' }, { f: ['om'], n: 'Ligação entre imagem e palavra' }, { f: ['am'], n: 'Escolha da palavra entre alternativas' }, { f: ['fon'], n: 'Forma sonora da palavra' }],
    fundo: [{ f: 'ativ', n: 'tônus' }, { f: 'prog', n: 'inibição de respostas irrelevantes' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da nomeação.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'vis', papel: 'Reconhecimento do objeto.', q: 'Não nomeia porque não reconhece (agnosia), e descreve as partes.' },
      { f: 'om', papel: 'Ligação entre imagem visual e palavra.', q: 'Anomia: sabe para que serve, mas não acha o nome. Ajuda pela primeira sílaba.' },
      { f: 'am', papel: 'Seleção da palavra entre alternativas.', q: 'Parafasias verbais e substituições por palavras do mesmo campo.' },
      { f: 'fon', papel: 'Forma sonora da palavra.', q: 'Parafasias literais. A ajuda pela primeira sílaba não funciona.' },
      { f: 'prog', papel: 'Inibição de respostas irrelevantes.', q: 'Repete o nome anterior (perseveração) ou nomeia por associação imediata.' } ] },
  calculo: { hemE: "Acalculia ligada à afasia semântica e à síndrome de Gerstmann, por lesão inferoparietal esquerda.", hemD: "Acalculia espacial isolada pode surgir de lesão direita (Hécaen). Goldberg conclui que os dois lados contribuem de modos diferentes e com pesos individuais variáveis (Goldberg, p. 242–243).", nome: 'Cálculo', ru: 'счёт', ref: 'HCF II.3G, p. 182; III.11, p. 553–561',
    def: 'Compreender a estrutura categorial do número (valor posicional) e executar operações sucessivas, retendo os resultados intermediários sob um programa.',
    etapas: [{ f: ['esp'], n: 'Estrutura categorial do número e direção da operação' }, { f: ['prog', 'am'], rel: 'sim', n: 'Execução por etapas: programa e retenção dos resultados intermediários' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    tempo: 'Sem a estrutura do número (etapa 1), não há operação. Na execução, o programa encadeia as operações enquanto os resultados intermediários ficam retidos: o cálculo mental depende disso, o escrito alivia a retenção.',
    links: [
      { f: 'esp', papel: 'Estrutura categorial e posicional do número, direção das operações.', q: 'Acalculia primária: troca de ordens de grandeza, confusão entre 17 e 71, perda do sentido do “emprestar” (parieto-occipital).' },
      { f: 'am', papel: 'Retenção das etapas intermediárias no cálculo mental.', q: 'O cálculo mental se perde, enquanto o escrito é preservado.' },
      { f: 'prog', papel: 'Programa da operação e verificação.', q: 'Acalculia secundária: operações impulsivas, perda do programa em problemas de várias etapas (frontal).' },
      { f: 'ativ', papel: 'Tônus.', q: 'Na contagem regressiva (100 − 7), dá uma etapa só ou uma resposta ecolálica (II.6, p. 370).' } ] },
  praxis: { hemE: "Apraxias ideatória e ideomotora bilaterais, por lesão parietal esquerda (Goldberg, p. 239). Regulação verbal do ato.", hemD: "Orientação direta no próprio corpo e no espaço imediato. As lesões direitas produzem distúrbio do esquema corporal e anosognosia da hemiparesia esquerda (síndrome de Anton) (HCF, p. 376–377).", nome: 'Movimento voluntário (práxis)', ru: 'произвольное движение', ref: 'HCF II.3E, II.4C–E, II.5D; III.3, p. 414–435',
    def: 'Uma intenção formulada (muitas vezes verbalmente) se organiza num programa motor, realizado sob aferentação cinestésica e espacial e numa sequência cinética fluida.',
    etapas: [{ f: ['prog'], n: 'Intenção (muitas vezes verbal) e programa motor' }, { f: ['esp', 'cin', 'kin'], rel: 'sim', n: 'Execução: coordenadas espaciais, aferentação cinestésica e melodia cinética' }],
    ciclo: { para: 0, n: 'A aferentação de retorno compara o efeito com o programa, como no sistema funcional de Anokhin (HCF, p. 22).' },
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'cin', papel: 'Aferentação cinestésica: endereçar o impulso aos músculos certos.', q: 'Apraxia aferente: “mão-pá”, procura da posição dos dedos, apraxia oral (II.4C, p. 202).' },
      { f: 'kin', papel: 'Organização serial: a melodia cinética.', q: 'Apraxia cinética: perseverações e passagem fragmentada entre movimentos (II.4E, p. 215).' },
      { f: 'esp', papel: 'Coordenadas espaciais do movimento.', q: 'Apraxia espacial e construtiva: confusão de direção e de lado (II.3E, p. 171).' },
      { f: 'prog', papel: 'Subordinação do movimento ao programa, inclusive verbal.', q: 'Ecopraxia e substituição do programa por estereótipos. A instrução verbal não regula a ação (II.5D, p. 285).' },
      { f: 'ativ', papel: 'Tônus.', q: 'Movimento fraco que logo se extingue, inatividade primária (II.6, p. 370).' } ] },
  percepcao: { hemE: "Percepção categorial, mediada pelos códigos: agnosia associativa de objetos por lesão esquerda (Goldberg, p. 234–235).", hemD: "Percepção direta e integral, não codificada: prosopagnosia, negligência da metade esquerda do campo e metamorfopsias. Goldberg as chama de agnosias “aperceptivas”, de identidade física (HCF, p. 377–378; Goldberg, p. 252).", nome: 'Percepção visual de objetos', ru: 'зрительное восприятие', ref: 'HCF II.3C, II.5E; III.6, p. 451–468',
    def: 'Uma atividade de busca: discriminar traços, sintetizá-los simultaneamente numa imagem, formular uma hipótese e verificá-la.',
    etapas: [{ f: ['vis', 'esp'], rel: 'sim', n: 'Discriminação dos traços e síntese simultânea' }, { f: ['om'], n: 'Hipótese: confronto com imagens de memória' }, { f: ['prog'], n: 'Verificação da hipótese' }],
    ciclo: { para: 0, n: 'Se a hipótese não se confirma, a busca recomeça, com novos movimentos de exame da figura. No paciente frontal, o ciclo se interrompe: conclui a partir de um fragmento (p. 327).' },
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da percepção.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'vis', papel: 'Síntese dos traços em imagem de objeto.', q: 'Agnosia de objetos: reconhecimento por um detalhe isolado.' },
      { f: 'esp', papel: 'Percepção simultânea e relações espaciais.', q: 'Simultanagnosia: percebe um objeto por vez. Desorientação espacial.' },
      { f: 'om', papel: 'Imagens visuais estáveis e sua evocação.', q: 'Dificuldade de evocar e desenhar objetos de memória.' },
      { f: 'prog', papel: 'Busca ativa e verificação da hipótese perceptiva.', q: 'Conclusões impulsivas a partir de um fragmento, sem exame da figura nem correção (II.5E, p. 327).' } ] },
  atencao: { nome: 'Atenção voluntária (arbitrária)', ru: 'произвольное внимание', ref: 'FN cap. 10, p. 223–244; HCF II.5, p. 263–270, 282–287; Khomskaya, cap. 15, p. 192–199',
    pre: 'Khomskaya: ainda não há interpretação teórica geral da atenção. Das suas quatro formas (sensorial, motora, emocional, intelectual), a emocional e sobretudo a intelectual são pouco conhecidas, e os subníveis diencefálico-límbicos estão “muito pouco estudados” (p. 192–194).',
    hemE: "O nível voluntário, mediado pela fala: é a instrução verbal que reorganiza a ativação (HCF, p. 266; Khomskaya, p. 193). Na escuta dicótica, a lesão esquerda perturba a atenção às palavras nas duas orelhas (Simernitskaya, in Khomskaya, p. 198).",
    hemD: "As negligências modalmente específicas (visual, tátil, motora) são sobretudo sinal de lesão direita e se ligam à anosognosia. Na escuta dicótica, a lesão direita só afeta as palavras que chegam à orelha esquerda (Khomskaya, p. 196–198).",
    def: 'Para Luria e Khomskaya, a atenção não é um processo com conteúdo próprio: é a seletividade de qualquer processo psíquico, cognitivo ou afetivo-volitivo (Khomskaya, p. 192). Vigotski chama de primária a atenção involuntária, com que a criança nasce, e de secundária a voluntária, que se forma com as demais funções e é socialmente mediada; no adulto, ela se dirige sobretudo aos estímulos de linguagem (p. 193). Luria: ao contrário da reação de orientação, a atenção voluntária “não é de origem biológica, mas, sim, um ato social”. A mãe nomeia e aponta o objeto; depois a criança o nomeia ela mesma e assim dirige a própria atenção (FN, p. 228–229). Só por volta dos 4 anos e meio a 5 anos a instrução verbal vence os estímulos novos e distrativos do campo visual (FN, p. 229–230). O experimento-chave: uma instrução verbal (“conte os sons”) dá valor de sinal a estímulos indiferentes e restaura de modo estável a reação de orientação já extinta (HCF, p. 266).',
    etapas: [{ f: ['prog'], n: 'Instrução verbal ou intenção: define o que é relevante' }, { f: ['ativ'], n: 'Ativação fásica e seletiva: a reação de orientação aos sinais relevantes se restaura e se mantém' }, { f: ['vis', 'fon', 'cin', 'kin'], rel: 'alt', n: 'Seleção no analisador em jogo (visual, auditivo, tátil ou motor)' }, { f: ['prog'], n: 'Manutenção da instrução e controle: inibir o irrelevante' }],
    tempo: 'A instrução (1) muda o valor dos estímulos; daí a ativação seletiva (2), que se dirige ao analisador em jogo (3); o programa sustenta e verifica a seleção ao longo da tarefa (4). A atenção involuntária começa direto na etapa 2, disparada pela novidade ou intensidade do estímulo, sem a etapa 1. Khomskaya separa por isso dois tipos de perturbação: modalmente inespecífica (etapa 2, em qualquer modalidade) e modalmente específica (etapa 3, numa só) (p. 193–195).',
    cog: 'As três redes de Posner e Petersen (alerta, orientação, executiva) correspondem só em parte. O alerta lembra a ativação tônica da 1ª unidade; a orientação, a reação de orientação e as negligências modais; a executiva, o controle frontal. A diferença de fundo é que, para a escola de Luria, a atenção voluntária não é um módulo nem uma rede própria: é a seletividade de uma atividade, de origem social e organizada pela fala (Vigotski). Por isso o teste luriano mede como uma instrução reorganiza a ativação, e não só a velocidade de detecção.',
    links: [
      { f: 'prog', papel: 'Dá valor de sinal aos estímulos pela instrução e a mantém ao longo da tarefa.', q: 'Na lesão frontal lateral, a ativação aos estímulos informativos fica relativamente preservada (HCF, p. 270). O defeito é de programa: a instrução se perde ou é substituída por um estereótipo durante a execução (II.5D, p. 285). Nas lesões frontais maciças, o paciente é distraído o tempo todo por estímulos irrelevantes, e a instrução já não estabiliza a atenção. Nas lesões do tronco superior, do sistema límbico e das zonas posteriores, ao contrário, a instrução verbal compensa o defeito (FN, p. 239–241).' },
      { f: 'ativ', papel: 'Ativação fásica (reação de orientação) e tônica (nível de vigília) recrutadas pela instrução. O frontal mediobasal é o aparelho que a fala usa para regulá-la (HCF, p. 270). O tronco superior e a formação reticular garantem só a condição mais elementar, a vigília generalizada; a seleção do estímulo e a inibição do irrelevante dependem do córtex límbico e da região frontal (FN, p. 236–237).', q: 'Três quadros, por nível (Khomskaya, p. 194–195). Tronco inferior: esgotamento e volume reduzido em qualquer modalidade (na subtração serial, acerta no começo, depois erra e recusa); a voluntária fica relativamente preservada, e motivação ou fala em voz alta compensam. Diencéfalo e límbico: formas mais graves, pouco compensáveis. Frontal ínfero-medial: voluntária enfraquecida e involuntária patologicamente reforçada, com comportamento “de campo” e “paralisia psíquica do olhar” (não desvia o olhar sob ordem, mas segue um lápis); a instrução verbal já não restaura a reação de orientação (HCF, p. 269–270).' },
      { f: 'vis', papel: 'Atenção sensorial visual.', q: 'Negligência visual: com dois estímulos simultâneos, ignora um lado, em geral o esquerdo (lesão posterior direita); com um estímulo só, detecta. Não é defeito gnóstico (Khomskaya, p. 196).' },
      { f: 'fon', papel: 'Atenção auditiva.', q: 'Na escuta dicótica, a vantagem normal da orelha direita (10–15%) chega a 50–60%, e um lado pode ser ignorado; apresentadas a uma orelha só, as palavras são captadas (Khomskaya, p. 196–197).' },
      { f: 'cin', papel: 'Atenção tátil.', q: 'Com toques simultâneos nas duas mãos, não nota o da esquerda (lesão parietal direita); com toque isolado, nota (Teuber; Khomskaya, p. 197).' },
      { f: 'kin', papel: 'Atenção motora.', q: 'Em movimentos bimanuais, uma mão, em geral a esquerda, “se desliga” sem que o paciente perceba; com uma mão por vez, executa. Lesões anteriores, sobretudo direitas, pré-motoras, pré-frontais e dos núcleos da base (Khomskaya, p. 198).' } ] },
  memoria: { nome: 'Memorização voluntária direta', ru: 'произвольное непосредственное запоминание', ref: 'HCF III.7B–D, p. 469–483; II.5F, p. 340–342; p. 381–383; FN cap. 11, p. 245–265',
    hemE: "Memória voluntária e ativa, ligada à fala. Com lesão parietotemporal esquerda, cai cerca de 40% (4 de 10 palavras). O defeito aparece sobretudo na evocação tardia (HCF, p. 382–384; Khomskaya, p. 61).",
    hemD: "Com lesão direita, a voluntária cai só 20–25% (4–5 palavras). O direito sustenta o componente de fundo, a impressão direta: ver Memorização involuntária (HCF, p. 382–383).",
    def: 'Tarefa consciente de memorizar e depois reproduzir uma série (por exemplo, 10 palavras), sem meios auxiliares, repetida a cada ensaio até aprender. Luria separa duas formas de memória: a de orientação no tempo e no lugar, ligada ao estado de consciência (amnésias, Korsakov), e a atividade mnéstica de memorizar e evocar. Esta se divide em direta e mediada (lógica) (HCF, p. 469–470). Pelo critério de Smirnov e Zinchenko, a direta e a mediada são voluntárias; a involuntária é outro sistema (p. 381–382).',
    etapas: [{ f: ['prog'], n: 'Intenção de memorizar e estratégia' }, { f: ['am', 'om'], rel: 'alt', n: 'Impressão modal da série (auditiva ou visual, conforme a apresentação)' }, { f: ['mem'], n: 'Retenção e proteção contra a interferência' }, { f: ['prog'], n: 'Evocação ativa e controle das intrusões' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    tempo: 'Na etapa 2, o elo depende da modalidade: série ouvida, traço audioverbal; série vista, traço visual. Por isso a lesão temporal esquerda prejudica a série ouvida e poupa a vista (p. 131, 473). A sequência se repete a cada ensaio e forma a curva de aprendizagem.',
    links: [
      { f: 'prog', papel: 'Intenção de memorizar, estratégia ao longo dos ensaios, evocação ativa e controle do que se reproduz.', q: 'Curva de aprendizagem em platô: repete sempre as mesmas 3–4 palavras, sem o esforço de lembrar; intrusões e perseverações. O reconhecimento fica mais preservado que a reprodução ativa (II.5F, p. 340–342).' },
      { f: 'am', papel: 'Traços audioverbais da série ouvida.', q: 'Volume reduzido e inibição dos traços por interferência homogênea, só na modalidade auditivo-verbal (II.2E, p. 131; III.7B, p. 473).' },
      { f: 'om', papel: 'Traços visuais, quando a série é apresentada à vista.', q: 'Memória visual específica prejudicada; a série ouvida fica preservada.' },
      { f: 'mem', papel: 'Estabilidade dos traços frente à interferência, em qualquer modalidade.', q: 'Esquecimento por interferência em qualquer modalidade, com consciência do defeito (II.6, p. 367–369; III.7D, p. 478–483).' },
      { f: 'ativ', papel: 'Tônus que sustenta a impressão.', q: 'Rendimento flutuante e fadiga (II.6).' } ] },
  memoria_med: { nome: 'Memorização mediada (lógica)', ru: 'опосредованное (логическое) запоминание', ref: 'HCF III.7E, p. 483–485; II.5F, p. 344–345',
    hemE: "Os códigos de linguagem, nos quais a memorização voluntária se apoia (HCF, p. 381–382).",
    hemD: "O HCF não descreve uma contribuição direita própria para a memorização mediada. Pelo princípio geral, caberia ao direito o fundo de impressão direta (p. 383), mas é uma inferência, não um dado clínico descrito.",
    def: 'Conceito de Vigotski, desenvolvido por Leontiev (1931): memorizar uma palavra por meio de um signo auxiliar e depois reconstruí-la a partir dele. A figura não representa a palavra diretamente (guarda-chuva para “chuva”, casaco para “verão”). Na variante do pictograma, o próprio sujeito desenha o signo (p. 483–484). Forma-se nos pré-escolares e se consolida no início da escola.',
    etapas: [{ f: ['am', 'vis'], rel: 'sim', n: 'Palavra ouvida e figura vista' }, { f: ['prog'], n: 'Formação da cadeia de sentido entre palavra e signo' }, { f: ['mem'], n: 'Retenção' }, { f: ['vis'], n: 'Reapresentação da figura, em ordem aleatória' }, { f: ['prog'], n: 'Reconstrução da palavra pela conexão' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    tempo: 'A memorização deixa de ser impressão e passa a ser um ato intelectual em duas fases: formar a conexão (etapas 1–2) e usá-la como “aferentação de retorno” na evocação (etapas 4–5) (p. 484).',
    links: [
      { f: 'prog', papel: 'Escolha do signo, formação da cadeia de sentido e seu uso seletivo na evocação.', q: 'A figura desperta associações independentes da palavra; mesmo formada, a conexão não é usada na reprodução e a figura vira fonte de associações irrelevantes (p. 345, 484).' },
      { f: 'am', papel: 'Palavra a memorizar.', q: 'A memória direta cai, mas a via mediada fica disponível. Pacientes com lesões posteriores usam a conexão para compensar, e ela serve à reeducação (p. 345, 484).' },
      { f: 'vis', papel: 'Percepção do signo auxiliar, na memorização e de novo na evocação.', q: 'Com agnosia, o signo perde a função de apoio.' },
      { f: 'mem', papel: 'Retenção da conexão formada.', q: 'Só nas síndromes diencefálicas graves, com perturbação geral da memória, a conexão seletiva se perde (p. 484).' },
      { f: 'ativ', papel: 'Tônus.', q: 'Com fadiga, dificuldade ocasional de ligar a figura à palavra (p. 484).' } ] },
  memoria_inv: { nome: 'Memorização involuntária', ru: 'непроизвольное запоминание', ref: 'HCF p. 381–383 (Smirnov; Zinchenko; Luria e Simernitskaya, 1977)', pre: 'Luria chama esses dados de preliminares (p. 383).',
    hemE: "Com lesão parietotemporal esquerda, cai cerca de 30% (3–3,5 palavras), menos que a voluntária (−40%) (HCF, p. 382–383).",
    hemD: "É o componente que o hemisfério direito sustenta. Com lesão direita, cai cerca de 70% (1–1,5 palavra) e quase não melhora com repetições, enquanto a voluntária cai só 20–25%. A lesão direita perturba a impressão e a evocação diretas dos estímulos (HCF, p. 382–383; Kiyashchenko e cols., 1977).",
    def: 'O que fica retido como subproduto de outra atividade, sem tarefa de memorizar. No método de Smirnov e Zinchenko, o sujeito conta as letras das palavras escritas em cartões, ou separa as que começam por “K”, e só depois lhe perguntam que palavras eram. Na pessoa saudável rende menos que a voluntária: 4–5 contra 6–7 de 10 palavras (HCF, p. 382).',
    etapas: [{ f: ['prog'], n: 'Programa de outra tarefa (contar letras, classificar)' }, { f: ['vis', 'om'], rel: 'sim', n: 'Impressão direta das palavras, como subproduto' }, { f: ['mem'], n: 'Retenção e reprodução direta, a pedido posterior' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    tempo: 'Aqui o programa (etapa 1) não se dirige à memorização: ele organiza a atividade-alvo, e o traço se forma de passagem. Não há estratégia de evocação: a reprodução é direta.',
    links: [
      { f: 'prog', papel: 'Organiza a atividade-alvo; memorizar não é o objetivo. Para Zinchenko, o que se retém depende do lugar do material nessa atividade.', q: 'O HCF não traz dados de lesão frontal neste teste.' },
      { f: 'vis', papel: 'Percepção das palavras escritas nos cartões.', q: 'Sem dados próprios no HCF para este teste.' },
      { f: 'om', papel: 'Traço visual-verbal formado de passagem.', q: 'Sem dados próprios no HCF para este teste.' },
      { f: 'mem', papel: 'Retenção e reprodução direta.', q: 'Esquecimento por interferência em qualquer modalidade (II.6).' },
      { f: 'ativ', papel: 'Tônus.', q: 'Rendimento flutuante e fadiga (II.6).' } ] },
  pensamento: { hemE: "Operações verbal-lógicas. O programa se formula em fala.", hemD: "Avaliação direta da situação e monitoramento direto da ação em curso. Um paciente com lesão direita afirmava estar em duas cidades ao mesmo tempo, com as operações formais intactas: “depende do ponto de vista: e a teoria da relatividade?” (HCF, p. 377).", nome: 'Pensamento (resolução de problemas)', ru: 'интеллектуальная деятельность', ref: 'HCF II.2F, II.3H, II.4H, II.5G; III.12, p. 562–585',
    def: 'Análise das condições, formulação de uma estratégia, execução de operações sob o programa e comparação do resultado com as condições.',
    etapas: [{ f: ['am', 'esp'], rel: 'sim', n: 'Análise das condições: retê-las e captar suas relações' }, { f: ['prog'], n: 'Estratégia: esquema geral da solução' }, { f: ['kin'], n: 'Execução sucessiva das operações' }, { f: ['prog'], n: 'Comparação do resultado com as condições' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'prog', papel: 'Programa e verificação.', q: 'A análise das condições é saltada e substituída por operações impulsivas, sem comparar o resultado (II.5G, p. 345).' },
      { f: 'esp', papel: 'Relações lógico-gramaticais e espaciais das condições.', q: 'A estratégia é preservada, mas a operação concreta sobre relações falha, com consciência do erro (II.3H, p. 186).' },
      { f: 'am', papel: 'Retenção das condições verbais do problema.', q: 'As condições se perdem durante a solução (II.2F, p. 136).' },
      { f: 'kin', papel: 'Organização sucessiva das operações: passar de uma a outra.', q: 'Inércia e perseveração de uma operação já usada (II.4H, p. 241).' },
      { f: 'ativ', papel: 'Tônus.', q: 'Executa só uma etapa da operação (II.6).' } ] },
  construcao: { hemE: "Para Luria, a apractagnosia construtiva pode vir de lesão de qualquer lado, mas é mais grave com lesão occipitoparietal esquerda (relatado por Goldberg, p. 240).", hemD: "Orientação espacial direta. O paciente ignora o lado esquerdo do objeto ao desenhar (HCF, p. 377).", nome: 'Atividade construtiva (desenho, cubos de Kohs)', ru: 'конструктивная деятельность', ref: 'HCF II.3E; p. 348–349; III.6D, p. 464',
    def: 'Recodificar os “elementos de impressão” do modelo em “elementos de construção” e montá-los no espaço, comparando com o original (p. 348–349).',
    etapas: [{ f: ['vis', 'esp'], rel: 'sim', n: 'Análise do modelo' }, { f: ['prog'], n: 'Recodificação dos elementos de impressão em elementos de construção, e plano' }, { f: ['kin'], n: 'Montagem serial' }, { f: ['prog'], n: 'Comparação com o modelo' }],
    fundo: [{ f: 'ativ', n: 'tônus' }],
    links: [
      { f: 'ativ', papel: 'Tônus cortical que sustenta todo o curso da construção.', q: 'Rendimento flutuante e esgotamento ao longo da tarefa, com erros inespecíficos que crescem com a fadiga (HCF II.6; FN, p. 28–49).' },
      { f: 'esp', papel: 'Análise espacial do material.', q: 'Tenta a fase preliminar e percebe os erros, mas falha nas relações espaciais (parieto-occipital, p. 349).' },
      { f: 'vis', papel: 'Percepção da forma do modelo.', q: 'Erros de forma e de reconhecimento do modelo.' },
      { f: 'kin', papel: 'Execução serial.', q: 'Perseveração de traços no desenho e repetição de elementos.' },
      { f: 'prog', papel: 'Análise preliminar e comparação com o modelo.', q: 'Começa a montar a partir de um fragmento, sem examinar o modelo e sem compará-lo com o resultado (Tsvetkova, p. 349).' } ] }
};
const HEMI = 'Para Luria, a questão não é que funções estão “localizadas” em cada hemisfério, e sim que contribuição específica cada um dá ao sistema, já que todo processo complexo transcorre com a participação dos dois (HCF, p. 375). A hipótese vem de Vigotski: as funções superiores sintetizam o “tecido sensível” direto da experiência e sua reorganização por códigos verbais de origem social. O hemisfério esquerdo sustenta sobretudo os códigos; o direito, a base sensível direta e os componentes de fundo (HCF, p. 375–378). Luria ressalva que esses achados ainda eram preliminares (p. 384).';
/* ---------- Khomskaya (2003): acréscimos e grau de conhecimento ---------- */
AR[5].kh = "Khomskaya oscila entre duas classificações. No cap. 3, parte do 5 entra na zona nuclear somatossensorial, ou seja, secundária (p. 47–48). No cap. 21, 5 e 7 aparecem entre os secundários posteriores (p. 276). A ambiguidade está na própria escola, não só entre Poliakov e Goldberg.";
AR[7].kh = "Khomskaya põe o 7 na região parietal superior terciária, junto com o 40 (p. 48), mas no cap. 21 o lista entre os secundários (p. 276). Síndrome parietal superior: somatoparagnosias (“mão estranha”, partes do corpo aumentadas ou diminuídas) e perturbação do esquema corporal. À direita, anosognosia e hemissomatognosia esquerda (p. 280).";
AR[21].kh = "Khomskaya lista o 21 tanto entre os secundários quanto entre os terciários posteriores (p. 276). Retoma a divisão de Luria: T1 (zona nuclear auditiva) dá a síndrome da audição fonêmica; T2 (fronteira entre temporal e parieto-occipital) dá a afasia acústico-mnéstica, por inibição dos traços ou “equalização da intensidade dos traços” (p. 281).";
AR[22].kh = "À direita, a lesão temporal perturba a audição não verbal e musical (agnosia auditiva, amusia), a avaliação de ritmos (arritmia) e a prosódia da fala. Khomskaya nota que esses sintomas são típicos de destros sem sinais latentes de canhotismo (p. 282).";
AR[8].kh = "Khomskaya classifica o 8, com o 44 e o 45, como córtex motor pouco granular. O 4 e o 6 são agranulares; 9, 10, 11, 12, 46 e 47 são granulares, não motores (p. 49).";
AR[44].kh = "Khomskaya: no 44 estão bem desenvolvidas as camadas V e III, cujas células motoras controlam os movimentos orais e fonatórios (p. 50). Os neurônios das camadas III e IV de 44 e 45 são maiores à esquerda, e a ordenação vertical da camada III é maior em 44, 45, 22 e 41 esquerdos (p. 54).";
AR[45].kh = "A área total do giro frontal inferior (45) é maior à esquerda em destros (Khomskaya, p. 54). É córtex pouco granular, como 8 e 44 (p. 49).";
AR[6].kh = "Khomskaya separa duas síndromes pré-motoras. A superior desintegra a “melodia cinética” dos atos simples e compostos, com força e tônus relativamente preservados. A inferior esquerda dá a afasia motora eferente. Junto ao fator motor modalmente específico, a lesão pré-motora atinge também o fator inespecífico de mobilidade/inércia (p. 283–284).";
AR[11].kh = "Síndrome pré-frontal ínfero-medial (Khomskaya, p. 285–288): sem perseverações motoras e sem defeitos de gnose ou de fala; vigília baixa, esgotamento, desorientação no tempo e em si, euforia ou indiferença, irritabilidade; perda da seletividade das ligações semânticas, com confabulações. Comparada à temporal ínfero-medial, dá mais alterações de personalidade e menos crítica (p. 295).";
AR[47].kh = "Faz parte do córtex frontal ínfero-medial, que Khomskaya trata como elo cortical do sistema não específico, ou seja, da 1ª unidade (p. 285).";
AR[38].kh = "Os setores temporais ínfero-mediais pertencem ao 1º bloco. Sua lesão dá memória modalmente inespecífica (até o nível de Korsakov nas lesões massivas), paroxismos afetivos (pânico, tristeza, medo, com tempestade vegetativa, muitas vezes como aura epiléptica) e alterações da consciência. O paciente costuma manter a crítica (Khomskaya, p. 282–283, 295). Khomskaya diz que essas síndromes estão “ainda muito pouco estudadas”.";
AR[23].kh = "Síndrome do giro do cíngulo (Buklina, in Khomskaya, p. 294): memória modalmente inespecífica parecida com a dos pacientes frontais, perda da seletividade dos traços, defeitos de atenção, falta de crítica, reações emocionais inadequadas, contaminações e, nos casos graves, perturbação persistente da consciência. Os sintomas primários são os de memória e os emotivo-pessoais.";
AR[24].kh = "Síndrome do giro do cíngulo (Buklina, in Khomskaya, p. 294): memória modalmente inespecífica parecida com a dos pacientes frontais, perda da seletividade dos traços, defeitos de atenção, falta de crítica, reações emocionais inadequadas, contaminações e, nos casos graves, perturbação persistente da consciência. Os sintomas primários são os de memória e os emotivo-pessoais.";
AR[31].kh = "Síndrome do giro do cíngulo (Buklina, in Khomskaya, p. 294): memória modalmente inespecífica parecida com a dos pacientes frontais, perda da seletividade dos traços, defeitos de atenção, falta de crítica, reações emocionais inadequadas, contaminações e, nos casos graves, perturbação persistente da consciência. Os sintomas primários são os de memória e os emotivo-pessoais.";
AR[32].kh = "Síndrome do giro do cíngulo (Buklina, in Khomskaya, p. 294): memória modalmente inespecífica parecida com a dos pacientes frontais, perda da seletividade dos traços, defeitos de atenção, falta de crítica, reações emocionais inadequadas, contaminações e, nos casos graves, perturbação persistente da consciência. Os sintomas primários são os de memória e os emotivo-pessoais.";
DS.reticular.kh = "Khomskaya divide o sistema não específico em quatro níveis, cada um com sua síndrome: tronco inferior, diencefálico, límbico e cortical ínfero-medial. Tronco inferior: alteração do ciclo sono-vigília, esgotamento extremo, orientação preservada, crítica preservada; memória de curto prazo reduzida (3 a 4 de 10 palavras), muito sensível à interferência. Melhora com reforço da motivação e organização semântica do material. Os níveis baixos sustentam a ativação tônica, generalizada; os altos, a fásica e seletiva (p. 45–46, 292–293).";
DS.hipotalamo.kh = "Nível diencefálico (Khomskaya, p. 293–294): tem o mesmo fundo do tronco (sono-vigília, estado funcional baixo), mas com memória mais comprometida, sobretudo por interferência homogênea, e reatividade e instabilidade emocional, depressão ou leve euforia. Nas lesões massivas com hipertensão, quadro parecido com o frontal, sobretudo quando atinge os setores frontais inferiores. A estimulação de pontos do hipotálamo pode provocar euforia (Bekhtereva, in Khomskaya, p. 237).";
DS.hipocampo.kh = "Lesões do hipocampo, sobretudo bilaterais, dão perturbações graves e modalmente inespecíficas da memória, às vezes na forma de síndrome de Korsakov (Khomskaya, p. 294). As síndromes das demais formações límbicas estão, nas palavras dela, “menos estudadas”.";
DS.amigdala.kh = "Khomskaya inclui a amígdala entre as estruturas límbicas do 1º bloco, que regulam emoções basais (medo, prazer, cólera) e processos motivacionais (p. 47). Não descreve uma síndrome neuropsicológica própria da amígdala.";
DS.caudado.kh = "Síndrome do caudado (Buklina, in Khomskaya, p. 301–302). Lesão da cabeça: perseverações motoras nítidas; do corpo, mais fracas. Diferença lateral: o foco esquerdo dá sintomas audioverbais (alienação do sentido das palavras) e perturbação da avaliação de ritmos; o direito, perturbações espaciais e do desenho.";
TH.VL.kh = "Síndrome talâmica do VL, estudada antes e depois de cirurgia estereotáxica para Parkinson e distonia (Gagoshidze e Khomskaya, in Khomskaya, p. 300–301). Mistura sintomas anteriores (práxis dinâmica, programação e controle) e posteriores (análise e síntese espaciais). Khomskaya lê aí três fatores ao mesmo tempo: “dinâmico” (anterior), “espacial” (posterior) e “hemisférico” (o hemisfério como um todo). O VL esquerdo pesa mais no verbal; o direito, no pictórico-figurativo.";
TH.MD.kh = "O pré-frontal convexo é a área de projeção da parte parvicelular do núcleo dorsomedial (Khomskaya, p. 51).";
DS.mesencefalo.kh = "Nos traumatismos, as primeiras estruturas lesadas são as médias do tronco, com “desconexão” da consciência na fase aguda (Khomskaya, p. 292).";
DS.cerebelo.kh = "Khomskaya cita o cerebelo apenas entre os alvos de cirurgia estereotáxica (p. 299). Não descreve uma síndrome neuropsicológica cerebelar.";
DS.reticular.pre = "Khomskaya: as diferenças qualitativas entre os níveis do sistema não específico ainda dependem de métodos melhores para estudar memória, emoção, consciência e atenção (p. 296).";
DS.hipocampo.pre = "As síndromes límbicas são bem descritas pela neurologia e pela psiquiatria, mas “mal estudadas na neuropsicologia”, do ponto de vista da análise sindrômica (Khomskaya, p. 294).";
DS.amigdala.pre = "Sem síndrome neuropsicológica própria descrita (Khomskaya, p. 294).";
DS.caudado.pre = "A sindromologia neuropsicológica subcortical é “trabalho para o futuro” (Khomskaya, p. 302).";
DS.putamen.pre = "A sindromologia neuropsicológica subcortical é “trabalho para o futuro” (Khomskaya, p. 302).";
DS.palido.pre = "A sindromologia neuropsicológica subcortical é “trabalho para o futuro” (Khomskaya, p. 302).";
TH.VL.pre = "Dados de cirurgia estereotáxica. Khomskaya trata o conjunto das síndromes subcorticais como um estudo que “só agora começa” (p. 302).";
DS.cc_ant.pre = "Khomskaya: não foi feita ainda análise neuropsicológica detalhada dos pacientes com “cérebro dividido”; o quadro completo da síndrome não é conhecido (p. 297).";
DS.cc_med.pre = "Khomskaya: não foi feita ainda análise neuropsicológica detalhada dos pacientes com “cérebro dividido”; o quadro completo da síndrome não é conhecido (p. 297).";
DS.cc_post.pre = "Khomskaya: não foi feita ainda análise neuropsicológica detalhada dos pacientes com “cérebro dividido”; o quadro completo da síndrome não é conhecido (p. 297).";
DS.cerebelo.pre = "Nem o HCF nem Khomskaya descrevem uma síndrome neuropsicológica cerebelar. A leitura feita aqui vem de Poliakov.";
AR[11].pre = "As síndromes mediais e inferiores frontais estão menos estudadas que as convexas (Khomskaya, p. 289).";
AR[47].pre = "As síndromes mediais e inferiores frontais estão menos estudadas que as convexas (Khomskaya, p. 289).";
AR[38].pre = "As síndromes temporais ínfero-mediais estão “ainda muito pouco estudadas” (Khomskaya, p. 282).";
AR[28].pre = "As síndromes temporais ínfero-mediais estão “ainda muito pouco estudadas” (Khomskaya, p. 282).";
AR[35].pre = "As síndromes temporais ínfero-mediais estão “ainda muito pouco estudadas” (Khomskaya, p. 282).";
AR[36].pre = "As síndromes temporais ínfero-mediais estão “ainda muito pouco estudadas” (Khomskaya, p. 282).";
AR[23].pre = "As síndromes límbicas estão “mal estudadas na neuropsicologia” do ponto de vista da análise sindrômica (Khomskaya, p. 294).";
AR[24].pre = "As síndromes límbicas estão “mal estudadas na neuropsicologia” do ponto de vista da análise sindrômica (Khomskaya, p. 294).";
AR[31].pre = "As síndromes límbicas estão “mal estudadas na neuropsicologia” do ponto de vista da análise sindrômica (Khomskaya, p. 294).";
AR[32].pre = "As síndromes límbicas estão “mal estudadas na neuropsicologia” do ponto de vista da análise sindrômica (Khomskaya, p. 294).";
const PRELIM = [{"t": "Classificação dos fatores", "txt": "Há noções gerais sobre os fatores, mas não conhecimentos concretos e exatos sobre seus tipos e sua natureza, e a classificação ainda não foi elaborada.", "ref": "Khomskaya, p. 269", "go": ["f", "ativ"], "onde": "Toda a camada de fatores do mapa"}, {"t": "Base fisiológica dos fatores", "txt": "Dos três níveis de descrição de um fator (morfológico, fisiológico, psicológico), o fisiológico é o menos estudado. Luria o chamava de tarefa de uma “fisiologia psicologicamente orientada”.", "ref": "Khomskaya, p. 268", "go": ["f", "inerc"], "onde": "Os fatores inespecíficos, como mobilidade/inércia, são justamente os que têm natureza neurodinâmica"}, {"t": "Hemisfério direito", "txt": "As síndromes do hemisfério direito só começaram a ser estudadas sistematicamente há pouco. Os métodos lurianos visam os níveis arbitrários, conscientes e mediados pela fala, e precisam de técnicas novas para os níveis automatizados. A natureza dos fatores das síndromes direitas ainda está por esclarecer.", "ref": "Khomskaya, p. 61; HCF, p. 384", "go": ["f", "hemi"], "onde": "A seção “Os dois hemisférios” de cada sistema funcional"}, {"t": "Estratégias hemisféricas", "txt": "Não há classificação única aceita das dicotomias hemisféricas. Tempo/espaço, análise/síntese e conhecido/desconhecido ainda não têm confirmação neuropsicológica exata.", "ref": "Khomskaya, p. 270–271", "go": ["f", "hemi"], "onde": "Fatores hemisféricos"}, {"t": "Comunicação inter-hemisférica", "txt": "O estudo sistemático desses fatores “só agora começa”. Ainda não foi feita análise neuropsicológica detalhada do “cérebro dividido”.", "ref": "Khomskaya, p. 272, 297", "go": ["d", "cc_post"], "onde": "Corpo caloso e comissura anterior"}, {"t": "Síndromes subcorticais", "txt": "A sindromologia das estruturas profundas é “trabalho para o futuro”. A literatura estrangeira descreve funções isoladas, não síndromes. Em comparação com as corticais, essas síndromes são mais difusas, multifatoriais e de recuperação diferente.", "ref": "Khomskaya, p. 272, 302", "go": ["d", "caudado"], "onde": "Núcleos da base, tálamo (VL)"}, {"t": "Sistema límbico", "txt": "As síndromes límbicas são bem descritas na neurologia e na psiquiatria, mas mal estudadas na neuropsicologia; das demais formações límbicas, além de hipocampo e cíngulo, sabe-se menos ainda.", "ref": "Khomskaya, p. 294", "go": ["d", "hipocampo"], "onde": "Hipocampo, amígdala, cíngulo (23, 24, 31, 32)"}, {"t": "Níveis do sistema não específico", "txt": "Distinguir qualitativamente as síndromes de cada nível (tronco, diencéfalo, límbico, córtex ínfero-medial) depende de métodos melhores para memória, emoção, consciência e atenção.", "ref": "Khomskaya, p. 296", "go": ["d", "reticular"], "onde": "Formação reticular, hipotálamo, regiões mediobasais"}, {"t": "Córtex inferior e medial", "txt": "As síndromes do córtex inferior e medial estão bem menos estudadas que as do convexo. As temporais ínfero-mediais, “ainda muito pouco”. Restam “muitos buracos negros” nas síndromes corticais.", "ref": "Khomskaya, p. 276, 282, 289", "go": ["b", 11], "onde": "Áreas 11, 47, 38, 28, 35, 36"}, {"t": "Lobos frontais", "txt": "O “mistério das funções dos lobos frontais” (Teuber) ainda não foi decifrado: a variabilidade da síndrome pré-frontal convexa não se explica só pelo tamanho da lesão.", "ref": "Khomskaya, p. 285", "go": ["b", 9], "onde": "Campos 9, 10, 46"}, {"t": "Esfera emotivo-pessoal", "txt": "Estamos longe de compreender toda a estrutura psicológica das reações e estados emocionais. Os correlatos psicofisiológicos dos transtornos emocionais nas lesões locais ainda são casos isolados.", "ref": "Khomskaya, p. 244", "go": ["f", "hemi"], "onde": "Diferenças emocionais entre os hemisférios (ver fatores hemisféricos)"}, {"t": "Cerebelo", "txt": "Nem o HCF nem Khomskaya descrevem uma síndrome neuropsicológica cerebelar. O mapa usa a leitura de Poliakov (mecanismo analisador-coordenador).", "ref": "HCF; Khomskaya, p. 299", "go": ["d", "cerebelo"], "onde": "Cerebelo, vermis, denteado"}];
/* Articulações entre sistemas. t: usa (a usa b como componente), inv (processos inversos), reg (a regula b), gen (a se forma a partir de b), forma (a é forma particular de b), sel (a organiza a seletividade de b), fundo (a se apoia em b como fundo). */
const RTIP = {
  usa: ['usa como componente', 'entra como componente em', '#3b6ea8'],
  inv: ['é o processo inverso de', 'é o processo inverso de', '#7a5aa6'],
  reg: ['regula', 'é regulado por', '#b3122e'],
  gen: ['forma-se a partir de', 'é base genética de', '#2f8a5b'],
  forma: ['é forma particular de', 'tem como forma particular', '#c27c0e'],
  sel: ['dá seletividade a', 'tem a seletividade organizada por', '#5a6270'],
  fundo: ['apoia-se, como fundo, em', 'é o fundo de', '#8a8f98'] };
const REDE = [
  { a: 'escrita', b: 'compreensao', t: 'usa', n: 'A escrita começa pela análise fonêmica da palavra, a mesma operação que sustenta a compreensão da fala ouvida. Por isso a lesão temporal esquerda atinge os dois sistemas (HCF, p. 78–80).' },
  { a: 'escrita', b: 'praxis', t: 'usa', n: 'O último elo da escrita é uma melodia cinética, organizada como qualquer ato motor voluntário. A lesão pré-motora desintegra ambos (HCF, p. 81).' },
  { a: 'escrita', b: 'fala', t: 'gen', n: 'A escrita se forma sobre a fala oral, mas exige tomar consciência da composição sonora e da estrutura da frase, que na fala oral ficam automáticas (Vigotski, Pensamento e linguagem, cap. 6).' },
  { a: 'leitura', b: 'escrita', t: 'inv', n: 'A leitura faz o caminho inverso: do grafema ao fonema e ao sentido (HCF, p. 543–544).' },
  { a: 'leitura', b: 'percepcao', t: 'usa', n: 'O primeiro elo da leitura é a percepção visual dos grafemas, com seus traços e sua estrutura espacial.' },
  { a: 'leitura', b: 'compreensao', t: 'usa', n: 'O último elo é a compreensão do sentido do lido, com as mesmas operações lógico-gramaticais da fala ouvida.' },
  { a: 'leitura', b: 'fala', t: 'usa', n: 'Na leitura em voz alta, a forma fonética é realizada pelo aparelho articulatório da fala expressiva.' },
  { a: 'repeticao', b: 'compreensao', t: 'usa', n: 'Repetir exige primeiro discriminar o modelo ouvido.' },
  { a: 'repeticao', b: 'fala', t: 'usa', n: 'E depois articulá-lo com os mesmos elos da fala expressiva, sem a etapa do plano (HCF III.9C).' },
  { a: 'fala', b: 'nomeacao', t: 'usa', n: 'Escolher as palavras do enunciado é exercer a função nominativa dentro do esquema da frase (HCF III.9D).' },
  { a: 'nomeacao', b: 'percepcao', t: 'usa', n: 'Nomear começa pela percepção (ou evocação) da imagem do objeto e pela escolha dos seus traços essenciais, antes de escolher a palavra entre alternativas (HCF, p. 515).' },
  { a: 'fala', b: 'praxis', t: 'reg', n: 'A fala, externa e depois interna, formula a “tarefa motora” e inibe as ações irrelevantes. Na criança, a ação começa “partilhada entre duas pessoas” e passa a ser regulada pela própria fala (HCF, p. 292). Na lesão frontal, a fala perde essa função reguladora (p. 327).' },
  { a: 'fala', b: 'atencao', t: 'reg', n: 'A instrução verbal dá valor de sinal aos estímulos e reorganiza a ativação. A atenção voluntária é, por origem, mediada pela fala (HCF, p. 266; Khomskaya, p. 193).' },
  { a: 'pensamento', b: 'fala', t: 'usa', n: 'O programa da solução é formulado em fala interna, contraída e predicativa (Vigotski; HCF, p. 230, 243).' },
  { a: 'pensamento', b: 'compreensao', t: 'usa', n: 'A análise das condições de um problema verbal depende de compreender suas relações lógico-gramaticais.' },
  { a: 'pensamento', b: 'fala', t: 'gen', n: 'A atividade intelectual começa como operações externas desdobradas, que se sintetizam em “ações mentais” sustentadas pela fala interna (Vigotski; Leontiev; Galperin; HCF, p. 34, 243).' },
  { a: 'calculo', b: 'pensamento', t: 'forma', n: 'A resolução de problemas aritméticos é o material clássico do estudo do pensamento (HCF III.12).' },
  { a: 'construcao', b: 'pensamento', t: 'forma', n: 'Luria trata a atividade construtiva como “operações intelectuais no espaço” (HCF III.6D, p. 464).' },
  { a: 'construcao', b: 'percepcao', t: 'usa', n: 'A análise do modelo é uma percepção ativa da sua estrutura espacial.' },
  { a: 'construcao', b: 'praxis', t: 'usa', n: 'A montagem é executada como ação motora voluntária.' },
  { a: 'atencao', b: 'percepcao', t: 'sel', n: 'A percepção é uma busca ativa; a atenção voluntária mantém a hipótese e o exame da figura.' },
  { a: 'atencao', b: 'memoria', t: 'sel', n: 'A memorização voluntária exige manter a tarefa de memorizar; no paciente frontal, as duas caem juntas (HCF II.5F).' },
  { a: 'atencao', b: 'pensamento', t: 'sel', n: 'Khomskaya chama de atenção intelectual a seletividade das operações do pensamento; ela depende sobretudo do frontal (p. 192, 199).' },
  { a: 'atencao', b: 'praxis', t: 'sel', n: 'A atenção motora: a negligência de uma mão nos movimentos bimanuais (Khomskaya, p. 198).' },
  { a: 'memoria_med', b: 'memoria', t: 'gen', n: 'Leontiev (1931) mostrou que a memória mediada se desenvolve a partir da direta, com o uso crescente de signos auxiliares. Nas lesões posteriores, a via mediada compensa a direta (HCF, p. 344–345, 484).' },
  { a: 'memoria_med', b: 'pensamento', t: 'usa', n: 'Formar a cadeia de sentido entre palavra e signo é uma operação intelectual: o teste diz respeito “igualmente” à memória e ao intelecto (HCF, p. 483).' },
  { a: 'memoria', b: 'memoria_inv', t: 'fundo', n: 'Para Luria, a capacidade de imprimir e reter traços é a condição de “fundo”, e a tarefa de memorizar e evocar é a forma básica do processo (HCF, p. 381).' },
  { a: 'memoria', b: 'repeticao', t: 'usa', n: 'Reter e reproduzir uma série ouvida usa a retenção audioverbal e a articulação da repetição.' },
  { a: 'compreensao', b: 'memoria', t: 'usa', n: 'Compreender uma frase longa exige reter a série de palavras até convertê-la num esquema.' },
  {"a": "nomeacao", "b": "pensamento", "t": "usa", "n": "Nomear é classificar: a palavra designa o objeto incluindo-o numa categoria, e o significado da palavra é uma generalização, a unidade de pensamento e fala (Vigotski, Pensamento e linguagem). Na nomeação, é preciso destacar os traços essenciais do objeto antes de escolher a palavra (HCF, p. 515)."},
  {"a": "percepcao", "b": "pensamento", "t": "usa", "n": "A percepção é um processo ativo: busca de pistas, formulação de hipóteses e verificação, com códigos de linguagem que dão ao percebido caráter geral, categórico (FN, p. 199–200). Por isso se aproxima do pensamento; e problemas apresentados visualmente começam por uma análise perceptiva."},
  {"a": "escrita", "b": "pensamento", "t": "usa", "n": "A escrita espontânea começa por um pensamento a formular e pelo plano do texto; e a escrita, por sua vez, obriga a tornar o pensamento consciente e desdobrado, sem o apoio da situação e do interlocutor (Vigotski, Pensamento e linguagem, cap. 6)."},
  {"a": "calculo", "b": "escrita", "t": "usa", "n": "O cálculo escrito apoia-se na escrita dos números e de sua estrutura posicional; o registro alivia a retenção dos resultados intermediários (HCF III.11)."},
  {"a": "atencao", "b": "escrita", "t": "sel", "n": "A atenção voluntária mantém a seletividade da escrita: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "leitura", "t": "sel", "n": "A atenção voluntária mantém a seletividade da leitura: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "fala", "t": "sel", "n": "A atenção voluntária mantém a seletividade da fala expressiva: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "compreensao", "t": "sel", "n": "A atenção voluntária mantém a seletividade da compreensão: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "repeticao", "t": "sel", "n": "A atenção voluntária mantém a seletividade da repetição: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "nomeacao", "t": "sel", "n": "A atenção voluntária mantém a seletividade da nomeação: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "calculo", "t": "sel", "n": "A atenção voluntária mantém a seletividade da cálculo: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "construcao", "t": "sel", "n": "A atenção voluntária mantém a seletividade da construção: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."},
  {"a": "atencao", "b": "memoria_med", "t": "sel", "n": "A atenção voluntária mantém a seletividade da memorização mediada: sustenta a instrução ou a intenção ao longo da tarefa e inibe o irrelevante (FN, p. 228–242)."}
];
const FSEC = [
  { t: 'Fatores sistematizados por Luria (1966; 1981)', d: 'Os nove fatores clássicos, nas zonas de associação (campos secundários e terciários) e na 1ª unidade. A gnose e a memória visual aparecem separadas, como a gnose e a memória auditivas. Nenhum fator isolado é responsável por uma função psicológica superior.', subs: [
    { t: '1ª unidade · tônus e vigília', fs: ['ativ'] },
    { t: '2ª unidade · recepção, análise e armazenamento', fs: ['fon', 'am', 'vis', 'om', 'cin', 'esp'] },
    { t: '3ª unidade · programação, regulação e controle', fs: ['kin', 'prog'] }] },
  { t: 'Ampliações de Khomskaya (2003), em discussão', d: 'Fatores que Khomskaya acrescenta à lista de Luria. São as nomenclaturas mais amplas e menos circunscritas da literatura; ficam aqui como articulação com o modelo dela, sem o mesmo estatuto dos nove clássicos.', subs: [
    { t: 'Modalmente inespecíficos (grupo 2)', fs: ['mem', 'inerc', 'espont'] },
    { t: 'Entre os hemisférios (grupos 4 e 5)', fs: ['hemi', 'comm'] },
    { t: 'Estruturas profundas e condições gerais (grupos 6 e 7)', fs: ['geral'], nota: 'O grupo 6 não tem cor própria: em Luria, as lesões profundas (HCF II.6) aparecem pela ativação e pela memória; as síndromes descritas por Khomskaya estão nas fichas do caudado, do VL, do hipocampo e do cíngulo.' }] }];
const KNOTA = { mem: 'em Luria, função da 1ª unidade (ativação)', inerc: 'menção vaga em Luria', espont: 'proposta de Khomskaya; menção vaga em Luria', hemi: 'em Luria, localização inter-hemisférica, não fator', comm: 'em Luria, síndromes de comissurotomia (HCF, p. 381)', geral: 'condições gerais, não localizáveis' };
const FSUB = FSEC.flatMap(x => x.subs);
const FORD = FSEC.flatMap(s => s.subs.flatMap(x => x.fs));
const FS = {}; for (const s in SYS) for (const l of SYS[s].links) (FS[l.f] = FS[l.f] || []).push(s);
return { ZN, AN, UN, AR, TH, THT, ZL, AL, MEC, GR, THU, DS, MIDLINE, FAT, ELEM, FA, FD, GN, GE, GRD, SYS, FS, HEMI, FGRP, PRELIM, FSUB, FSEC, KNOTA, FORD, REDE, RTIP };
})();
