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
    - service B
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

        - A CORS issue occurs when a client attempts to make a request to a server that has a different origin, and the server does not explicitly allow such cross-origin requests. The browser detects that the client is trying to access a resource from a different origin and blocks the request.

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

    - Docker will create series of container, containers are nothing but isolated computing environment. It has everything to required to run single program

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

    - docker build .
      copy instance id
    - docker run [instance id]

  - ## Review Some Basic commands

    - docker build -t anyflag/posts . [-t tag : anyflag/posts]
      we will image id and tag
    - docker run [instance id/ anyflag/posts]
    - docker run -it anyflag/posts sh [sh: shell]
      now we are inside the container
      we can run command inside the container such as ls, mkdir, pwd and so on
    - to exist CTRL + D

    - docker ps
      print out information about all of the running containers [id, container tag (anyflag/posts),created ]

    - docker exce -it [container id][cmd]
      exceute the given command in a running container

    - docker logs [container id]
      print out logs from the give container

  - # Kubernetes

    - Kubernetes is a tool for running bunch of different containers
    - We give it some configuration to describe how we want our contaners to run and interact with eachother
    - to install docker on a windows: open docker desktop => preferences => Kubernetes => enable kuberentes

  - # Kuberenetes tours

    - to se kubernetes version: kubctl version
    - [dockerfile, index.js,...] =feed into- =>docker => image for posts Service = Kuberenetes clustor=> [Node,Node, Node] <= config file
    - Node in kubernetes clustor nothing but the virtual machine. It is a computer that's going to run some number of containers for us
    - config file:

      - Please run 2 copies of posts service
      - Please all copies of Post to access from network

    - Pod: Once kubernetes find the image running on docker hub, Based on the configuration, it's going to create two containers and randomly distribute these containers among the Node

    - Service: Send me a request and I will forward it to posts

  - # Important Terms fo Kubernetes

    - Kubernetes Cluster:

      - A collection of nodes + a master to manage them

    - Node

      - A virtual machine that will run our containers

    - Pod

      - More or less running container. Technically, a pod can run multiple containers

    - Deployment

      - Monitors a set of pods, make sure they are running and restarts them if they crash

    - Service
      - Provides an easy-to-remember URL to access a running container

  - # Notes on config files

    - Tells kubernetes about the different deployments, pod, and services(referred to as 'object') that we want to create
    - Written in YAML syntax
    - Always store these files with our project source code
    - config files provide a precise definition of what your cluster is running

  - # Create a Pod

    - docker build -t stramdeveloper/posts:0.0.1 . => t stands for tag

    - create config file in seperate 'infra' folder
    - cd infra
    - kubectl apply -f posts.yaml
      pod/posts create
    - To get all the different pods running in clusters
      kubectl get pods
      NAME READY STATUS RESTART AGE
      post 1/1 Running 0 50s

  - Understanding a pod spec

    - apiVersion: v1
      k8s is extensible- we can add in our own custom objects.

    - kind: Pod
      The type of object we want to create

    - metadata:
      config option for a object we are going to create
      name: post
      when the pod is created, give it a name of posts

    - spec:
      The exact attributes we want to apply to the object we are about to create
      containers:
      We can create many container in a sigle pod
      - name: posts
        Make a container with a name of 'post'
        image: stramdevelopers:0.0.1
        The exact image we want to use

  - # Common Kubectl commands

    Docker world

    - docker ps
    - docker exec -it [id] sh
    - docker logs [id]

    K8s World

    - kubectl get pods
    - kubectl exec -it [pod_name] sh
    - kubectl logs [pod_name]
    - kubectl delete pod [pos_name]
    - kubectl apply -f [config file name]
    - kubectl describe pod [pod_name]

  - # Introduction to Deployment

    - A deployment is a kubernetes object that is intended to manage a set of pods, so it might be just one
    - update the code inside the container which will create new pods and once they are up and running delete old pods.

    - # Creating a Deployment config file
      kubectl apply -f config-depl.yaml
