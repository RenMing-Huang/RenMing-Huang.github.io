---
title: Socially situated artificial intelligence enables learning from human interaction
description: agent除了需要从数据中学习，也需要学会更好的从人类获得数据和知识
categories:
 - article
comment_title: Socially situated artificial intelligence

---



### **《Socially situated artificial intelligence enables learning from human interaction》**



> Humans have long demonstrated an ability to learn from interactions with others. However, artificial intelligence (AI) agents learn in social isolation. To create intelligent systems that understand more than a fixed slice of the world, our article formalizes socially situated AI—a framework that enables agents to interact with people as they simultaneously learn new concepts about the world around them. Using our framework, we deploy a field experiment on a photo-sharing social network where our agent interacts with hundreds of thousands of people to learn concepts about the visual world. We combine advances in deep learning, computer vision, natural language processing, and human–computer Interaction to deliver a human-centered AI that learns from interactions with people in social environments.

#### AI社会化，它不仅要学会从收集的数据学会新的概念，还要学会如何通过和人类交互来收集数据

局限性：以前，智能体只能从人工标记的数据进行学习，并且强化学习只能用在small action spaces

本文提出了socially situate artificial intelligence 他采用强化学习，通过与人类交互（提问->收集问题）来改进模型，人类可能会回应，也可能不会，只有当人类的回应包含了新的知识，并且对agent有用时才会被接受。

其中包括：

- 知识奖励：引导来学习新的概念
- 交互奖励：引导学会更好的交互方式来更亲社会，人类更愿意回答问题

