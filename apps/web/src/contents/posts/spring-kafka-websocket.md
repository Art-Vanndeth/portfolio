---
title: "Spring Boot, Kafka, and WebSocket"
publishedAt: '2025-01-09'
category: Coding
tags: 
  - React
  - Web Development
  - Clean Code
  - Software Development
  - Software Engineering
summary: "In the world of application development, real-time communication has become an essential feature. Whether it’s a social media app, a collaborative tool, or a live event streaming platform, the ability to exchange information in real-time enhances the user experience significantly. In this article, we will delve into the process of building a real-time chat application using Spring Boot, Kafka, and WebSocket."
banner: /images/banner/posts/kafka-websocket.png
alt: "Spring Boot, Kafka, and WebSocket: A Practical Approach to Real-Time Messaging"
mathjax: false
---

In the world of application development, real-time communication has become an essential feature. Whether it’s a social media app, a collaborative tool, or a live event streaming platform, the ability to exchange information in real-time enhances the user experience significantly. In this article, we will delve into the process of building a real-time chat application using Spring Boot, Kafka, and WebSocket.

![Vandeth's Go-To Stack for Building Software](/images/banner/posts/kafka-websocket.png)

# Spring

## Function Components

Once our Spring Boot application is set up, we can start integrating it with Kafka. Kafka is a distributed streaming platform that is used for building real-time data pipelines and streaming apps. It is horizontally scalable, fault-tolerant, and incredibly fast, which makes it ideal for our real-time chat application.

First, let’s create `Message` class and `MessageType` class: These classes represent the message object and the types of messages that can be sent.

```java {5}
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    private MessageType type;
    private String content;
    private String sender;
    private String sessionId;
}
```

```java {5}
public enum MessageType {
    CHAT,
    CONNECT,
    DISCONNECT
}
```

After that, create `KafkaConsumerConfig` class:

```java {5}
// KafkaConsumerConfig
@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, Message> consumerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9094");
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "chat");
        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(configProps, new StringDeserializer(),
                new JsonDeserializer<>(Message.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Message> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Message> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
}
```

# Python

## Docstring and Type Hint

Next, in our `KafkaProducerConfig` class, we configure our Kafka producer. The producer is responsible for sending messages to Kafka. We use the `KafkaTemplate` provided by Spring Kafka to send messages to Kafka. Here’s what the `KafkaProducerConfig` class looks like:

```java
@Configuration
public class KafkaProducerConfig {
    @Value(value = "${kafka.bootstrapAddress}")
    private String bootstrapAddress;

    @Bean
    public ProducerFactory<String, Message> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, Message> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
```

```python
def func(arg1: int, arg2: str) -> str:
    """summary of function

    Args:
        arg1 (int): description of arg1
        arg2 (str): description of arg2

    Returns:
        str: description of return value
    """
    return
```

## Naming Convention

We follow the naming convention as follows:

1. class name: `CamelCase`
2. method/function name: `snake_case`
3. private method/function name: `_snake_case`
4. variable name: `snake_case`
5. private variable name: `_snake_case`
6. read only constant name: `UPPER_SNAKE_CASE`

# Coding Patterns

## Larger files > many small components

Many people advocate for clean, modular, and maintainable code. While these principles are essential, there are drawbacks when we scale this approach to large codebases, especially those with millions of lines of code.

Over-splitting components can lead to excessive files, which increases maintenance costs, introduces unnecessary complexity, and can even make the codebase harder to understand. In extreme cases, the team may spend far more time deciphering the logic of the codebase than actually implementing features or fixing bugs. For instance, it becomes a frustrating and time-consuming process if we want to edit a minor feature or fix a tiny bug but need to navigate through dozens of files to fully grasp the logic. It's akin to wanting to cut down a single tree but having to traverse an entire forest.

As a result, it's essential to strike a balance between maintaining clean code and ensuring long-term maintainability so that the codebase remains understandable and manageable without becoming overly fragmented.

> Copy/paste is better than the wrong abstraction - [Lee Robinson (leerob)](https://leerob.com/), VP of Product [@vercel](https://vercel.com/home) ([Source](https://leerob.com/n/stack))

> The wrong duplication is better than the wrong abstraction.

[^1]: [Why "he" does not write React.FC on each function?](https://stackoverflow.com/questions/71189879/why-he-does-not-write-react-fc-on-each-function)
