# print-fixer — printdefect.com

Diagnóstico de defeito de impressão 3D (FDM). Você escolhe o sintoma e recebe as causas
ranqueadas por probabilidade real, cada uma com **o nome exato do parâmetro e o caminho
do menu** no Cura, OrcaSlicer/Bambu Studio e PrusaSlicer.

Terceiro site do projeto. Os outros: haul-calc.com (caminhoneiro) e cutfillcalc.com
(terraplanagem). **Documento-mestre do projeto no repo `projeto automatic money`.**

---

## Por que este nicho (2026-08-04)

Escolhido depois de ~38 buscas de SERP nesta sessão. É o **primeiro nicho testado que
quebra a premissa de calculadora** — não é calculadora, é diagnosticador.

**Estrutura competitiva (verificada no google.com direto, não por proxy):**

| Consulta | Quem rankeia |
|---|---|
| `why is my 3d print stringing` | Reddit (r/3Dprinting, r/FixMyPrint), UltiMaker support, 3 vídeos do YouTube, **bloco "Discussions and forums"**, Simplify3D, Bambu Wiki |
| `pla print settings temperature speed` | Reddit, Creality, FormFutura, Snapmaker, **Facebook**, SOVOL, Raise3D, All3DP |

- **Zero fazendas de calculadora de IA.** Único nicho em ~38 buscas onde não apareceu
  nenhuma (`toolgrit`, `infinitycalculator`, `usecalcpro`, `calcshed`, `workshopcalc` etc.).
- **Zero carrossel de produto** — intenção informacional pura. (Descartei equipamento de
  jardim exatamente por isso: o Google lê como compra e serve Amazon/Home Depot.)
- O Google exibe o bloco **"Discussions and forums"**, o que ele faz quando não encontra
  conteúdo autoritativo bom.
- Incumbentes são dos tipos mais atacáveis: fórum, vídeo e **blog de fabricante** — e
  fabricante tem viés estrutural (a Creality recomenda o que favorece a Creality).

**A lacuna real:** todo mundo para em "diminua a retração". Isso não é acionável — o
parâmetro tem nome diferente em cada slicer e o valor certo depende de direct drive vs
Bowden. Aqui cada correção nomeia o parâmetro, o caminho do menu e um valor inicial.

## Por que é melhor que os dois primeiros

Com **anúncios liberados** (decisão do Arthur em 04/08), a régua virou volume, não carteira:
receita ≈ visitas × RPM. O cutfillcalc tem teto de ~390 cliques/mês ≈ US$5. Impressão 3D é
hobby de massa, ordem de grandeza acima.

## Manutenção: zero, e isso não é aspiração

A física do PLA não muda. Nenhuma tabela por jurisdição, nenhum feed, nenhuma API, nenhum
dado que envelhece. Diferente do IFTA (trimestral) do haul-calc. Revisar quando surgir
slicer novo relevante — ou seja, raramente.

## Critérios de morte (definidos ANTES do lançamento, imutáveis)

Lançamento: **2026-08-04**.

| Critério | Meta | Prazo |
|---|---|---|
| Impressões orgânicas somadas | **≥ 500** | 60 dias → ~2026-10-03 |
| Alguma página no top 20 | posição média ≤ 20 | 90 dias → ~2026-11-02 |

Falhou qualquer um ⇒ o nicho morre; reaproveitar o template. Mesma régua dos outros dois.

**Ressalvas honestas (não apagar):**
1. Volume não foi medido no Keyword Planner — a decisão saiu de estrutura de SERP, não de
   número. É a aposta mais "de leitura" das três.
2. Nicho onde estar errado é óbvio pro usuário. Conteúdo impreciso é pior que ausente aqui.
3. Reddit rankeia muito forte desde o acordo Google–Reddit. Ganhar dele exige ser
   nitidamente melhor, não só existir.

## Regra de footprint (não-negociável)

- **Zero links entre este site e os outros dois do Arthur.**
- Identidade visual distinta: haul-calc = asfalto escuro/âmbar · cutfillcalc = blueprint
  claro · **printdefect = oficina escura, verde de filamento, motivo de camadas**.
- Search Console e analytics separados.

## Stack

Astro estático → GitHub → Cloudflare Pages. Build `npm run build`, saída `dist`, branch
`master`. Sem backend. As 12 páginas de defeito são geradas por rota dinâmica
`[slug].astro` a partir de `src/data/defects.ts` — editar a base, não as páginas.

## Páginas

`/` diagnosticador interativo (12 sintomas × extrusora × material) · `/filament-settings/`
tabela de referência · 12 páginas de defeito: stringing, first-layer-not-sticking, warping,
under-extrusion, layer-shifting, elephant-foot, ringing-ghosting, layer-separation,
blobs-and-zits, pillowing, over-extrusion, clogged-nozzle.
