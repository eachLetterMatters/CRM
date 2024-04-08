<template>
    <li>
        <p>{{client.name}}</p>
        <div style="display: flex;">
            <img class="icon" src="../../assets/icons/ic--phone.svg" style="height:20px;"/>
            <p>{{client.phone_number}}</p>
        </div>
        <div style="display: flex;">
             <div @click="openInBrowser(client.www)">
                <img class="icon" src="../../assets/icons/ic--www.svg"/>
             </div>
             <div @click="openInBrowser(client.fb)">
                <img class="icon" src="../../assets/icons/ic--facebook.svg"/>
             </div>
        </div>
        <div @click="removeClient(client.id)">
            <img class="icon" src="../../assets/icons/iconamoon--arrow-right-2-light.svg"/>
        </div>
    </li>
</template>

<script>
// import { shell} from 'electron'
// const { shell } = require('electron')

export default {
    props: ["client"],
    methods: {
        openInBrowser(link){
            window.api.openInBrowser(link);
            // shell.openExternal('https://' + link);
        },
        removeClient(id){
            window.api.removeClient(id);
        }
    }
}
</script>

<style scoped>
li {
  /* justify-content: space-between; */
  margin: 1% 5% 0 5%;
  padding:10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  border: 3px solid var(--dark-white);
    background: transparent;
  /* background: white; */
  /* padding: 8px;  */
  border-radius: 35px;
  color: var(--dark-background-1);
}

li:hover{
    /* background: #f5f5f5; */
    /* background: transparent; */
      background: #ffffff55;

}

.icon{
    padding-right: 5px;
    height: 25px;
    /* https://isotropic.co/tool/hex-color-to-css-filter/ */
    filter: invert(17%) sepia(32%) saturate(3234%) hue-rotate(176deg) brightness(94%) contrast(96%);
}

</style>