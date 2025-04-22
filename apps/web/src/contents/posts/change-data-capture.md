---
title: "Design Financial Fraud Detection system based on CDC(Change Data Capture) technology and Real Time Data Streaming processing"
publishedAt: '2025-01-31'
category: Life
tags:
  - Introduction
  - Art Vandeth
  - Software Engineering
  - Chun-Ho Lin
  - Hugo Lin
summary: "What is Real Time Streaming processing and why we need it ?"
banner: /images/banner/posts/change-data-capture/cdc.png
alt: "What is Real Time Streaming processing and why we need it ?"
mathjax: true
---

## What is Real Time Streaming processing and why we need it ?

Real time streaming processing is ingesting data from source at time , process it and notify to destination by extracting valuable insights. Unlike traditional batch processing, which deals with static sets of data, streaming processing enables organizations to make sense of information as it arrives, providing a dynamic and instantaneous approach to data analysis. In some cases it is crucial to make a decision based on real time data flow processing and this processing insights can also have huge business impaction. Benefit of real-time streaming approach is that you can identify or react immediately to changes, events or trends as they occur, enabling faster decision-making and more timely responses. We call it “real-time” but in fact it happens near real-time with some millisecond differences.

## What is Change Data Capture(CDC)

Change data capture (CDC) refers to the process of identifying and capturing changes(like insert/update/delete) made to data in a database and then delivering those changes in real-time to a downstream process or system. By identifying and capturing only the changes to the data, CDC helps optimize data replication and integration processes, reducing the amount of data that needs to be transferred and processed. Overall, CDC is a valuable technique for maintaining data consistency across various databases and systems in environments where real-time or near-real-time data updates are crucial. For example by using CDC technology you can replicate your data another database with low latency. Another example can be you can capture data in database and publish these events to messaging systems (like Kafka, RabbitMQ) or push these data capture to NoSQL databases.

## Design Financial Real-time Fraud Detection based on CDC(Change Data Capture) technology and Real Time Data Streaming processing

> In this post our task is to design Real Time (or near real time) financial fraud detection system which will identify suspicious transaction activities within 1 hours sliding window for each individual users which happened in different countries. After detected suspicious activities we visualize it in our analytics dashboard and also we will send push notification and mail to user , at the same time we will update user_profile “suspicious_activities” flag to “true” o block next transactions.

## Note: this design is to recommended apply for highly loaded systems.

