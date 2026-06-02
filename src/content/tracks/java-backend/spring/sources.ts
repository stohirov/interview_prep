import type { Source } from '../../../types';

// Spring Framework 6.x / Spring Boot 3.x reference docs (Java 17+ baseline).
const SF = 'https://docs.spring.io/spring-framework/reference';
const SB = 'https://docs.spring.io/spring-boot/reference';
const SS = 'https://docs.spring.io/spring-security/reference';
const SD_JPA = 'https://docs.spring.io/spring-data/jpa/reference';
const SMOD = 'https://docs.spring.io/spring-modulith/reference';

const SPRING_IN_ACTION = 'https://www.manning.com/books/spring-in-action-sixth-edition';
const SPRING_SECURITY_IN_ACTION = 'https://www.manning.com/books/spring-security-in-action-second-edition';
const SPRING_MICROSERVICES_IN_ACTION = 'https://www.manning.com/books/spring-microservices-in-action-second-edition';
const PRO_SPRING_6 = 'https://link.springer.com/book/10.1007/978-1-4842-8640-1';
const SPRING_GUIDES = 'https://spring.io/guides';
const SF_GITHUB = 'https://github.com/spring-projects/spring-framework';
const SB_GITHUB = 'https://github.com/spring-projects/spring-boot';

