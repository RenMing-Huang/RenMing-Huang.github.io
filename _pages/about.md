---
permalink: /
title: "Renming Huang"
layout: archive
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<div class="bio-intro">
I am a researcher at <strong>Shanghai Jiao Tong University (SJTU)</strong>, working at the intersection of <strong>Robotics</strong> and <strong>Reinforcement Learning</strong>. My research focuses on enabling autonomous agents to learn from imperfect demonstrations and generalize to long-horizon, open-world tasks.
</div>

## News

{% assign sorted_pubs = site.publications | sort: 'date' | reverse %}
<ul class="news-list">
{% for pub in sorted_pubs %}
  {% if pub.category == 'conferences' %}
    {% assign tag_class = 'tag-paper' %}
    {% assign tag_label = 'Paper' %}
  {% elsif pub.category == 'preprints' %}
    {% assign tag_class = 'tag-paper' %}
    {% assign tag_label = 'Preprint' %}
  {% else %}
    {% assign tag_class = 'tag-misc' %}
    {% assign tag_label = 'News' %}
  {% endif %}
  <li>
    <span class="news-date">{{ pub.date | date: "%b %Y" }}</span>
    <span>
      <span class="news-tag {{ tag_class }}">{{ tag_label }}</span>
      <strong>{{ pub.title }}</strong>
      {% if pub.category == 'preprints' %}
        posted on <strong>{{ pub.venue_short }}</strong>.
      {% elsif pub.venue_short %}
        accepted at <strong>{{ pub.venue_short }}</strong>.
      {% endif %}
    </span>
  </li>
{% endfor %}
</ul>

## Selected Publications

{% assign featured_pubs = site.publications | where: "featured", true | sort: 'date' | reverse %}
{% for post in featured_pubs %}
  {% include archive-single.html %}
{% endfor %}

<p style="margin-top:1em; font-size:0.9em;">See the full list on the <a href="/publications/">Publications</a> page or <a href="https://scholar.google.com/citations?user=Bmm2-UgAAAAJ&hl=en">Google Scholar</a>.</p>