![Vandeth's Change Data Capture](/images/banner/posts/change-data-capture/cdc.png)

As you can see in the diagrams there are many steps and I will elucidate each step for you to make it all clear.

- Storing transactional operations in a relational database is imperative because it ensures ACID compliance, thereby guaranteeing the reliability, consistency, and integrity of the transactions. In our design we have used MySQL(but you can also use PostgreSQL, Oracle and other relational database systems)
- Debezium — Kafka Connector to Capture changes in database and emit them to Kafka Cluster
- Kafka Broker — Store events in event streaming platform.
- Spring Cloud Stream Kafka Streams binder — consume events and process events by using Kafka streams. Publish processed result to destination kafka topic.
- Consumers of destination topic. Analytics , notification service, other services and etc .

## Storing transactional operations

Imagine we have “transactions” and “user_profile” tables in our database and designed to store transaction details and user profile related information in those tables respectively. You can see these two table’s properties in the below (note: The abstraction of these tables and their attributes has been streamlined to elucidate the overarching methodology within this article; however, real-world instances may exhibit divergent characteristics and encompass a multitude of properties)

![Storing transactional operations](/images/banner/posts/change-data-capture/cdc-db.png)

Let’s assume that many transactions happened recently (transactions inserted to database). Next step is to capture these events by using debezium connector and send them to kafka cluster.

## Capture changes in database by using Debezium connector and emit to Kafka Cluster

### Debezium connector for MySQL

MySQL has a binary log (binlog ) that records all operations in the order in which they are committed to the database. This includes changes to table schemas as well as changes to the data in tables. MySQL uses the binlog for replication and recovery. The Debezium MySQL connector reads the binlog file, produces change events for row-level INSERT, UPDATE, and DELETE operations (also it is able to read schema changes), and emits the change events to Kafka topics.

Supported MySQL topologies

## The Debezium MySQL connector supports the following MySQL topologies:

- Standalone
- Primary and replica
- High available clusters
- Multi-primary
- Hosted 

### In our design we have used Primary and replica

The Debezium MySQL connector can follow one of the primary servers or one of the replicas (if that replica has its binlog enabled), but the connector sees changes in only the cluster that is visible to that server. Generally, this is not a problem except for the multi-primary topologies.

The connector records its position in the server’s binlog, which is different on each server in the cluster. Therefore, the connector must follow just one MySQL server instance. If that server fails, that server must be restarted or recovered before the connector can continue.

Lets imagine 3 transactions happened — accordingly 5 EUR, 10000 EUR, 25000 EUR with user_id - 1 in 3 different countries in small duration. Our connector will read these changes and send it to Kafka broker. In order connector to able send these changes to Kafka broker we should have source topics for each tables in Kafka broker. Either we can create these source topics by manually in Kafka cluster or if these topics are not exists in Kafka broker in that case Debezium connector is capable to create these topics for us with name ${db_name}.${table_name} . You are also able to customize autocreated topic details in Debezium connector configuration file. As we named our database as “payment” then our Kafka source topics will be created with these names “payment.transactions” and “payment.user_profile” .

### Storing events in event streaming platform

### After emit events to Kafka cluster,

our “payment.user_profile” kafka topic will look like this (in the below code block)

```json5
//payment.user_profile topic description

//lets assume json in the below describes data inside offset-0
{
  "before": null,
  "after": {
    "id": 1,
    "name": "John",
    "surname": "Doe",
    "middle_name": "Smith",
    "phone_number" : "+372 12345678",
    "mail_address" : "john.doe@gmail.com",
    "suspicious_activity": false
  },
  "source": {
    "version": "1.5.0.Final",
    "connector": "mysql",
    "name": "payment",
    "ts_ms": 1677649205000,
    "snapshot": "false",
    "db": "payment",
    "table": "user_profile",
    "server_id": 1,
    "gtid": null,
    "file": "mysql-bin.000004",
    "pos": 126,
    "row": 0,
    "thread": 1,
    "query": null
  },
  "op": "c",
  "ts_ms": 1677649205274
}
```

### Our “payment.transactions” kafka topic will look like this(in the below code block).

```json5
//payment.transactions topic description

//lets assume json in the below describes data inside offset-0
{
  "before": null,
  "after": {
    "user_id": 1,
    "amount": 5.0000,
    "currency": "EUR",
    "type": "purchase",
    "country": "Estonia",
    "timestamp": "2023-12-05T14:32:00Z"
  },
  "source": {
    "version": "1.5.0.Final",
    "connector": "mysql",
    "name": "payment",
    "ts_ms": 1677649115000,
    "snapshot": "false",
    "db": "payment",
    "table": "transactions",
    "server_id": 1,
    "gtid": null,
    "file": "mysql-bin.000003",
    "pos": 123,
    "row": 0,
    "thread": 1,
    "query": null
  },
  "op": "c",
  "ts_ms": 1677649115274
}
```

```json5
//lets assume json in the below describes data inside offset-1
{
  "before": null,
  "after": {
    "user_id": 1,
    "amount": 10000.0000,
    "currency": "EUR",
    "type": "purchase",
    "country": "Netherland",
    "timestamp": "2023-12-05T14:35:01Z"
  },
  "source": {
    "version": "1.5.0.Final",
    "connector": "mysql",
    "name": "payment",
    "ts_ms": 1677649152000,
    "snapshot": "false",
    "db": "payment",
    "table": "transactions",
    "server_id": 1,
    "gtid": null,
    "file": "mysql-bin.000003",
    "pos": 124,
    "row": 1,
    "thread": 1,
    "query": null
  },
  "op": "c",
  "ts_ms": 1677649152500
}
```

```json5
//lets assume json in the below describes data inside offset-2
{
  "before": null,
  "after": {
    "user_id": 1,
    "amount": 25000.0000,
    "currency": "EUR",
    "type": "purchase",
    "country": "Poland",
    "timestamp": "2023-12-05T14:35:50Z"
  },
  "source": {
    "version": "1.5.0.Final",
    "connector": "mysql",
    "name": "payment",
    "ts_ms": 1677649200000,
    "snapshot": "false",
    "db": "payment",
    "table": "transactions",
    "server_id": 1,
    "gtid": null,
    "file": "mysql-bin.000003",
    "pos": 125,
    "row": 2,
    "thread": 1,
    "query": null
  },
  "op": "c",
  "ts_ms": 1677649200500
}
```

As a data serialization is important factor when reading and writing to kafka topic , I recommend to use Apache Avro. Apache Avro is a data serialization framework that provides a compact binary format for data interchange. It is often used in big data processing frameworks like Apache Kafka and Apache Hadoop. Avro uses a schema to define the structure of the data, and this schema can be provided in JSON format. Next step is to consume data from both topics and process it by using Spring Cloud Stream Kafka Binder(Kafka Stream implementation inside Spring boot application).

### Process streamed data by using Kafka Stream processors

Kafka Streams is a client library for building applications and microservices, where the input and output data are stored in Kafka clusters. It combines the simplicity of writing and deploying standard Java and Scala applications on the client side with the benefits of Kafka’s server-side cluster technology. In our design we will use Kafka Stream implementation of the Spring Cloud Stream Binder.

### We need two main stream processors:

First processor will accept 2 inputs, input-I as transactionStream which is coming from “payment.transactions” source topic, input-II as userProfileStream which is coming from “payment.user_profile” source topic.

![kafka-stream processor- I](/images/banner/posts/change-data-capture/processor1.png)

We need to join transactionStream x userProfileStream to enhance transaction with user details. But wait .. how we can join it? Because userProfile saved once in database (during insert time we will accept only one time stream for userProfile) , but transaction is continuous process can happen multiple time based on one userProfile. Therefore we need to save state of userProfileStream. Kafka stream provides us KTable for stateful operations to save state of stream. Internally it uses RocksDB and save states of stream inside of application to avoid network latency. RocksDB is powerful key-value based NoSQL database . As RocksDB database state lives inside of application instance therefore there is no network latency when querying to KTable state(also query time complexity is O(1) as it works based on key and value). Join will happen based on KStream x KTable and join key will be userId and join result will be emit to Kafka intermediate topic(because we haven’t finished yet, second processor will consume transactionStream from intermediate topic and process it). Let’s name intermediate topic as transaction . If first processor processes our transactions which we have mentioned in above, then transaction (intermediate) topic records would look like this:

```json5
//transaction(intermediate topic) description
//lets assume json in the below describes data inside offset-0
{
    "user_id": 1,
    "user_name": "John",
    "user_surname": "Doe",
    "user_middle_name": "Smith",
    "user_phone_number" : "+372 12345678",
    "user_mail_address" : "john.doe@gmail.com",
    "user_suspicious_activity": false,
    "transaction_amount": 5.0000,
    "transaction_currency": "EUR",
    "transaction_type": "purchase",
    "transaction_country": "Estonia",
    "transaction_timestamp": "2023-12-05T14:32:00Z"
 }
```

```json5
//lets assume json in the below describes data inside offset-1
{
    "user_id": 1,
    "user_name": "John",
    "user_surname": "Doe",
    "user_middle_name": "Smith",
    "user_suspicious_activity": false,
    "user_phone_number" : "+372 12345678",
    "user_mail_address" : "john.doe@gmail.com",
    "transaction_amount": 10000.0000,
    "transaction_currency": "EUR",
    "transaction_type": "purchase",
    "transaction_country": "Netherland",
    "transaction_timestamp": "2023-12-05T14:35:01Z"
 }
```

```json5
//lets assume json in the below describes data inside offset-2
{
  "user_id": 1,
  "user_name": "John",
  "user_surname": "Doe",
  "user_middle_name": "Smith",
  "user_phone_number": "+372 12345678",
  "user_mail_address": "john.doe@gmail.com",
  "user_suspicious_activity": false,
  "transaction_amount": 25000.0000,
  "transaction_currency": "EUR",
  "transaction_type": "purchase",
  "transaction_country": "Poland",
  "transaction_timestamp": "2023-12-05T14:35:50Z"
}
```

> Second stream processor’s goal will be aggregate transaction amounts for each user over a time window to calculate the total spending within 1 hour window. It should identify users with a sudden spike in spending, which may indicate abnormal behavior

Second processor will accept one input stream from intermediate topic(result of first processor) and process it.

![kafka-stream processor- II](/images/banner/posts/change-data-capture/processor2.png)

First step is group by individual each userId and save state in KTable. Second step is to apply 1 hour sliding window , that means each user transactions which has happened within last hour will be combined and results will be emitted to downstream. After window result is ready , we will sum amount . In the next step we will apply filter by amount and other fraud detection rules which we have defined in advance. This step will identify users with a sudden spike in spending within last hour, which may indicate abnormal behavior. If abnormal behavior is detected then result will be emitted to Kafka destination topic. Let’s assume for our design if each user within hour purchased more than 30000 EUR in different countries this case will be assumed as fraud case and user profile’s ”suspicious_activity” flag will be enabled and future transactions will be blocked for this user. If our second processor process our transactions from intermediate topic then stream processor result in destination topic would look like this. Let’s name destination topic as suspicious_activities.

```json5
//suspicious_activities topic(destination topic)  description
//lets assume json in the below describes data inside offset-0
{
    "user_id": 1,
    "user_name": "John",
    "user_surname": "Doe",
    "user_middle_name": "Smith",
    "user_phone_number" : "+372 12345678",
    "user_mail_address" : "john.doe@gmail.com",
    "user_suspicious_activity": true,
    "transaction_amount": 35005.0000,
    "transaction_currency": "EUR",
    "transaction_countries": ["Estonia", "Netherland", "Poland"],
    "window_start_time": "2023-12-05T14:30:00Z",
    "window_end_time": "2023-12-05T15:00:00Z"
}
```
### Consumers of destination topic

As we have detected suspicious activity for each individual user and published this activity to suspicious_activities kafka topic (destination topic) , this record can be consumed for different applications and can be used for different purposes

### for example

- analytics service can consume this record and visualize in the analytics dashboard.
- notification service can consume this record and send mobile push notification and email to customer about this suspicious activity.
- another service can consume this record and in mysql database update user_profile table “suspicious_activity” flag to true.

>  [Source](https://medium.com/@mayilb77/design-financial-fraud-detection-system-based-on-cdc-change-data-capture-technology-and-real-time-9f2c47d24054)

### Thank you for taking the time to read my article!
