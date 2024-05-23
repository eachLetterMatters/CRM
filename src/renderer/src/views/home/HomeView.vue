<template>
  <div class="view-container">
      <div class="left">Miejsce na akcje do wykonania</div>
      <div class="right">Miejsce na szybkie notatki
          <div v-for="(note, index) in notes" :key="index" class="note" @click="deleteNote(note.id)">
            {{ note.content }}
          </div>
        <button class="add-button" @click="addNote">Dodaj</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, Home!",
      notes:[],
    };
  },
  methods: {
    changeMessage() {
      this.message = "Hello, World!";
    },
    addNote(){
      window.api.addNote();
      this.getNotes();
    },
    getNotes(){
      window.api
        .getNotes()
        .then((notes) => {
          this.notes = notes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteNote(id){
      window.api.removeNote(id);
      this.getNotes();
    }
  },
  mounted(){
    this.getNotes();
  }
};
</script>

<style scoped>
.left {
  display: flex;
  /* background: blue; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(76% - 24px);
  align-items: center;
  justify-content: center;

  border: 3px solid var(--dark-white);
  background: #ffffff44;
  /* background: red; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 8px 16px 16px;
  /* margin: 16px 0px 16px 0px; */
}

.right {
  display: flex;
  flex-direction: column;
  /* background: green; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(24% - 24px);
  align-items: center;
  justify-content: flex-start;
  border: 3px solid var(--dark-white);
  background: #ffffff33;
  /* background: yellow; */
  border-radius: 35px;
  color: var(--dark-background-1);
  margin: 16px 16px 16px 8px;
  /* margin: 16px 0px 16px 0px; */
  position: relative;
  padding-top: 35px;
}

.note{
  border: 2px solid #ffffff11;
  margin: 5px 10px 5px 10px;
  padding: 3px;
  text-align: center;
}

.note:hover{
  background: #ffffff77;
}

.add-button{
  background: var(--dark-blue);
  border: transparent;
  padding: 5px 15px;
  border-radius: 35px;
}
</style>