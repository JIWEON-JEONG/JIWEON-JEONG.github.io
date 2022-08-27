---
title: "logs"
permalink: /categories/retrospective/logs
layout: category
author_profile: true
toc: true
sidebar_main: true
taxonomy: logs
---

{% assign posts = site.categories.Cpp %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}