<script>
export default {
  name: "new-post-content"
}
</script>

<template>
  <section class="new-post-container h-full flex flex-column gap-3 p-4 lg:p-5">
    <h1 class="text-3xl font-medium">Create a post</h1>
    <p class="text-sm text-gray-700">No recent publications</p>
    <div class="post-background h-full flex align-items-center mt-5 sm:mt-0">
      <div class="post-container shadow-3 p-5 flex flex-column gap-4">
        <h2 class="font-medium">Celebrating Team Success: Hope Heaven <br/>International Impact in Action</h2>
        <p class="text-base font-medium">Dear Hope Have team: </p>
        <form class="post-form flex flex-column mt-2">
          <div class="flex flex-column gap-2">
            <label>Subject:</label>
            <input class="input-field border-round-md p-2 line-height-3" placeholder="Celebrating Team Success: Hope Haven Impact in Action" type="text">
          </div>
          <div class="flex flex-column gap-2">
            <label>Description:</label>
            <textarea class="input-textarea border-round-md p-2 line-height-3" placeholder="We are thrilled to share some exciting news and celebrate the collective efforts of our incredible team members! Together, we have achieved significant milestones..."></textarea>
          </div>
          <div class="flex flex-column gap-2">
            <label>Attach files:</label>
            <div class="input-field border-round-md border-1 py-2 flex align-items-center justify-content-between px-2">
              <p class="text-sm flex align-items-center gap-2"><i class="text-md pi pi-image text-black"></i> image1.png</p>
              <i class="text-md pi pi-paperclip text-black cursor-pointer"></i>
            </div>
          </div>
          <div class="post-button-container flex flex-column sm:flex-row  justify-content-center gap-3 mt-4">
            <button class="uppercase border-round-3xl border-none text-white py-3 px-6 font-medium" type="submit">Publish(23)</button>
            <button class="uppercase border-round-3xl border-1 py-3 px-6 font-medium">Edit Visibility</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

.post-form {
  gap: 18px;
}

.post-container {
  width: 750px;
  margin-inline: auto;
}

.post-container input, p, label, h1, h2 {
  font-family: "Lora", serif;
}

.post-container > h2 {
  color: #008A66;
}

.post-container input:focus, textarea:focus {
  background-color: #F7F7F7;
}

.input-field {
  border: 1px solid #BDBDBD;
  color: #0009;
}

.input-textarea {
  resize: none;
  border: 1px solid #BDBDBD;
  height: 100px;
}

.post-button-container > button[type="submit"] {
  background-color: #008A66;
}

.post-button-container > button {
  cursor: pointer;
}

@media (max-width: 528px) {

  .input-textarea {
    height: 160px;
  }

}

</style>