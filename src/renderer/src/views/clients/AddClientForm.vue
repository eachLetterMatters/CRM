<template>
    <div class="backdrop" @click.self="closeForm">
        <form class="form" @submit.prevent="addClient" method="post">

            <div style="height: 48px;">
                <h1 style="font-size: 20px;">Dodaj nowego klienta</h1>
            </div>

            <div>
            <input class="text-input" type="text" name="name" placeholder="nazwa" v-model="newClient.name">
            </div>
            <div>
            <input class="text-input" type="text" name="phone_number" placeholder="numer telefonu" v-model="newClient.phone_number">
            </div>
            <div>
            <input class="text-input" type="text" name="www" placeholder="www" v-model="newClient.www">
            </div>
            <div>
                <input class="text-input" type="text" name="fb" placeholder="fb" v-model="newClient.fb">
            </div>
            <div>
                <input class="text-input" type="text" name="description" placeholder="opis" v-model="newClient.description">
            </div>
            <div style="display:flex; align-items:center; justify-content:center;">
                <label for="isActive" style="margin-right: 10px;">czy aktywny?</label>
                <InputSwitch v-model="newClient.is_active" inputId="isActive" />
            </div>
            <!-- <div style="display:flex; align-items:center; justify-content:center;">
                <label for="isActive" style="margin-right: 10px;">czy prywatny?</label>
                <InputSwitch v-model="newClient.is_commercial" inputId="isActive" />
            </div> -->
            <div>
            <input class="button" type="submit" :value="'Dodaj'" />
            </div>
            <div v-if="errorMsg">
                <p style="color:red; padding:10px">{{ errorMsg }}</p>
            </div>            
        </form>
    </div>
</template>

<script>
import InputSwitch from 'primevue/inputswitch';

export default {
    data() {
        return {
            errorMsg: null,
            newClient: {
                name: null,
                phone_number: null,
                www: '',
                fb: '',
                is_active: true,
                is_commercial: true,
                description: '',
            },
        }
    },
    components: {
        InputSwitch,
    },
    // props: ["clientId"],
    methods: {
        closeForm() {
            this.$emit('closeForm');
        },
        async addClient(e) {

            if (this.newClient.name == null || this.newClient.phone_number == null ){
                this.errorMsg = "Wypełnij wymagane pola";
                setTimeout(() => {
                    this.errorMsg = null;
                }, 4000);

            } else {
                // console.log("Dodaje osobe pod takie id clienta: " + this.clientId);
                console.log(this.newClient);
                if(this.newClient.fb == '') this.newClient.fb = 'www.facebook.com';
                if(this.newClient.www == '') this.newClient.www = 'www.google.com';

                window.api.addClient({...this.newClient});
                this.$emit('closeForm');
            }
        }
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
    width: 350px;
    height: 450px;
    padding: 20px;
    background: white;
    border-radius:35px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
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