<template>
  <AddQuicknoteForm
    v-if="showAddForm"
    @closeForm="toggleAddForm"
  />
  <div class="view-container">
    <div class="left">
      Akcje do wykonania
      <div v-for="(action, index) in actions" :key="index" class="action" @click="openClientDetails(action.client_id)">
        <p>{{ action.date }} {{ action.category }}</p>
        <p>{{ action.comment }}</p>
      </div>
    </div>
    <div class="right">
      Szybkie notatki
      <div
        v-for="(note, index) in notes"
        :key="index"
        class="note"
        @click="deleteNote(note.id)"
      >
        {{ note.content }}
      </div>
      <button class="add-button" @click="toggleAddForm">Dodaj</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import customParseFOrmat from 'dayjs/plugin/customParseFormat'
import AddQuicknoteForm from './AddQuicknoteForm.vue';

export default {
  data() {
    return {
      notes: [],
      actions: [],
      showAddForm: false,
    };
  },
  components:{
    AddQuicknoteForm
  },
  methods: {
    getNotes() {
      window.api
        .getNotes()
        .then((notes) => {
          this.notes = notes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllActions() {
      window.api
        .getAllActions()
        .then((actions) => {
          this.actions = actions;
          dayjs.extend(customParseFOrmat);
          for (let i = 0; i < this.actions.length; i++) {
            const newFormat = dayjs(
              this.actions[i].date,
              "YYYY-MM-DD-HH-mm"
            ).format("DD.MM.YYYY HH:mm");
            this.actions[i].date = newFormat;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleAddForm(){
      this.showAddForm = !this.showAddForm;
      this.getNotes();
    },
    deleteNote(id) {
      window.api.removeNote(id);
      this.getNotes();
    },
    openClientDetails(clientId) {
      this.$router.push({
        name: "clientdetails",
        params: { id: clientId },
      });
    },
  },
  mounted() {
    this.getNotes();
    this.getAllActions();
  },
};
</script>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  /* background: blue; */
  height: calc(100% - 32px);
  /* width: 50% - 24px; */
  width: calc(76% - 24px);
  align-items: center;
  justify-content: flex-start;
  padding-top: 2%;
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

.note {
  border: 2px solid #ffffff11;
  margin: 5px 10px 5px 10px;
  padding: 3px;
  text-align: center;
}

.note:hover {
  background: #ffffff77;
}

.add-button {
  background: var(--dark-blue);
  border: transparent;
  padding: 5px 15px;
  border-radius: 35px;
}

.action {
  background: linear-gradient(to right,#cfe3ef, var(--dark-white));
  border: 3px solid var(--dark-white);
  border-radius: 35px;
  width: 96%;
  margin: 1% 2%;
  padding-left: 20px;
  position: relative;
  height: 50px;
}
</style>