<template>
  <div>
    <el-container>
      <el-header>
        <div
          style="
            padding-left: 26px;
            padding-top: 30px;
            float: left;
            color: #409eff;
            font-size: 30px;
          "
        >
          <p>饿了吗的弟弟</p>
        </div>
        <div class="select">
          <input v-model="shopName" style="display:initial;width: initial;" class="form-control" placeholder="请输入想查找的店铺" />
          <el-button
            icon="el-icon-search"
            @click="selectShop"
            circle
          ></el-button>
        </div>
        <Topfile></Topfile>
      </el-header>
      <el-main>
        <div>
          <el-carousel :interval="4000" type="card" height="190px">
            <el-carousel-item v-for="(img, item) in imgUrl" :key="item">
              <el-image :src="img.url" @click="to(item)" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="color: #909399; font-size: 20px">分类：</div>
        <div style="margin-top: 20px; padding: 10px" class="border-radius: 4px">
          <Index :IshopName="shopName" ref="Index"></Index>
        </div>
    
      </el-main>
    </el-container>
     
  </div>
</template>

<script>
import Index from "@/components/buyer/index.vue";
import Topfile from "@/components/topfile.vue";
import api from "@/api/api";
export default {
  name: "Helloword",
  data() {
    return {
      shopName: "",
      activeName: "first",
      imgUrl: [
        {
          url:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3640016434,1747871321&fm=26&gp=0.jpg",
        },
        {
          url:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3097220377,1790098039&fm=26&gp=0.jpg",
        },
        {
          url:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=33737620,2959296915&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  methods: {
    to(key){
      let id = key +1;
      this.$router.push({ path: "/buyer/shop?shopId="+id  });
    },
    selectShop() {
   
      this.$refs.Index.queryByNameOff = true;
  
      let param = {
        pageNum: this.$refs.Index.indexPage,
        pageSize: this.$refs.Index.pageSize,
        shopName: this.shopName,
      };
      api
        .selectShop(param)
        .then((Response) => {
         
          this.$refs.Index.shopList = Response.data.result.list;
      
          this.$refs.Index.count = Response.data.result.total;
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    Topfile,
    Index,
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.run {
  padding-top: 15px;
}
.select {
  padding-left: 240px;
  padding-top: 30px;
  float: left;
}
.el-carousel__item image {
  float: right;
}
</style>