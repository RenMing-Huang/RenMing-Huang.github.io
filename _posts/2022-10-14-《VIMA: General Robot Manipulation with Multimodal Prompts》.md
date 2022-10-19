---
title:论文阅读《VIMA: General Robot Manipulation with Multimodal Prompts》
description:
categories:
 - article
comment_title: VIMA_comment
---

<!--more-->

摘要：

Prompt-based learning 在自然语言（NLP）取得了巨大的成功，通过 Prompt 可以指导完成多种任务。同时，在机器人这边，也包含有各种各样的任务（e.g., imitating one-shot demonstrations, following language instructions, and reaching visual goals），我们之前的做法总是对不同的任务使用特殊的模型，在这里，我们使用multimodal prompts 来完成各种机器人操作，设计了一个transformer-based generalist robot agent（VIMA），which can processes these prompts and outputs motor actions autoregressively, 并开发了一个新的simulation benchmark(600K+ expert trajectories for imitation learning)

Introduction:

Transformer 在处理多任务上非常出色,所以将它用在E-AI上。

主要贡献：

- a novel multimodal prompting formulation
- robot agent model
- a large-scale benchmark

