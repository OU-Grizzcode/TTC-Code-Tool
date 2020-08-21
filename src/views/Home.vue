<template>
  <div class="home">
    <v-card>
      <v-flex>
        <h3 class="titleIntro">welcome to</h3>
        <img src="../assets/logo.svg" />
      </v-flex>
      <v-card-text class="intro">
        Grizzcode is an interactive website from the OU Tutoring Center to
        help students learn programming. You can choose a challenge below, or, if you're new, you can start with a
        <router-link :to="{name:'Tutorial'}">tutorial</router-link>.
      </v-card-text>

      <v-text-field v-model="query" class="search" placeholder="search challenges"></v-text-field>
    </v-card>

    <div class="wrappingRow">
      <challenge-card
        v-for="challenge in challenges"
        v-bind:challenge="challenge"
        v-bind:key="challenge.id"
      ></challenge-card>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  computed: {
    query: {
      get() {
        return Store.state.searchQuery;
      },
      set(val) {
        Store.commit("updateSearchQuery", val);
      },
    },
    challenges() {
      if (this.query == "") return Store.state.challenges;
      else {
        var ranks = []; //contains challenges with ranks, low is better
        for (var n of Store.state.challenges) {
          //weights for properties
          const titleWeight = 1 / 1;
          const tagWeight = 1 / 1;
          const perfectMatch = -100;
          const CRNMatch = -1000;
          var rank = 0;
          rank += titleWeight * this.editDist(n.title, this.query);
          for (var t of n.tags) {
            if (t == this.query) rank += perfectMatch;
            else
              rank +=
                (tagWeight / n.tags.length) * this.editDist(t, this.query);
          }
          //we divide above because not all challenges have an equal number of tags.

          if (this.query.toUpperCase() == n.crn.toUpperCase()) rank += CRNMatch; //check for CRN

          ranks.push({ rank: rank, challenge: n });
        }

        var edits = 1;
        while (edits > 0) {
          edits = 0;
          for (var i = 0; i < ranks.length - 1; i++) {
            if (ranks[i + 1].rank < ranks[i].rank) {
              var temp = ranks[i + 1];
              ranks[i + 1] = ranks[i];
              ranks[i] = temp;
              edits++;
            }
          }
        }

        var rankedChallenges = [];
        for (var chal of ranks) rankedChallenges.push(chal.challenge);
        return rankedChallenges;
      }
    },
  },
  methods: {
    editDist: function (s, t) {
      if (s === t) {
        return 0;
      }
      var n = s.length,
        m = t.length;
      if (n === 0 || m === 0) {
        return n + m;
      }
      var x = 0,
        y,
        a,
        b,
        c,
        d,
        g,
        h;
      var p = new Uint16Array(n);
      var u = new Uint32Array(n);
      for (y = 0; y < n; ) {
        u[y] = s.charCodeAt(y);
        p[y] = ++y;
      }

      for (; x + 3 < m; x += 4) {
        var e1 = t.charCodeAt(x);
        var e2 = t.charCodeAt(x + 1);
        var e3 = t.charCodeAt(x + 2);
        var e4 = t.charCodeAt(x + 3);
        c = x;
        b = x + 1;
        d = x + 2;
        g = x + 3;
        h = x + 4;
        for (y = 0; y < n; y++) {
          a = p[y];
          if (a < c || b < c) {
            c = a > b ? b + 1 : a + 1;
          } else {
            if (e1 !== u[y]) {
              c++;
            }
          }

          if (c < b || d < b) {
            b = c > d ? d + 1 : c + 1;
          } else {
            if (e2 !== u[y]) {
              b++;
            }
          }

          if (b < d || g < d) {
            d = b > g ? g + 1 : b + 1;
          } else {
            if (e3 !== u[y]) {
              d++;
            }
          }

          if (d < g || h < g) {
            g = d > h ? h + 1 : d + 1;
          } else {
            if (e4 !== u[y]) {
              g++;
            }
          }
          p[y] = h = g;
          g = d;
          d = b;
          b = c;
          c = a;
        }
      }

      for (; x < m; ) {
        var e = t.charCodeAt(x);
        c = x;
        d = ++x;
        for (y = 0; y < n; y++) {
          a = p[y];
          if (a < c || d < c) {
            d = a > d ? d + 1 : a + 1;
          } else {
            if (e !== u[y]) {
              d = c + 1;
            } else {
              d = c;
            }
          }
          p[y] = d;
          c = a;
        }
        h = d;
      }

      return h;
    },
  },
};
</script>

<style scoped>
.search {
  margin: 25px;
  margin-left: 20vw;
  margin-right: 20vw;
}
.intro {
  max-height: 5vh;
  font-size: 1em;
}
.titleIntro {
  padding-top: 15px;
  padding-bottom: 0px;
  margin-bottom: -10px;
}
.wrappingRow {
  padding-bottom: 50px;
}
</style>