export const SPRING_SOURCES: Record<string, Source[]> = {
  'ioc-di-applicationcontext': [
    { title: 'The IoC Container', url: `${SF}/core/beans.html`, type: 'official-docs', authoritative: true, description: 'The foundational chapter: beans, the container, and dependency injection.', recommendedReadingOrder: 1 },
    { title: 'Dependencies', url: `${SF}/core/beans/dependencies.html`, type: 'official-docs', authoritative: true, description: 'Constructor vs setter injection and dependency resolution.', recommendedReadingOrder: 2 },
    { title: 'Java-based Container Configuration', url: `${SF}/core/beans/java.html`, type: 'official-docs', authoritative: true, description: '@Configuration, @Bean, and the CGLIB proxy / inter-bean reference behavior.' },
    { title: 'Classpath Scanning and Managed Components', url: `${SF}/core/beans/classpath-scanning.html`, type: 'official-docs', authoritative: true, description: '@ComponentScan and the stereotype annotations.' },
    { title: 'Spring in Action (6th ed.), Craig Walls', url: SPRING_IN_ACTION, type: 'book', authoritative: false, description: 'Approachable, example-driven coverage of the core container.' },
    { title: 'Official Spring Guides', url: SPRING_GUIDES, type: 'tutorial', authoritative: true, description: 'Short, runnable getting-started guides maintained by the Spring team.' },
  ],
  'bean-scopes-lifecycle': [
    { title: 'Bean Scopes', url: `${SF}/core/beans/factory-scopes.html`, type: 'official-docs', authoritative: true, description: 'singleton, prototype, request, session, application, websocket scopes.', recommendedReadingOrder: 1 },
    { title: 'Customizing the Nature of a Bean', url: `${SF}/core/beans/factory-nature.html`, type: 'official-docs', authoritative: true, description: 'Lifecycle callbacks: @PostConstruct, InitializingBean, init-method.', recommendedReadingOrder: 2 },
    { title: 'Container Extension Points', url: `${SF}/core/beans/factory-extension.html`, type: 'official-docs', authoritative: true, description: 'BeanPostProcessor and BeanFactoryPostProcessor mechanics.' },
  ],
  'autowired-qualifier-primary': [
    { title: 'Using @Autowired', url: `${SF}/core/beans/annotation-config/autowired.html`, type: 'official-docs', authoritative: true, description: 'How @Autowired resolves by type/name/qualifier, and ObjectProvider.', recommendedReadingOrder: 1 },
    { title: 'Autowiring Collaborators', url: `${SF}/core/beans/dependencies/factory-autowire.html`, type: 'official-docs', authoritative: true, description: '@Primary, @Qualifier, collection injection, and ambiguity resolution.', recommendedReadingOrder: 2 },
  ],
  'auto-configuration': [
    { title: 'Auto-configuration', url: `${SB}/using/auto-configuration.html`, type: 'official-docs', authoritative: true, description: 'How Boot discovers and applies auto-configuration classes.', recommendedReadingOrder: 1 },
    { title: 'Externalized Configuration', url: `${SB}/features/external-config.html`, type: 'official-docs', authoritative: true, description: 'Property sources, precedence, @ConfigurationProperties vs @Value.', recommendedReadingOrder: 2 },
    { title: 'Profiles', url: `${SB}/features/profiles.html`, type: 'official-docs', authoritative: true, description: '@Profile and spring.profiles.active activation rules.' },
    { title: 'Developing Auto-configuration', url: `${SB}/features/developing-auto-configuration.html`, type: 'official-docs', authoritative: true, description: 'Writing your own starter and @Conditional classes.' },
    { title: 'Spring in Action (6th ed.), Craig Walls', url: SPRING_IN_ACTION, type: 'book', authoritative: false, description: 'Practical walkthrough of Boot starters and auto-config.' },
  ],
  'spring-mvc-rest': [
    { title: 'Spring Web MVC', url: `${SF}/web/webmvc.html`, type: 'official-docs', authoritative: true, description: 'The servlet-stack web framework overview.', recommendedReadingOrder: 1 },
    { title: 'Annotated Controllers', url: `${SF}/web/webmvc/mvc-controller.html`, type: 'official-docs', authoritative: true, description: '@RequestMapping, argument resolvers, and return values.', recommendedReadingOrder: 2 },
    { title: 'DispatcherServlet', url: `${SF}/web/webmvc/mvc-servlet.html`, type: 'official-docs', authoritative: true, description: 'The request-processing pipeline and special beans.' },
    { title: 'Exception Handling (MVC)', url: `${SF}/web/webmvc/mvc-controller/ann-exceptionhandler.html`, type: 'official-docs', authoritative: true, description: '@ExceptionHandler, @ControllerAdvice, and ResponseStatusException.' },
  ],
  'spring-data-jpa': [
    { title: 'Spring Data JPA Reference', url: `${SD_JPA}/index.html`, type: 'official-docs', authoritative: true, description: 'The umbrella reference for repositories and JPA integration.', recommendedReadingOrder: 1 },
    { title: 'JPA Repositories', url: `${SD_JPA}/jpa.html`, type: 'official-docs', authoritative: true, description: 'Entities, persistence context, and the JPA programming model.', recommendedReadingOrder: 2 },
    { title: 'Query Methods', url: `${SD_JPA}/repositories/query-methods-details.html`, type: 'official-docs', authoritative: true, description: 'Derived queries, @Query, pagination, and projections.' },
    { title: 'Transaction Management', url: `${SF}/data-access/transaction.html`, type: 'official-docs', authoritative: true, description: 'Where @Transactional propagation and isolation are defined.' },
    { title: 'Spring in Action (6th ed.), Craig Walls', url: SPRING_IN_ACTION, type: 'book', authoritative: false, description: 'Data-access chapters with repository examples.' },
  ],
  'transactions-deep-dive': [
    { title: 'Transaction Management', url: `${SF}/data-access/transaction.html`, type: 'official-docs', authoritative: true, description: 'The full transaction abstraction overview.', recommendedReadingOrder: 1 },
    { title: 'Declarative Transaction Management', url: `${SF}/data-access/transaction/declarative.html`, type: 'official-docs', authoritative: true, description: 'How the @Transactional AOP proxy is built and applied.', recommendedReadingOrder: 2 },
    { title: '@Transactional Settings', url: `${SF}/data-access/transaction/declarative/annotations.html`, type: 'official-docs', authoritative: true, description: 'Propagation, isolation, rollbackFor, and readOnly semantics.' },
  ],
  'spring-security-basics': [
    { title: 'Spring Security Reference', url: `${SS}/index.html`, type: 'official-docs', authoritative: true, description: 'The entry point for the whole security framework.', recommendedReadingOrder: 1 },
    { title: 'Servlet Security Architecture', url: `${SS}/servlet/architecture.html`, type: 'official-docs', authoritative: true, description: 'The SecurityFilterChain and how filters compose.', recommendedReadingOrder: 2 },
    { title: 'Authentication', url: `${SS}/servlet/authentication/index.html`, type: 'official-docs', authoritative: true, description: 'UserDetailsService, AuthenticationManager, and password encoders.' },
    { title: 'Authorization', url: `${SS}/servlet/authorization/index.html`, type: 'official-docs', authoritative: true, description: 'Method security and request-level authorization.' },
    { title: 'OAuth2', url: `${SS}/servlet/oauth2/index.html`, type: 'official-docs', authoritative: true, description: 'Client, resource server, and JWT support.' },
    { title: 'Spring Security in Action (2nd ed.), Laurentiu Spilca', url: SPRING_SECURITY_IN_ACTION, type: 'book', authoritative: false, description: 'The definitive practical book on Spring Security.' },
  ],
  'aop-proxies': [
    { title: 'Aspect Oriented Programming with Spring', url: `${SF}/core/aop.html`, type: 'official-docs', authoritative: true, description: 'Pointcuts, advice, and the @AspectJ programming model.', recommendedReadingOrder: 1 },
    { title: 'Proxying Mechanisms', url: `${SF}/core/aop/proxying.html`, type: 'official-docs', authoritative: true, description: 'JDK dynamic proxies vs CGLIB and the self-invocation limitation.', recommendedReadingOrder: 2 },
    { title: 'Spring AOP APIs', url: `${SF}/core/aop-api.html`, type: 'official-docs', authoritative: true, description: 'The lower-level ProxyFactory and Advisor APIs.' },
    { title: 'Spring Framework source on GitHub', url: SF_GITHUB, type: 'official-docs', authoritative: true, description: 'Read the actual proxy and advice implementations.' },
    { title: 'Pro Spring 6', url: PRO_SPRING_6, type: 'book', authoritative: false, description: 'In-depth treatment of Spring internals including the AOP machinery.' },
  ],
  'spring-events': [
    { title: 'Standard and Custom Events', url: `${SF}/core/beans/context-introduction.html#context-functionality-events`, type: 'official-docs', authoritative: true, description: 'ApplicationEvent, @EventListener, and async publishing.', recommendedReadingOrder: 1 },
    { title: 'Transaction-bound Events', url: `${SF}/data-access/transaction/event.html`, type: 'official-docs', authoritative: true, description: '@TransactionalEventListener and its commit phases.', recommendedReadingOrder: 2 },
    { title: 'Spring Modulith Reference', url: `${SMOD}/index.html`, type: 'official-docs', authoritative: true, description: 'How events drive decoupled module-to-module communication.' },
  ],
  'caching': [
    { title: 'Cache Abstraction', url: `${SF}/integration/cache.html`, type: 'official-docs', authoritative: true, description: '@Cacheable/@CachePut/@CacheEvict, key generation, condition/unless.', recommendedReadingOrder: 1 },
    { title: 'Caching (Spring Boot)', url: `${SB}/io/caching.html`, type: 'official-docs', authoritative: true, description: 'Auto-configured cache providers: Caffeine, Redis, and others.', recommendedReadingOrder: 2 },
  ],
  'async-scheduling-virtual-threads': [
    { title: 'Task Execution and Scheduling', url: `${SF}/integration/scheduling.html`, type: 'official-docs', authoritative: true, description: '@Async, @Scheduled, TaskExecutor, and the executor abstraction.', recommendedReadingOrder: 1 },
    { title: 'Task Execution and Scheduling (Spring Boot)', url: `${SB}/features/task-execution-and-scheduling.html`, type: 'official-docs', authoritative: true, description: 'Boot auto-config for executors and virtual-thread enablement.', recommendedReadingOrder: 2 },
  ],
  'reactive-webflux-reactor': [
    { title: 'Spring WebFlux', url: `${SF}/web/webflux.html`, type: 'official-docs', authoritative: true, description: 'The reactive web stack built on Reactor.', recommendedReadingOrder: 1 },
    { title: 'Web on Reactive Stack', url: `${SF}/web-reactive.html`, type: 'official-docs', authoritative: true, description: 'Overview of the reactive runtime and APIs.', recommendedReadingOrder: 2 },
    { title: 'Project Reactor Reference', url: 'https://projectreactor.io/docs/core/release/reference/index.html', type: 'official-docs', authoritative: true, description: 'Mono/Flux, operators, and backpressure.' },
    { title: 'Reactive Streams Specification', url: 'https://www.reactive-streams.org/', type: 'spec', authoritative: true, description: 'The Publisher/Subscriber/Subscription contract underlying Reactor.' },
  ],
  'actuator-observability': [
    { title: 'Spring Boot Actuator', url: `${SB}/actuator/index.html`, type: 'official-docs', authoritative: true, description: 'Production-ready endpoints, health, and metrics.', recommendedReadingOrder: 1 },
    { title: 'Actuator Endpoints', url: `${SB}/actuator/endpoints.html`, type: 'official-docs', authoritative: true, description: 'The full endpoint catalog and how to secure them.', recommendedReadingOrder: 2 },
    { title: 'Observability', url: `${SB}/actuator/observability.html`, type: 'official-docs', authoritative: true, description: 'Micrometer metrics and tracing integration.' },
    { title: 'Micrometer Documentation', url: 'https://docs.micrometer.io/micrometer/reference/', type: 'official-docs', authoritative: true, description: 'Counters, gauges, timers, and the meter registry model.' },
  ],
  'testing': [
    { title: 'Testing (Spring Boot)', url: `${SB}/testing/index.html`, type: 'official-docs', authoritative: true, description: '@SpringBootTest, slice tests, and test utilities.', recommendedReadingOrder: 1 },
    { title: 'Testing Spring Boot Applications', url: `${SB}/testing/spring-boot-applications.html`, type: 'official-docs', authoritative: true, description: '@MockBean, MockMvc/WebTestClient, and context configuration.', recommendedReadingOrder: 2 },
    { title: 'Testing (Spring Framework)', url: `${SF}/testing.html`, type: 'official-docs', authoritative: true, description: 'The TestContext framework and context caching.' },
    { title: 'Testcontainers for Java', url: 'https://java.testcontainers.org/', type: 'official-docs', authoritative: true, description: 'Real dependencies in disposable containers for integration tests.' },
  ],
  'spring-boot-3-modern-stack': [
    { title: 'Spring Boot Reference', url: `${SB}/index.html`, type: 'official-docs', authoritative: true, description: 'The Boot 3.x reference root: baseline, features, and migration.', recommendedReadingOrder: 1 },
    { title: 'REST Clients', url: `${SF}/integration/rest-clients.html`, type: 'official-docs', authoritative: true, description: 'RestClient, @HttpExchange interface clients, and RestTemplate status.', recommendedReadingOrder: 2 },
    { title: 'Spring Boot 3.0 Migration Guide', url: 'https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide', type: 'official-docs', authoritative: true, description: 'javax→jakarta, removed APIs, and config migration.' },
    { title: 'Spring Modulith Reference', url: `${SMOD}/index.html`, type: 'official-docs', authoritative: true, description: 'Structuring a modular monolith between monolith and microservices.' },
    { title: 'Spring Boot source on GitHub', url: SB_GITHUB, type: 'official-docs', authoritative: true, description: 'Authoritative source for auto-config and Boot internals.' },
    { title: 'Spring Microservices in Action (2nd ed.), John Carnell', url: SPRING_MICROSERVICES_IN_ACTION, type: 'book', authoritative: false, description: 'Patterns for the modern distributed Spring stack.' },
  ],
};
