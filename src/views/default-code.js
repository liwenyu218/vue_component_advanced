// src/views/default-code.js
const code = `<template>
    <div>
        <input v-model="message" class="box">
        <p>{{ message }}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: ''
            }
        }
    }
</script>
<style>
.box {
    color: red;
}

p {
    font-size: 16px;
    color: blue;
}
</style>
`;

export default code;
