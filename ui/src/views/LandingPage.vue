<template>
  <div>
    <section class="content-header">
      <h1>Security Demo <small>Grove Search App</small></h1>
    </section>

    <section class="content landing">

      <div class="row">
        <div class="col-sm-3">
          <!-- User Selection box -->
          <div class="panel panel-primary">
            
            <div class="panel-heading">
              <h3 class="panel-title">User Selection</h3>
            </div>
            
            <div class="panel-body" style="min-height: 120px;">
              <p>
                Please select user who execute this query:
                <a href="http://localhost:8001/user-summary.xqy?section=security" target="_blank" rel="noopener">User Admin</a>.
              </p><br/>
              <dd v-show="this.users">
                <dl class="row">
                  <template v-for="(v, key, $index) in users">
                    <input type="radio" :id="key" :value="v" v-model="selectedUser" v-on:change="userChange"/>
                    <label :for="v">&emsp;{{v}}</label><br/>
                  </template>
                  <span>Selected User: {{selectedUser}}</span>
                </dl>
              </dd>
            </div>
          </div>
        </div>

        <div class="col-sm-9">

          <!-- Search Text Box and Button  -->
          <div class="panel panel-primary">
            <div id="app">

              <input v-model="queryString" placeholder="enter search word">
              <button class="btn btn-primary" v-on:click="buttonExecSearch">実行</button>
              
              <ml-results :results="json"></ml-results>
            </div>

          </div>
          
          <!-- Search Result -->
          <div class="panel panel-primary">
            <table class="table table-bordered" border="solid 1px #ccc" border-collapse="collapse">
              <thead>
                <tr>
                  <th v-for="(header, index) in headers" v-bind:key="index"   padding="40px" border="solid 1px #ccc"   background-color="#eee">{{header}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, index) in this.json" v-bind:key="v._id">
                  <td>{{v.balance}}</td>
                  <td>{{v.age}}</td>
                  <td>{{v.eyeColor}}</td>
                  <td>{{v.name}}</td>
                  <td>{{v.gender}}</td>
                  <td>{{v.company}}</td>
                  <td>{{v.email}}</td>
                  <td>{{v.phone}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Landing-page',
  components: {

  },
  //props: ['type', 'id'],
  data() {
    const self = this;
    return {
      users: ["admin","yota","nobody"],
      selectedUser: 'admin',

      json: undefined,
      queryString: " ",

      headers: ["balance","age","eyeColor","name","gender","company","email","phone"],

    };
  },
  computed: {
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      const self = this;
      //self.json = undefined;
    },

    buttonExecSearch(){
        var para = {};
        para["rs:user"] = this.selectedUser; //encodeURIComponent(this.id);
        para["rs:query"] = this.queryString;

        axios
          .get("/v1/resources/execJSearch?rs:user="+this.selectedUser+"&rs:query="+this.queryString, para)
          .then((response) => {
            this.json = response.data;
          })
          .catch((e) => {
              console.log(e);
          });
    },
    
    userChange(){
        var para = {};
        para["rs:user"] = this.selectedUser; 
        para["rs:query"] = this.queryString;

        axios
          .get("/v1/resources/execJSearch?rs:user="+this.selectedUser+"&rs:query="+this.queryString, para)
          .then((response) => {
            this.json = response.data;
          })
          .catch((e) => {
              console.log(e);
          });
    },
  },
  watch: {
    '$route.params': {
      handler(params) {
        if (params) {
          this.update();
        }
      },
      deep: true
    }
  }
}
</script>
