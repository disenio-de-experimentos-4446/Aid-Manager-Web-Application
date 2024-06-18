<script>
import PostListHome from "@/components/home/post-list-home.component.vue";
import {PostApiService} from "@/services/post.service.js";
import PostEntity from "@/models/post.entity.js";

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
  created() {
    this.fetchNewPosts();
  },
  methods: {
    buildPostListFromResponseData( items ) {
      return items.map (item => {
        return new PostEntity(
          item.id,
          item.name,
          item.email,
          item.title,
          item.description,
          item.profile_img,
          item.publication_date,
          item.images
        )
      })
    },

    fetchNewPosts() {
      this.postApi.getLastPosts()
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