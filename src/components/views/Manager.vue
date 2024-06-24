<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import manager from "@/components/views/Manager.vue";

interface manager {
  managerID: string
  managerName: string
  age: string
}


// 定义一个 ref 来存储单位列表数据
let managerList = ref([]);

// 定义获取单位列表的函数
const getmanagerList = async () => {
  try {
    // 发起异步请求获取单位列表数据
    const response = await axios.get('/manager/list');
    // 更新单位列表数据，使用 .value 来访问 ref 的值
    managerList.value = response.data.data;
  } catch (error) {
    console.error('获取单位列表数据时出错:', error);
  }
};
const deletemanager= async (id) =>{
  try {
    const response = await axios.post('/manager/delete',{
      id
    });
    getmanagerList();
  }catch (error){
    console.log('删除单位出错:',error);
  }
}

onMounted(() => {
  getmanagerList();
});


const editFormVisible = ref(false)
const addFormVisible = ref(false)
const form = ref(manager);
const formLabelWidth = '140px'
const handleEdit = (index: number, row: manager) => {
  editFormVisible.value = true;
  Object.assign(form.value, row);

}
const handleAdd = () => {
  form.value = {
    managerID: '',
    managerName: '',
    age: '',
  };
  addFormVisible.value = true;
}
const handleDelete = (index: number, row: manager) => {
  alert(row.managerID)
}

const editmanager = (form: manager) => {
  alert(form.managerID)
  editFormVisible.value = false;
}
const addmanager = () => {
  addFormVisible.value = false;
}
const searchParams = reactive({
  managerID: '',
  managerName: '',
  age: '',
})
const search = (searchParams: manager) => {
  alert(searchParams.managerID)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="负责人ID">
            <el-input v-model="searchParams.managerID" placeholder="负责人ID" clearable />
          </el-form-item>
          <el-form-item label="负责人名称">
            <el-input v-model="searchParams.managerName" placeholder="负责人名称" clearable />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="searchParams.age" placeholder="年龄" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(searchParams)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <br>
      <br>
      <el-main>
        <el-table :data="managerList" style="width: 100%">
          <el-table-column prop="managerID" label="负责人ID" width="180" />
          <el-table-column prop="managerName" label="负责人名称" width="180" />
          <el-table-column prop="age" label="年龄" width="180" />
          <el-table-column align="right">
            <template #header>
              <el-button size="small" type="success" @click="handleAdd">
                Add
              </el-button>
            </template>
            <template #default="scope">
              <el-button size="small"  type="info" @click="handleEdit(scope.$index, scope.row)">
                Edit
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-dialog v-model="addFormVisible" title="增加单位" width="500">
          <el-form :model="form">
            <el-form-item label="负责人ID" :label-width="formLabelWidth">
              <el-input v-model="form.managerID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人名称" :label-width="formLabelWidth">
              <el-input v-model="form.managerName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleAdd">取消</el-button>
              <el-button type="primary" @click="addmanager()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>



        <el-dialog v-model="editFormVisible" title="单位信息修改" width="500">
          <el-form :model="form">
            <el-form-item label="负责人ID" :label-width="formLabelWidth">
              <el-input v-model="form.managerID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人名称" :label-width="formLabelWidth">
              <el-input v-model="form.managerName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editmanager(form)">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
