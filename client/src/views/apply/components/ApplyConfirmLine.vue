<template>
    <div class="confirm_wrap">
        <div v-for="index in [0, 1, 2, 3, 4]" :key="index" class="confirm_cont addconfirmline">
            <div v-if="line.length > index">
                <div class="add_confirm_line" v-on:click="openPopUp" >
                    <div class="confirm_position">{{line[index].CONFIRM_USER_POSITION}}</div>
                    <div class="confirm_name">{{line[index].CONFIRM_USER_NAME}}</div>
                </div>
            </div>
            <div v-else>
                <div class="add_confirm_line" v-on:click="openPopUp">
                    <div class="confirm_position"></div>
                    <div class="confirm_name"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    // import Vue from 'vue';
    export default {
        props:{
            title: {
                type: String,
                required: true
            },
            line:{
                type: Array,
                required: true,
                default: () => []
            }
        },
        data() {
            return {
                mtitle: this.title,
                mLine: this.line
            }
        },
        methods: {
            openPopUp() {
                console.log(this.$nextTick);
                console.log(this.title);
            },
            setLine(){
                this.mLine = this.line;
            },
            getLine(){
                return this.mLine;
            }
        },
        computed: {
            
        },
        mounted: function () {
            this.$nextTick(function () {
                // console.log(this.line);
            })
        },
        updated: function(){
            this.$nextTick().then(function(res){
                res.setLine();
            })
        }
        
    }
</script>
