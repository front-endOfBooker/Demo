Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 @front-endOfBooker
Sign out
 Watch 0
 Star 0  Fork 0 front-endOfBooker/Todos
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights  Settings
Tree: 112abe481c Find file Copy path Todos/src/view/home.vue
112abe4  on 22 Aug
 jh completed
0 contributors
RawBlameHistory      
212 lines (207 sloc)  6.15 KB
<template>
    <div class="home">
        <el-container>
          <el-main>
            <img class="img" src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/apps/icon-home-eee.jpg" alt="">
            <div class="view">
                <h2>Todos</h2>
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="newTodo" @keydown.native.enter="subEvent" class="resetInput" placeholder="What needs to be done?"></el-input>
                    </el-col>
                </el-row>
                <!-- 任务栏 -->
                <template>
                  <div class="task" v-for="(item, index) in todos" :key="index">
                    <!-- <input type="checkbox" v-model="item.checked"> -->
                    <el-checkbox v-model="item.checked"></el-checkbox>
                    <span :class="{'checked': item.checked}">{{item.value}}</span>
                    <button class="el-icon-circle-close" @click="delTodo(index)"></button>
                  </div>
                  
                </template>
                <!-- 底部 -->
                <div class="footer">
                    <span v-show="left !== 0">
                        <span class="num">{{left}}&nbsp;</span>    
                        <span class="word">items&nbsp;</span>    
                        left.
                    </span>
                    <a style="text-decoration : underline" v-show="right !== 0">Clear {{right}} completed item</a>
                </div>
            </div>
          </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // 新添加的todo
            newTodo: '',
            // 所有的todo
            todos: [],
            // 剩下代办的todo
            leftList: [],
            // 完成或者删除的todo
            comList: [] 
        }
    },
    created () {
        this.initList()
    },
    computed: {
        left: function(){
            this.leftList.length = 0
            this.todos.forEach(item => {
                if (item.checked === false) {
                    this.leftList.push(item)
                }
            })
            return this.leftList.length
        },
        right: function(){
            this.comList.length = 0
            this.todos.forEach(item => {
                if (item.checked === true) {
                    this.comList.push(item)
                }
            })
            return this.comList.length
        }
    },
 
    methods: {
        initList () {
            this.leftList.length = 0
            this.comList.length = 0
            this.todos.forEach(item => {
                if (item.checked === false) {
                    this.leftList.push(item)
                } else if (item.checked === true) {
                    this.comList.push(item)
                }
            })
            console.log('leftList',this.leftList)
            console.log('comList',this.comList)
        },
        subEvent () {
        // 当按下enter后，将input中的信息接受下来，然后保存起来，渲染到下面的task中
        this.todos.push({
            value: this.newTodo,
            checked: false
        })
        this.newTodo = ''
        },
        // 删除按钮
        delTodo (index) {
            console.log(index)
            this.todos.splice(index, 1)
        }
    },
}
</script>
<style lang="scss">
.resetInput {
    .el-input__inner {
        height: 50px;
        line-height: normal;
        box-shadow: 1px 1px 1px #ccc;
        &::-webkit-input-placeholder {
                 /* placeholder颜色  */
                 /* placeholder字体大小  */
                 font-style: italic;
                 font-size: 24px;
                 line-height: normal;
                 /* placeholder位置  */
                //  text-align: right;
             }
    }
}
</style>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    background-color: #eee;
    .el-main {
        position: relative;
        padding: 0;
        .img {
            width: 20px;
            height: 30px;
            position: absolute;
            top: 5px;
            left: 10px;
        }
        .view {
            box-sizing: border-box;
            padding: 20px;
            width: 520px;
            min-height: 363px;
            margin: 0 auto;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            box-shadow: 3px 3px 2px #999;
            background-color: #fff;
            h2 {
                font-size: 36px;
                font-weight: bold;
                text-align: center;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 20px 0 30px 0;
            }
            
            .task {
                padding: 0 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                height: 40px;
                line-height: 40px;
                width: 478px;
                .checked {
                    text-decoration: line-through;
                    color: #ccc;
                }
                &:hover {
                    & > button {
                        display: block;
                        cursor: pointer;
                    }
                }
                & > button {
                    margin-top: 13px;
                    color: #ccc;
                    background-color: #fff;
                    border: 0;
                    padding: 0;
                    float: right;
                    display: none;
                }
            }
        }
        .footer {
            box-sizing: border-box;
            margin-top: 10px;
            width: 100%;
            height: 20px;
            line-height: 20px;
            padding: 0 10px;
            span {
                font-size: 12px;
                color: #999;
                float: left;
                .num {
                    font-weight: 600;
                    color: #000
                }
            }
            a {
                font-size: 12px;
                color: #999;
                float: right;
            }
        }
    }
}
</style>
