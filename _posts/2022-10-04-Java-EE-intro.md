---
layout: post
title: "Java EE 개요"
date: 2022-10-04 13:05:00 +0900
categories: ["Java","Java EE"]
---

## 1. Java EE란?

- *Java Enterprise Edition*
- 기업용 분산 어플리케이션 개발 목적의 산업 표준 플렛폼.
- *Java SE*의 확장.
- *Web Profile*(JSP, Servlet등 웹 어플리케이션 서버에 관련된 사양)이 포함된다.

## 2. Java EE의 기술들(Technologies)

- 마지막 버전인 *Java EE 8* 의 기술목록, [오라클 공식 문서](https://www.oracle.com/java/technologies/javaee/javaeetechnologies.html) 참조
- 더 이상의 업데이트는 없다. 이유는 [Jakarta EE](/java/java%20ee/jakarta%20ee/2022/10/04/jakarta-ee.html))포스트를 참조.

### 2.1 웹 어플리케이션 기술들

- WebSocket 1.1
- JSON Binding 1.0
- JSON Processing 1.1
- Java Servlet 4.0
- JavaServer Faces(*JSF*) 2.3
- Expression Language(*EL*) 3.0
- JavaServer Pages(*JSP*) 2.3
- Standard Tag Library for JavaServer Pages(*JSTL*) 1.2

### 2.2 엔터프라이즈 어플리케이션 기술들

- Batch Applications for the Java Platform 1.0
- Concurrency Utilities for Java EE 1.0
- Contexts and Dependency Injection for Java 2.0
- Dependency Injection for Java 1.0
- Bean Validation 2.0
- Enterprise JavaBeans 3.2
- Interceptors 1.2
- Java EE Connector Architecture 1.7
- Java Persistence 2.2
- Common Annotations for the Java Platform 1.3
- Java Message Service API 2.0
- Java Transaction API (JTA) 1.2
- JavaMail 1.6

### 2.3 웹 서비스 기술들을

- Java API for RESTful Web Services (JAX-RS) 2.1
- Implementing Enterprise Web Services 1.3
- Web Services Metadata for the Java Platform 2.1
- Java API for XML-Based RPC (JAX-RPC) 1.1 (Optional)
- Java API for XML Registries (JAXR) 1.0 (Optional)

### 2.4 관리 & 보안 기술들

- Java EE Security API 1.0
- Java Authentication Service Provider Interface for Containers 1.1
- Java Authorization Contract for Containers 1.5
- Java EE Application Deployment 1.2 (Optional)
- J2EE Management 1.1
- Debugging Support for Other Languages 1.0

### 2.5 Java EE와 연관된 Java SE 스펙들

- Java Management Extensions (JMX) 2.0
- SOAP with Attachments API for Java (SAAJ) Specification 1.3
- Streaming API for XML (StAX) 1.0
- Java API for XML Processing (JAXP) 1.6
- Java Database Connectivity 4.0
- Java Architecture for XML Binding (JAXB) 2.2
- Java API for XML-Based Web Services (JAX-WS) 2.2
- JavaBeans Activation Framework (JAF) 1.1
