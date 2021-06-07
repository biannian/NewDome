<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <seller-aside></seller-aside>
      </el-aside>
      <el-container>
        <el-header>
          <seller-header></seller-header>
        </el-header>

        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 20px; margin-left: 20px"
        >
          <el-breadcrumb-item :to="{ path: '/seller/sellerIndex' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>评价管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="comment" border style="width: 100%">
            <el-table-column label="微信头像" width="120">
              <template slot-scope="scope">
                <img
                  style="width: 75px; height: 75px"
                  :src="scope.row.wxImage"
                />
                　　</template
              >
            </el-table-column>
            <el-table-column prop="wxName" label="昵称" width="100">
            </el-table-column>
            <el-table-column prop="commentInfo" label="评论内容" width="300">
            </el-table-column>
            <el-table-column prop="commentTime" label="评论时间" width="170">
            </el-table-column>
            <el-table-column prop="shopReply" label="商家回复" width="300">
            </el-table-column>
            <el-table-column prop="shopReplyTime" label="回复时间" width="190">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="reply(scope.row)"
                  >回复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入回复内容"
              v-model="shopReply"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirm()">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import dateFormat from "../../utils/time";
import api from "@/api/api";
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
import { Message } from "element-ui";
export default {
  components: { SellerAside, SellerHeader },

  data() {
    return {
      shopReply: "",
      comment: [],
      orderId: "",
      dialogVisible: false,
    };
  },
  methods: {
    confirm() { 
      let t = new Date();
      let time = dateFormat("YYYY-mm-dd HH:MM:SS", t);
      let params = {
        orderId: this.orderId,
        shopReply: this.shopReply,
        shopReplyTime: time,
      };
      api.updateComment(params).then((res) => {
       if(res.data.result == 1){
         Message.success("回复成功！");
       }else{
         Message.error("回复失败！");
       }
       this.dialogVisible = false;
      });
    },
    reply(id) {
      if (id.shopReply != null) {
        Message.warning("已经评论过了");
        return;
      }
      this.orderId = id.orderId;
      this.dialogVisible = true;
    },
    selectComment() {
      var shopId = sessionStorage["shopId"];
      var params = {
        shopId: shopId,
      };
      api.selectComment(params).then((res) => {
        res.data.result.reverse().forEach((element) => {
          this.comment.push(element);
        });
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },

  mounted() {
    this.selectComment();
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
