# Git Flow

> Guia de fluxo Git do projeto: previsível o bastante para evitar caos, flexível o bastante para não travar entregas.

Este documento define como branches, commits, pull requests, releases, hotfixes e tags devem ser usados neste projeto.

A intenção não é transformar o Git em uma burocracia sagrada. A intenção é criar um fluxo em que qualquer pessoa consiga entender **o que está sendo feito**, **onde está sendo feito**, **por que foi feito** e **quando pode ir para produção**.

---

## Sumário

- [Objetivos](#objetivos)
- [Visão geral do fluxo](#visão-geral-do-fluxo)
- [Branches principais](#branches-principais)
- [Branches de trabalho](#branches-de-trabalho)
- [Padrão de nomes de branches](#padrão-de-nomes-de-branches)
- [Commits](#commits)
- [Pull requests](#pull-requests)
- [Code review](#code-review)
- [Merge strategy](#merge-strategy)
- [Release flow](#release-flow)
- [Hotfix flow](#hotfix-flow)
- [Tags e versionamento](#tags-e-versionamento)
- [Sincronização com a base](#sincronização-com-a-base)
- [Resolução de conflitos](#resolução-de-conflitos)
- [Rollback e revert](#rollback-e-revert)
- [Proteções recomendadas](#proteções-recomendadas)
- [Comandos úteis](#comandos-úteis)
- [Checklist antes do merge](#checklist-antes-do-merge)
- [Anti-padrões](#anti-padrões)
- [Regra de ouro](#regra-de-ouro)

---

## Objetivos

Este Git Flow existe para garantir:

1. **Rastreabilidade**: cada alteração deve ter contexto.
2. **Segurança**: código instável não deve chegar em produção por acidente.
3. **Velocidade sustentável**: entregar rápido sem criar dívida operacional invisível.
4. **Colaboração**: reduzir conflitos, retrabalho e decisões implícitas.
5. **Previsibilidade**: qualquer pessoa deve saber em qual branch trabalhar.

---

## Visão geral do fluxo

O projeto utiliza um fluxo baseado em branches principais e branches temporárias.

```txt
main
 ├── develop
 │    ├── feature/user-authentication
 │    ├── fix/login-validation
 │    └── chore/update-dependencies
 │
 ├── release/1.4.0
 │
 └── hotfix/1.4.1-critical-auth-fix
```

Fluxo comum:

```txt
feature/* → develop → release/* → main
```

Fluxo emergencial:

```txt
hotfix/* → main → develop
```

---

## Branches principais

### `main`

Branch de produção.

Tudo que está em `main` deve representar código pronto, estável e potencialmente publicável.

Regras:

- Não fazer commit direto em `main`.
- Recebe merge apenas de `release/*` ou `hotfix/*`.
- Deve possuir proteção de branch.
- Deve gerar tag de versão quando houver release.

```txt
main = produção
```

---

### `develop`

Branch de integração.

Recebe funcionalidades, correções e melhorias que serão preparadas para a próxima release.

Regras:

- Não deve conter código quebrado.
- Recebe merge de `feature/*`, `fix/*`, `chore/*`, `refactor/*`, entre outras branches de trabalho.
- Deve estar sempre próxima de um estado publicável.

```txt
develop = próxima versão em construção
```

---

## Branches de trabalho

Branches de trabalho são temporárias. Elas existem para resolver uma tarefa específica e devem ser removidas depois do merge.

### `feature/*`

Use para novas funcionalidades. 
 
```bash 
git checkout develop 
git pull origin develop 
git checkout -b feature/user-authentication
```

Exemplos:

```txt
feature/user-authentication
feature/payment-checkout
feature/dashboard-filters
```

---

### `fix/*`

Use para correções que não são emergenciais em produção.

```txt
fix/login-validation
fix/cart-total-calculation
fix/email-template-layout
```

---

### `hotfix/*`

Use para correções críticas em produção.

Hotfix nasce a partir de `main`, não de `develop`.

```bash
git checkout main
git pull origin main
git checkout -b hotfix/1.4.1-critical-auth-fix
```

Depois de finalizado, deve ser integrado em:

1. `main`
2. `develop`

```txt
hotfix/* → main
hotfix/* → develop
```

---

### `release/*`

Use para estabilizar uma versão antes da publicação.

Release nasce a partir de `develop`.

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.4.0
```

Durante a release, só devem entrar:

- Correções de bugs.
- Ajustes de documentação.
- Ajustes de configuração necessários para publicação.
- Pequenas melhorias de estabilidade.

Não devem entrar novas funcionalidades grandes.

---

### `chore/*`

Use para tarefas operacionais ou de manutenção.

```txt
chore/update-dependencies
chore/configure-linter
chore/update-ci-cache
```

---

### `refactor/*`

Use para mudanças internas sem alteração intencional de comportamento.

```txt
refactor/user-service
refactor/payment-module
refactor/routes-structure
```

---

### `docs/*`

Use para documentação.

```txt
docs/gitflow-guide
docs/api-usage
docs/onboarding
```

---

### `test/*`

Use para criação ou ajuste de testes.

```txt
test/user-service
test/checkout-flow
test/auth-guards
```

---

## Padrão de nomes de branches

Use nomes em **kebab-case**, claros e objetivos.

### Formato recomendado

```txt
<tipo>/<descrição-curta>
```

Exemplos:

```txt
feature/create-user-profile
fix/password-reset-token
hotfix/1.4.1-payment-timeout
release/2.0.0
chore/update-node-version
refactor/checkout-service
```

### Com ID da tarefa

Se o time usa issue tracker, inclua o identificador.

```txt
feature/PROJ-123-create-user-profile
fix/PROJ-456-password-reset-token
```

### Evite

```txt
minha-branch
ajustes
coisas
wip
bugfix
nova-feature
branch-do-joao
```

A branch deve explicar a intenção sem exigir uma reunião espiritual para decifrá-la.

---

## Commits

Commits devem ser pequenos, rastreáveis e escritos no imperativo.

### Formato recomendado

```txt
<tipo>: <descrição curta>
```

Exemplos:

```txt
feat: add user authentication
fix: validate password reset token
chore: update dependencies
refactor: simplify checkout service
docs: add git flow guide
test: add user repository tests
```

---

## Tipos de commit

Use os tipos abaixo como padrão:

```txt
feat      nova funcionalidade
fix       correção de bug
docs      documentação
style     formatação sem mudança de lógica
refactor  refatoração sem mudança de comportamento
test      criação ou ajuste de testes
chore     manutenção, configs, dependências
ci        mudanças em pipeline/CI
build     mudanças de build ou empacotamento
perf      melhoria de performance
revert    reversão de commit
```

---

## Boas práticas para commits

### Faça commits pequenos

Cada commit deve representar uma ideia coesa.

```txt
Bom:
feat: add login form
feat: connect login form to auth service
fix: show invalid credentials message
```

```txt
Evite:
feat: add login, fix cart, update dependencies and change layout
```

### Escreva no imperativo

```txt
Bom:
fix: handle expired session
```

```txt
Evite:
fix: handled expired session
fix: handling expired session
```

### Explique contexto quando necessário

Quando a mudança não for óbvia, use corpo do commit.

```txt
fix: prevent duplicate payment capture

The payment provider can send the same webhook more than once.
This change stores the external event id before processing the capture.
```

---

## Pull requests

Todo trabalho deve chegar em branches principais por Pull Request.

Um bom PR deve responder:

- O que foi alterado?
- Por que foi alterado?
- Como testar?
- Existe impacto visual, técnico ou operacional?
- Existe risco conhecido?

---

## Template de Pull Request

Use este modelo quando o repositório não tiver outro template oficial.

```md
## Descrição

Explique brevemente o que este PR altera.

## Motivação

Por que essa mudança é necessária?

## Tipo de mudança

- [ ] Feature
- [ ] Fix
- [ ] Hotfix
- [ ] Refactor
- [ ] Docs
- [ ] Chore
- [ ] Test

## Como testar

1. Execute `...`
2. Acesse `...`
3. Verifique `...`

## Evidências

Inclua prints, logs, vídeos curtos ou exemplos de request/response quando fizer sentido.

## Riscos

- [ ] Baixo
- [ ] Médio
- [ ] Alto

Explique riscos conhecidos, se existirem.

## Checklist

- [ ] Código testado localmente
- [ ] Testes automatizados atualizados
- [ ] Documentação atualizada
- [ ] Sem segredos ou credenciais no diff
- [ ] Sem código morto ou logs desnecessários
```

---

## Code review

Code review não é caça ao erro. É engenharia em par assíncrona.

### Quem abre o PR deve

- Manter o PR pequeno e focado.
- Explicar a intenção da mudança.
- Adicionar evidências quando necessário.
- Responder comentários com contexto.
- Evitar empurrar complexidade para o revisor.

### Quem revisa deve

- Avaliar clareza, comportamento, segurança e manutenção.
- Sugerir melhorias com respeito.
- Diferenciar bloqueios reais de preferências pessoais.
- Aprovar quando o código estiver bom o suficiente para evoluir.

### Vocabulário recomendado

Use comentários claros e colaborativos:

```txt
blocking: isso pode quebrar o fluxo de pagamento quando o provider reenviar o webhook.
```

```txt
suggestion: talvez possamos extrair essa regra para uma função nomeada.
```

```txt
question: existe algum caso em que userId pode vir vazio aqui?
```

```txt
nit: pequeno ajuste de legibilidade, não bloqueante.
```

---

## Merge strategy

A estratégia recomendada é:

```txt
Squash merge para branches de trabalho → develop
Merge commit para release/hotfix → main
```

### Squash merge

Use squash para PRs de feature, fix, chore, docs, refactor e test.

Vantagens:

- Histórico mais limpo.
- Uma entrada por PR.
- Fácil revert de uma entrega inteira.

Exemplo de mensagem final:

```txt
feat: add user authentication
```

---

### Merge commit

Use merge commit em releases e hotfixes para preservar o ponto histórico da entrega.

```bash
git checkout main
git merge --no-ff release/1.4.0
```

---

### Rebase

Use rebase apenas para atualizar sua branch local antes do PR ou durante organização de commits.

```bash
git checkout feature/user-authentication
git fetch origin
git rebase origin/develop
```

Evite rebase em branches compartilhadas sem alinhamento com o time.

---

## Release flow

Release é o momento de estabilizar, validar e publicar uma versão.

### 1. Criar branch de release

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.4.0
git push origin release/1.4.0
```

### 2. Estabilizar release

Permitido:

```txt
fix: correct invoice status mapping
docs: update changelog
chore: adjust production config
```

Evite:

```txt
feat: add new checkout experience
refactor: rewrite authentication module
```

### 3. Abrir PR para `main`

```txt
release/1.4.0 → main
```

### 4. Gerar tag

Depois do merge em `main`:

```bash
git checkout main
git pull origin main
git tag -a v1.4.0 -m "Release v1.4.0"
git push origin v1.4.0
```

### 5. Sincronizar `develop`

Após publicar, garanta que `develop` receba os ajustes feitos na release.

```bash
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

---

## Hotfix flow

Hotfix é reservado para falhas críticas em produção.

Use quando:

- Produção está quebrada.
- Existe falha de segurança.
- Existe perda financeira ou operacional relevante.
- Existe bug bloqueando fluxo essencial.

Não use hotfix para:

- Ajustes cosméticos.
- Refatorações.
- Melhorias sem urgência.
- Funcionalidades novas.

### 1. Criar branch a partir de `main`

```bash
git checkout main
git pull origin main
git checkout -b hotfix/1.4.1-critical-auth-fix
git push origin hotfix/1.4.1-critical-auth-fix
```

### 2. Corrigir e testar

```bash
git add .
git commit -m "fix: prevent login failure on expired cache"
git push origin hotfix/1.4.1-critical-auth-fix
```

### 3. Abrir PR para `main`

```txt
hotfix/1.4.1-critical-auth-fix → main
```

### 4. Criar tag de patch

```bash
git checkout main
git pull origin main
git tag -a v1.4.1 -m "Hotfix v1.4.1"
git push origin v1.4.1
```

### 5. Propagar para `develop`

```bash
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

---

## Tags e versionamento

Use versionamento semântico quando aplicável.

```txt
MAJOR.MINOR.PATCH
```

Exemplo:

```txt
v2.3.1
```

### Quando incrementar

```txt
MAJOR: mudanças incompatíveis
MINOR: novas funcionalidades compatíveis
PATCH: correções compatíveis
```

Exemplos:

```txt
v1.0.0  primeira versão estável
v1.1.0  adiciona funcionalidade compatível
v1.1.1  corrige bug compatível
v2.0.0  alteração incompatível de API
```

### Tags anotadas

Prefira tags anotadas:

```bash
git tag -a v1.4.0 -m "Release v1.4.0"
```

---

## Changelog

Sempre que houver release, atualize o changelog quando o projeto possuir um.

Formato sugerido:

```md
## [1.4.0] - 2026-07-02

### Added
- Added user authentication flow.

### Fixed
- Fixed password reset token validation.

### Changed
- Improved checkout error handling.
```

Categorias úteis:

```txt
Added
Changed
Deprecated
Removed
Fixed
Security
```

---

## Sincronização com a base

Antes de abrir PR, atualize sua branch com a base.

### Opção recomendada: rebase local

```bash
git checkout feature/user-authentication
git fetch origin
git rebase origin/develop
```

Se houver conflitos, resolva, teste e continue:

```bash
git status
git add .
git rebase --continue
```

Depois envie:

```bash
git push --force-with-lease
```

> Use `--force-with-lease`, não `--force`. Ele é mais seguro porque evita sobrescrever trabalho remoto inesperado.

---

## Resolução de conflitos

Conflito não é erro moral. É apenas o Git pedindo contexto humano.

Passos recomendados:

1. Leia os dois lados do conflito.
2. Entenda a intenção das mudanças.
3. Preserve comportamento esperado.
4. Rode testes.
5. Se necessário, chame a pessoa autora da outra alteração.

Durante conflito:

```txt
<<<<<<< HEAD
código da branch atual
=======
código da branch sendo integrada
>>>>>>> branch-name
```

Depois de resolver:

```bash
git add .
git rebase --continue
```

ou, em caso de merge:

```bash
git add .
git commit
```

---

## Rollback e revert

Para desfazer mudança já publicada, prefira `git revert`.

```bash
git revert <commit-hash>
```

Isso cria um novo commit desfazendo a alteração, mantendo o histórico seguro.

Evite reescrever histórico de branches públicas como `main` e `develop`.

### Reverter merge commit

```bash
git revert -m 1 <merge-commit-hash>
```

Use com atenção e valide o resultado.

---

## Proteções recomendadas

Configure proteção para `main` e `develop`.

### Para `main`

Recomendado:

- Bloquear push direto.
- Exigir Pull Request.
- Exigir aprovação mínima.
- Exigir pipeline verde.
- Exigir branch atualizada antes do merge.
- Restringir quem pode fazer merge.
- Bloquear force push.
- Bloquear deleção da branch.

### Para `develop`

Recomendado:

- Bloquear push direto, exceto em casos definidos pelo time.
- Exigir Pull Request.
- Exigir pipeline verde.
- Exigir pelo menos uma aprovação quando possível.

---

## Comandos úteis

### Criar feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### Enviar branch

```bash
git push origin feature/my-feature
```

### Atualizar branch local

```bash
git fetch origin
git rebase origin/develop
```

### Ver histórico resumido

```bash
git log --oneline --graph --decorate --all
```

### Desfazer alterações locais não commitadas

```bash
git restore .
```

### Remover arquivos staged

```bash
git restore --staged .
```

### Apagar branch local

```bash
git branch -d feature/my-feature
```

### Apagar branch remota

```bash
git push origin --delete feature/my-feature
```

### Criar tag

```bash
git tag -a v1.4.0 -m "Release v1.4.0"
git push origin v1.4.0
```

---

## Checklist antes do merge

Antes de fazer merge, valide:

- [ ] A branch segue o padrão de nome.
- [ ] O PR tem descrição clara.
- [ ] A mudança tem escopo controlado.
- [ ] Os commits fazem sentido ou foram squashados.
- [ ] Não há credenciais, tokens ou segredos no diff.
- [ ] Testes relevantes foram executados.
- [ ] Pipeline está verde.
- [ ] Documentação foi atualizada quando necessário.
- [ ] Não há logs temporários ou código morto.
- [ ] O reviewer entendeu o objetivo da mudança.
- [ ] A branch está atualizada com a base.

---

## Anti-padrões

Evite estes comportamentos:

### Commit direto em `main`

```txt
main não é laboratório.
```

### Branch eterna

Branches antigas acumulam conflitos, contexto perdido e medo.

```txt
Se a branch virou fóssil, divida a entrega.
```

### PR gigante

PR grande demais reduz qualidade do review.

```txt
Se ninguém consegue revisar com calma, o PR está grande demais.
```

### Commit genérico

```txt
Evite:
fix: ajustes
feat: coisas
update
wip
```

### Misturar assuntos

Não corrija bug, refatore módulo, atualize dependência e altere layout no mesmo PR sem motivo forte.

### Resolver conflito no escuro

Conflito resolvido sem entender intenção costuma virar bug fantasma.

---

## Exemplo completo de jornada

### Criando uma feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/PROJ-123-create-user-profile
```

### Trabalhando

```bash
git add .
git commit -m "feat: add user profile entity"
git commit -m "feat: create user profile endpoint"
git commit -m "test: add user profile endpoint tests"
```

### Atualizando com a base

```bash
git fetch origin
git rebase origin/develop
```

### Enviando

```bash
git push origin feature/PROJ-123-create-user-profile
```

### Abrindo PR

```txt
feature/PROJ-123-create-user-profile → develop
```

### Após aprovação

```txt
Squash merge
```

### Limpando branch

```bash
git branch -d feature/PROJ-123-create-user-profile
git push origin --delete feature/PROJ-123-create-user-profile
```

---

## Política de emergência

Quando produção estiver em risco, velocidade importa, mas rastreabilidade continua importando.

Fluxo mínimo aceitável:

1. Criar `hotfix/*` a partir de `main`.
2. Corrigir o menor escopo possível.
3. Testar o caminho crítico.
4. Abrir PR curto.
5. Aprovar com prioridade.
6. Fazer merge em `main`.
7. Criar tag.
8. Propagar para `develop`.
9. Registrar causa e prevenção depois.

Depois da emergência, faça um post-mortem leve:

```md
## O que aconteceu?

## Qual foi o impacto?

## Como corrigimos?

## Como evitamos recorrência?

## Ações futuras
```

---

## Acordos do time

Este documento define o padrão, mas o time pode adaptar detalhes quando houver motivo claro.

Mudanças no fluxo devem ser:

- Documentadas.
- Comunicadas.
- Aplicadas de forma consistente.
- Revisadas depois de algum tempo.

Git Flow bom não é o mais complexo. É o que o time realmente consegue seguir com qualidade.

---

## Regra de ouro

> Branch é intenção. Commit é memória. Pull Request é conversa. Release é compromisso.

Use Git como se estivesse deixando um mapa para alguém atravessar uma tempestade às três da manhã, sem você por perto. O histórico deve contar a verdade com clareza suficiente para salvar tempo, produção e sanidade.
