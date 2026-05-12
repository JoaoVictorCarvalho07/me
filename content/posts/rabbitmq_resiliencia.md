---
tags:
  -
  - rabbitmq
  - resiliencia
  - outbox-pattern
  - spring-boot
  - backend
aliases:
  - RabbitMQ Resiliente
  - Outbox Pattern
  - Spring AMQP Resiliência

title: RabbitMQ - quando a aplicação não pode depender do broker
desc: Como tornar uma aplicação Spring Boot resiliente à indisponibilidade do RabbitMQ usando auto-startup false, listener recovery e Outbox Pattern
date: 12 Mai 2026
tag: Backend
readTime: 4 min
thumb: assets/img/blog/rabbitmq.webp
---

**Categoria:** Backend · Arquitetura · Spring Boot  
**Tags:** rabbitmq, resiliência, outbox-pattern, spring-boot, java  
**Data:** 2026-05-12

---

## O problema que ninguém conta

Quando você lê sobre RabbitMQ nos tutoriais, tudo parece simples: instale o broker, configure o Spring, publique mensagens, consuma mensagens. Funciona perfeitamente no ambiente local porque o broker está sempre lá, sempre de pé.

O problema aparece em produção, na madrugada, quando o servidor do RabbitMQ reinicia por uma atualização de sistema operacional. Ou quando a rede cai por 3 minutos. Ou quando a equipe de infra precisa migrar o broker para outro host.

**A sua aplicação Spring Boot simplesmente não sobe.**

E aí você descobre que a configuração padrão do Spring AMQP assume que o broker _sempre estará disponível_ na inicialização. Se não estiver, a aplicação lança exceção e morre.

---

## Por que isso acontece?

O Spring Boot, por padrão, tenta:

1. Conectar ao RabbitMQ durante o startup
2. Declarar exchanges, filas e bindings
3. Registrar os listeners (`@RabbitListener`)

Se qualquer um desses passos falhar, a aplicação inteira falha. Em um sistema real onde o RabbitMQ é **opcional** para o núcleo do negócio isso é inaceitável.

---

## A solução em duas partes

### Parte 1. Não subir os listeners automaticamente

A primeira mudança é simples mas poderosa:

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        auto-startup: false
```

Com isso, os listeners ficam registrados mas **não iniciam** junto com a aplicação. O sistema sobe normalmente mesmo sem o broker.

---

### Parte 2. Tentar reconectar periodicamente

Subir sem o broker resolve o crash, mas agora os listeners nunca vão processar mensagens. Precisamos de um mecanismo que, quando o broker voltar, ligue os listeners automaticamente.

```java
@Component
@RequiredArgsConstructor
public class RabbitListenerInitializer {

    private final RabbitListenerEndpointRegistry registry;

    @Scheduled(fixedDelay = 300_000) // tenta a cada 5 minutos
    public void startListenersIfBrokerAvailable() {
        if (!registry.isRunning()) {
            try {
                registry.start();
            } catch (AmqpException e) {
                // broker ainda offline - tenta de novo no próximo ciclo
            }
        }
    }
}
```

Simples. A cada 5 minutos, o sistema verifica se o broker voltou e tenta ligar os listeners. Se falhar, espera o próximo ciclo. Se funcionar, tudo volta ao normal sem reiniciar a aplicação.

---

### Parte 3. O que fazer com mensagens quando o broker está fora?

Aqui entra o **Outbox Pattern**. Em vez de perder a mensagem quando a publicação falha, você a salva no banco de dados:

```
Tentativa de publicar → broker offline → salva no outbox (banco)
                                           ↓
                       quando o broker volta → processa o outbox
```

Isso garante que **nenhuma mensagem seja perdida**, mesmo que o broker fique horas indisponível.

---

## O resultado

Com essas três peças juntas:

| Cenário                     | Comportamento                                |
| --------------------------- | -------------------------------------------- |
| Broker offline no startup   | Aplicação sobe normalmente                   |
| Broker cai durante operação | Mensagens são salvas no outbox               |
| Broker volta                | Listeners reiniciam, outbox é processado     |
| Broker nunca volta          | Sistema funciona sem notificações, sem crash |

---

## Lição aprendida

Sistemas resilientes não assumem que a infraestrutura vai estar sempre disponível. Eles **degradam graciosamente**: continuam funcionando no que é essencial e recuperam funcionalidades secundárias quando os recursos voltam.

RabbitMQ é uma ferramenta poderosa, mas ela é o meio e não o fim. Sua aplicação não pode depender dela para respirar.
