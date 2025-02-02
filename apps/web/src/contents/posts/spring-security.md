---
title: 'Authentication and Authorization with Spring Security'
publishedAt: '2024-12-26'
category: Coding
tags: 
  - Python
  - Environment
  - Backend
  - python-dotenv
  - os.environ
  - os.getenv
summary: "In Python, you can access environment variables using the `os` module, which provides a property called `environ` that contains the environment variables. In this post, I will share with you three methods to access environment variable values in Python."
banner: /images/banner/posts/spring-security.png
alt: 'Three methods to Access environment variable values in Python'
mathjax: false
---

I will explain various authentication and authorization mechanisms, highlighting their pros and cons. Additionally, I’ll explore JWT and Spring Security. In the end, I will guide you through a detailed example implementation of using JSON Web Tokens (JWT) in a Spring Boot 3.2 application with Spring Security 6.2.
![Authentication and Authorization with Spring Security](/images/banner/posts/spring-security.png)

## Introduction

One of the critical aspects of web application security is CSRF (Cross-Site Request Forgery) protection. CSRF attacks trick the victim into submitting a malicious request, leveraging their identity and privileges. The Spring Security framework provides strong CSRF protection, which developers can use to safeguard their applications.

In most cases, the CSRF token remains the same for an entire session for performance reasons. But what if your application requires a unique CSRF token for every request? Let’s delve into how you can implement this in Spring MVC.

## Understanding the CSRF Token Life Cycle

Before jumping into the solution, let’s quickly review the life cycle of a CSRF token in Spring Security. When a request is made, Spring Security checks for the CSRF token in the request. If not found, it generates a new one. Once the CSRF token is used, it remains the same for the whole session.

## Creating a Unique CSRF Token for Every Request

To create a unique CSRF token for every request, we need to override the default behavior of Spring Security. We’ll do this by implementing a custom CsrfTokenRepository. Our custom repository will always generate a new CSRF token for each request and won't store any tokens between requests.

Here’s what our custom CsrfTokenRepository would look like:

```java
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.DefaultCsrfToken;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PerRequestCsrfTokenRepository implements CsrfTokenRepository {
    private static final String DEFAULT_CSRF_HEADER_NAME = "X-CSRF-TOKEN";
    private static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";

    @Override
    public CsrfToken generateToken(HttpServletRequest request) {
        return new DefaultCsrfToken(DEFAULT_CSRF_HEADER_NAME, DEFAULT_CSRF_PARAMETER_NAME, createNewToken());
    }

    @Override
    public void saveToken(CsrfToken token, HttpServletRequest request, HttpServletResponse response) {
        // No need to save the token since a new one will be created for every request
    }

    @Override
    public CsrfToken loadToken(HttpServletRequest request) {
        // Always return null so that a new token is created for every request
        return null;
    }

    private String createNewToken() {
        // Your logic for creating a new CSRF token here
        return new String(Base64.getUrlEncoder().withoutPadding().encode(UUID.randomUUID().toString().getBytes()));
    }
}
```

This PerRequestCsrfTokenRepository creates a new CSRF token for every request by overriding the loadToken() method to always return null. The saveToken() method does nothing because we don't need to store the token.

## Stateless CSRF Token Verification
In the context of enhancing CSRF protection by generating a unique token for each request, a common question arises: how can these tokens be verified if they are not stored? This section goes into the stateless verification process, which ensures strong security without the need to save each token on the server.

## The Principle of Stateless Verification
Stateless CSRF protection operates on the premise that the server can validate a token without retaining a copy of it. This method leverages cryptographic techniques to create tokens that carry inherent validation criteria. By doing so, the server can ascertain the legitimacy of a token based solely on its content and structure, without the need for comparison against a stored version.

## Generating Verifiable Tokens
The key to stateless verification lies in the secure generation of tokens. Each token is crafted using a combination of unique identifiers and cryptographic signatures. For instance, a token might include a user-specific identifier, a timestamp to ensure time-bound validity, and a cryptographic hash that binds these elements together. The hash function would use a secret key, known only to the server, ensuring that only tokens generated by the server can be considered valid. Here is an example of how a token might be generated:

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.UUID;

public String generateToken(String userId) {
    try {
        String data = userId + ":" + System.currentTimeMillis();
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec("YourSecretKey".getBytes(), "HmacSHA256");
        mac.init(secret_key);
        String signature = Base64.getEncoder().encodeToString(mac.doFinal(data.getBytes()));
        return Base64.getEncoder().encodeToString((data + "." + signature).getBytes());
    } catch (Exception e) {
        throw new RuntimeException("Error generating token", e);
    }
}
````




