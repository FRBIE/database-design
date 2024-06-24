<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import Unit from "@/components/views/Unit.vue";

interface Unit {
  unitID: string
  unitName: string
  address: string
}


// 定义一个 ref 来存储单位列表数据
let unitList = ref([]);

// 定义获取单位列表的函数
const getUnitList = async () => {
  try {
    // 发起异步请求获取单位列表数据
    const response = await axios.get('/unit/list');
    // 更新单位列表数据，使用 .value 来访问 ref 的值
    unitList.value = response.data.data;
  } catch (error) {
    console.error('获取单位列表数据时出错:', error);
  }
};
const deleteUnit= async (id) =>{
  try {
    const response = await axios.post('/unit/delete',{
      id
    });
    getUnitList();
  }catch (error){
    console.log('删除单位出错:',error);
  }
}

onMounted(() => {
  getUnitList();
});


const editFormVisible = ref(false)
const addFormVisible = ref(false)
const form = ref(Unit);
const formLabelWidth = '140px'
const handleEdit = (index: number, row: Unit) => {
  editFormVisible.value = true;
  Object.assign(form.value, row);

}
const handleAdd = () => {
  form.value = {
    unitID: '',
    unitName: '',
    address: '',
  };
  addFormVisible.value = true;
}
const handleDelete = (index: number, row: Unit) => {
  alert(row.unitID)
}

const editUnit = (form: Unit) => {
  alert(form.unitID)
  editFormVisible.value = false;
}
const addUnit = () => {
  addFormVisible.value = false;
}
const searchParams = reactive({
  unitID: '',
  unitName: '',
  address: '',
})
const search = (searchParams: Unit) => {
  alert(searchParams.unitID)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="单位ID">
            <el-input v-model="searchParams.unitID" placeholder="单位ID" clearable />
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="searchParams.unitName" placeholder="单位名称" clearable />
          </el-form-item>
          <el-form-item label="单位地址">
            <el-input v-model="searchParams.address" placeholder="单位地址" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(searchParams)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <br>
      <br>
      <el-main>
        <el-table :data="unitList" style="width: 100%">
          <el-table-column prop="unitID" label="单位ID" width="180" />
          <el-table-column prop="unitName" label="单位名称" width="180" />
          <el-table-column prop="address" label="单位地址" width="180" />
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
            <el-form-item label="单位ID" :label-width="formLabelWidth">
              <el-input v-model="form.unitID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="单位名称" :label-width="formLabelWidth">
              <el-input v-model="form.unitName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="单位地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleAdd">取消</el-button>
              <el-button type="primary" @click="addUnit()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>



        <el-dialog v-model="editFormVisible" title="单位信息修改" width="500">
          <el-form :model="form">
            <el-form-item label="单位ID" :label-width="formLabelWidth">
              <el-input v-model="form.unitID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="单位名称" :label-width="formLabelWidth">
              <el-input v-model="form.unitName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="单位地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editUnit(form)">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
