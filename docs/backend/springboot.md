# Spring Boot Architecture & Internals

Deep-dive architectural concepts frequently targeted in Senior / Full-Stack interview loops.

---

## Core Container & Bean Lifecycle

### Q1: Explain the step-by-step lifecycle of a Spring Bean.
<details>
<summary><b>View Architectural Answer</b></summary>

The Spring Bean lifecycle is handled entirely by the `ApplicationContext` container via the following deterministic phases:

1. **Instantiation:** The container finds the bean definition (via component scanning or `@Bean` configuration) and uses reflection to instantiate the bean (essentially executing its constructor).
2. **Populate Properties:** Dependency Injection occurs here. The container resolves and injects all `@Autowired` fields, setters, or constructor arguments.
3. **Aware Interfaces Execution:** If the bean implements any `Aware` interfaces, Spring invokes them to pass container metadata:
   - `BeanNameAware` -> passes the bean ID.
   - `BeanFactoryAware` -> passes the containing BeanFactory.
   - `ApplicationContextAware` -> passes the current ApplicationContext environment.
4. **BeanPostProcessor (Pre-Initialization):** The `postProcessBeforeInitialization()` method of any registered `BeanPostProcessor` is executed. (This is where Spring wraps your beans in Proxies if required, such as for AOP or security filters).
5. **Initialization:** Custom init logic runs:
   - Methods annotated with `@PostConstruct` are executed first.
   - If the bean implements `InitializingBean`, `afterPropertiesSet()` runs.
   - Any custom `init-method` declared in your configuration runs.
6. **BeanPostProcessor (Post-Initialization):** The `postProcessAfterInitialization()` method executes. At this point, the bean is fully constructed, proxied, and ready for use.
7. **Destruction:** When the container closes, resources are cleaned up via `@PreDestroy` methods or the `DisposableBean` interface's `destroy()` method.

</details>

---

## Transaction Management & AOP

### Q2: What happens under the hood when a method is annotated with `@Transactional`?
<details>
<summary><b>View Architectural Answer</b></summary>

Spring leverages **Aspect-Oriented Programming (AOP)** and **Dynamic Proxies** to manage declarative transactions. 

1. **Proxy Creation:** During application startup (the post-initialization phase of the bean lifecycle), Spring detects the `@Transactional` annotation. Instead of injecting your raw bean class instance directly into other classes, it generates a **Dynamic Proxy** wrapper around your bean (using standard JDK interfaces or CGLIB subclassing).
2. **Interception:** When another class invokes your transactional method, it actually calls the proxy wrapper first.
3. **Transaction Initialization:** The proxy intercepts the call, opens a connection to the database using the configured `PlatformTransactionManager`, disables auto-commit (`connection.setAutoCommit(false)`), and begins a native DB transaction.
4. **Execution:** The proxy delegates execution to your real business logic method.
5. **Outcome Resolution:**
   - **Success:** If your method finishes executing without throwing an unhandled exception, the proxy calls `connection.commit()`.
   - **Failure:** If your method throws a `RuntimeException` or an explicit `Error`, the proxy catches it and calls `connection.rollback()`. *Note: By default, checked exceptions do not trigger a rollback unless explicitly configured via `@Transactional(rollbackFor = Exception.class)`.*
6. **Resource Cleanup:** The proxy closes or returns the database connection back to the connection pool (like HikariCP).

</details>