<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import manager from "@/components/views/Manager.vue";
let checkdUnitIDList = ref<number[]>([]);
interface Unit {
  unitID: string
  unitName: string
}
// 定义一个 ref 来存储单位列表数据
let unitList = ref<Unit[]>([]);
interface manager {
  managerID: string
  managerName: string
  age: string
  unitNameList: { [key: number]: string }[]; // 注意这里是对象数组
}


// 定义一个 ref 来存储负责人列表数据
let managerList = ref([]);
// 定义获取负责人列表的函数
const getmanagerList = async () => {
  try {
    const response = await axios.get('/manager/list');
    managerList.value = response.data.data.map((item: any) => ({
      managerID: item.managerID,
      managerName: item.managerName,
      age: item.age,
      unitNameList: item.unitNameList.map((unit: { [key: number]: string }) => ({
        [Object.keys(unit)[0]]: unit[Object.keys(unit)[0]]
      }))
    }));



  } catch (error) {
    console.error('获取负责人列表数据时出错:', error);
  }
};
const getunitList = async () =>{

  try {
    const response = await axios.get('/unit/list');
    unitList.value = response.data.data;
  }catch (error)
  {
    console.error('获取单位列表数据时出错:', error);
  }


}


const deletemanager= async (id) =>{
  try {
    const response = await axios.post('/manager/delete',{
      id
    });
    getmanagerList();
  }catch (error){
    console.log('删除负责人出错:',error);
  }
}

onMounted(() => {
  getmanagerList();
  getunitList();
});


const editFormVisible = ref(false)
const addFormVisible = ref(false)
const form = ref(manager);
const formLabelWidth = '140px'
const handleEdit = (index: number, row: manager) => {

  editFormVisible.value = true;




  // Set checkdUnitIDList based on row's unitNameList
  checkdUnitIDList.value = row.unitNameList.map((unit) => parseInt(Object.keys(unit)[0]));
  console.log('checkdUnitIDList:', checkdUnitIDList.value);

  form.value = {
    managerID: row.managerID,
    managerName: row.managerName,
    age: row.age,
  };

}

const handleAdd = () => {
  form.value = {
    managerID: '',
    managerName: '',
    age: '',
  };
  checkdUnitIDList.value = [];
  addFormVisible.value = true;
}
const handleDelete = async ( row: manager) => {

    try {
      const response = await axios.post('/manager/delete',{
        id: row.managerID
      });
      getmanagerList();
      alert("删除成功")
    }catch (error){
      console.log('删除负责人出错:',error);
    }

}
const editmanager = async (form: manager,checkdUnitIDList:number[]) => {
  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.post('/manager/edit', {
      manager:form,
      checkdUnitIDList
    });
    if(response.data.code === 0){
      getmanagerList();
      alert("修改成功")
      editFormVisible.value = false;
    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('修改失败，请重试');
  }
}
const addmanager = async (form:manager,checkdUnitIDList:number[]) => {
  try {
    // 发起异步请求获取单位列表数据
    const response = await axios.post("/manager/add",{
      manager:form,
      checkdUnitIDList
    })
    if(response.data.code === 0){
      getmanagerList();
      alert("添加成功")
      addFormVisible.value = false;
    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('添加失败，请重试');
  }

}
const searchParams = reactive({
  managerID: '',
  managerName: '',
  age: '',
  unitName:''
})
const search = async (params) => {

  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.post('/manager/search', params);
    if(response.data.code === 0){
      managerList.value = response.data.data;

    }else{
      alert(response.data.description);
    }
  } catch (error) {
    alert('搜索失败，请重试');
  }
}
const resetSearch = async () =>{
  searchParams.managerID="";
  searchParams.managerName="";
  searchParams.age="";
  searchParams.unitName=""
  getmanagerList();
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
          <el-form-item label="所属单位">
            <el-input v-model="searchParams.unitName" placeholder="所属单位" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(searchParams)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="resetSearch">重置</el-button>
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
          <el-table-column prop="unitNameList" label="所属单位(单位ID-单位名称)" width="250">
            <template #default="{ row }">
              <div>
                  <span v-for="(unit, index) in row.unitNameList" :key="index">
                    {{ Object.keys(unit)[0] }} - {{ unit[Object.keys(unit)[0]] }}
                    <br>
                  </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #header>
              <el-button size="small" type="success" @click="handleAdd">
                添加负责人
              </el-button>
            </template>
            <template #default="scope">
              <el-button size="small"  type="info" @click="handleEdit(scope.$index, scope.row)">
                修改
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-dialog v-model="addFormVisible" title="增加负责人" width="500">
          <el-form :model="form">
            <el-form-item label="负责人名称" :label-width="formLabelWidth">
              <el-input v-model="form.managerName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="on" />
            </el-form-item>
            <el-form-item label="所属单位" :label-width="formLabelWidth">
              <el-checkbox-group v-model="checkdUnitIDList">
                <el-checkbox v-for="unit in unitList" :key="unit.unitID" :label="unit.unitID">
                  {{ unit.unitID}} - {{ unit.unitName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="addFormVisible == false">取消</el-button>
              <el-button type="primary" @click="addmanager(form,checkdUnitIDList)">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>



        <el-dialog v-model="editFormVisible" title="负责人信息修改" width="500">
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
<!--            <el-form-item label="所属单位" :label-width="formLabelWidth">-->
<!--              <el-checkbox-group v-model="checkdUnitIDList">-->
<!--                <el-checkbox v-for="unit in unitList" :key="Object.keys(unit)[0]" :label="Object.keys(unit)[0]">-->
            <!--                  当 checkdUnitIDList 中包含某个复选框的 label 值时，该复选框才会被选中。
                                  所以       :label="parseInt(Object.keys(unit)[0]才能正常显示                                                                 -->
<!--                  {{ Object.keys(unit)[0] }} - {{ unit[Object.keys(unit)[0]] }}-->
<!--                </el-checkbox>-->
<!--              </el-checkbox-group>-->
<!--            </el-form-item>-->
            <el-form-item label="所属单位" :label-width="formLabelWidth">
              <el-checkbox-group v-model="checkdUnitIDList">
                <el-checkbox v-for="unit in unitList" :key="unit.unitID" :label="unit.unitID">
                  {{ unit.unitID}} - {{ unit.unitName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click="editmanager(form,checkdUnitIDList)">
                确认修改
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
