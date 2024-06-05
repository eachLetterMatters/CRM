<template>
    <div class="backdrop" @click.self="closeForm">
        <form class="form" @submit.prevent="addAction" method="post">

            <div style="height: 350px; padding:20px; display:flex; align-items:center; flex-direction:column; justify-content: space-between;">
                <div style="height: 48px;">
                    <h1 style="font-size: 20px;">Dodaj nową akcję</h1>
                </div>
                <div>
                    <input class="text-input" type="text" name="type" placeholder="typ akcji" v-model="newAction.category">
                </div>
                <div>
                    <input class="text-input" type="text" name="comment" placeholder="komentarz" v-model="newAction.comment">
                </div>

                <div>
                    <input class="button" type="submit" :value="'Dodaj'" />
                </div>
                <div v-if="errorMsg">
                    <p style="color:red; padding:10px">{{ errorMsg }}</p>
                </div>            
            </div>
            <div>
                <Calendar v-model="newAction.date" showTime hourFormat="24" inline/>
            </div>
        </form>
    </div>
</template>

<script>

import Calendar from 'primevue/calendar';
import dayjs from 'dayjs'

export default {
    data() {
        return {
            errorMsg: null,
            newAction: {
                category: null,
                date: null,
                comment: null
            },
        }
    },
    components: {  
        Calendar
    },
    props: ["clientId"],
    methods: {
        closeForm() {
            this.$emit('closeForm');
        },
        addAction(){
            if(this.newAction.date == null || this.newAction.category == null){
                this.errorMsg = "Wypełnij wymagane pola";
                setTimeout(() => {
                    this.errorMsg = null;
                }, 4000);             
            } else {
                const formattedDate = dayjs(this.newAction.date).format('YYYY-MM-DD-HH-mm');
                this.newAction.date = formattedDate;
                window.api.addAction({...this.newAction, client_id: this.clientId})
                this.$emit('closeForm');
            }
        }
        // async addPerson(e) {

        //     if (this.newPerson.name == null || this.newPerson.surname == null  || this.newPerson.phone_number == null || this.newPerson.email == null){
        //         this.errorMsg = "Wypełnij wszystkie pola";
        //         setTimeout(() => {
        //             this.errorMsg = null;
        //         }, 4000);

        //     } else {
        //         // console.log("Dodaje osobe pod takie id clienta: " + this.clientId);
        //         // console.log({...this.newPerson, client_id: this.clientId});
        //         window.api.addPerson({...this.newPerson, client_id: this.clientId});
        //         this.$emit('closeForm');
        //     }
        // }
    }
}
</script>

<style scoped>
.backdrop {
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.65);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.form {
    /* width: 350px;
    height: 550px; */
    padding: 20px;
    background: white;
    border-radius:35px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /* flex-direction: column; */
    border-color: var(--theme-color);
    border-style: solid;
    box-shadow:
    /* -5px -5px 5px rgba(255, 0, 191, 0.5), */
    /* -5px -5px 5px rgba(35, 227, 254, 0.3), */
    /* 5px 5px 5px rgb(0, 0, 0, 0.2), */
    inset -10px -10px 50px rgba(35, 227, 254, 0.2);
    /* inset 5px 5px 5px rgb(0, 0, 0, 0.2);  */
}

.text-input {
  /* display: inline-block; */
  outline: none;
  font-size: 10px;
  line-height: 1;
  border-radius: 500px;
  /* border: 1px solid transparent; */
  border-style: none;
  letter-spacing: 2px;
  min-width: 250px;
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 16px;
  background-color: var(--dark-white);
  height: 48px;
  margin: 0 ;
}

.button {
    font-size: 10px;
  line-height: 1;
  border-radius: 500px;
  /* border: 1px solid transparent; */
  border-style: none;
  letter-spacing: 2px;
  min-width: 125px;
  /* text-transform: uppercase; */
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 16px;
  background-color: var(--theme-color);
  height: 48px;
  margin: 0 ;  
}

</style>