<script>
import PostListHome from "@/components/home/post-list-home.component.vue";
import {PostApiService} from "@/services/post.service.js";
import PostEntity from "@/models/post.entity.js";
import {User} from "@/models/user.entity.js";

export default {
  name: "home-content",
  components: {PostListHome},
  data() {
    return {
      posts: [],
      hasError: false,
      hasLoading: false,
      postApi: new PostApiService()
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.fetchNewPosts();
  },
  methods: {
    buildPostListFromResponseData(items) {
      return items.map(item => {
        let user = new User(
            item.user.id,
            item.user.firstName,
            item.user.lastName,
            item.user.email,
            item.user.profileImg
        );
        return new PostEntity(
            item.id,
            user,
            item.title,
            item.description,
            item.rating
        )
      })
    },

    fetchNewPosts() {
      this.postApi.getAllPostsByCompanyId(this.user.companyId)
          .then(response => {
            let items =  response.data;
            this.posts = this.buildPostListFromResponseData(items);
            console.log(items);
          })
    }

  }
}
</script>

<template>
  <section class="flex h-full flex-column lg:pb-5 p-4 lg:p-5">
    <div class="flex home-hero-container border-round-xl">
      <img class="home-hero-image border-round-xl" src="../../assets/home-hero.png"/>
    </div>
    <h2 class="home-title text-xl font-normal my-4">New posts:</h2>
    <post-list-home :posts="posts"></post-list-home>
  </section>
</template>

<style scoped>

section {
  background-color: #FFF;
}

.home-title {
  font-family: 'Poppins', serif;
  font-weight: 500 !important;
}

.home-hero-container {
  position: relative;
}

.home-hero-container::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  border-radius: 15px;
}

.home-hero-image {
  width: 100%;
  height: 18rem;
  object-fit: cover;
}

</style>