# Conventions

> Guia de convenções do projeto para manter o código previsível, legível e fácil de evoluir.

Este documento define padrões de nomenclatura, organização e boas práticas para variáveis, constantes, arquivos, funções, componentes e demais elementos do código.

---

## Sumário

- [Princípios gerais](#princípios-gerais)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Variáveis globais](#variáveis-globais)
- [Demais variáveis](#demais-variáveis)
- [Constantes](#constantes)
- [Funções e métodos](#funções-e-métodos)
- [Classes, tipos e interfaces](#classes-tipos-e-interfaces)
- [Arquivos e diretórios](#arquivos-e-diretórios)
- [Componentes](#componentes)
- [Booleans](#booleans)
- [Coleções](#coleções)
- [Eventos e handlers](#eventos-e-handlers)
- [Async, promises e estados remotos](#async-promises-e-estados-remotos)
- [Comentários](#comentários)
- [Checklist antes do commit](#checklist-antes-do-commit)

---

## Princípios gerais

Toda convenção neste projeto deve servir a três objetivos:

1. **Clareza**: o nome deve revelar intenção.
2. **Consistência**: padrões iguais para problemas iguais.
3. **Evolução segura**: código fácil de refatorar sem quebrar comportamento.

Prefira nomes explícitos a nomes curtos demais.

```ts
// Bom
const authenticatedUser = getAuthenticatedUser();

// Evite
const usr = getAuthenticatedUser();
```

Use abreviações apenas quando forem amplamente conhecidas no domínio do projeto.

```ts
// Aceitável se API for um termo comum no projeto
const apiResponse = await fetchUser();

// Evite abreviações obscuras
const usrAccCfg = getUserAccountConfig();
```

---

## Variáveis de ambiente

Variáveis de ambiente devem usar **UPPERCASE** com palavras separadas por `_`.

### Regra

```txt
UPPERCASE_SNAKE_CASE
```

### Exemplos

```env
NODE_ENV=production
DATABASE_URL=postgres://localhost:5432/app
API_BASE_URL=https://api.example.com
JWT_SECRET=change-me
FEATURE_FLAGS_ENABLED=true
```

### Recomendações

- Use nomes descritivos e orientados ao propósito.
- Evite nomes genéricos como `TOKEN`, `KEY` ou `URL`.
- Agrupe por domínio quando fizer sentido.
- Nunca exponha segredos em código versionado.

```env
# Bom
PAYMENTS_API_KEY=...
EMAIL_PROVIDER_TOKEN=...
AUTH_JWT_SECRET=...

# Evite
KEY=...
TOKEN=...
SECRET=...
```

### Acesso no código

Ao mapear variáveis de ambiente para código, normalize em um objeto de configuração.

```ts
export const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
```

---

## Variáveis globais

Variáveis globais devem usar **camelCase**.

### Regra

```txt
camelCase
```

### Exemplos

```ts
let currentLocale = "pt-BR";
let activeTheme = "dark";
let applicationReady = false;
```

### Recomendações

Evite variáveis globais sempre que possível. Quando forem necessárias, elas devem:

- Ter um propósito claro.
- Ter nome descritivo.
- Ser centralizadas em um módulo específico.
- Evitar estado mutável desnecessário.

```ts
// Bom
export const globalConfig = {
  defaultLocale: "pt-BR",
  fallbackTheme: "light",
};

// Evite
globalThis.data = {};
```

Para valores globais imutáveis, prefira `const`.

```ts
export const applicationName = "MyApp";
```

---

## Demais variáveis

Para as demais variáveis, use a estratégia que melhor comunique intenção e escopo.

### Padrão principal

Use **camelCase** para variáveis locais, parâmetros e propriedades comuns.

```ts
const userName = "Ada Lovelace";
const totalAmount = 199.9;
const createdAt = new Date();
```

### Quando usar nomes mais específicos

Prefira nomes que expressem o papel da variável no fluxo.

```ts
// Bom
const pendingInvoices = invoices.filter(
  (invoice) => invoice.status === "pending",
);
const selectedUserId = request.params.userId;

// Evite
const list = invoices.filter((invoice) => invoice.status === "pending");
const id = request.params.userId;
```

### Variáveis temporárias

Variáveis curtas são aceitáveis apenas em escopos pequenos e óbvios.

```ts
const doubledNumbers = numbers.map((n) => n * 2);
```

Se a lógica crescer, use nomes descritivos.

```ts
const doubledNumbers = numbers.map((number) => number * 2);
```

---

## Constantes

Use **UPPERCASE_SNAKE_CASE** para constantes realmente fixas e compartilhadas.

```ts
export const MAX_RETRY_ATTEMPTS = 3;
export const DEFAULT_PAGE_SIZE = 20;
export const SESSION_COOKIE_NAME = "session_id";
```

Use **camelCase** para constantes locais derivadas ou específicas de uma função.

```ts
function calculateDiscount(total: number) {
  const minimumAmountForDiscount = 100;
  return total >= minimumAmountForDiscount ? total * 0.9 : total;
}
```

### Regra prática

- Valor global, imutável e reutilizado: `UPPERCASE_SNAKE_CASE`.
- Valor local ou derivado: `camelCase`.

---

## Funções e métodos

Funções e métodos devem usar **camelCase** e começar com verbo quando representam ação.

```ts
function createUser() {}
function updateInvoiceStatus() {}
function calculateTotalAmount() {}
function normalizeEmail() {}
```

### Prefixos recomendados

Use prefixos que indiquem intenção:

```ts
getUserById(); // Busca ou retorna dados
createOrder(); // Cria uma entidade
updateProfile(); // Atualiza algo existente
removeItem(); // Remove algo
calculateTotal(); // Calcula valor
formatCurrency(); // Formata valor
validatePayload(); // Valida entrada
normalizeEmail(); // Normaliza dado
parseDate(); // Converte formato
```

### Evite nomes vagos

```ts
// Evite
function handleData() {}
function processThing() {}
function doStuff() {}

// Melhor
function normalizeCustomerPayload() {}
function processPaymentWebhook() {}
function syncUserPreferences() {}
```

---

## Classes, tipos e interfaces

Classes, tipos, interfaces e enums devem usar **PascalCase**.

```ts
class UserRepository {}

type UserProfile = {
  id: string;
  name: string;
};

interface PaymentGateway {
  charge(amount: number): Promise<void>;
}

enum InvoiceStatus {
  Pending = "pending",
  Paid = "paid",
  Cancelled = "cancelled",
}
```

### Interfaces

Não use prefixo `I` por padrão.

```ts
// Bom
interface UserService {}

// Evite
interface IUserService {}
```

Use prefixos apenas quando houver um motivo forte e consistente no projeto.

---

## Arquivos e diretórios

Use **kebab-case** para arquivos e diretórios comuns.

```txt
user-service.ts
payment-gateway.ts
invoice-status.ts
create-user-form.tsx
```

```txt
src/
  modules/
    users/
      user-service.ts
      user-repository.ts
      user-routes.ts
```

### Arquivos de componentes

Para componentes, use **PascalCase** quando o ecossistema do projeto favorecer essa leitura.

```txt
Button.tsx
UserCard.tsx
CreateUserForm.tsx
```

Se o projeto já usa `kebab-case` para componentes, mantenha a consistência.

```txt
button.tsx
user-card.tsx
create-user-form.tsx
```

> Consistência local vence preferência individual.

---

## Componentes

Componentes devem usar **PascalCase**.

```tsx
function UserCard() {
  return <article />;
}

export function CreateUserForm() {
  return <form />;
}
```

Props devem usar **camelCase**.

```tsx
type UserCardProps = {
  userName: string;
  avatarUrl?: string;
  isActive: boolean;
};
```

---

## Booleans

Booleans devem soar como perguntas respondidas por `true` ou `false`.

Use prefixos como:

- `is`
- `has`
- `can`
- `should`
- `was`
- `will`

```ts
const isAuthenticated = true;
const hasPermission = false;
const canEditProfile = true;
const shouldRetryRequest = false;
const wasEmailVerified = true;
const willExpireSoon = false;
```

Evite nomes ambíguos.

```ts
// Evite
const active = true;
const permission = false;

// Melhor
const isActive = true;
const hasPermission = false;
```

---

## Coleções

Coleções devem usar nomes no plural.

```ts
const users = [];
const pendingInvoices = [];
const enabledFeatureFlags = [];
```

Para mapas, dicionários ou agrupamentos, deixe a estrutura clara no nome.

```ts
const usersById = new Map<string, User>();
const invoicesByCustomerId = new Map<string, Invoice[]>();
const permissionsByRole = {
  admin: ["create", "update", "delete"],
};
```

---

## Eventos e handlers

Handlers devem usar prefixo `handle`.

```tsx
function handleSubmit() {}
function handleUserSelect() {}
function handleModalClose() {}
```

Props de eventos devem usar prefixo `on`.

```tsx
type ButtonProps = {
  onClick: () => void;
  onFocusChange?: (focused: boolean) => void;
};
```

Exemplo completo:

```tsx
function SaveButton({ onClick }: ButtonProps) {
  function handleClick() {
    onClick();
  }

  return <button onClick={handleClick}>Salvar</button>;
}
```

---

## Async, promises e estados remotos

Funções assíncronas devem deixar claro quando fazem operações externas.

```ts
async function fetchUserById(userId: string) {}
async function requestPasswordReset(email: string) {}
async function syncCustomerData() {}
```

Estados de requisição devem ser explícitos.

```ts
const isLoading = false;
const isSubmitting = false;
const hasFailed = false;
const errorMessage = null;
```

Evite estados genéricos.

```ts
// Evite
const loading = false;
const error = null;

// Melhor
const isUserLoading = false;
const userLoadingError = null;
```

---

## Comentários

Comentários devem explicar **por que** algo existe, não apenas **o que** o código faz.

```ts
// Bom: explica a decisão
// Mantemos o timeout abaixo de 5s para evitar bloqueio em integrações legadas.
const REQUEST_TIMEOUT_MS = 4500;
```

Evite comentários redundantes.

```ts
// Evite
// Soma dois números
const total = price + tax;
```

Quando possível, melhore o nome antes de adicionar um comentário.

---

## Checklist antes do commit

Antes de abrir um pull request, verifique:

- [ ] Variáveis de ambiente estão em `UPPERCASE_SNAKE_CASE`.
- [ ] Variáveis globais estão em `camelCase`.
- [ ] Variáveis locais comunicam intenção claramente.
- [ ] Booleans usam prefixos como `is`, `has`, `can` ou `should`.
- [ ] Coleções usam nomes no plural.
- [ ] Funções começam com verbos claros.
- [ ] Classes, tipos, interfaces e componentes usam `PascalCase`.
- [ ] Arquivos seguem o padrão definido pelo projeto.
- [ ] Comentários explicam decisões, não obviedades.
- [ ] O código está consistente com o contexto ao redor.

---

## Regra de ouro

> Se um nome exige explicação, ele ainda não está pronto.

Escreva nomes como se o próximo dev que fosse ler o código estivesse cansado, com café frio ao lado e uma issue urgente para resolver. Clareza é gentileza. Consistência é arquitetura invisível.
