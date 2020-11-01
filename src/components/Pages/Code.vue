<template>
  <div>
    <dl>
      <div v-for="project in projects" :key="project.title">
        <dt class="relative">
          <strong>{{ project.title }}</strong> ({{ project.year }})
          <span class="dib absolute top-0 right-0">
            <a target="_blank" :href="project.url">
              <Icon size="22">
                <ExternalLinkIcon />
              </Icon>
            </a>
            <a
              v-if="project.repo"
              class="ml1"
              target="_blank"
              :href="project.repo"
              title="Code Repository"
            >
              <Icon size="22">
                <GithubIcon />
              </Icon>
            </a>
          </span>
        </dt>
        <dd class="mb4 mt1 ml4">
          <p
            class="mv0"
            v-for="(description, i) in project.description"
            :key="`description-${i}`"
            v-html="description"
          />
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import Icon from "../Icon/Icon.vue";
import ExternalLinkIcon from "../Icon/ExternalLinkIcon.vue";
import GithubIcon from "../Icon/GithubIcon.vue";

export default {
  name: "Code",
  components: { GithubIcon, Icon, ExternalLinkIcon },
  data() {
    return {
      projects: [
        {
          url: `${window.location.protocol}//${window.location.host}/`,
          title: "This website",
          year: "2021",
          description: [
            "Hope you are enjoying it!",
            "Built using Vue.js, tachyons, and HTML Canvas",
          ],
          repo: "https://github.com/andsav/andreisavin.com.git",
          previous: {
            v1: "https://github.com/andsav/andreisavin.com.git",
          },
        },
        {
          url: "https://glork.net",
          year: "2017",
          title: "Experiments",
          description: [
            "Algorithms visualization: clustering and traveling salesman solver",
            "Built with vanilla JavaScript on the frontend and golang on the backend",
          ],
          repo: "https://github.com/andsav/webpgp",
        },
        {
          url: "https://webpgp.com",
          year: "2016",
          title: "WebPGP",
          description: [
            "Generate throwaway PGP keys, encrypt, decrypt, sign and verify in your browser",
            "Built with React (although a very obsolete way of writing it)",
          ],
          repo: "https://github.com/andsav/webpgp",
        },
        {
          url: "https://devpost.com/andreisavin",
          year: "2015-2019",
          title: "Various Hackathon Projects",
          description: [
            "Time tracker app, genetic algorithm for photo filters, network traffic visualizer,...",
            "Some written in collaboration with other developers",
          ],
        },
      ],
    };
  },
};
</script>
