<template>
  <div class="gallery">
    <div class="list-container">
      <div v-for="(person, index) in persons" :key="index" class="person">
        <img
          class="icon"
          src="../../../assets/icons/ic--person.svg"
          style="height: 30px"
        />
        <p>{{ person.name }}</p>
        <p>{{ person.surname }}</p>

        <div style="display: flex">
          <img class="icon" src="../../../assets/icons/ic--phone.svg" />
          <p>{{ person.phone_number }}</p>
        </div>

        <div style="display: flex">
          <img class="icon" src="../../../assets/icons/ic--email.svg" />
          <p>{{ person.email }}</p>
        </div>
      </div>
      <div class="person" @click="addPerson">
      <div class="add-button">
        +
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["clientId"],
  data() {
    return {
      persons: [],
    };
  },
  methods: {
    addPerson() {
      console.log("Person Added");
      window.api.addPerson(this.clientId);
      this.getPersons();
    },
    getPersons() {
      // console.log("Searching for id: " +  this.clientId)
      window.api
        .getPersons(this.clientId)
        .then((persons) => {
          this.persons = persons;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.getPersons();
  },
  beforeUpdate() {
    console.log("Before update is called");
    this.getPersons();
  },
};
</script>

<style scoped>
.gallery {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  /* overflow-y: scroll ; */
}

.list-container {
  width: 100%;
  display: grid;
  /* white-space: nowrap; */
  grid-template-columns: auto auto auto;
  grid-auto-flow: column;
  grid-gap: 5px;
  padding: 10px;
  flex: none;
  justify-content: start;
}
.gallery div .person {
  width: 195px;
  /* height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid white;
  /* background: transparent; */
  background: linear-gradient(#cfe3ef, white);
  /* background: linear-gradient(white,var(--light-background)); */
  /* background: white; */
  /* padding: 8px;  */
  border-radius: 35px;
  color: var(--dark-background-1);
}

.gallery::-webkit-scrollbar {
  display: none;
}

.icon {
  filter: invert(17%) sepia(32%) saturate(3234%) hue-rotate(176deg)
    brightness(94%) contrast(96%);
}

.add-button{
  width: 65px;
  height:65px;
  background: var(--dark-white);
  border-radius: 50%;
  color: white;
  line-height: 65px;
  text-align: center;
  font-size:center;
  font-size: 23px;
  z-index: 100;
  cursor: pointer;
}
.add-button:hover{
  background: var(--theme-color);
  transition: 1s;
}
</style>