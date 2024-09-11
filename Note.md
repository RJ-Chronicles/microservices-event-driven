- What is Microservice:

  - Monolithic
    request --> |Auth Middleware --> router --> Feature A, B,C |--> | Database|

    - In monolithic all the code build in single code base and will be deployed as single unit.
    - Monotlithic contains All the ['Routing', 'middleware', 'business Logic', 'Database access']

  - Microservice

    - implement only one feature of our app
    - Microservice contains all of the code require to make sure single feature can work independly.

    - service A
      - auth Middleware --> Router--> Feature A --> DB[A]
    - service A
      - Auth Middleware --> Router--> Feature B --> DB[B]
        .
        .

  - Data in Microservices

    - This is the big problem of microservices
    - We will created seperate DB for each services
    - Why DB-per-services

      - We want each service to run independetly of other service (Overcome dependency problem)
      - DB schema/ structure might get update{name key get udated with firstName} This will create issue in services A
      - services can use different types of DB's (seq / nosql)

    - #1 Challenge in microservices
      - Managing data between different services
      - ServiceA ---> Sign up ---> User Collection
      - ServiceA ---> Product ---> Products collection
      - ServiceC ---> Orders ---> Order Collection
      - ServiceD ---> Show order made by particular User --> depends on [user, product, Order] collection

  - Sync Communication between Service

    - Sync ---> One services communicate with each other
      using direct requests
      Note: - +Conceptually easy to understand - +Service D won't need a DB - -Indroduce dependency between services - -If any inter-service request fails, the overall request fails - -The entire request is only as fast as the slowest request - -Can easily introduce webs of requests

      |--------Service A
      |
      Service D |--------Service B

    - Async --> Services communicate with each other using events

  - Event-based communication

    - Async --> Services communicate with each other using events

      - All the services will be wired up to single event bus and we have the single point of failure
      - all the services either emmit the event or react to the event.
      - It will be same as sync for first approach

      - second Approach
        ServiceA--> Create User--> Save Collection --> emmit event and send userCrete data {id: 1} --> Save inside the Users collection of serviceD and product Id as [] array.
        servoceB --? create product --> save collection --> emmit event {id, 10, title: 'pants', image: 'pants.jpg'} --> Save Products collection for Service D
        serviceC--> Create Order --> Save collection--> Emmit Event --> userId, productId
        update User and Products Collection

    - Pros and cons of Async Communication

      - +There is no dependancy of service D
      - +Extremly fast
      - -Data duplication, paying for extra storage
      - -Harder to understang

    - Mini-microservice-app

      - createPost service
      - createComment service
      - Post -----> Create a post , List all posts
      - Comments -> Create a comment, List all comments

      - React App ----> Router -----> Post Feature
        Router -----> Comments Feature

      - Posts Service
        Path ----- Method --- Body? ---- Goal
        /posts --- POST-{title: string}--Create a new post
        /posts --- GET ------ No --- Retrieve All all posts

      - Comments Servrice:
        path --------------- Method ------ body ------------ Goal
        /post/:id/comments -- post -------- {content: string}- Create a comment associated with post by post_id
        /post/:id/comments -- get --------- No Body ---------- Retrieve all the comments associated with post by post_id

      - Note on the react App

      - ## Handling CORS Errors

      - Fetching and rendering Posts

      - Common questions around Async Events
        - Idependent services + the reliability that brings is one the one of the core reasons of using microservices in the first place
      - Event Bus Overview

        - Post Service
        - Comment service
        - Query Service

        - Many different implementation, RabbitMQ, Kafka, NATS
        - Receives events, publishes them to listeners

      - ## Event Bus Implementation

    - ## Moderation Service
      - There are three option and we are going to use option third
      - there will be generic event that will be emmitted by comment service

- ## Running Services With docker

  - deployment issue:

    - Posts Service : 4000 |
    - Comments Service: 4001 |--|
    - Query Service : 4002 |--| Event Bus Service: 4005
    - Moderation Servc: 4003 |

    - Scalability Issue
      - If we decide the increase or decrese the number of services
    - Cost Saving

      - Temperory shutdown some service on particular time

    - We need something that will keep track of the all of the services and scale up and scale down based on the traffic

  - ## Why Docker?

    - Docker will create series of container, containers are nothing but isolated computing environment. I has everything to required to run single program

    - If we need multiple copies any of the service we can create copy of the running container

    - Docker container wrap up everything that is needed for a program(dependencies, environment, npm , node etc) + how to start and run it

  - ## Why Kubernetes?

    - Kubernets is a tool for running a bunch of different containers
    - We give it some configuration to describe how we want our containers to run and interact with eachother

    - Kubernets cluster
      - Node1, Node2, Node3
      - ----- Master ------
      - config file
        - Please run 2 copies of Posts
        - Please allow copies of Posts to be accessible from network

  - ## Don't Know Docker

  - ## Dockerizing the Posts Service
