<template>
    <div>
        <el-steps :active="mActive" align-center>
            <el-step title="결재라인 선택"></el-step>
            <el-step title="정책작성"></el-step>
            <el-step title="신청서 확인"></el-step>
            <el-step title="완료"></el-step>
        </el-steps>
    </div>
</template>

<script>
    // import Vue from 'vue';
    export default {
        props:{
            active: {
                type: Number,
                required: true
            },
        },
        data() {
            return {
                mActive: this.active
            };
        },
        methods: {
            
        },
        computed: {
            test() {
                return 0;
            }
        }
    }
</script>
